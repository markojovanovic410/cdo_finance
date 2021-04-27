import { createContext } from 'react'
import { LendingPoolsContext } from './types'

const context = createContext<LendingPoolsContext>({
  lendingPools: [],
  unharvested: 0,
})

export default context
