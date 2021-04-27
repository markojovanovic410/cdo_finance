import { HeadingProps } from './types';
import './index.scss';


export const Heading = ({ title }: HeadingProps) => (
	<h1 className="heading">{ title }</h1>
);
