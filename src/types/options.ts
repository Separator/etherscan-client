import { Sort } from './params';

export interface BlockOptions {
  /**
   * @description The integer block number to start searching for records
   * @example 0
   */
  startblock?: number;
  /**
   * @description The integer block number to stop searching for records
   * @example 270257
   */
  endblock?: number;
  /**
   * @description The sorting preference, use **asc** to sort by ascending and **desc** to sort by descending
   */
  sort?: Sort;
}

export interface PaginationOptions {
  /**
   * @description The integer page number, if pagination is enabled
   */
  page?: number;
  /**
   * @description The number of records displayed per page
   */
  offset?: number;
}
