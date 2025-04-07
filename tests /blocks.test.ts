import { config } from 'dotenv';

import { Client, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;

const { API_KEY } = process.env;

const blockExplorer = new Client({ chainid: Chain.SepoliaTestnet, apikey: API_KEY! });

describe('Check functions from Accounts block', () => {
  test(
    'Get Block Number by Timestamp',
    async () => {
      const blockNumber = await blockExplorer.getBlockNumberByTimestamp({
        timestamp: 1744030101
      });
      expect(blockNumber).toBe('8070208');
    },
    TEST_TIMEOUT
  );
});
