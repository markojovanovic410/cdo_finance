import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useCDO from '../../hooks/useCDO'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getPendingCDO } from '../../cdo/utils'
import { getFarms } from '../../cdo/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const cdo = useCDO()
  const { account } = useWallet()

  const farms = getFarms(cdo)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
