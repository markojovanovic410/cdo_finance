import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { lendingWithdraw } from '../cdo/utils'

const useLendingWithdraw = () => {
  const { account } = useWallet()

  const handleLendingWithdraw = useCallback(
    async (flexTokenContract: Contract, amount: string) => {
      const txHash = await lendingWithdraw(
        flexTokenContract,
        amount,
        account
      )
      console.log(txHash)
    },
    [account],
  )

  return { onLendingWithdraw: handleLendingWithdraw }
}

export default useLendingWithdraw
