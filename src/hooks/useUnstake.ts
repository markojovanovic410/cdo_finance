import { useCallback } from 'react'

import useCDO from './useCDO'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../cdo/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const cdo = useCDO()
  const masterChefContract = getMasterChefContract(cdo)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, cdo],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
