import React from 'react'
import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

export const contractAddresses = {
  cdo: {
    56: '0x9E95cB3D0560f9Cba88991f828322526851BFb56',
  },
  masterChef: {
    56: '0xDaC4d0EE7B55497E96b73a53b31A2B47ABb7b5a8',
  },
  weth: {
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  stableWbnbPair: {
    56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
  },
  cdoWbnbPair: {
    56: '0xB31dc5632018BF8b17BA8a155D5d88932404C468',
  }
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 3,
    lpAddresses: {
      56: '0xB31dc5632018BF8b17BA8a155D5d88932404C468',
    },
    tokenAddresses: {
      56: '0x9E95cB3D0560f9Cba88991f828322526851BFb56',
    },
    name: 'CODEX-wBNB LP v2',
    symbol: 'CODEX-wBNB LP v2',
    tokenSymbol: 'CDO',
    priceBaseToken: 'WBNB',
    lpStaking: true,
    order: true,
    flexToken: false,
    imgSrc: ['/images/icons/bnb.svg', '/images/icons/hi.svg'],
  },
  {
    pid: 0,
    lpAddresses: {
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenAddresses: {
      56: '0xa900A6291d3A49B1b555b40bd6277D56228B690b',
    },
    name: 'flexBNB',
    symbol: 'flexBNB',
    tokenSymbol: 'flexBNB',
    priceBaseToken: 'WBNB',
    lpStaking: false,
    order: true,
    flexToken: true,
    imgSrc: ['/images/icons/bnb.svg'],
  },
  {
    pid: 1,
    lpAddresses: {
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenAddresses: {
      56: '0xC37d72b7A3363d418e9374d73151164AB588406D',
    },
    name: 'flexBUSD',
    symbol: 'flexBUSD',
    tokenSymbol: 'flexBUSD',
    priceBaseToken: 'WBNB',
    lpStaking: false,
    order: true,
    flexToken: true,
    imgSrc: ['/images/icons/busd.svg'],
  },
  {
    pid: 2,
    lpAddresses: {
      56: '0x7561eee90e24f3b348e1087a005f78b4c8453524',
    },
    tokenAddresses: {
      56: '0xC82d3404fFC5f51F3E67BC9846ff0180d3c48178',
    },
    name: 'flexBTCB',
    symbol: 'flexBTCB',
    tokenSymbol: 'flexBTCB',
    priceBaseToken: 'WBNB',
    lpStaking: false,
    order: false,
    flexToken: true,
    imgSrc: ['/images/icons/btcb.jpg'],
  },
  {
    pid: 3,
    lpAddresses: {
      56: '0xB31dc5632018BF8b17BA8a155D5d88932404C468',
    },
    tokenAddresses: {
      56: '0x9E95cB3D0560f9Cba88991f828322526851BFb56',
    },
    name: 'CODEX-wBNB LP v1',
    symbol: 'CODEX-wBNB LP v1',
    tokenSymbol: 'CDO',
    priceBaseToken: 'WBNB',
    lpStaking: true,
    order: true,
    flexToken: false,
    imgSrc: ['/images/icons/bnb.svg', '/images/icons/hi.svg'],
  },
]

export const supportedLendingPools = [
  {
    pid: 0,
    tokenAddresses: {
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    lpAddresses: {
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    flexTokenAddresses: {
      56: '0xa900A6291d3A49B1b555b40bd6277D56228B690b',
    },
    name: 'BNB',
    symbol: 'BNB',
    order: true,
    imgSrc: '/images/icons/bnb.svg',
  },
  {
    pid: 1,
    tokenAddresses: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    lpAddresses: {
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    flexTokenAddresses: {
      56: '0xC37d72b7A3363d418e9374d73151164AB588406D',
    },
    name: 'BUSD',
    symbol: 'BUSD',
    order: true,
    imgSrc: '/images/icons/busd.svg',
  },
  {
    pid: 2,
    tokenAddresses: {
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    lpAddresses: {
      56: '0x7561eee90e24f3b348e1087a005f78b4c8453524',
    },
    flexTokenAddresses: {
      56: '0xC82d3404fFC5f51F3E67BC9846ff0180d3c48178',
    },
    name: 'BTCB',
    symbol: 'BTCB',
    order: false,
    imgSrc: '/images/icons/btcb.jpg',
  },
]