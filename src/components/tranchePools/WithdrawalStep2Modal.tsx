import React, {useState} from 'react'
import { InputGroup, Row, Col, FormControl, Modal } from 'react-bootstrap';
import { Button } from '../button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

interface WithdrawalStep2ModalProps{
    showModal: 	boolean,
    parentCallback: any,
    modalPlatform: string,
    modalImage: string,
    modalToken: string,
    type: number,
    waitTime: string,
    forfeits: string,
    exchangeRate: string,
    availableBalance: string,
}

export const WithdrawalStep2Modal = ({ showModal, parentCallback, modalPlatform, modalImage, modalToken, type, waitTime, exchangeRate, forfeits, availableBalance }: WithdrawalStep2ModalProps) => {
  const [depositAmount, setDepositAmount] = useState("0.00");
  const handleModalClose = () => {
        parentCallback(false, false);
    };
    const handleWithdrawalBefore = () => {
        parentCallback(false, true);
    };
    const handleWithdrawalConfirm = () => {
        parentCallback(false, false);
    };
	return (
		<>
			<Modal dialogClassName="withdrawal-step2-modal" show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <button className="back" onClick={handleWithdrawalBefore}><span style={{ backgroundImage: 'url("/images/icons/gt.png")' }}>Back</span></button>
                <div>
                    <div>{type == 0 ? "Junior Tranche 2 step withdrawal" : "Junior Tranche instant withdrawal"}</div>
                    <div><span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{modalPlatform}</span></div>
                    <div><span className="left-img-txt" style={{ backgroundImage: `url(${modalImage})` }}>{modalToken}</span></div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <p className="modal-desc">Withdrawal amount</p>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend onClick={() => setDepositAmount(availableBalance)}>
                    <InputGroup.Text id="withdrawal-amount">MAX</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Withdrawal Amount"
                    aria-label="Withdrawal Amount"
                    aria-describedby="withdrawal-amount"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    />
                </InputGroup>
                <p className="modal-desc">Available Balance: {availableBalance} jr{modalToken}-auto</p>
                {
                    type == 0 &&
                    <div>
                        <p className="modal-desc">Wait Time: {waitTime}</p>
                        <div className="desc-section">
                        </div>
                    </div>
                }
                {
                    type == 1 &&
                    <div>
                        <div>
                            <p className="modal-desc">Exchange Rate: 1 jr{modalToken}-auto to {exchangeRate} {modalToken}</p>
                            <p className="modal-desc">Forfeited Balance: {forfeits} {modalToken}</p>
                        </div>
                        <div className="desc-section">
                            <p>Minimum you will receive: <span>0.00</span> {modalToken}</p>
                        </div>
                    </div>
                }
              
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleWithdrawalConfirm}>Confirm</Button>
            </Modal.Footer>
          </Modal>
        </>
	);
}
