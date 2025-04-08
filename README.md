# <img src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5" alt="drawing" width="150" height="30"/> Etherscan client

Client for receiving blockchain data through block explorers (**etherscan**, **routescan**, etc.).

At the moment, the number of available methods is limited to those indicated in the examples below:

## [Accounts section](https://docs.etherscan.io/etherscan-v2/api-endpoints/accounts)

```javascript
import { Client, Chain } from 'etherscan-client';

const API_KEY = 'your_api_key';
const WALLET = 'your_wallet_address';
const TOKEN_ADDRESS = 'token_address';

const client = new Client({ chainid: Chain.SepoliaTestnet, apikey: API_KEY });

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
