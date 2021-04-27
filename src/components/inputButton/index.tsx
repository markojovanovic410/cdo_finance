import BigNumber from "bignumber.js";
import React, { FC, InputHTMLAttributes, useCallback, useMemo, useState } from "react";
import { getFullDisplayBalance } from '../../utils/formatBalance';
import "./index.scss";

interface InputButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  btnLabel: string;
  isHideArrows?: boolean;
  balance: BigNumber;
  onChangeEvent: Function;
}

export const InputButton: FC<InputButtonProps> = ({
  btnLabel,
  isHideArrows,
  balance,
  onChangeEvent,
  ...rest
}) => {
  const [val, setVal] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
      onChangeEvent(e.currentTarget.value)
    },
    [setVal],
  )

  const fullBalance = useMemo(() => {
    return balance
  }, [balance])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance.toString())
    onChangeEvent(fullBalance.toString())
  }, [fullBalance, setVal])

  return (
    <div className="wrapperInput">
      <input {...rest} className={isHideArrows ? `hide-arrows` : ""} onChange={handleChange} value={val} />
      <button className="btnInput" onClick={handleSelectMax}>{btnLabel}</button>
    </div>
  );
};
