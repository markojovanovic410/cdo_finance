import { Contract } from 'web3-eth-contract'

export interface LendingPool {
  pid: number
  name: string
  symbol: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  tokenContract: Contract
  flexTokenAddress: string
  flexTokenContract: Contract
  imgSrc: string
  order: boolean
}

export interface LendingPoolsContext {
  lendingPools: LendingPool[]
  unharvested: number
}
