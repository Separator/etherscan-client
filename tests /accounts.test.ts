import { config } from 'dotenv';

import { Client } from '../src';
import { sleep } from './utility';

config();

const { API_KEY, CHAIN_ID = 1, TEST_TIMEOUT = 60_000, TOKEN_ADDRESS = '', WALLET = '' } = process.env;

const apikey = `${API_KEY}`;
const chainid = Number(CHAIN_ID);
const timeout = Number(TEST_TIMEOUT);

const blockExplorer = new Client({ chainid, apikey });

describe('Check functions from Accounts block', () => {
  test(
    "Get a list of 'normal' transactions by address",
    async () => {
      await sleep();
      const txs = await blockExplorer.getNormalTxListByAddress({
        address: WALLET
      });
      expect(txs.length).toBeGreaterThanOrEqual(0);
    },
    timeout
  );

  test(
    `Get a list of 'ERC20 - token transfer events' by address`,
    async () => {
      await sleep();
      const txs = await blockExplorer.getErc20TokenTransferEventsList({
        address: WALLET,
        contractaddress: TOKEN_ADDRESS
      });
      expect(txs.length).toBeGreaterThanOrEqual(0);
    },
    timeout
  );
});
