import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPValue,
} from '../cdo/utils'
import useCDO from './useCDO'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  totalWethValue: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const cdo = useCDO()
  const farms = getFarms(cdo)
  const masterChefContract = getMasterChefContract(cdo)
  const wethContact = getWethContract(cdo)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
          priceBaseToken,
          lpStaking,
          name,
          order,
          flexToken
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          priceBaseToken: String
          lpStaking: boolean
          name: String
          order: boolean
          flexToken: boolean
        }) =>
          getTotalLPValue(
            masterChefContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
            priceBaseToken,
            lpStaking,
            name,
            order,
            flexToken
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, cdo])

  useEffect(() => {
    if (account && masterChefContract && cdo) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, cdo])

  return balances
}

export default useAllStakedValue
