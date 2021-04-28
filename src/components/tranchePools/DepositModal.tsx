import React, {useState, useEffect, useRef} from 'react'
import { Accordion, Card, Media } from 'react-bootstrap';
import { Button } from '../button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {YPSeniorTrancheBody} from './YPSeniorTrancheBody';
import {YPJuniorTrancheBody} from './YPJuniorTrancheBody';
import { Modal } from 'react-bootstrap';

interface DepositModalProps{
    showModal: 	boolean,
    parentCallback: any,
    modalPlatform: string,
    modalImage: string,
    modalToken: string,
    type: number,
    seniorFixedAPY: number,
    seniorLiquidity: string,
    juniorFixedAPY: number,
    juniorLiquidity: string,
}

export const DepositModal = ({ showModal, parentCallback, modalPlatform, modalImage, modalToken, type, seniorFixedAPY, seniorLiquidity, juniorFixedAPY, juniorLiquidity }: DepositModalProps) => {
    const handleModalClose = () => {
        parentCallback(false, type, false);
    };
    const setType = (type: number) => {
        parentCallback(true, type, false);
    };
    const handleDepositNext = () => {
        parentCallback(false, type, true);
    };
	return (
		<>
			<Modal dialogClassName="deposit-modal" show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <div>
                        <div>Deposit</div>
                        <div><span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{modalPlatform}</span></div>
                        <div><span className="left-img-txt" style={{ backgroundImage: `url(${modalImage})` }}>{modalToken}</span></div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-desc">Select your preferred tranche</p>
                    <div className="clearfix">
                        <div className={type == 0 ? "active float-left" : "float-left"} onClick={() => setType(0)}>
                            <Media>
                            <img
                                width={16}
                                height={16}
                                src="/images/icons/check.png"
                                alt="Select tranche"
                            />
                            <Media.Body>
                                <h5>Senior Tranche</h5>
                                <p>Fixed APY: {seniorFixedAPY}%</p>
                                <p>Liquidity: {seniorLiquidity} {modalToken}</p>
                            </Media.Body>
                            </Media>
                        </div>
                        <div className={type == 1 ? "active float-right" : "float-right"} onClick={() => setType(1)}>
                            <Media>
                            <img
                                width={16}
                                height={16}
                                src="/images/icons/check.png"
                                alt="Select tranche"
                            />
                            <Media.Body>
                                <h5>Junior Tranche</h5>
                                <p>Fixed APY: {juniorFixedAPY}%</p>
                                <p>Liquidity: {juniorLiquidity} {modalToken}</p>
                            </Media.Body>
                            </Media>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDepositNext}>Next</Button>
                </Modal.Footer>
            </Modal>
        </>
	);
}