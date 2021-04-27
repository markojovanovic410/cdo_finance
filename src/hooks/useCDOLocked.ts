import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getCDOContract } from '../cdo/utils'
import useBlock from './useBlock'
import useCDO from './useCDO'

const useCDOLocked = () => {
  const [lockedCDO, setLockedCDO] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()
  const cdo = useCDO()
  const cdoContract = getCDOContract(cdo)

  const fetchLockedCDO = useCallback(async () => {
    const lockedCDO = await cdoContract.methods.lockOf(account).call()
    setLockedCDO(new BigNumber(lockedCDO))
  }, [account, ethereum, cdoContract])

  useEffect(() => {
    if (account && ethereum && cdoContract) {
      fetchLockedCDO()
    }
  }, [account, ethereum, setLockedCDO, cdoContract,  block])

  return lockedCDO
}

export default useCDOLocked
