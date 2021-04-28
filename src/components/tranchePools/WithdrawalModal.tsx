import React, {useState, useEffect, useRef} from 'react'
import { Accordion, Card, Media } from 'react-bootstrap';
import { Button } from '../button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {YPSeniorTrancheBody} from './YPSeniorTrancheBody';
import {YPJuniorTrancheBody} from './YPJuniorTrancheBody';
import { Modal } from 'react-bootstrap';

interface WithdrawalModalProps{
    showModal: 	boolean,
    parentCallback: any,
    modalPlatform: string,
    modalImage: string,
    modalToken: string,
    waitTime: string,
    withdrawalAmount: string,
    type: number,
    forfeits: string,
}

export const WithdrawalModal = ({ showModal, parentCallback, modalPlatform, modalImage, modalToken, waitTime, withdrawalAmount, type, forfeits }: WithdrawalModalProps) => {
    const handleModalClose = () => {
        parentCallback(false, type, false);
    };
    const setType = (type: number) => {
        parentCallback(true, type, false);
    };
    const handleWithdrawalNext = () => {
        parentCallback(false, type, true);
    };
	return (
		<>
			<Modal dialogClassName="withdrawal-modal" show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <div>
                        <div>Junior Tranche Withdrawal</div>
                        <div><span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{modalPlatform}</span></div>
                        <div><span className="left-img-txt" style={{ backgroundImage: `url(${modalImage})` }}>{modalToken}</span></div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-more">Click here to learn more about the differences between the 2 withdrawal methods.</p>
                    <p className="modal-desc">Select your preferred withdrawal method</p>
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
                                <h5>2 step withdraw</h5>
                                <p>Wait Time: {waitTime}</p>
                                <p>Total withdrawal amount: {withdrawalAmount} {modalToken}</p>
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
                                <h5>Instant withdraw</h5>
                                <p>Wait Time: none</p>
                                <p>Total withdrawal amount: {withdrawalAmount} {modalToken}</p>
                                <p className="modal-desc" style={{margin: 0}}>Forfeits: {forfeits} {modalToken}</p>
                            </Media.Body>
                            </Media>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleWithdrawalNext}>Next</Button>
                </Modal.Footer>
            </Modal>
        </>
	);
}