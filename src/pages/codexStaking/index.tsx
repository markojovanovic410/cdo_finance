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
import { CodexStakingTable } from '../../components/codexStakingTable';
import './index.scss';



export function CodexStaking() {
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
					<InfoContainer>
						<Info title="Your rewards summary">
							<div className="codexStakingCards">
								<EarnedCard amount={earned.toFormat(2)} />
								<Card amount={cdoBalance.div(10 ** 18).toFormat(2)} title="wallet balance" />
								<Card amount={cdoLocked.div(10 ** 18).toFormat(2)} unlockableAmount={cdoUnlockable.div(10 ** 18).toFormat(18)} title="locked amount" isLocked />
							</div>
						</Info>
					</InfoContainer>
					<Heading title="4 Available staking Opportunities" />
					<CodexStakingTable />
					{!account &&
						<button className="connectBtn" onClick= {() => connect('injected')}>🔓Wallet Locked<br/><br/>Please connect to Binance Smart Chain</button>
					}
				</PageContainer>
			</div>
		</div>
	);
}
