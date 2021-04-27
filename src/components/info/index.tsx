import { InfoProps } from './types';
import './index.scss';


export const Info = ({ title, children }: InfoProps) => (
	<div className="info">
		<div className="infoTitle">{ title }</div>
		{ children }
	</div>
);
