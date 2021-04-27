import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getMasterChefContract } from '../cdo/utils'
import useCDO from './useCDO'
import useBlock from './useBlock'

const useCDOPerYear = () => {
  const [cdoPerYear, setCDOPerYear] = useState(new BigNumber(0))

  const cdo = useCDO()
  const masterChefContract = getMasterChefContract(cdo)
  const block = useBlock()

  const fetchEarned = useCallback(async () => {
    const cdoPerYear = await masterChefContract.methods.codexPerYear().call()
    setCDOPerYear(new BigNumber(cdoPerYear).div(10 ** 18))
  }, [masterChefContract, cdo])

  useEffect(() => {
    if (masterChefContract && cdo) {
      fetchEarned()
    }
  }, [block, masterChefContract, setCDOPerYear, cdo])

  return cdoPerYear
}

export default useCDOPerYear
