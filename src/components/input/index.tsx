import { InputProps } from './types';
import './index.scss';


export const Input = ({ onChange }: InputProps) => (
	<input className="input" type="number" placeholder="Max" step="0.01" min="0" onChange={ onChange } />
);
