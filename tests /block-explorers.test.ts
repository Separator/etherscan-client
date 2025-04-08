import { config } from 'dotenv';

import { Client, Chain } from '../src';

config();

const TEST_TIMEOUT = 60_000;

const { API_KEY, OKLINK_API_KEY, ROUTESCAN_API_KEY } = process.env;

describe('Check connections to different data suppliers', () => {
  const timestamp = Math.floor(Date.now() / 1_000) - 1_000 * 60 * 60 * 24;

  test(
    'Etherscan API V2',
    async () => {
      const client = new Client({ chainid: Chain.SepoliaTestnet, apikey: API_KEY! });

      const blockNumber = await client.getBlockNumberByTimestamp({
        timestamp
      });

      expect(Number(blockNumber)).toBeGreaterThanOrEqual(0);
    },
    TEST_TIMEOUT
  );

  test('Etherscan API V1', async () => {
    const url = 'https://api-sepolia.etherscan.io/api';

    const client = new Client({ apikey: API_KEY!, url });

    const blockNumber = await client.getBlockNumberByTimestamp({
      timestamp
    });

    expect(Number(blockNumber)).toBeGreaterThanOrEqual(0);
  });

  test('Routescan API', async () => {
    const chain = Chain.SepoliaTestnet;
    const url = `https://api.routescan.io/v2/network/testnet/evm/${chain}/etherscan/api`;

    const client = new Client({
      apikey: ROUTESCAN_API_KEY!,
      url
    });

    const blockNumber = await client.getBlockNumberByTimestamp({
      timestamp
    });

    expect(Number(blockNumber)).toBeGreaterThanOrEqual(0);
  });

  test('OkLink API', async () => {
    const chain = 'eth';
    const url = `https://www.oklink.com/api/v5/explorer/${chain}/api`;

    const client = new Client({
      apikey: OKLINK_API_KEY!,
      url
    });

    const blockNumber = await client.getBlockNumberByTimestamp({
      timestamp
    });

    expect(Number(blockNumber)).toBeGreaterThanOrEqual(0);
  });
});
