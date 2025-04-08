import { AxiosRequestConfig } from 'axios';

import { AxiosTransport, Transport } from './Transport';

import { Chain } from '../types/chain';
import { ResponseCommon } from '../types/response';
import { Action, Closest, Module, Status } from '../types/params';
import {
  Erc20TokenTransferEventsListOptions,
  Erc20TokenTransferEventsListResponse,
  NormalTxListByAddressOptions,
  NormalTxListByAddressResponse
} from '../types/accounts';
import { BlockNumberByTimestampOptions, BlockNumberByTimestampResponse } from '../types/blocks';

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

  private _checkResponseStatus<T extends ResponseCommon>(response: { data: T }, options: any = {}): T['result'] {
    // Check error message for transactions not found:
    if (response?.data?.message === TX_NO_FOUND_MESSAGE) {
      return [];
    }

    if ((response?.data?.status && response.data.status !== Status.Success) || response.data?.error?.message) {
      throw new Error(`Error: ${JSON.stringify(response.data)}. Options: ${JSON.stringify(options)}`);
    }

    return response.data.result;
  }

  /**
   * Accounts section
   * https://docs.etherscan.io/etherscan-v2/api-endpoints/accounts
   */

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

  public async getErc20TokenTransferEventsList(options: Erc20TokenTransferEventsListOptions) {
    const response = await this.transport.get<Erc20TokenTransferEventsListResponse>({
      ...options,
      module: Module.Account,
      action: Action.TokenTxList
    });

    return this._checkResponseStatus(response, options);
  }

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
}
