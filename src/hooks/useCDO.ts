import { useContext } from 'react'
import { Context } from '../contexts/CDOProvider'

const useCDO = () => {
  const { cdo } = useContext(Context)
  return cdo
}

export default useCDO
