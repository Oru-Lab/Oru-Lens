
import React from 'react';

export const NETWORKS = [
  'Ethereum Mainnet',
  'Sepolia Testnet',
  'Polygon Mainnet',
  'Arbitrum One',
  'Optimism',
  'Base',
  'Avalanche C-Chain'
];

export const FRAMEWORKS: { id: string; name: string; logo?: string }[] = [
  { id: 'wagmi', name: 'wagmi' },
  { id: 'ethers', name: 'ethers.js' },
  { id: 'viem', name: 'Viem' }
];

export const DEMO_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  }
];

export const DEMO_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT Mainnet
