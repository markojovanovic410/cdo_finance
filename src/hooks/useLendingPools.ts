import { useContext } from 'react'
import { Context as LendingPoolsContext } from '../contexts/LendingPools'

const useLendingPools = () => {
  const { lendingPools } = useContext(LendingPoolsContext)
  return [lendingPools]
}

export default useLendingPools
