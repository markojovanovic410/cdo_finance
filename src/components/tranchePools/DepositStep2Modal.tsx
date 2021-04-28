import React, {useState} from 'react'
import { InputGroup, Row, Col, FormControl, Modal } from 'react-bootstrap';
import { Button } from '../button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

interface DepositStep2ModalProps{
    showModal: 	boolean,
    parentCallback: any,
    modalPlatform: string,
    modalImage: string,
    modalToken: string,
    type: number,
}

export const DepositStep2Modal = ({ showModal, parentCallback, modalPlatform, modalImage, modalToken, type }: DepositStep2ModalProps) => {
  const [durationType, setDurationType] = useState(1);
  const handleModalClose = () => {
        parentCallback(false, false);
    };
    const handleDepositBefore = () => {
        parentCallback(false, true);
    };
    const handleDepositConfirm = () => {
        parentCallback(false, false);
    };
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date(),
    );
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const handleDuration = (type: number) => {
        setDurationType(type)
      };
	return (
		<>
			<Modal dialogClassName="deposit-step2-modal" show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <button className="back" onClick={handleDepositBefore}><span style={{ backgroundImage: 'url("/images/icons/gt.png")' }}>Back</span></button>
                <div>
                    <div>{type == 0 ? "Senior Tranche Deposit" : "Junior Tranche Deposit"}</div>
                    <div><span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{modalPlatform}</span></div>
                    <div><span className="left-img-txt" style={{ backgroundImage: `url(${modalImage})` }}>{modalToken}</span></div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <p className="modal-desc">Deposit amount</p>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="deposit-amount">MAX</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Deposit Amount"
                    aria-label="Deposit Amount"
                    aria-describedby="deposit-amount"
                    value="0.00"
                    />
                </InputGroup>
                <p className="modal-desc">Available Balance: 0.00 {modalToken}</p>
                {
                    type == 0 &&
                    <div>
                        <div className="date-section">
                            <Row>
                                <Col className="max-days">
                                    <p className="modal-desc">Maturity date</p>
                                    <div>Max 356 days</div>
                                </Col>
                                <Col className="select-date">
                                    <p className="modal-desc">Select date</p>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            inputFormat="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => (
                                            <TextField
                                                id="date-picker-desktop"
                                                margin="normal"
                                                {...params}
                                                variant="standard"
                                            />
                                            )}
                                            OpenPickerButtonProps={{
                                            'aria-label': 'change date',
                                            }}
                                        />
                                        </LocalizationProvider>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="duration-section">
                            <p className="modal-desc">Select duration</p>
                            <div className="duration">
                                <div className={durationType == 0 ? "active" : ""} onClick={() => handleDuration(0)}>1 month</div>
                                <div className={durationType == 1 ? "active" : ""} onClick={() => handleDuration(1)}>3 months</div>
                                <div className={durationType == 2 ? "active" : ""} onClick={() => handleDuration(2)}>6 months</div>
                                <div className={durationType == 3 ? "active" : ""} onClick={() => handleDuration(3)}>1 year</div>
                            </div>
                        </div>
                        <div className="detail-section">
                            <div className="clearfix title">
                                <p className="float-left">Transaction details</p>
                                <p className="float-right"><img src="/images/icons/setting-icon.png" /></p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Slippage tolerance <img src="/images/icons/circle-info-icon.png" /></p>
                                <p className="float-right">0.5%</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Transaction deadline <img src="/images/icons/circle-info-icon.png" /></p>
                                <p className="float-right">20 minutes</p>
                            </div>
                        </div>
                        <div className="desc-section">
                            <p>Guaranteed APY: <span>0.00</span> %</p>
                            <p>Redeemable amount at maturity after 5% platform fee on gains of <span>0.00</span> {modalToken}: <span>0.00</span> {modalToken}</p>
                        </div>
                    </div>
                }
                {
                    type == 1 &&
                    <div>
                        <p className="modal-desc">Exchange Rate: 1 jr{modalToken}-auto to 130 {modalToken}</p>
                        <div className="detail-section">
                            <div className="clearfix title">
                                <p className="float-left">Transaction details</p>
                                <p className="float-right"><img src="/images/icons/setting-icon.png" /></p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Slippage tolerance <img src="/images/icons/circle-info-icon.png" /></p>
                                <p className="float-right">0.5%</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Transaction deadline <img src="/images/icons/circle-info-icon.png" /></p>
                                <p className="float-right">20 minutes</p>
                            </div>
                        </div>
                        <div className="desc-section">
                            <p>Platform fee (0.5%): <span>0.00</span> {modalToken}</p>
                            <p>You will receive minimum of <span>0.00</span> jrBNB-auto</p>
                        </div>
                    </div>
                }
              
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleDepositConfirm}>Confirm</Button>
            </Modal.Footer>
          </Modal>
        </>
	);
}