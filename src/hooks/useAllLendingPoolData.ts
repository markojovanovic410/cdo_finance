import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import Web3 from 'web3'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getLendingPools,
  getTotalLendingPoolData,
  getMasterChefContract
} from '../cdo/utils'
import useCDO from './useCDO'
import useBlock from './useBlock'

export interface StakedValue {
  totalSupply: BigNumber
  tokenBalance: BigNumber
  flexAllTokenBalance: BigNumber
  flexTokenBalance: BigNumber
  tokenPriceInBNB: BigNumber
  flexTokenRatio: BigNumber
}

const useAllLendingPoolData = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const cdo = useCDO()
  const masterChefContract = getMasterChefContract(cdo)
  const lendingPools = getLendingPools(cdo)
  const block = useBlock()

  const fetchAllLendingPoolData = useCallback(async () => {
    const web3 = new Web3(ethereum)

    const balances: Array<StakedValue> = await Promise.all(
      lendingPools.map(
        ({
          pid,
          lpContract,
          tokenContract,
          flexTokenContract,
          name,
          order
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          flexTokenContract: Contract
          name: String
          order: boolean
        }) =>
          getTotalLendingPoolData(
            pid,
            masterChefContract,
            lpContract,
            tokenContract,
            flexTokenContract,
            name,
            order,
            account,
            web3
          ),
      ),
    )

    setBalance(balances)
  }, [account, ethereum, cdo])

  useEffect(() => {
    if (account && ethereum && cdo) {
      fetchAllLendingPoolData()
    }
  }, [account, ethereum, block, setBalance, cdo])

  return balances
}

export default useAllLendingPoolData
