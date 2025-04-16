import { config } from 'dotenv';

import { Client, Chain, Parameter } from '../src';

config();

const TEST_TIMEOUT = 60000;

const { API_KEY } = process.env;

const blockExplorer = new Client({ chainid: Chain.EthereumMainnet, apikey: API_KEY! });

describe('Check Geth/Parity/Proxy functions', () => {
  test(
    'Get number of most recent block',
    async () => {
      const blockNumber = await blockExplorer.eth_blockNumber();
      expect(typeof blockNumber).toEqual('string');
    },
    TEST_TIMEOUT
  );

  test(
    'Get information about a block by block number',
    async () => {
      const block = await blockExplorer.eth_getBlockByNumber({
        boolean: true,
        tag: '0x10d4f'
      });
      expect(block.hash).toEqual('0x7eb7c23a5ac2f2d70aa1ba4e5c56d89de5ac993590e5f6e79c394e290d998ba8');
    },
    TEST_TIMEOUT
  );

  test(
    'Get information about a uncle by block number',
    async () => {
      const block = await blockExplorer.eth_getUncleByBlockNumberAndIndex({
        tag: '0xC63276',
        index: '0x0'
      });
      expect(block.hash).toEqual('0x1da88e3581315d009f1cb600bf06f509cd27a68cb3d6437bda8698d04089f14a');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the number of transactions in a block',
    async () => {
      const txCount = await blockExplorer.eth_getBlockTransactionCountByNumber({
        tag: '0x10FB78'
      });
      expect(txCount.toString()).toEqual('0x3');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the information about a transaction requested by transaction hash',
    async () => {
      const tx = await blockExplorer.eth_getTransactionByHash({
        txhash: '0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44'
      });
      expect(tx.hash).toEqual('0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44');
    },
    TEST_TIMEOUT
  );

  test(
    'Get information about a transaction by block number and transaction index position',
    async () => {
      const tx = await blockExplorer.eth_getTransactionByBlockNumberAndIndex({
        tag: '0xC6331D',
        index: '0x11A'
      });
      expect(tx.hash).toEqual('0xc7ef51f0bfe85eefbb1d4d88f5a39e82fbfc94987d8cbcb515f74d80b6e44902');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the number of transactions performed by an address',
    async () => {
      const txCount = await blockExplorer.eth_getTransactionCount({
        address: '0x4bd5900Cb274ef15b153066D736bf3e83A9ba44e'
      });
      expect(txCount.toString()).toEqual('0x73');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the receipt of a transaction by transaction hash',
    async () => {
      const txReceipt = await blockExplorer.eth_getTransactionReceipt({
        txhash: '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb'
      });
      expect(txReceipt.blockHash).toEqual('0x07c17710dbb7514e92341c9f83b4aab700c5dba7c4fb98caadd7926a32e47799');
    },
    TEST_TIMEOUT
  );

  test(
    'Executes a new message call immediately without creating a transaction on the block chain',
    async () => {
      const result = await blockExplorer.eth_call({
        to: '0xAEEF46DB4855E25702F8237E8f403FddcaF931C0',
        data: '0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724',
        tag: Parameter.Tag.Latest
      });
      expect(typeof result).toEqual('string');
    },
    TEST_TIMEOUT
  );

  test(
    'Returns code at a given address',
    async () => {
      const codeInHex = await blockExplorer.eth_getCode({
        address: '0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c',
        tag: Parameter.Tag.Latest
      });
      expect(codeInHex).toEqual(
        '0x3660008037602060003660003473273930d21e01ee25e4c219b63259d214872220a261235a5a03f21560015760206000f3'
      );
    },
    TEST_TIMEOUT
  );

  test(
    'Returns the value from a storage position at a given address',
    async () => {
      const storageValue = await blockExplorer.eth_getStorageAt({
        address: '0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd',
        position: '0x0',
        tag: Parameter.Tag.Latest
      });
      expect(storageValue).toEqual('0x0000000000000000000000000000000000000000000000000000000000000000');
    },
    TEST_TIMEOUT
  );

  test(
    'Returns the current price per gas in wei',
    async () => {
      const gasPrice = await blockExplorer.eth_gasPrice();
      expect(typeof gasPrice).toEqual('string');
    },
    TEST_TIMEOUT
  );

  test(
    "Makes a call or transaction, which won't be added to the blockchain and returns the used gas",
    async () => {
      const gas = await blockExplorer.eth_estimateGas({
        data: '0x4e71d92d',
        to: '0xf0160428a8552ac9bb7e050d90eeade4ddd52843',
        value: '0xff22',
        gasPrice: '0x51da038cc',
        gas: '0x5f5e0ff'
      });
      expect(typeof gas).toEqual('string');
    },
    TEST_TIMEOUT
  );
});
