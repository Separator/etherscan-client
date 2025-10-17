import { Tag } from './params';
import { ResponseCommon } from './response';

// ----------------------------------------------------------------------------------------------------

export interface Erc20TokenAccountBalanceOptions {
  /**
   * @description The **contract address** of the ERC-20 token
   */
  contractaddress: string;
  /**
   * @description The string representing the address to check for token balance
   */
  address: string;
  /**
   * @description The string pre-defined block parameter, either **earliest**, **pending** or **latest**
   */
  tag?: Tag;
}

export interface Erc20TokenAccountBalanceResponse extends ResponseCommon {
  /**
   * @description The string representing the token balance in the smallest unit (e.g., Wei for Ether)
   * @example '100000000000000000'
   */
  result: string;
}

// ----------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------
