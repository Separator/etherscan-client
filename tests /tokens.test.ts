import { config } from 'dotenv';

import { Client } from '../src';
import { sleep } from './utility';

config();

const { API_KEY, CHAIN_ID = 1, TEST_TIMEOUT = 60_000, TOKEN_ADDRESS = '', WALLET = '' } = process.env;

const apikey = `${API_KEY}`;
const chainid = Number(CHAIN_ID);
const timeout = Number(TEST_TIMEOUT);

const blockExplorer = new Client({ chainid, apikey });

describe('Tokens', () => {
  test('Get ERC20-Token Account Balance for TokenContractAddress', async () => {
    await sleep();
    const balance = await blockExplorer.getAccountTokenBalance({
      address: WALLET,
      contractaddress: TOKEN_ADDRESS
    });
    expect(balance).toBeDefined();
  });
});
