import classNames from 'classnames';
import { IconLinkTypes } from './types';
import './index.scss';

export const IconLink = ({ linkSrc, imgSrc, className }: IconLinkTypes) => (
	<a className={ classNames("iconLink", className) } href={ linkSrc }>
		<img src={ imgSrc } alt="icon" />
	</a>
);
