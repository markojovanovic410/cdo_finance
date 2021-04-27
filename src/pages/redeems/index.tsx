import { useWallet } from 'use-wallet'

import useCDOLocked from '../../hooks/useCDOLocked'
import useCDOUnlockable from '../../hooks/useCDOUnlockable'
import useCDO from '../../hooks/useCDO'
import useTokenBalance from '../../hooks/useTokenBalance'
import useEarned from '../../hooks/useEarned'

import { getCDOAddress } from '../../cdo/utils'

import { Header } from '../../layouts/header';
import { Navigation } from '../../layouts/navigation';
import { PageContainer } from '../../components/pageContainer';
import { InfoContainer } from '../../components/infoContainer';
import { Info } from '../../components/info';
import { Card } from '../../components/card';
import { EarnedCard } from '../../components/earnedCard';
import { Heading } from '../../components/heading';
import { CodexRedeemTable } from '../../components/codexRedeemTable';
import './index.scss';



export function Redeems() {
	const cdo = useCDO()
	const cdoBalance = useTokenBalance(getCDOAddress(cdo))
	const cdoLocked = useCDOLocked()
	const cdoUnlockable = useCDOUnlockable()
	const earned = useEarned(-1)

	const { account, connect } = useWallet()

	return (
		<div className="codexStaking">
			<Header />
			<div className="codexStakingContainer">
				<Navigation />
				<PageContainer>
					<Heading title="Redeem" />
					<CodexRedeemTable />
					{!account &&
						<button className="connectBtn" onClick= {() => connect('injected')}>🔓Wallet Locked<br/><br/>Please connect to Binance Smart Chain</button>
					}
				</PageContainer>
			</div>
		</div>
	);
}
