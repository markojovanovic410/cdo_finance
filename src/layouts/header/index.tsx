import { useWallet } from 'use-wallet'
import { Button } from '../../components/button';
import { HeaderTypes } from './types';
import './index.scss';


export const Header = ({ withBtn = true }: HeaderTypes) => {
	const { account, connect } = useWallet()

	return (
		<header className="header">
			<a href="/"><img src="/images/logo.svg" alt="CDO.Finance logo" /></a>
			{ withBtn && !account && <Button children="Connect Wallet" onClick={() => connect('injected')} isMain />}
			{ withBtn && account && <Button children={`${account.substring(0, 7)}...${account.substring(account.length - 5, account.length)}`} isMain />}
		</header>
	)
}