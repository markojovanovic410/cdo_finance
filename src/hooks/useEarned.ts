import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../cdo/utils'
import useCDO from './useCDO'
import useBlock from './useBlock'

const useEarned = (pid: number) => {
  const [earned, setEarned] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const cdo = useCDO()
  const masterChefContract = getMasterChefContract(cdo)
  const block = useBlock()

  const fetchEarned = useCallback(async () => {
    const earned = await getEarned(masterChefContract, pid, account)
    setEarned(new BigNumber(earned).div(10 ** 18))
  }, [account, masterChefContract, cdo])

  useEffect(() => {
    if (account && masterChefContract && cdo) {
      fetchEarned()
    }
  }, [account, block, masterChefContract, setEarned, cdo])

  return earned
}

export default useEarned
