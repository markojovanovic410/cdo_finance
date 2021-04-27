import { useState } from "react";
import useLendingPools from '../../hooks/useLendingPools';

import useAllLendingPoolData, {
  StakedValue,
} from '../../hooks/useAllLendingPoolData'
import { LendingPool } from '../../contexts/LendingPools'
import useWBNBPrice from '../../hooks/useWBNBPrice'
import { useWallet } from 'use-wallet'

import { Header } from "../../layouts/header";
import { Navigation } from "../../layouts/navigation";
import { PageContainer } from "../../components/pageContainer";
import { InfoContainer } from "../../components/infoContainer";
import { Info } from "../../components/info";
import { Button } from "../../components/button";
import { Popup } from "../../components/popup";
import { Heading } from "../../components/heading";
import "./index.scss";
import BigNumber from "bignumber.js";
import { stake } from "src/cdo/utils";

interface LendingPoolWithStakedValue extends LendingPool, StakedValue { }

export function LiquidityPools() {
  const [state, setState] = useState({
    showPopup: false,
    action: "Depositing",
    pool: "BNB",
    imgSrc: "/images/icons/bnb.svg",
    tokenRadio: new BigNumber(1),
    balance: new BigNumber(0),
    tokenContract: null,
    flexTokenContract: null
  });

  const { account, connect } = useWallet()

  const [lendingPools] = useLendingPools()
  const lendingPoolData = useAllLendingPoolData()
  const bnbPrice = useWBNBPrice()

  let totalPoolValue = new BigNumber(0)
  let myPoolValue = new BigNumber(0)

  const rows = lendingPools.reduce<LendingPoolWithStakedValue[]>(
    (lendingPoolRows, lendingPool, i) => {
      const newLendingPoolRows = [...lendingPoolRows]

      const lendingPoolWithDetailData = {
        ...lendingPool,
        ...lendingPoolData[i]
      }

      if (lendingPoolData[i]) {
        totalPoolValue = totalPoolValue.plus(lendingPoolData[i].totalSupply.times(lendingPoolData[i].flexTokenRatio).times(lendingPoolData[i].tokenPriceInBNB).times(bnbPrice))
        myPoolValue = myPoolValue.plus(lendingPoolData[i].flexAllTokenBalance.times(lendingPoolData[i].flexTokenRatio).times(lendingPoolData[i].tokenPriceInBNB).times(bnbPrice))
      }

      newLendingPoolRows.push(lendingPoolWithDetailData)
      return newLendingPoolRows
    },
    [],
  )

  return (
    <div className="liquidityPools">
      <Header />
      <div className="liquidityPoolsContainer">
        <Navigation />
        <PageContainer>
          <InfoContainer>
            <Info title="Total Pool Info">
              <div className="infoAmount">${totalPoolValue.toFormat(2)}</div>
              <div className="infoText">total deposits</div>
            </Info>
            <Info title="Your Info">
              <div className="infoAmount">${myPoolValue.toFormat(2)}</div>
              <div className="infoText">total deposits</div>
            </Info>
          </InfoContainer>
          <Heading title="Available Liquidity Pools" />
          {account ?
            <div className="liquidityPoolsTableWrap">
              <div className="liquidityPoolsTable">
                <div className="liquidityPoolsTableHead">
                  <div className="liquidityPoolsTableHeadItem">Pools</div>
                  <div className="liquidityPoolsTableHeadItem">Total Supply</div>
                  <div className="liquidityPoolsTableHeadItem">Your Balance</div>
                  <div className="liquidityPoolsTableHeadItem"></div>
                </div>
                {rows.map((pool, i) => {
                  return (
                    <div key={i} className="liquidityPoolsTableRow">
                      <div className="liquidityPoolsTableRowItem">
                        <img src={pool.imgSrc} alt="bnb" />
                        <span>{pool.name}</span>
                      </div>
                      <div className="liquidityPoolsTableRowItem">
                        {pool.totalSupply ? pool.totalSupply.toFormat(2) : 0.0000}
                      </div>
                      <div className="liquidityPoolsTableRowItem">
                        {pool.tokenBalance ? pool.tokenBalance.toFormat(4) : 0.0000} {pool.name} | {pool.flexTokenBalance ? pool.flexTokenBalance.toFormat(4) : 0.0000} flex{pool.name}
                      </div>
                      <div className="liquidityPoolsTableRowItem">
                        <Button
                          children="Withdraw"
                          onClick={() =>
                            setState({
                              showPopup: true,
                              action: "Withdrawing",
                              imgSrc: pool.imgSrc,
                              pool: pool.name,
                              tokenRadio: pool.flexTokenRatio,
                              balance: pool.flexTokenBalance,
                              tokenContract: pool.tokenContract,
                              flexTokenContract: pool.flexTokenContract
                            })
                          }
                        />
                        <Button
                          children="Deposit"
                          onClick={() =>
                            setState({
                              showPopup: true,
                              action: "Depositing",
                              imgSrc: pool.imgSrc,
                              pool: pool.name,
                              tokenRadio: new BigNumber(1).div(pool.flexTokenRatio),
                              balance: pool.tokenBalance,
                              tokenContract: pool.tokenContract,
                              flexTokenContract: pool.flexTokenContract
                            })
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> :
            <button className="connectBtn" onClick={() => connect('injected')}>🔓Wallet Locked<br /><br />Please connect to Binance Smart Chain</button>
          }
        </PageContainer>
      </div>
      {state.showPopup && (
        <Popup
          action={state.action}
          pool={state.pool}
          imgSrc={state.imgSrc}
          tokenRatio={state.tokenRadio}
          balance={state.balance}
          tokenContract={state.tokenContract}
          flexTokenContract={state.flexTokenContract}
          onClose={() => setState({ ...state, showPopup: false })}
        />
      )}
    </div>
  );
}
