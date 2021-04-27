import React, {useState, useEffect, useRef} from 'react'
import { Accordion, Card } from 'react-bootstrap';
import { Button } from '../button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {YPSeniorTrancheBody} from './YPSeniorTrancheBody';
import {YPJuniorTrancheBody} from './YPJuniorTrancheBody';

interface YourPositionProps{
    senior_balance: 	number,
    senior_apy:			number,
    junior_balance: 	number,
    junior_apy:			number,
}

export const YourPositions = ({ senior_balance, senior_apy, junior_balance, junior_apy }: YourPositionProps) => {
	
	const [activeId, setActiveId] = useState('none');

    const toggleActive = (id:string) => {
        if (activeId === id) {
            setActiveId('null');
        } else {
            setActiveId(id);
        }
    }

	return (
		<>
			<div className="d-flex yp-additional-info">
				<span></span>
				<span>BALANCE</span>
				<span>AGGREGATED APY</span>
				<span></span>
			</div>
		    <Accordion defaultActiveKey={activeId} className="cdo-accordion">
              <Card className={activeId === '0' ? 'active' : ''}>
                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => toggleActive('0')}>
                  <span>Senior Tranche</span>
                  <span>${senior_balance}</span>
                  <span>{senior_apy}%</span>
                  <FontAwesomeIcon icon={faAngleDown} />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  	<YPSeniorTrancheBody />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className={activeId === '1' ? 'active' : ''}>
                <Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => toggleActive('1')}>
                  <span>Junior Tranche</span>
                  <span>${junior_balance}</span>
                  <span>{junior_apy}%</span>
                  <FontAwesomeIcon icon={faAngleDown} />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                  	<YPJuniorTrancheBody />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <div className="d-flex yp-additional-info total-info">
				<span>Total</span>
				<span>${senior_balance + junior_balance}</span>
				<span>-</span>
				<span></span>
			</div>
		</>
	);
}