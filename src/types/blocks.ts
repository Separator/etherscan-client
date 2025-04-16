import { Closest } from './params';
import { ResponseCommon } from './response';
import { BlockTransaction } from './transactions';

export interface BlockWithdrawal {
  /**
   * @description Withdrawal index
   * @example '0x3e8bd6b'
   */
  index: string;
  /**
   * @description Validation index
   * @example '0xc208b'
   */
  validatorIndex: string;
  /**
   * @description Withdrawal address
   * @example '0xacb8f83bdf5c6e6ba39b2eed03b856820c5ff775'
   */
  address: string;
  /**
   * @description Amount in hex
   * @example '0x1282722'
   */
  amount: string;
}

interface BlockCommon {
  /**
   * @description Base fee per gas in hex
   * @example '0x1bf871922'
   */
  baseFeePerGas: string;
  /**
   * @description Difficulty in hex
   * @example '0x0'
   */
  difficulty: string;
  /**
   * @description Extra data
   * @example '0x546974616e2028746974616e6275696c6465722e78797a29'
   */
  extraData: string;
  /**
   * @description Gas limit in hex
   * @example '0x1c9c380'
   */
  gasLimit: string;
  /**
   * @description Gas used in hex
   * @example '0xbed51e'
   */
  gasUsed: string;
  /**
   * @description Tx hash
   * @example '0xed01764ce15493d3ffb3bed8728aa2ab3eeaba1ac4809853ff26604a7c4c6bc8'
   */
  hash: string;
  /**
   * @description Logs bloom
   * @example '0x96217cfee9850656fc89506684b151d5404b43208cf290ac3b49010247b80b09d0986266d749d0c4d0b90c15f8fec71c4b6bec6ddb7732d75545ca2573ac8f52a11c94ae7272c8886c00e38fbaa123e14545933541674f1a072a1c5f8f2f30848b4b6150077c4367a01ed9d1f990ee190621e84832192ee1bec7519c1d4d8ee5766bdf49c5f1f15b2459d360a0e2844174045db3f13ab36d2d292546b6727c2887ed026f14116d1b115fe9fc35837dd0645795b7306630e8c9e10a0a411d58e105f06716843a70d4854be88213ca09b746f6345f95a6099c652752cee894f0f28479b831c3a10078074d1ecbe4880b460a7d502b74ffb6ca28c03cb06551e70b'
   */
  logsBloom: string;
  /**
   * @description Miner address
   * @example '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97'
   */
  miner: string;
  /**
   * @description Mix hash
   * @example '0x67260293c49e5358141cc149273dea3df7ce83541a8d449abfbc7fd0f67418b5'
   */
  mixHash: string;
  /**
   * @description Nonce in hex
   * @example '0x0000000000000000'
   */
  nonce: string;
  /**
   * @description Block number in hex
   * @example '0x1427aa8'
   */
  number: string;
  /**
   * @description Parent hash
   * @example '0x62c917e120a3927690b18d7ca6e8476b964973e5cdc249b65397badf985e034d'
   */
  parentHash: string;
  /**
   * @description Receipts root
   * @example '0x47c47c1fe77de06ee773ef654b05cf5ca6d89b1c6158c71c521a5d4936be7111'
   */
  receiptsRoot: string;
  /**
   * @description Sha3 uncles
   * @example '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'
   */
  sha3Uncles: string;
  /**
   * @description Size in hex
   * @example '0x10370'
   */
  size: string;
  /**
   * @description State root
   * @example '0x39240235baacb1edbee97d72208af1d92fca083325920f8f1627422b5b3bcb25'
   */
  stateRoot: string;
  /**
   * @description Block timestamp in hex
   * @example '0x672c5e5b'
   */
  timestamp: string;
  /**
   * @description Txs root
   * @example '0xaa3fbdf01f0acc26257824177ac0d0e909040608b600991781c95506d1657f81'
   */
  transactionsRoot: string;
  /**
   * @description Uncles list
   */
  uncles: any[];
}

export interface BlockItem extends BlockCommon {
  /**
   * @description Blob gas used in hex
   * @example '0x60000'
   */
  blobGasUsed: string;
  /**
   * @description Excess blob gas in hex
   * @example '0x2ea0000'
   */
  excessBlobGas: string;
  /**
   * @description Parent beacon block root
   * @example '0x1b25dae6ad3c6fe004eeac0d3385b2ac2dc68d765545c1e06f0cbf75896bad86'
   */
  parentBeaconBlockRoot: string;
  /**
   * @description Total difficulty in hex
   * @example '0xc70d815d562d3cfa955'
   */
  totalDifficulty: string;
  /**
   * @description Txs list
   */
  transactions: (string | BlockTransaction)[];
  /**
   * @description Block withdrawals list
   */
  withdrawals: BlockWithdrawal[];
  /**
   * @description Withdrawals root
   * @example '0xf1751aa5d2f0b24fd84ee1b8d5e550f0f7a4f7089160d8699e12e30b2b1218c0'
   */
  withdrawalsRoot: string;
}

export interface BlockUncleItem extends BlockCommon {}

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
