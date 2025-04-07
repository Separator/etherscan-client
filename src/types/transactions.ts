interface TxCore {
  /**
   * @description Tx initiator address
   * @example '0x4458f86353b4740fe9e09071c23a7437640063c9'
   */
  from: string;
  /**
   * @description To address
   * @example '0xbf3403210f9802205f426759947a80a9fda71b1e'
   */
  to: string;
  /**
   * @description Input data
   * @example '0x'
   */
  input: string;
}

export interface TxBase extends TxCore {
  /**
   * @description Block number string
   * @example '47884'
   */
  blockNumber: string;
  /**
   * @description Block generation timestamp in seconds
   * @example '1438947953'
   */
  timeStamp: string;
  /**
   * @description Value in wei
   * @example '5000000000000000000'
   */
  value: string;
  /**
   * @description Contract address
   * @example ''
   */
  contractAddress: string;
  /**
   * @description Gas restriction
   * @example '23000'
   */
  gas: string;
  /**
   * @description Used gas amount
   * @example '21612'
   */
  gasUsed: string;
  /**
   * @description Error code ("0" if all ok)
   * @example '0'
   */
  isError?: string;
}

export interface TxCommon extends TxBase {
  /**
   * @description Transaction hash
   * @example '0xad1c27dd8d0329dbc400021d7477b34ac41e84365bd54b45a4019a15deb10c0d'
   */
  hash: string;
}

export interface Transaction extends TxCommon {
  /**
   * @description From address nonce
   * @example '0'
   */
  nonce: string;
  /**
   * @description Block hash string
   * @example '0xf2988b9870e092f2898662ccdbc06e0e320a08139e9c6be98d0ce372f8611f22'
   */
  blockHash: string;
  /**
   * @description Transaction index
   * @example '0'
   */
  transactionIndex: string;
  /**
   * @description Gas price in wei
   * @example '400000000000'
   */
  gasPrice: string;
  /**
   * @description Tx receipt status
   * @example '1'
   */
  txreceipt_status: string;
  /**
   * @description Cumulative gas used
   * @example '21612'
   */
  cumulativeGasUsed: string;
  /**
   * @description Block confirmations count
   * @example '19292464'
   */
  confirmations: string;
  /**
   * @description Method id
   * @example '0x454e3435'
   */
  methodId: string;
  /**
   * @description Function name
   * @example ''
   */
  functionName: string;
}

export interface Erc20TokenTransferEvent extends TxCommon {
  /**
   * @description From address nonce
   * @example '0'
   */
  nonce: string;
  /**
   * @description Block hash string
   * @example '0xf2988b9870e092f2898662ccdbc06e0e320a08139e9c6be98d0ce372f8611f22'
   */
  blockHash: string;
  /**
   * @description Transaction index
   * @example '0'
   */
  transactionIndex: string;
  /**
   * @description Cumulative gas used
   * @example '21612'
   */
  cumulativeGasUsed: string;
  /**
   * @description Gas price in wei
   * @example '400000000000'
   */
  gasPrice: string;
  /**
   * @description Block confirmations count
   * @example '19292464'
   */
  confirmations: string;
  /**
   * @description Token name
   * @example 'TetherToken'
   */
  tokenName: string;
  /**
   * @description Token symbol
   * @example 'USDt'
   */
  tokenSymbol: string;
  /**
   * @description Token decimal count
   * @example '6'
   */
  tokenDecimal: string;
}
