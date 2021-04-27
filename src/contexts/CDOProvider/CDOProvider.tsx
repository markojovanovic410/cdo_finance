import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { CDO } from '../../cdo'

export interface CDOContext {
  cdo?: typeof CDO
}

export const Context = createContext<CDOContext>({
  cdo: undefined,
})

declare global {
  interface Window {
    cdosauce: any
  }
}

const CDOProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [cdo, setCDO] = useState<any>()

  // @ts-ignore
  window.cdo = cdo
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const cdoLib = new CDO(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setCDO(cdoLib)
      window.cdosauce = cdoLib
    }
  }, [ethereum])

  return <Context.Provider value={{ cdo }}>{children}</Context.Provider>
}

export default CDOProvider
