import { Tag } from './params';
import { TxReceipt, TxRpc } from './transactions';
import { BlockItem, BlockUncleItem } from './blocks';

export interface RpcResponseCommon {
  /**
   * @description RPC version
   * @example '2.0'
   */
  jsonrpc: string;
  /**
   * @description ???
   * @example 83
   */
  id: number;

  error?: {
    /**
     * @description Error code
     * @example -32000
     */
    code: number;
    /**
     * @description Error message
     * @example 'rlp: value size exceeds available input length'
     */
    message: string;
  };
  /**
   * @description Response result
   */
  result: any;
}

// ----------------------------------------------------------------------------------------------------

export interface EthBlockNumberResponse extends RpcResponseCommon {
  /**
   * @description Recent block number in hex
   * @example '0x1427a5f'
   */
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthBlockByNumberOptions {
  /**
   * The block number, in hex
   * @example '0x10d4f'
   */
  tag?: string;
  /**
     * @description The boolean value to show full transaction objects.  
        when **true**, returns full transaction objects and their information,  
        when **false** only returns a list of transactions.
     */
  boolean: boolean;
}

export interface EthBlockByNumberResponse extends RpcResponseCommon {
  result: BlockItem;
}

// ----------------------------------------------------------------------------------------------------

export interface EthUncleByBlockNumberAndIndexOptions {
  /**
   * The block number, in hex
   * @example '0x10d4f'
   */
  tag?: string;
  /**
   * @description Position of the uncle's index in the block, in hex
   * @example '0x5'
   */
  index?: string;
}

export interface EthUncleByBlockNumberAndIndexResponse extends RpcResponseCommon {
  result: BlockUncleItem;
}

// ----------------------------------------------------------------------------------------------------

export interface EthBlockTransactionCountByNumberOptions {
  /**
   * The block number, in hex
   * @example '0x10d4f'
   */
  tag?: string;
}

export interface EthBlockTransactionCountByNumberResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthTransactionByHashOptions {
  txhash: string;
}

export interface EthTransactionByHashResponse extends RpcResponseCommon {
  result: TxRpc;
}

// ----------------------------------------------------------------------------------------------------

export interface EthTransactionByBlockNumberAndIndexOptions {
  /**
   * @description The block number, in hex
   * @example '0x10FB78'
   */
  tag: string;
  /**
   * @description The position of the uncle's index in the block, in hex
   * @example '0x0'
   */
  index?: string;
}

export interface EthTransactionByBlockNumberAndIndexResponse extends RpcResponseCommon {
  result: TxRpc;
}

// ----------------------------------------------------------------------------------------------------

export interface EthTransactionCountOptions {
  /**
   * @description The string representing the address to get transaction count
   * @example '0x4bd5900Cb274ef15b153066D736bf3e83A9ba44e'
   */
  address: string;
  /**
   * @description The string pre-defined block parameter, either **earliest**, **pending** or **latest**
   * @example 'latest'
   */
  tag?: Tag;
}

export interface EthTransactionCountResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthSendRawTransactionOptions {
  /**
   * @description The string representing the signed raw transaction data to broadcast
   * @example '0xf904808000831cfde080'
   */
  hex: string;
}

export interface EthSendRawTransactionResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthTransactionReceiptOptions {
  /**
   * @description The string representing the hash of the transaction
   * @example '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb'
   */
  txhash: string;
}

export interface EthGetTransactionReceiptResponse extends RpcResponseCommon {
  result: TxReceipt;
}

// ----------------------------------------------------------------------------------------------------

export interface EthCallOptions {
  /**
   * @description The string representing the address to interact with
   * @example '0xAEEF46DB4855E25702F8237E8f403FddcaF931C0'
   */
  to: string;
  /**
   * @description The hash of the method signature and encoded parameters
   * @example '0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724'
   */
  data?: string;
  /**
   * @description The string pre-defined block parameter, either **earliest**, **pending** or **latest**
   */
  tag?: Tag;
}

export interface EthCallResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthCodeOptions {
  /**
   * @description The string representing the address to get code
   * @example '0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c'
   */
  address: string;
  /**
   * @description The string pre-defined block parameter, either **earliest**, **pending** or **latest**
   */
  tag?: Tag;
}

export interface EthGetCodeResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthStorageAtOptions {
  /**
   * @description The string representing the address to get code
   * @example '0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd'
   */
  address: string;
  /**
   * @description The hex code of the position in storage
   * @example '0x0'
   */
  position?: string;
  /**
   * @description The string pre-defined block parameter, either **earliest**, **pending** or **latest**
   */
  tag?: Tag;
}

export interface EthGetStorageAtResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthGasPriceResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------

export interface EthEstimateGasOptions {
  /**
   * @description The hash of the method signature and encoded parameters
   * @example '0x4e71d92d'
   */
  data: string;
  /**
   * @description The string representing the address to interact with
   * @example '0xf0160428a8552ac9bb7e050d90eeade4ddd52843'
   */
  to: string;
  /**
   * @description The value sent in this transaction, in hex
   * @example '0xff22'
   */
  value?: string;
  /**
   * @description The gas price paid for each unit of gas, in wei  
    post **EIP-1559**, the **gasPrice** has to be higher than the block's **baseFeePerGas**
   */
  gasPrice?: string;
  /**
   * @description The amount of gas provided for the transaction, in hex
   * @example '0x5f5e0ff'
   */
  gas?: string;
}

export interface EthEstimateGasResponse extends RpcResponseCommon {
  result: string;
}

// ----------------------------------------------------------------------------------------------------
