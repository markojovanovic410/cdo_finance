import React, { useCallback, useState } from 'react'
import { Button } from "../button";
import { StakeUnstakeProps } from "./types";
import "./index.scss";
import { InputButton } from "../inputButton";

import useApprove from '../../hooks/useApprove'
import useStake from '../../hooks/useStake'
import useUnstake from '../../hooks/useUnstake'

export const StakeUnstake = ({
  title,
  pid,
  balance,
  allowance,
  targetContract,
  isUnstake = false,
  disabled = false,
}: StakeUnstakeProps) => {

  const { onApprove } = useApprove(targetContract)
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const handleApprove = useCallback(async () => {
    try {
      const txHash = await onApprove()
    } catch (e) {
      console.log(e)
    }
  }, [onApprove])

  const [val, setVal] = useState('')

  const onChangeEvent = (val: string) => {
    setVal(val)
  }

  return (
    <div className="stakeUnstake">
      <div className="stakeUnstakeTitle">{`I want to ${isUnstake ? "unstake" : "stake"
        }`}</div>
      <InputButton btnLabel="Max" type="number" min="0" isHideArrows={true} balance={balance} onChangeEvent={onChangeEvent} />
      <p className="stakeUnstakeBalance">
        {isUnstake
          ? `Staked ${title} Balance: ${balance.toFormat(5)}`
          : `Available ${title} Balance: ${balance.toFormat(5)}`}
      </p>
      <Button
        children={isUnstake ? "Unstake" : !allowance.toNumber() ? "Approve" : "Stake"}
        onClick={() => { isUnstake ? onUnstake(val) : !allowance.toNumber() ? handleApprove() : onStake(val) }}
        disabled = {disabled}
      />
    </div>
  )
}
