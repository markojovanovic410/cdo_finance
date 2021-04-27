import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { Contract } from 'web3-eth-contract'
import { getFlexTokenRatio } from '../cdo/utils'
import useBlock from './useBlock'

const useFlexTokenRatio = (tokenContract: Contract) => {
  const [tokenRadio, setTokenRatio] = useState(new BigNumber(1))
  const block = useBlock()

  const fetchTokenRatio = useCallback(async () => {
    setTokenRatio(await getFlexTokenRatio(tokenContract))
  }, [tokenContract])

  useEffect(() => {
    if (tokenContract) {
      fetchTokenRatio()
    }
  }, [setTokenRatio, block, tokenContract])

  return tokenRadio
}

export default useFlexTokenRatio
