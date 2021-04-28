import React, {useState, useEffect, useRef} from 'react'
import { Row, Col } from 'react-bootstrap';
import { Button } from '../button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {YPSeniorTrancheBody} from './YPSeniorTrancheBody';
import {YPJuniorTrancheBody} from './YPJuniorTrancheBody';
import { Modal } from 'react-bootstrap';

interface TransferModalProps{
    showModal: 	boolean,
    parentCallback: any,
    modalPlatform: string,
    modalImage: string,
    modalToken: string,
    redeemableAmount: string,
    depositedAmount: string,
    guaranteedApy: number,
    maturityDate: string,
    address: string,
}

export const TransferModal = ({ showModal, parentCallback, modalPlatform, modalImage, modalToken, redeemableAmount, depositedAmount, guaranteedApy, maturityDate, address }: TransferModalProps) => {
    const handleModalClose = () => {
        parentCallback(false);
    };
	return (
		<>
			<Modal dialogClassName="transfer-modal" show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <div>
                        <div>Senior Tranche Transfer</div>
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
                            <p className="modal-desc">Deposited Amount</p>
                            <p>{depositedAmount} {modalToken}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="modal-desc">Guaranteed APY</p>
                            <p>{guaranteedApy}%</p>
                        </Col>
                        <Col>
                            <p className="modal-desc">Maturity date</p>
                            <p>{maturityDate}</p>
                        </Col>
                    </Row>
                    <div className="address-section">
                        <p className="modal-desc">Address</p>
                        <p><input type="text" value={address} /></p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalClose}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
	);
}
