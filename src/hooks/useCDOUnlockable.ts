import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getCDOContract } from '../cdo/utils'
import useBlock from './useBlock'
import useCDO from './useCDO'

const useCDOUnlockable = () => {
  const [unlockableCDO, setUnlockableCDO] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()
  const cdo = useCDO()
  const cdoContract = getCDOContract(cdo)

  const fetchUnlockableCDO = useCallback(async () => {
    const unlockableCDO = await cdoContract.methods.canUnlockAmount(account).call()
    setUnlockableCDO(new BigNumber(unlockableCDO))
  }, [account, ethereum, cdoContract])

  useEffect(() => {
    if (account && ethereum && cdoContract) {
      fetchUnlockableCDO()
    }
  }, [account, ethereum, setUnlockableCDO, cdoContract,  block])

  return unlockableCDO
}

export default useCDOUnlockable
