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

export interface BlockTransaction extends TxCore {
  /**
   * @description Block hash
   * @example '0x7eb7c23a5ac2f2d70aa1ba4e5c56d89de5ac993590e5f6e79c394e290d998ba8'
   */
  blockHash: string;
  /**
   * @description Block number in hex
   * @example '0x10d4f'
   */
  blockNumber: string;
  /**
   * @description Gas count in hex
   * @example '0x5208'
   */
  gas: string;
  /**
   * @description Gas price in hex
   * @example '0xba43b7400'
   */
  gasPrice: string;
  /**
   * @description Tx hash
   * @example '0xa442249820de6be754da81eafbd44a865773e4b23d7c0522d31fd03977823008'
   */
  hash: string;
  /**
   * @description Nonce in hex
   * @example '0x1'
   */
  nonce: string;
  /**
   * @description Tx index
   * @example '0x0'
   */
  transactionIndex: string;
  /**
   * @description Amount value in hex
   * @example '0xaa9f075c200000'
   */
  value: string;
  /**
   * @description Type
   * @example '0x0'
   */
  type: string;
  /**
   * @description V
   * @example '0x1b'
   */
  v: string;
  /**
   * @description R
   * @example '0x2c2789c6704ba2606e200e1ba4fd17ba4f0e0f94abe32a12733708c3d3442616'
   */
  r: string;
  /**
   * @description S
   * @example '0x2946f47e3ece580b5b5ecb0f8c52604fa5f60aeb4103fc73adcbf6d620f9872b'
   */
  s: string;
}

export interface TxRpc extends BlockTransaction {
  /**
   * @description Max fee per gas
   * @example '0x1f6ea08600'
   */
  maxFeePerGas: string;
  /**
   * @description Max priority fee per gas
   * @example '0x3b9aca00'
   */
  maxPriorityFeePerGas: string;
  /**
   * @description Access list
   */
  accessList: any[];
  /**
   * @description Chain id
   * @example '0x1'
   */
  chainId: string;
  /**
   * @description Y parity
   * @example '0x0'
   */
  yParity: string;
}

interface TxReceiptLog {
  /**
   * @description Address
   * @example '0xdac17f958d2ee523a2206206994597c13d831ec7'
   */
  address: string;
  /**
   * @description Topics list
   * @example ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
   */
  topics: string[];
  /**
   * @description Log data
   * @example '0x00000000000000000000000000000000000000000000000000000000013f81a6'
   */
  data: string;
  /**
   * @description Block number
   * @example '0xcf2427'
   */
  blockNumber: string;
  /**
   * @description Transaction hash
   * @example '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb'
   */
  transactionHash: string;
  /**
   * @description Transaction index
   * @example '0x122'
   */
  transactionIndex: string;
  /**
   * @description Block hash
   * @example '0x07c17710dbb7514e92341c9f83b4aab700c5dba7c4fb98caadd7926a32e47799'
   */
  blockHash: string;
  /**
   * @description Log index
   * @example '0xdb'
   */
  logIndex: string;
  /**
   * @description Removed status
   * @example false
   */
  removed: boolean;
}

export interface TxReceipt {
  /**
   * @description From address
   * @example '0x292f04a44506c2fd49bac032e1ca148c35a478c8'
   */
  from: string;
  /**
   * @description To address
   * @example '0xdac17f958d2ee523a2206206994597c13d831ec7'
   */
  to: string;
  /**
   * @description Block hash
   * @example '0x07c17710dbb7514e92341c9f83b4aab700c5dba7c4fb98caadd7926a32e47799'
   */
  blockHash: string;
  /**
   * @description Block number
   * @example '0xcf2427'
   */
  blockNumber: string;
  /**
   * @description Contract address
   * @example null
   */
  contractAddress: string | null;
  /**
   * @description Cumulative gas used in hex
   * @example '0xeb67d5'
   */
  cumulativeGasUsed: string;
  /**
   * @description Effective gas price in hex
   * @example '0x1a96b24c26'
   */
  effectiveGasPrice: string;
  /**
   * @description Gas used in hex
   * @example '0xb41d'
   */
  gasUsed: string;
  /**
   * @description Receipt logs
   */
  logs: TxReceiptLog[];
  /**
   * @description Logs bloom
   * @example '0x00000000000000000000000000000000000000000000000000000000000004000000000004000000000000000000010000000000000000000000000000000000000000000000000000000008000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000010000000001100000000000000000000000000000000000000000000000000000200100000000000000000000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
   */
  logsBloom: string;
  /**
   * @description Status
   * @example '0x1'
   */
  status: string;
  /**
   * @description Transaction hash
   * @example '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb'
   */
  transactionHash: string;
  /**
   * @description Transaction index
   * @example '0x122'
   */
  transactionIndex: string;
  /**
   * @description Tx type
   * @example '0x2'
   */
  type: string;
}
