import { config } from 'dotenv';

import { Client, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;
const { WALLET = '', API_KEY, TOKEN_ADDRESS = '' } = process.env;
const blockExplorer = new Client({ chainid: Chain.SepoliaTestnet, apikey: API_KEY! });

describe('Check functions from Accounts block', () => {
  test(
    "Get a list of 'normal' transactions by address",
    async () => {
      const txs = await blockExplorer.getNormalTxListByAddress({
        address: WALLET
      });
      expect(txs.length).toBeGreaterThanOrEqual(0);
    },
    TEST_TIMEOUT
  );

  test(`Get a list of 'ERC20 - token transfer events' by address`, async () => {
    const txs = await blockExplorer.getErc20TokenTransferEventsList({
      address: WALLET,
      contractaddress: TOKEN_ADDRESS
    });
    expect(txs.length).toBeGreaterThanOrEqual(0);
  });
});
