import { Closest } from './params';
import { ResponseCommon } from './response';

// ----------------------------------------------------------------------------------------------------

export interface BlockNumberByTimestampOptions {
  /**
   * @description The closest available block to the provided timestamp, either **before** or **after**
   */
  closest?: Closest;
  /**
   * @description The integer representing the Unix timestamp in seconds
   */
  timestamp: number;
}

export interface BlockNumberByTimestampResponse extends ResponseCommon {
  /**
   * @description Block id string
   */
  result: string;
}
