import { useCallback } from 'react'

import useCDO from './useCDO'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../cdo/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const cdo = useCDO()
  const masterChefContract = getMasterChefContract(cdo)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, cdo])

  return { onReward: handleReward }
}

export default useReward
