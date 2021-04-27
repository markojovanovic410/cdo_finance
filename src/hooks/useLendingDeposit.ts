import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { lendingDeposit } from '../cdo/utils'

const useLendingDeposit = () => {
  const { account } = useWallet()

  const handleLendingDeposit = useCallback(
    async (flexTokenContract: Contract, amount: string, bnbFlag: boolean) => {
      const txHash = await lendingDeposit(
        flexTokenContract,
        amount,
        account,
        bnbFlag
      )
      console.log(txHash)
    },
    [account],
  )

  return { onLendingDeposit: handleLendingDeposit }
}

export default useLendingDeposit
