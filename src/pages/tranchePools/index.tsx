import {useState} from 'react'

import { Tab, Nav, Modal } from 'react-bootstrap';
import { Header } from "../../layouts/header";
import { Navigation } from "../../layouts/navigation";
import { PageContainer } from "../../components/pageContainer";
import { InfoContainer } from "../../components/infoContainer";
import { YourPositions } from "../../components/tranchePools";
import DataTable from 'react-data-table-component';
import { Button } from '../../components/button';

import { Info } from "../../components/info";
import BigNumber from "bignumber.js";
import "./index.scss";

export function TranchePools() {
  let totalPoolValue = new BigNumber(1339795194.76)
  let myPoolValue = new BigNumber(1029.78)

  const avaiable_data = [
                { id: 1, platform: 'Autofarm', token: 'BNB', token_img:'/images/icons/bnb.svg', senior_tvl:'2,779,040.29', junior_tvl: '2,779,040.29', senior_apy:2.12, junior_apy:2.12, originator_apy:2.12, jrtoken_rate: '123.12', balance:'123.12', balance_jr:'91.32' }, 
                
                { id: 2, platform: 'Autofarm', token: 'BUSD', token_img:'/images/icons/busd.png', senior_tvl:'2,779,040.29', junior_tvl: '2,779,040.29', senior_apy:2.12, junior_apy:2.12, originator_apy:2.12, jrtoken_rate: '123.12', balance:'123.12', balance_jr:'91.32'  }, 
                
                { id: 3, platform: 'Autofarm', token: 'BTCB', token_img:'/images/icons/btcb.jpg', senior_tvl:'2,779,040.29', junior_tvl: '2,779,040.29', senior_apy:2.12, junior_apy:2.12, originator_apy:2.12, jrtoken_rate: '123.12', balance:'123.12', balance_jr:'91.32'  }, 
            ];
  const avaiable_columns = [
      {
          name: 'PLATFORM',
          cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{row.platform}</span>,
          grow: 1,
      },
      {
          name: 'TOKEN',
          cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: `url(${row.token_img})` }}>{row.token}</span>,
          grow: 0.5,
      },
      {
          name: 'SENIOR TVL',
          cell: (row:any) => <>{row.senior_tvl} {row.token}</>,
          grow: 1.1,
      },
      {
          name: 'SENIOR APY',
          cell: (row:any) => <>{row.senior_apy}%</>,
          grow: 0.5,
      },
      {
          name: 'JUNIOR TVL',
          cell: (row:any) => <>{row.junior_tvl} {row.token}</>,
          grow: 1.1,
      },
      {
          name: 'JUNIOR APY',
          cell: (row:any) => <>{row.junior_apy}%</>,
          grow: 0.5,
      },
      {
          name: 'ORIGINATOR APY',
          cell: (row:any) => <>{row.originator_apy}%</>,
          grow: 0.5,
      },
      {
          name: 'JRTOKEN CONVERSION RATE',
          cell: (row:any) => <>1 jr{row.token}-auto = {row.jrtoken_rate} {row.token}</>,
          grow: 1.7,
      },
      {
          name: 'YOUR BALANCE',
          cell: (row:any) => <>{row.balance} {row.token}<br />{row.balance_jr} jr{row.token}-auto</>,
          grow: 1.4,
      },
      {
          name: '',
          cell: () => <div className="td-actions ml-auto"><Button onClick={handleModalShow}>Deposit</Button></div>,
          grow: 1.6,
      },
  ];

  const [depositModalShow, setDepositModalShow] = useState(false);
  const handleModalClose = () => setDepositModalShow(false);
  const handleModalShow = () => setDepositModalShow(true);

  return (
    <div className="tranchePools">
      <Header />
      <div className="trachePoolsContainer">
        <Navigation />
        <PageContainer>
          <InfoContainer>
            <Info title="Total Pool Info">
              <div className="infoAmount">${totalPoolValue.toFormat(2)}</div>
              <div className="infoText">total deposits</div>
            </Info>
            <Info title="Your Info">
              <div className="infoAmount">${myPoolValue.toFormat(2)}</div>
              <div className="infoText">total deposits</div>
            </Info>
          </InfoContainer>
          <Tab.Container defaultActiveKey="tab_tranche_pools">
            <Nav variant="pills" className="tab-list nav-tranchePools">
                <Nav.Item>
                    <Nav.Link eventKey="tab_tranche_pools"  className="tab-item">Available Tranche Pools</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="tab_your_positions"  className="tab-item">Your Positions</Nav.Link>
                </Nav.Item>
            </Nav>
    
            <Tab.Content>
                <Tab.Pane eventKey="tab_tranche_pools">
                    <DataTable
                        className="cdo-datatable table-avaiable-pools"
                        columns={avaiable_columns}
                        data={avaiable_data}
                        pagination = {false}
                    />
                </Tab.Pane>
                <Tab.Pane eventKey="tab_your_positions">
                    <YourPositions senior_balance={100.23} senior_apy={23.00} junior_balance={30.12} junior_apy={19.00} />
                </Tab.Pane>
              </Tab.Content>
          </Tab.Container>
          <Modal dialogClassName="deposit-modal" show={depositModalShow} onHide={handleModalClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
              <Modal.Header closeButton>
                <Modal.Title>Modal Title</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              </Modal.Body>
              <Modal.Footer>
                
              </Modal.Footer>
          </Modal>
        </PageContainer>
      </div>
    </div>
  );
}
