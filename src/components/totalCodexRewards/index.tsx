import useReward from '../../hooks/useReward'

import { Button } from '../button';
import { TotalCodexRewardsProps } from './types';
import './index.scss';


export const TotalCodexRewards = ({ pid, amount }: TotalCodexRewardsProps) => {
	const { onReward } = useReward(pid)

	return (
		<div className="totalCodexRewards">
			<div className="totalCodexRewardsTitle">total codex rewards</div>
			<div className="totalCodexRewardsAmount">{amount}</div>
			<Button children="Claim" onClick={() => { onReward() }} disabled={Number(amount) <= 0} />
		</div>
	);
}
