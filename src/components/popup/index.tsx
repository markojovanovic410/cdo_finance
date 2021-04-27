import React, { useCallback, useState } from 'react'

import useLendingApprove from '../../hooks/useLendingApprove'
import useLendingDeposit from '../../hooks/useLendingDeposit'
import useLendingWithdraw from '../../hooks/useLendingWithdraw'
import useLendingAllowance from '../../hooks/useLendingAllowance'

import BigNumber from 'bignumber.js/bignumber'
import { useEffect } from 'react';
import { Button } from '../button';
import { InputButton } from "../inputButton";
import { PopupProps } from './types';
import './index.scss';


export const Popup = ({ action, imgSrc, pool, tokenRatio, balance, tokenContract, flexTokenContract, onClose }: PopupProps) => {
	const [pendingTx, setPendingTx] = useState(false)

	useEffect(() => {
		document.querySelector('body')!.style.overflow = 'hidden';
		return () => { document.querySelector('body')!.style.overflow = 'initial'; };
	}, []);

	const onPopupClick = (event: any) => {
		event.stopPropagation();

		const { target } = event;

		if (target.classList.contains('popup')) onClose();
	};

	const allowance = useLendingAllowance(tokenContract, flexTokenContract)
	const { onLendingApprove } = useLendingApprove(tokenContract, flexTokenContract)
	const { onLendingDeposit } = useLendingDeposit()
	const { onLendingWithdraw } = useLendingWithdraw()

	const handleLendingApprove = useCallback(async () => {
		try {
			const txHash = await onLendingApprove()
		} catch (e) {
			console.log(e)
		}
	}, [onLendingApprove])

	const [val, setVal] = useState('0')

	const onChangeEvent = (val: string) => {
		if (val === '')
			setVal('0')
		else
			setVal(val)
	}

	return <div className="popup" onClick={onPopupClick}>
		<div className="popupWrap">
			<img className="popupCloseBtn" src="/images/icons/close.svg" alt="close-icon" onClick={onClose} />
			<img className="popupImg" src={imgSrc} alt="pool-icon" />
			<div className="popupTitle">{`${action} ${pool}`}</div>
			<div className="popupInputWrap">
				<InputButton btnLabel="Max" type="number" min="0" isHideArrows={true} balance={balance} onChangeEvent={onChangeEvent} />
				<div className="popupText mt-4">Available Balance: {balance && balance.toFormat(4)}</div>
				<div className="popupText">Exchange Rate:
					{action === 'Depositing' ?
						`1 ${pool} to ${tokenRatio.toFormat(2)} flex${pool}` :
						`1 flex${pool} to ${tokenRatio.toFormat(2)} ${pool}`
					}
				</div>
			</div>
			<div className="popupConclusion">You will receive <span>{new BigNumber(val).times(tokenRatio).toFormat(4)}</span> {action === 'Depositing' ? `flex${pool}` : `${pool}`}</div>
			<Button isMain
				disabled={pendingTx}
				onClick={async () => {
					setPendingTx(true)
					action === 'Withdrawing' ?
						await onLendingWithdraw(flexTokenContract, val) :
						pool != 'BNB' && !allowance.toNumber() ?
							await handleLendingApprove() :
							await onLendingDeposit(flexTokenContract, val, pool == 'BNB')
					setPendingTx(false)
				}}>
				{pendingTx ? 'Pending' : action === 'Depositing' && pool != 'BNB' && !allowance.toNumber() ? 'Approve' : 'Confirm'}
			</Button>
		</div>
	</div>
}
