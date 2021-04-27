import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/home';
import { LiquidityPools } from './pages/liquidityPools';
import { TranchePools } from './pages/tranchePools';
import { CodexStaking } from './pages/codexStaking';
import { Redeems } from './pages/redeems';

import CDOProvider from './contexts/CDOProvider'
import TransactionProvider from './contexts/Transactions'
import FarmsProvider from './contexts/Farms'
import LendingPoolsProvider from './contexts/LendingPools'

import { UseWalletProvider } from 'use-wallet';


export function App() {
	return (
		<Providers>
			<BrowserRouter>
				<Switch>
					<Route children={<CodexStaking />} path="/codex-staking" />
					<Route children={<LiquidityPools />} path="/liquidity-pools" />
					<Route children={<TranchePools />} path="/tranche-pools" />
					<Route children={<Redeems />} path="/redeems" />
					<Route children={<HomePage />} path="/" />
				</Switch>
			</BrowserRouter>
		</Providers>
	)
}

const Providers: React.FC = ({ children }) => {
	return (
		<UseWalletProvider
			chainId={56}
			connectors={{
				walletconnect: { rpcUrl: 'https://bsc-dataseed.binance.org/' },
			}}
		>
			<CDOProvider>
				<TransactionProvider>
					<FarmsProvider>
						<LendingPoolsProvider>
							{children}
						</LendingPoolsProvider>
					</FarmsProvider>
				</TransactionProvider>
			</CDOProvider>
		</UseWalletProvider>
	)
}