import { Contract } from 'web3-eth-contract'

export interface Farm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  imgSrc: string[]
  id: string
  tokenSymbol: string
  priceBaseToken: string
  lpStaking: boolean
  order: boolean
  flexToken: boolean
}

export interface FarmsContext {
  farms: Farm[]
  unharvested: number
}
