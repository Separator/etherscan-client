import { ResponseCommon } from './response';
import { Erc20TokenTransferEvent, Transaction } from './transactions';
import { BlockOptions, PaginationOptions } from './options';

// ----------------------------------------------------------------------------------------------------

export interface NormalTxListByAddressOptions extends PaginationOptions, BlockOptions {
  /**
   * @description The string representing the addresses to get corresponding txs
   * @example '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3'
   */
  address: string;
}

export interface NormalTxListByAddressResponse extends ResponseCommon {
  /**
   * @description List of tx objects
   */
  result: Transaction[];
}

// ----------------------------------------------------------------------------------------------------

export interface Erc20TokenTransferEventsListOptions extends PaginationOptions, BlockOptions {
  /**
     * @description The string representing the address to check for balance
       @example '0x77134cbC06cB00b66F4c7e623D5fdBF6777635EC'
     */
  address?: string;
  /**
   * @description The string representing the token contract address to check for balance
   * @example '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7'
   */
  contractaddress: string;
}

export interface Erc20TokenTransferEventsListResponse extends ResponseCommon {
  /**
   * @description List of ERC-20 tokens transferred by an address
   */
  result: Erc20TokenTransferEvent[];
}
