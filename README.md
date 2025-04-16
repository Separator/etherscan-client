# <img src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5" alt="drawing" width="150" height="30"/> Etherscan client

Client for receiving blockchain data through block explorers (**etherscan**, **routescan**, **OKLINK** etc.).

## Client instantiation examples:

```javascript
import { Client, Chain } from 'etherscan-client';

const OKLINK_API_KEY = 'oklink_api_key';
const ETHERSCAN_API_KEY = 'etherscan_api_key';
const ROUTESCAN_API_KEY = 'routescan_api_key';

const ethV2Client = new Client({
  chainid: Chain.EthereumMainnet,
  apikey: ETHERSCAN_API_KEY
});

const ethClient = new Client({
  apikey: ETHERSCAN_API_KEY,
  url: 'https://api-sepolia.etherscan.io/api'
});

const routescanClient = new Client({
  apikey: ROUTESCAN_API_KEY,
  url: `https://api.routescan.io/v2/network/mainnet/evm/${Chain.EthereumMainnet}/etherscan/api`
});

const okLinkClient = new Client({
  apikey: OKLINK_API_KEY,
  url: `https://www.oklink.com/api/v5/explorer/eth/api`
});
```

At the moment, the number of available methods is limited to those indicated in the examples below:

## [Accounts section](https://docs.etherscan.io/etherscan-v2/api-endpoints/accounts)

```javascript
import { Client, Chain } from 'etherscan-client';

const API_KEY = 'your_api_key';
const WALLET = 'your_wallet_address';
const TOKEN_ADDRESS = 'token_address';

const client = new Client({ chainid: Chain.EthereumMainnet, apikey: API_KEY });

// Get a list of 'Normal' Transactions By Address:
const normalTxsList = await blockExplorer.getNormalTxListByAddress({
  address: WALLET
});
console.log(normalTxsList);

const erc20TokenEvtList = await client.getErc20TokenTransferEventsList({
  address: WALLET,
  contractaddress: TOKEN_ADDRESS
});
console.log(erc20TokenEvtList);
```

## [Blocks section](https://docs.etherscan.io/etherscan-v2/api-endpoints/blocks)

```javascript
import { Client, Chain } from 'etherscan-client';

const API_KEY = 'your_api_key';

const client = new Client({ chainid: Chain.EthereumMainnet, apikey: API_KEY });

const blockNumber = await client.getBlockNumberByTimestamp({
  timestamp: 1744030101
});
console.log(blockNumber);
```

## [Geth/Parity Proxy section](https://docs.etherscan.io/etherscan-v2/api-endpoints/geth-parity-proxy)

```javascript
import { Client, Chain, Parameter } from 'etherscan-client';

const API_KEY = 'your_api_key';

const client = new Client({ chainid: Chain.EthereumMainnet, apikey: API_KEY });

// Get number of most recent block:
const blockNumber = await blockExplorer.eth_blockNumber();
console.log(blockNumber);

// Get information about a block by block number:
const block = await blockExplorer.eth_getBlockByNumber({
  boolean: true,
  tag: '0x10d4f'
});
console.log(block);

// Get information about a uncle by block number:
const uncleBlock = await blockExplorer.eth_getUncleByBlockNumberAndIndex({
  tag: '0xC63276',
  index: '0x0'
});
console.log(uncleBlock);

// Get the number of transactions in a block:
const blockTxCount = await blockExplorer.eth_getBlockTransactionCountByNumber({
  tag: '0x10FB78'
});
console.log(blockTxCount);

// Get the information about a transaction requested by transaction hash:
const tx = await blockExplorer.eth_getTransactionByHash({
  txhash: '0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44'
});
console.log(tx);

// Get information about a transaction by block number and transaction index position:
const txSecond = await blockExplorer.eth_getTransactionByBlockNumberAndIndex({
  tag: '0xC6331D',
  index: '0x11A'
});
console.log(txSecond);

// Get the number of transactions performed by an address:
const txCount = await blockExplorer.eth_getTransactionCount({
  address: '0x4bd5900Cb274ef15b153066D736bf3e83A9ba44e'
});
console.log(txCount);

// Submits a pre-signed transaction for broadcast to the Ethereum network:
const txHash = await blockExplorer.eth_sendRawTransaction({
  hex: '0xf904808000831cfde080'
});
console.log(txHash);

// Get the receipt of a transaction by transaction hash:
const txReceipt = await blockExplorer.eth_getTransactionReceipt({
  txhash: '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb'
});
console.log(txReceipt);

// Executes a new message call immediately without creating a transaction on the block chain:
const callResult = await blockExplorer.eth_call({
  to: '0xAEEF46DB4855E25702F8237E8f403FddcaF931C0',
  data: '0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724',
  tag: Parameter.Tag.Latest
});
console.log(callResult);

// Returns code at a given address:
const codeInHex = await blockExplorer.eth_getCode({
  address: '0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c',
  tag: Parameter.Tag.Latest
});
console.log(codeIndex);

// Returns the value from a storage position at a given address:
const storageValue = await blockExplorer.eth_getStorageAt({
  address: '0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd',
  position: '0x0',
  tag: Parameter.Tag.Latest
});
console.log(storageValue);

// Returns the current price per gas in wei:
const gasPrice = await blockExplorer.eth_gasPrice();
console.log(gasPrice);

// Makes a call or transaction, which won't be added to the blockchain and returns the used gas:
const gas = await blockExplorerEth.eth_estimateGas({
  data: '0x4e71d92d',
  to: '0xf0160428a8552ac9bb7e050d90eeade4ddd52843',
  value: '0xff22',
  gasPrice: '0x51da038cc',
  gas: '0x5f5e0ff'
});
console.log(gas);
```
