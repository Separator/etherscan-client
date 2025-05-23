import { Client } from './classes/Client';

import { Chain } from './types/chain';

import * as Accounts from './types/accounts';
import * as Blocks from './types/blocks';

import * as Parameter from './types/params';
import * as Transactions from './types/transactions';
import * as GethParityProxy from './types/geth-parity-proxy';

export {
  // Chains:
  Chain,

  // Client class:
  Client,

  // Constructions:
  Accounts,
  Blocks,
  Parameter,
  Transactions,
  GethParityProxy
};
