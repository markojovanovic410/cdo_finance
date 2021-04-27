import { useCallback } from 'react'

import useCDO from './useCDO'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../cdo/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const cdo = useCDO()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(cdo),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, cdo],
  )

  return { onStake: handleStake }
}

export default useStake
