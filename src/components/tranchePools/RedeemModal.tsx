import React, {useState, useEffect, useRef} from 'react'
import { Row, Col } from 'react-bootstrap';
import { Button } from '../button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {YPSeniorTrancheBody} from './YPSeniorTrancheBody';
import {YPJuniorTrancheBody} from './YPJuniorTrancheBody';
import { Modal } from 'react-bootstrap';

interface RedeemModalProps{
    showModal: 	boolean,
    parentCallback: any,
    modalPlatform: string,
    modalImage: string,
    modalToken: string,
    redeemableAmount: string,
    feeAmount: string,
}

export const RedeemModal = ({ showModal, parentCallback, modalPlatform, modalImage, modalToken, redeemableAmount, feeAmount }: RedeemModalProps) => {
    const handleModalClose = () => {
        parentCallback(false);
    };
	return (
		<>
			<Modal dialogClassName="redeem-modal" show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <div>
                        <div>Senior Tranche Redemption</div>
                        <div><span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{modalPlatform}</span></div>
                        <div><span className="left-img-txt" style={{ backgroundImage: `url(${modalImage})` }}>{modalToken}</span></div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <p className="modal-desc">Redeemable Amount</p>
                            <p>{redeemableAmount} {modalToken}</p>
                        </Col>
                        <Col>
                            <p className="modal-desc">Protocol Fee (5%)</p>
                            <p>${feeAmount}</p>
                        </Col>
                    </Row>
                    <div className="desc-section">
                        <p>You will receive <span>0.00</span> {modalToken}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalClose}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
	);
}