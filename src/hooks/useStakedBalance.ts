import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../cdo/utils'
import useCDO from './useCDO'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const cdo = useCDO()
  const masterChefContract = getMasterChefContract(cdo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, cdo])

  useEffect(() => {
    if (account && cdo) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, cdo])

  return balance
}

export default useStakedBalance
