import { AxiosRequestConfig } from 'axios';

import { AxiosTransport, Transport } from './Transport';

import { Chain } from '../types/chain';
import { ResponseCommon } from '../types/response';
import { Action, Closest, Module, Status } from '../types/params';
import { BlockNumberByTimestampOptions, BlockNumberByTimestampResponse } from '../types/blocks';
import {
  Erc20TokenTransferEventsListOptions,
  Erc20TokenTransferEventsListResponse,
  EtherBalanceForSingleAddressOptions,
  EtherBalanceForSingleAddressResponse,
  NormalTxListByAddressOptions,
  NormalTxListByAddressResponse
} from '../types/accounts';
import {
  EthBlockByNumberOptions,
  EthBlockByNumberResponse,
  EthBlockNumberResponse,
  EthBlockTransactionCountByNumberOptions,
  EthBlockTransactionCountByNumberResponse,
  EthCallOptions,
  EthCallResponse,
  EthCodeOptions,
  EthEstimateGasOptions,
  EthEstimateGasResponse,
  EthGasPriceResponse,
  EthGetCodeResponse,
  EthGetStorageAtResponse,
  EthGetTransactionReceiptResponse,
  EthSendRawTransactionOptions,
  EthSendRawTransactionResponse,
  EthStorageAtOptions,
  EthTransactionByBlockNumberAndIndexOptions,
  EthTransactionByBlockNumberAndIndexResponse,
  EthTransactionByHashOptions,
  EthTransactionByHashResponse,
  EthTransactionCountOptions,
  EthTransactionCountResponse,
  EthTransactionReceiptOptions,
  EthUncleByBlockNumberAndIndexOptions,
  EthUncleByBlockNumberAndIndexResponse,
  RpcResponseCommon
} from '../types/geth-parity-proxy';

// Error messages:
const TX_NO_FOUND_MESSAGE = 'No transactions found';

// Default block explorer url:
const ETHERSCAN_V2_API_URL = 'https://api.etherscan.io/v2/api';

export interface ClientOptions {
  /**
   * @description Chain id
   * @example 1
   */
  chainid?: Chain | number;
  /**
   * @description Block explorer url
   * @example 'https://api.etherscan.io/v2/api'
   */
  url?: string;
  /**
   * @description Your API key
   * @example 'YourApiKeyToken'
   */
  apikey: string;
  /**
   * Axios request config
   */
  options?: AxiosRequestConfig;
}

export class Client {
  protected transport: Transport;

  constructor(props: ClientOptions) {
    const { apikey = '', chainid, options = {}, url = ETHERSCAN_V2_API_URL } = props;
    this.transport = new AxiosTransport({ apikey, url, chainid, options });
  }

  protected _checkResponseStatus<T extends ResponseCommon>(response: { data: T }, options: any = {}): T['result'] {
    // Check error message for transactions not found:
    if (response?.data?.message === TX_NO_FOUND_MESSAGE) {
      return [];
    }

    if ((response?.data?.status && response.data.status !== Status.Success) || response.data?.error?.message) {
      throw new Error(`Error: ${JSON.stringify(response.data)}. Options: ${JSON.stringify(options)}`);
    }

    return response.data.result;
  }

  protected _checkRpcResponseStatus<T extends RpcResponseCommon>(response: { data: T }, options: any = {}): T['result'] {
    if (response?.data?.error?.code) {
      throw new Error(`Error: ${JSON.stringify(response.data)}. Options: ${JSON.stringify(options)}`);
    }

    return response.data.result;
  }

  /**
   * Accounts section
   * https://docs.etherscan.io/etherscan-v2/api-endpoints/accounts
   */

  /**
   * Get Ether Balance for a Single Address
   * @param options EtherBalanceForSingleAddressOptions
   * @returns Returns the Ether balance of a given address
   */
  public async getAccountBalance(options: EtherBalanceForSingleAddressOptions) {
    const response = await this.transport.get<EtherBalanceForSingleAddressResponse>({
      ...options,
      module: Module.Account,
      action: Action.Balance
    });
    return this._checkResponseStatus<EtherBalanceForSingleAddressResponse>(response, options);
  }

  /**
   * Get a list of 'Normal' Transactions By Address
   * https://docs.etherscan.io/etherscan-v2/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
   * @param options
   * @returns
   */
  public async getNormalTxListByAddress(options: NormalTxListByAddressOptions) {
    const response = await this.transport.get<NormalTxListByAddressResponse>({
      ...options,
      module: Module.Account,
      action: Action.TxList
    });

    return this._checkResponseStatus<NormalTxListByAddressResponse>(response, options);
  }

  /**
   * Get a list of 'ERC20 - Token Transfer Events' by Address
   * @param options Erc20TokenTransferEventsListOptions
   * @returns Returns the list of ERC-20 tokens transferred by an address, with optional filtering by token contract
   */
  public async getErc20TokenTransferEventsList(options: Erc20TokenTransferEventsListOptions) {
    const response = await this.transport.get<Erc20TokenTransferEventsListResponse>({
      ...options,
      module: Module.Account,
      action: Action.TokenTxList
    });

    return this._checkResponseStatus(response, options);
  }

  /**
   * Blocks
   * https://docs.etherscan.io/api-endpoints/blocks
   */

