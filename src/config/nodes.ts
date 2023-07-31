import { ChainId } from './chains'

export const getNodeRealUrlV2 = (chainId: number, key?: string) => {
  let host = null

  switch (chainId) {
    case 1:
      if (key) {
        host = `eth-mainnet.nodereal.io/v1/${key}`
      }
      break
    case 5:
      if (key) {
        host = `eth-goerli.nodereal.io/v1/${key}`
      }
      break
    case 56:
      if (key) {
        host = `bsc-mainnet.nodereal.io/v1/${key}`
      }
      break
    default:
      host = null
  }

  if (!host) {
    return null
  }

  const url = `https://${host}`
  return url
}

export const SERVER_NODES = {
  [ChainId.BSC]: [
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed1.binance.org',
  ].filter(Boolean),
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  [ChainId.ETHEREUM]: [
    'https://eth.llamarpc.com',
    'https://cloudflare-eth.com',
  ].filter(Boolean),
} satisfies Record<ChainId, string[]>

export const PUBLIC_NODES: Record<number, string[]> = {
  [ChainId.BSC]: [
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed1.binance.org',
  ].filter(Boolean),
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  [ChainId.ETHEREUM]: [
    'https://eth.llamarpc.com',
    'https://cloudflare-eth.com',
  ].filter(Boolean),
} satisfies Record<ChainId, string[]>
