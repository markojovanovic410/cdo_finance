import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getCdoWbnbPairContract, getReserves } from '../cdo/utils'
import useBlock from './useBlock'
import useCDO from './useCDO'
import useWBNBPrice from './useWBNBPrice'

const useICEBPrice = () => {
  const [price, setPrice] = useState(new BigNumber(0))
  const cdo = useCDO()
  const pairContract = getCdoWbnbPairContract(cdo)
  const wbnbPrice = useWBNBPrice()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const { reserve0, reserve1 }: { reserve0: string, reserve1: string } = await getReserves(pairContract)
      if (!new BigNumber(reserve0).eq(new BigNumber(0)) && !wbnbPrice.eq(new BigNumber(0))) {
        const newCDOPriceInBnB = new BigNumber(reserve1).div(new BigNumber(reserve0));
        const newCDOPriceInUSD = newCDOPriceInBnB.times(wbnbPrice);
        if (!newCDOPriceInUSD.isEqualTo(price)) {
          setPrice(newCDOPriceInUSD)
        }
      } else {
        // setPrice(new BigNumber(0))
      }
    } catch (e) {
      // setPrice(new BigNumber(0))
    }
  }, [pairContract, wbnbPrice, cdo])

  useEffect(() => {
    
    if (pairContract && cdo) {
      fetchBalance()
    }
  }, [pairContract, setPrice, block, cdo])

  return price
}

export default useICEBPrice