  /**
   * Get Block Number by Timestamp
   * @param options BlockNumberByTimestampOptions
   * @returns Returns the block number that was mined at a certain timestamp
   */
  public async getBlockNumberByTimestamp(options: BlockNumberByTimestampOptions) {
    const { closest = Closest.After, timestamp } = options;

    const response = await this.transport.get<BlockNumberByTimestampResponse>({
      module: Module.Block,
      action: Action.GetBlockByTime,
      closest,
      timestamp
    });

    return this._checkResponseStatus(response, options);
  }

  /**
   * Geth/Parity Proxy
   * https://docs.etherscan.io/etherscan-v2/api-endpoints/geth-parity-proxy
   */

  /**
   * Returns the number of most recent block
   * @returns Number of most recent block
   */
  public async eth_blockNumber() {
    const response = await this.transport.get<EthBlockNumberResponse>({
      module: Module.Proxy,
      action: Action.eth_blockNumber
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns information about a block by block number
   * @param options EthBlockByNumberOptions
   * @returns Information about a block by block number
   */
  public async eth_getBlockByNumber(options: EthBlockByNumberOptions) {
    const response = await this.transport.get<EthBlockByNumberResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getBlockByNumber
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns information about a uncle by block number
   * @param options EthUncleByBlockNumberAndIndexOptions
   * @returns Information about a uncle by block number
   */
  public async eth_getUncleByBlockNumberAndIndex(options: EthUncleByBlockNumberAndIndexOptions) {
    const response = await this.transport.get<EthUncleByBlockNumberAndIndexResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getUncleByBlockNumberAndIndex
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns the number of transactions in a block
   * @param options EthBlockTransactionCountByNumberOptions
   * @returns Number of transactions in a block
   */
  public async eth_getBlockTransactionCountByNumber(options: EthBlockTransactionCountByNumberOptions) {
    const response = await this.transport.get<EthBlockTransactionCountByNumberResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getBlockTransactionCountByNumber
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns the information about a transaction requested by transaction hash
   * @param options EthTransactionByHashOptions
   * @returns Information about a transaction requested by transaction hash
   */
  public async eth_getTransactionByHash(options: EthTransactionByHashOptions) {
    const response = await this.transport.get<EthTransactionByHashResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getTransactionByHash
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns information about a transaction by block number and transaction index position
   * @param options EthTransactionByBlockNumberAndIndexOptions
   * @returns Information about a transaction by block number and transaction index position
   */
  public async eth_getTransactionByBlockNumberAndIndex(options: EthTransactionByBlockNumberAndIndexOptions) {
    const response = await this.transport.get<EthTransactionByBlockNumberAndIndexResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getTransactionByBlockNumberAndIndex
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns the number of transactions performed by an address
   * @param options EthTransactionCountOptions
   * @returns Number of transactions performed by an address
   */
  public async eth_getTransactionCount(options: EthTransactionCountOptions) {
    const response = await this.transport.get<EthTransactionCountResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getTransactionCount
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Submits a pre-signed transaction for broadcast to the Ethereum network
   * @param options EthSendRawTransactionOptions
   * @returns Tx hash
   */
  public async eth_sendRawTransaction(options: EthSendRawTransactionOptions) {
    const response = await this.transport.get<EthSendRawTransactionResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_sendRawTransaction
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns the receipt of a transaction by transaction hash
   * @param options EthTransactionReceiptOptions
   * @returns Receipt of a transaction by transaction hash
   */
  public async eth_getTransactionReceipt(options: EthTransactionReceiptOptions) {
    const response = await this.transport.get<EthGetTransactionReceiptResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getTransactionReceipt
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Executes a new message call immediately without creating a transaction on the block chain
   * @param options EthCallOptions
   * @returns Call result
   */
  public async eth_call(options: EthCallOptions) {
    const response = await this.transport.get<EthCallResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_call
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns code at a given address
   * @param options EthCodeOptions
   * @returns Code at a given address
   */
  public async eth_getCode(options: EthCodeOptions) {
    const response = await this.transport.get<EthGetCodeResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getCode
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns the value from a storage position at a given address.
   * This endpoint is still experimental and may have potential issues
   * @param options EthStorageAtOptions
   * @returns Value from a storage position at a given address
   */
  public async eth_getStorageAt(options: EthStorageAtOptions) {
    const response = await this.transport.get<EthGetStorageAtResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_getStorageAt
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Returns the current price per gas in wei
   * @returns Current price per gas in wei
   */
  public async eth_gasPrice() {
    const response = await this.transport.get<EthGasPriceResponse>({
      module: Module.Proxy,
      action: Action.eth_gasPrice
    });

    return this._checkRpcResponseStatus(response);
  }

  /**
   * Makes a call or transaction, which won't be added to the blockchain and returns the used gas
   * @param options EthEstimateGasOptions
   * @returns Used gas
   */
  public async eth_estimateGas(options: EthEstimateGasOptions) {
    const response = await this.transport.get<EthEstimateGasResponse>({
      ...options,
      module: Module.Proxy,
      action: Action.eth_estimateGas
    });

    return this._checkRpcResponseStatus(response);
  }
}
