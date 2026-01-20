
export interface AbiInput {
  name: string;
  type: string;
  internalType?: string;
  indexed?: boolean;
}

export interface AbiOutput {
  name: string;
  type: string;
  internalType?: string;
}

export interface AbiItem {
  type: 'function' | 'event' | 'error' | 'constructor' | 'receive' | 'fallback';
  name?: string;
  inputs?: AbiInput[];
  outputs?: AbiOutput[];
  stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
  anonymous?: boolean;
}

export interface ContractData {
  id: string;
  name: string;
  address: string;
  network: string;
  abi: AbiItem[];
}

export type Framework = 'wagmi' | 'ethers' | 'viem';
