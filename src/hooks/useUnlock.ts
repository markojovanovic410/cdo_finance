import { useCallback } from 'react'

import useCDO from './useCDO'
import { useWallet } from 'use-wallet'

import { unlock, getCDOContract } from '../cdo/utils'

const useUnlock = () => {
  const { account } = useWallet()
  const cdo = useCDO()
  const cdoContract = getCDOContract(cdo)

  const handleUnlock = useCallback(async () => {
    const txHash = await unlock(cdoContract, account)
    console.log(txHash)
    return txHash
  }, [account, cdo])

  return { onUnlock: handleUnlock }
}

export default useUnlock
