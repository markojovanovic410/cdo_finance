import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve } from '../cdo/utils'

const useLendingApprove = (tokenContract: Contract, flexTokenContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()

  const handleLendingApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, flexTokenContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, tokenContract, flexTokenContract])

  return { onLendingApprove: handleLendingApprove }
}

export default useLendingApprove
