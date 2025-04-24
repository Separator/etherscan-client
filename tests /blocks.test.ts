import { config } from 'dotenv';

import { Client } from '../src';
import { sleep } from './utility';

config();

const { API_KEY, CHAIN_ID = 1, TEST_TIMEOUT = 60_000 } = process.env;

const apikey = `${API_KEY}`;
const chainid = Number(CHAIN_ID);
const timeout = Number(TEST_TIMEOUT);

const blockExplorer = new Client({ chainid, apikey });

describe('Check functions from Accounts block', () => {
  test(
    'Get Block Number by Timestamp',
    async () => {
      await sleep();
      const blockNumber = await blockExplorer.getBlockNumberByTimestamp({
        timestamp: 1744030101
      });
      expect(Number(blockNumber)).toBeGreaterThanOrEqual(0);
    },
    timeout
  );
});
