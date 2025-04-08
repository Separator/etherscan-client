import { Status } from './params';

export interface ResponseCommon {
  /**
   * @description Status string (0 - fail, 1 - success)
   */
  status: Status;
  /**
   * @description Status message (**OK** if success)
   */
  message: string;
  /**
   * @description Response result
   */
  result: any;
  /**
   * @description Error object
   */
  error?: {
    message: string;
  };
}
