import React, {useState, useEffect, useRef} from 'react'
import { Tab, Nav, Modal } from 'react-bootstrap';
import { Button } from '../button';
import DataTable from 'react-data-table-component';
import { RedeemModal } from './RedeemModal';
import { TransferModal } from './TransferModal';

export const YPSeniorTrancheBody = () => {

    const fee = "100";
    const maturity_date = "12/11/2020"
    const address_str = "123 Apple Road, Singapore"
  
  const ap_data = [
    { id: 1, platform: 'Autofarm', token: 'BNB', token_img:'/images/icons/bnb.svg', deposits:'2,779,040.29', redemable: '2,779,040.29', apy:2.12, time_left: '2 days 12 hrs 4 min 5 sec' }, 
                
    { id: 2, platform: 'Autofarm', token: 'BUSD', token_img:'/images/icons/busd.png', deposits:'2,779,040.29', redemable: '2,779,040.29', apy:2.12, time_left: '2 days 12 hrs 4 min 5 sec' }, 
                
    { id: 3, platform: 'Autofarm', token: 'BTCB', token_img:'/images/icons/btcb.jpg', deposits:'2,779,040.29', redemable: '2,779,040.29', apy:2.12, time_left: '2 days 12 hrs 4 min 5 sec' }, 
  ];

  const ap_columns = [
    {
      name: 'PLATFORM',
      cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{row.platform}</span>,
    },
    {
        name: 'TOKEN',
        cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: `url(${row.token_img})` }}>{row.token}</span>,
        grow: 0.6,
    },
    {
        name: 'DEPOSITS',
        cell: (row:any) => <>{row.deposits} {row.token}</>,
    },
    {
        name: 'REDEMABLE',
        cell: (row:any) => <>{row.redemable} {row.token}</>,
    },
    {
        name: 'APY',
        cell: (row:any) => <>{row.apy}%</>,
        grow: 0.4,
    },
    {
        name: 'TIME LEFT UNTIL MATURITY',
        selector: 'time_left',
        grow: 1.2,
    },
    {
        name: '',
        cell: (row:any) => <div className="td-actions ml-auto"><span className="btn-transfer"  onClick={() => handleTransferModalShow(row.platform, row.token_img, row.token, row.redemable, row.deposits, row.apy, maturity_date, address_str)}>Transfer</span><Button onClick={() => handleRedeemModalShow(row.platform, row.token_img, row.token, row.redemable, fee)}>Redeem</Button></div>,
        grow: 1.8,
    },
  ];

  const pp_data = [
    { id: 1, platform: 'Autofarm', token: 'BNB', token_img:'/images/icons/bnb.svg', deposits:'2,779,040.29', amount_received: '2,779,040.29', apy:2.12, transaction_time: '12/12/2020 03:12:45' }, 
    
    { id: 2, platform: 'Autofarm', token: 'BUSD', token_img:'/images/icons/busd.png', deposits:'2,779,040.29', amount_received: '2,779,040.29', apy:2.12, transaction_time: '12/12/2020 03:12:45'}, 
    
    { id: 3, platform: 'Autofarm', token: 'BTCB', token_img:'/images/icons/btcb.jpg', deposits:'2,779,040.29', amount_received: '2,779,040.29', apy:2.12, transaction_time: '12/12/2020 03:12:45' }, 
  ];

  const pp_columns = [
    {
        name: 'PLATFORM',
        cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{row.platform}</span>,
    },
    {
        name: 'TOKEN',
        cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: `url(${row.token_img})` }}>{row.token}</span>,
    },
    {
        name: 'DEPOSITS',
        cell: (row:any) => <>{row.deposits} {row.token}</>,
    },    
    {
        name: 'APY',
        cell: (row:any) => <>{row.apy}%</>,
    },
    {
        name: 'AMOUNT RECEIVED AT MATURITY',
        cell: (row:any) => <>{row.amount_received} {row.token}</>,
    },
    {
        name: 'TRANSACTION HASH / TIMESTAMP',
        selector: 'transaction_time',
    },
  ];
  const [redeemModalShow, setRedeemModalShow] = useState(false);
  const [transferModalShow, setTransferModalShow] = useState(false);
  const [tokenPlatform, setTokenPlatform] = useState("");
  const [tokenImage, setTokenImage] = useState("");
  const [token, setToken] = useState("");
  const [redeemableAmount, setRedeemableAmount] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [depositedAmount, setDepositedAmount] = useState("");
  const [guaranteedApy, setGuaranteedApy] = useState(0);
  const [maturityDate, setMaturityDate] = useState("");
  const [address, setAddress] = useState("");
  const handleRedeemModalShow = (platform: string, token_img: string, token: string, redeemable_amount: string, fee: string) => {
    setTokenPlatform(platform);
    setTokenImage(token_img);
    setToken(token);
    setRedeemableAmount(redeemable_amount);
    setFeeAmount(fee);
    setRedeemModalShow(true);
  }
  const handleTransferModalShow = (platform: string, token_img: string, token: string, redeemable_amount: string, deposited_amount: string, guaranteed_apy: number, maturity_date: string, address: string) => {
    setTokenPlatform(platform);
    setTokenImage(token_img);
    setToken(token);
    setRedeemableAmount(redeemable_amount);
    setDepositedAmount(deposited_amount);
    setGuaranteedApy(guaranteed_apy);
    setMaturityDate(maturity_date);
    setAddress(address);
    setTransferModalShow(true);
  }
  const redeemModalCallback = (showModal: boolean) => {
    setRedeemModalShow(showModal)
  };
  const transferModalCallback = (showModal: boolean) => {
    setTransferModalShow(showModal)
  };

	return (
		<>
        <div>
	    <Tab.Container defaultActiveKey="tab_activePositions">
          <Nav className="tab-list nav-seniorTranche">
              <Nav.Item>
                  <Nav.Link eventKey="tab_activePositions"  className="tab-item">Active Positions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link eventKey="tab_pastPositions"  className="tab-item">Past Positions</Nav.Link>
              </Nav.Item>
          </Nav>
  
          <Tab.Content>
              <Tab.Pane eventKey="tab_activePositions">
                <div className="tranche_txt1"><b>Total Deposits</b>$ 2,139,934.09</div>
                <div className="tranche_txt1"><b>Total Gain</b>$ 2,139,934.09</div>
                <DataTable
                        className="cdo-datatable"
                        columns={ap_columns}
                        data={ap_data}
                        pagination = {false}
                    />
              </Tab.Pane>
              <Tab.Pane eventKey="tab_pastPositions">
                  <DataTable
                        className="cdo-datatable"
                        columns={pp_columns}
                        data={pp_data}
                        pagination = {false}
                    />
              </Tab.Pane>
          </Tab.Content>
      </Tab.Container>
        <RedeemModal showModal={redeemModalShow} parentCallback = {redeemModalCallback} modalPlatform={tokenPlatform} modalImage={tokenImage} modalToken={token} redeemableAmount={redeemableAmount} feeAmount={feeAmount} />
        <TransferModal showModal={transferModalShow} parentCallback = {transferModalCallback} modalPlatform={tokenPlatform} modalImage={tokenImage} modalToken={token} redeemableAmount={redeemableAmount} depositedAmount={depositedAmount} guaranteedApy={guaranteedApy} maturityDate={maturityDate} address={address} />
      </div>
 		</>
	);
}
