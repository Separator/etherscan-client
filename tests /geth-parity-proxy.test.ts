import { config } from 'dotenv';

import { sleep } from './utility';
import { Client, Parameter } from '../src';

config();

const {
  API_KEY,
  BLOCK_NUMBER = '0x1',
  BLOCK_HASH = '',
  CHAIN_ID = 1,
  TEST_TIMEOUT = 60_000,
  TOKEN_ADDRESS = '',
  TX_HASH = '',
  UNCLE_BLOCK_NUMBER = '',
  UNCLE_BLOCK_HASH = '',
  WALLET = ''
} = process.env;

const apikey = `${API_KEY}`;
const chainid = Number(CHAIN_ID);
const timeout = Number(TEST_TIMEOUT);

const blockExplorer = new Client({ chainid, apikey });

describe('Check Geth/Parity/Proxy functions', () => {
  test(
    'Get number of most recent block',
    async () => {
      await sleep();
      const blockNumber = await blockExplorer.eth_blockNumber();
      expect(typeof blockNumber).toEqual('string');
    },
    timeout
  );

  test(
    'Get information about a block by block number',
    async () => {
      await sleep();
      const block = await blockExplorer.eth_getBlockByNumber({
        boolean: true,
        tag: BLOCK_NUMBER
      });
      expect(block.hash).toEqual(BLOCK_HASH);
    },
    timeout
  );

  test(
    'Get information about a uncle by block number',
    async () => {
      await sleep();
      const block = await blockExplorer.eth_getUncleByBlockNumberAndIndex({
        tag: UNCLE_BLOCK_NUMBER
      });
      expect(block.hash).toEqual(UNCLE_BLOCK_HASH);
    },
    timeout
  );

  test(
    'Get the number of transactions in a block',
    async () => {
      await sleep();
      const txCount = await blockExplorer.eth_getBlockTransactionCountByNumber({
        tag: BLOCK_NUMBER
      });
      expect(Number(txCount)).toBeGreaterThanOrEqual(1);
    },
    timeout
  );

  test(
    'Get the information about a transaction requested by transaction hash',
    async () => {
      await sleep();
      const tx = await blockExplorer.eth_getTransactionByHash({
        txhash: TX_HASH
      });
      expect(tx.hash).toEqual(TX_HASH);
    },
    timeout
  );

  test(
    'Get information about a transaction by block number and transaction index position',
    async () => {
      await sleep();
      const tx = await blockExplorer.eth_getTransactionByBlockNumberAndIndex({
        tag: BLOCK_NUMBER,
        index: '0x0'
      });
      expect(tx.hash).toEqual(TX_HASH);
    },
    timeout
  );

  test(
    'Get the number of transactions performed by an address',
    async () => {
      await sleep();
      const txCount = await blockExplorer.eth_getTransactionCount({
        address: WALLET
      });
      expect(Number(txCount)).toBeGreaterThanOrEqual(0);
    },
    timeout
  );

  test(
    'Get the receipt of a transaction by transaction hash',
    async () => {
      await sleep();
      const txReceipt = await blockExplorer.eth_getTransactionReceipt({
        txhash: TX_HASH
      });
      expect(txReceipt.transactionHash).toEqual(TX_HASH);
    },
    timeout
  );

  test(
    'Executes a new message call immediately without creating a transaction on the block chain',
    async () => {
      await sleep();
      const result = await blockExplorer.eth_call({
        to: TOKEN_ADDRESS,
        data: '0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724',
        tag: Parameter.Tag.Latest
      });
      expect(typeof result).toEqual('string');
    },
    timeout
  );

  test(
    'Returns code at a given address',
    async () => {
      await sleep();
      const codeInHex = await blockExplorer.eth_getCode({
        address: TOKEN_ADDRESS,
        tag: Parameter.Tag.Latest
      });
      expect(codeInHex.length).toBeGreaterThanOrEqual(0);
    },
    timeout
  );

  test(
    'Returns the value from a storage position at a given address',
    async () => {
      await sleep();
      const storageValue = await blockExplorer.eth_getStorageAt({
        address: WALLET,
        position: '0x0',
        tag: Parameter.Tag.Latest
      });
      expect(storageValue).toEqual('0x0000000000000000000000000000000000000000000000000000000000000000');
    },
    timeout
  );

  test(
    'Returns the current price per gas in wei',
    async () => {
      await sleep();
      const gasPrice = await blockExplorer.eth_gasPrice();
      expect(typeof gasPrice).toEqual('string');
    },
    timeout
  );

  test(
    "Makes a call or transaction, which won't be added to the blockchain and returns the used gas",
    async () => {
      await sleep();
      const gas = await blockExplorer.eth_estimateGas({
        data: '0x',
        to: WALLET,
        value: '0x0'
      });
      expect(typeof gas).toEqual('string');
    },
    timeout
  );
});
