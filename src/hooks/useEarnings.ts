import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getPendingCDO, getMasterChefContract } from '../cdo/utils'
import useCDO from './useCDO'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const cdo = useCDO()
  const masterChefContract = getMasterChefContract(cdo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getPendingCDO(masterChefContract, pid, account)
    setBalance(new BigNumber(balance).div(10 ** 18))
  }, [account, masterChefContract, cdo])

  useEffect(() => {
    if (account && masterChefContract && cdo) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, cdo])

  return balance
}

export default useEarnings
