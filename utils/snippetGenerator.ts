import { AbiItem, Framework } from '../types';

export function generateSnippet(
  framework: Framework,
  contractAddress: string,
  item: AbiItem
): string {
  const isRead = item.stateMutability === 'view' || item.stateMutability === 'pure';
  const name = item.name || 'anonymous';
  const args = item.inputs?.map(i => i.name || 'arg').join(', ') || '';
  const argValues = item.inputs?.map(() => '""').join(', ') || '';

  switch (framework) {
    case 'wagmi':
      if (item.type === 'function') {
        if (isRead) {
          return `import { useReadContract } from 'wagmi'

const { data, isLoading } = useReadContract({
  address: '${contractAddress}',
  abi: [...], // Your Contract ABI here
  functionName: '${name}',
  args: [${argValues}],
})`;
        } else {
          return `import { useWriteContract } from 'wagmi'

const { writeContract, isPending } = useWriteContract()

const handleCall = () => {
  writeContract({
    address: '${contractAddress}',
    abi: [...],
    functionName: '${name}',
    args: [${argValues}],
  })
}`;
        }
      } else if (item.type === 'event') {
        return `import { useWatchContractEvent } from 'wagmi'

useWatchContractEvent({
  address: '${contractAddress}',
  abi: [...],
  eventName: '${name}',
  onLogs(logs) {
    console.log('New logs!', logs)
  },
})`;
      }
      return '';

    case 'ethers':
      if (item.type === 'function') {
        return `import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract('${contractAddress}', ABI, ${isRead ? 'provider' : 'signer'});

// Calling ${name}
const result = await contract.${name}(${argValues});`;
      } else if (item.type === 'event') {
        return `import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract('${contractAddress}', ABI, provider);

contract.on('${name}', (from, to, value, event) => {
    console.log('Event received:', { from, to, value });
});`;
      }
      return '';

    case 'viem':
      if (item.type === 'function') {
        if (isRead) {
          return `import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ 
  chain: mainnet, 
  transport: http() 
})

const data = await client.readContract({
  address: '${contractAddress}',
  abi: [...],
  functionName: '${name}',
  args: [${argValues}]
})`;
        } else {
          return `import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

const [account] = await client.getAddresses()

const hash = await client.writeContract({
  account,
  address: '${contractAddress}',
  abi: [...],
  functionName: '${name}',
  args: [${argValues}]
})`;
        }
      } else if (item.type === 'event') {
        return `import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

client.watchContractEvent({
  address: '${contractAddress}',
  abi: [...],
  eventName: '${name}',
  onLogs: logs => console.log(logs)
})`;
      }
      return '';

    default:
      return '// Framework snippet not supported';
  }
}