import useUnlock from '../../hooks/useUnlock'

import { Button } from '../button';
import { CardProps } from './types';
import './index.scss';


export const Card = ({ title, amount, isLocked = false, unlockableAmount = '' }: CardProps) => {
	const { onUnlock } = useUnlock()
	return (
		<div className="card">
			<div className="cardInfo">
				<img src={`/images/icons/${isLocked ? 'lock' : 'wallet'}.svg`} alt="codex-icon" />
				<div className="cardInfoWrap">
					<div className="cardTitle">{title}</div>
					<div className="cardAmount"><span>{amount} CODEX</span></div>
				</div>
			</div>
			{
				isLocked &&
				<>
					<div style={{marginTop: '15px'}}>{unlockableAmount} CODEX Unlockable</div>
					<Button children="Claim" onClick={() => { onUnlock() }} disabled={Number(unlockableAmount) <= 0} />
					<div className="cardBottom">Your locked balance will be available after 3 months. <a href="https://app.gitbook.com/@cdo-finance/s/cdo-finance/codex-token/token-lock-up-mechanism">Click here</a> for further details.</div>
				</>
			}
		</div>
	)
}
