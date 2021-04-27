import { EarnedCardProps } from './types';
import './index.scss';


export const EarnedCard = ({ amount }: EarnedCardProps) => (
	<div className="earnedCard" style={{ background: 'url("/images/stars.svg")' }}>
		<div className="earnedCardTitle">codex points earned</div>
		<div className="earnedCardAmount">{ amount }</div>
	</div>
);
