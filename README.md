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
const blockNumber = await client.getBlockNumberByTimestamp({
  timestamp: 1744030101
});
console.log(blockNumber);
```
