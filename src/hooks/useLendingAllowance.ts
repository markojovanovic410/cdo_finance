import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'

const useLendingAllowance = (tokenContract: Contract, flexTokenContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      tokenContract,
      flexTokenContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, tokenContract, flexTokenContract])

  useEffect(() => {
    if (account && tokenContract && flexTokenContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, tokenContract, flexTokenContract])

  return allowance
}

export default useLendingAllowance
