import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useCDO from '../../hooks/useCDO'
import { getLendingPools } from '../../cdo/utils'

import Context from './context'
import { LendingPool } from './types'

const LendingPools: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const cdo = useCDO()
  const { account } = useWallet()

  const lendingPools = getLendingPools(cdo)

  return (
    <Context.Provider
      value={{
        lendingPools,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default LendingPools
