import { NavLink } from "react-router-dom";
import './index.scss';


export const Navigation = () => (
	<nav className="navigation">
		<ul className="navigationList">
			<li className="navigationListItem">
				<NavLink className="navigationItem" to="/codex-staking" exact>CODEX Staking</NavLink>
			</li>
			<li className="navigationListItem">
				<NavLink className="navigationItem" to="/tranche-pools" exact>Tranche Pools</NavLink>
			</li>
			<li className="navigationListItem">
				<NavLink className="navigationItem" to="/liquidity-pools">Liquidity Pools</NavLink>
			</li>
			<li className="navigationListItem">
				<NavLink className="navigationItem" to="/redeems">Redeem</NavLink>
			</li>
		</ul>
	</nav>
);