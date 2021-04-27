import { PageContainerProps } from './types';
import './index.scss';


export const PageContainer = ({ children }: PageContainerProps) => <div className="pageContainer">{ children }</div>;
