import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (cdo) => {
  return cdo && cdo.masterChefAddress
}
export const getCDOAddress = (cdo) => {
  return cdo && cdo.cdoAddress
}
export const getWethContract = (cdo) => {
  return cdo && cdo.contracts && cdo.contracts.weth
}

export const getMasterChefContract = (cdo) => {
  return cdo && cdo.contracts && cdo.contracts.masterChef
}

export const getCDOContract = (cdo) => {
  return cdo && cdo.contracts && cdo.contracts.cdo
}

export const getStableWbnbPairContract = (cdo) => {
  return cdo && cdo.contracts && cdo.contracts.stableWbnbPair
}

export const getCdoWbnbPairContract = (cdo) => {
  return cdo && cdo.contracts && cdo.contracts.cdoWbnbPair
}

export const getFarms = (cdo) => {
  return cdo
    ? cdo.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        imgSrc,
        lpStaking,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        lpAddress,
        lpContract,
        priceBaseToken,
        order,
        flexToken
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        imgSrc,
        lpStaking,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        lpTokenAddress: lpAddress,
        lpContract,
        priceBaseToken,
        order,
        flexToken,
        earnToken: 'CDO',
        earnTokenAddress: cdo.contracts.cdo.options.address,
      }),
    )
    : []
}

export const getLendingPools = (cdo) => {
  return cdo
    ? cdo.contracts.lendingPools.map(
      ({
        pid,
        name,
        symbol,
        imgSrc,
        tokenAddress,
        tokenContract,
        lpAddress,
        lpContract,
        flexTokenAddress,
        flexTokenContract,
        order,
      }) => ({
        pid,
        name,
        symbol,
        imgSrc,
        tokenAddress,
        tokenContract,
        lpTokenAddress: lpAddress,
        lpContract,
        flexTokenAddress,
        flexTokenContract,
        order,
      }),
    )
    : []
}

export const getReserves = async (pairContract) => {
  try {
    const { _reserve0, _reserve1, _blockTimestampLast } = await pairContract.methods
      .getReserves()
      .call()
    return { reserve0: _reserve0, reserve1: _reserve1 }
  } catch {
    return { reserve0: '0', reserve1: '0' }
  }
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getPendingCDO = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingCodex(pid, account).call()
}

export const getEarned = async (masterChefContract, pid, account) => {
  if (pid === -1)
    return masterChefContract.methods.earnedCodexByAddress(account).call()
  return masterChefContract.methods.earnedCodexByPool(account, pid).call()
}

export const getFlexTokenRatio = async (tokenContract) => {
  let tokenRatio = new BigNumber(1)
  const totalSupply = new BigNumber(await tokenContract.methods.totalSupply().call())
  const totalToken = new BigNumber(await tokenContract.methods.totalToken().call())

  if (totalToken.isGreaterThan(0))
    tokenRatio = totalToken.div(totalSupply)

  return tokenRatio
}

export const getTotalLPValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
  priceBaseToken,
  lpStaking,
  name,
  order,
  flexToken
) => {
  let tokenAmount = new BigNumber(0)
  let totalWethValue = new BigNumber(0)

  const tokenDecimals = await tokenContract.methods.decimals().call()
  if (lpStaking) {
    const tokenAmountWholeLP = await tokenContract.methods
      .balanceOf(lpContract.options.address)
      .call()
    const wethAmountWholeLP = await wethContract.methods
      .balanceOf(lpContract.options.address)
      .call()

    const balance = await lpContract.methods
      .balanceOf(masterChefContract.options.address)
      .call()
    const totalSupply = await lpContract.methods.totalSupply().call()
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))

    totalWethValue = portionLp.times(new BigNumber(wethAmountWholeLP)).times(new BigNumber(2)).div(new BigNumber(10).pow(18))

    tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))
  } else {
    tokenAmount = new BigNumber(await tokenContract.methods
      .balanceOf(masterChefContract.options.address)
      .call())
      .div(new BigNumber(10).pow(tokenDecimals))

    const tokenRatio = flexToken ? await getFlexTokenRatio(tokenContract) : new BigNumber(1)

    if (name === 'flexBNB')
      totalWethValue = tokenAmount.times(tokenRatio)
    else {
      const { reserve0, reserve1 } = await getReserves(lpContract)
      const tokenPriceInBNB = order === true ? new BigNumber(reserve0).div(new BigNumber(reserve1)) : new BigNumber(reserve1).div(new BigNumber(reserve0))
      totalWethValue = tokenAmount.times(tokenRatio).times(tokenPriceInBNB)
    }
  }

  return {
    tokenAmount,
    totalWethValue,
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const getTotalLendingPoolData = async (
  pid,
  masterChefContract,
  lpContract,
  tokenContract,
  flexTokenContract,
  name,
  order,
  account,
  web3
) => {
  const totalSupply = new BigNumber(await flexTokenContract.methods.totalSupply().call()).div(10 ** 18)
  let tokenBalance = new BigNumber(await tokenContract.methods.balanceOf(account).call()).div(10 ** 18)
  let flexTokenBalance = new BigNumber(await flexTokenContract.methods.balanceOf(account).call()).div(10 ** 18)
  const stakedAmount = await getStaked(masterChefContract, pid, account)
  const flexAllTokenBalance = flexTokenBalance.plus(stakedAmount.div(10 ** 18))
  const flexTokenRatio = await getFlexTokenRatio(flexTokenContract)

  let tokenPriceInBNB = new BigNumber(1)
  if (name != 'BNB') {
    const { reserve0, reserve1 } = await getReserves(lpContract)
    tokenPriceInBNB = order === true ? new BigNumber(reserve0).div(new BigNumber(reserve1)) : new BigNumber(reserve1).div(new BigNumber(reserve0))
  }

  if (name == 'BNB')
    tokenBalance = new BigNumber(await web3.eth.getBalance(account)).div(10 ** 18)

  return {
    totalSupply,
    tokenBalance,
    flexAllTokenBalance,
    flexTokenBalance,
    tokenPriceInBNB,
    flexTokenRatio
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getCDOSupply = async (cdo) => {
  return new BigNumber(await cdo.contracts.cdo.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      account,
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      account,
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .harvest(pid)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unlock = async (cdoContract, account) => {
  return cdoContract.methods
    .unlock()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const lendingDeposit = async (flexTokenContract, amount, account, bnbFlag) => {
  if (bnbFlag)
    return flexTokenContract.methods
      .deposit(
        new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  return flexTokenContract.methods
    .deposit(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const lendingWithdraw = async (flexTokenContract, amount, account) => {
  return flexTokenContract.methods
    .withdraw(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
