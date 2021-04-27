import React, {useState, useEffect, useRef} from 'react'
import { Tab, Nav } from 'react-bootstrap';
import { Button } from '../button';
import DataTable from 'react-data-table-component';

export const YPJuniorTrancheBody = () => {
  const ap_data = [
    { id: 1, platform: 'Autofarm', token: 'BNB', token_img:'/images/icons/bnb.svg', balance:'567', apy:2.12, wait_time: '2 days 12 hrs 4 min 5 sec' }, 
                
    { id: 2, platform: 'Autofarm', token: 'BUSD', token_img:'/images/icons/busd.png', balance:'567', apy:2.12, wait_time: '2 days 12 hrs 4 min 5 sec'}, 
                
    { id: 3, platform: 'Autofarm', token: 'BTCB', token_img:'/images/icons/btcb.jpg', balance:'567', apy:2.12, wait_time: '2 days 12 hrs 4 min 5 sec'}, 
  ];

  const ap_columns = [
    {
      name: 'PLATFORM',
      cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{row.platform}</span>,
    },
    {
        name: 'TOKEN',
        cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: `url(${row.token_img})` }}>{row.token}</span>,
    },
    {
        name: 'CURRENT BALANCE',
        cell: (row:any) => <>{row.balance} jr{row.token}-auto</>,
    },
    {
        name: 'APY',
        cell: (row:any) => <>{row.apy}%</>,
    },
    {
        name: 'WITHDRAWAL WAIT TIME',
        selector: 'wait_time',
    },
    {
        name: '',
        cell: () => <div className="td-actions ml-auto"><Button>Withdraw</Button></div>,
    },
  ];

  const lp_data = [
    { id: 1, platform: 'Autofarm', token: 'BNB', token_img:'/images/icons/bnb.svg', redeemable_balance:'567', time_left: '2 days 12 hrs 4 min 5 sec' }, 
    
    { id: 2, platform: 'Autofarm', token: 'BUSD', token_img:'/images/icons/busd.png', redeemable_balance:'567', time_left: '2 days 12 hrs 4 min 5 sec'}, 
    
    { id: 3, platform: 'Autofarm', token: 'BTCB', token_img:'/images/icons/btcb.jpg', redeemable_balance:'567', time_left: '2 days 12 hrs 4 min 5 sec' }, 
  ];

  const lp_columns = [
    {
        name: 'PLATFORM',
        cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: 'url("/images/icons/autofarm.png")' }}>{row.platform}</span>,
    },
    {
        name: 'TOKEN',
        cell: (row:any) => <span className="left-img-txt" style={{ backgroundImage: `url(${row.token_img})` }}>{row.token}</span>,
    },
    {
        name: 'REDEEMABLE BALANCE',
        cell: (row:any) => <>{row.redeemable_balance} jr{row.token}-auto</>,
    },
    {
        name: 'TIME LEFT',
        selector: 'time_left',
    },
  ];

  const pp_data = [
    { id: 1, platform: 'Autofarm', token: 'BNB', token_img:'/images/icons/bnb.svg', withdrawn:'567', forfeits:'2,779,040.29', received: '2,779,040.29', withdraw_type: '2 step / Instant withdraw', transaction_time: '12/12/2020 03:12:45' }, 
    
    { id: 2, platform: 'Autofarm', token: 'BUSD', token_img:'/images/icons/busd.png', withdrawn:'567', forfeits:'2,779,040.29', received: '2,779,040.29', withdraw_type: '2 step / Instant withdraw', transaction_time: '12/12/2020 03:12:45'}, 
    
    { id: 3, platform: 'Autofarm', token: 'BTCB', token_img:'/images/icons/btcb.jpg', withdrawn:'567', forfeits:'2,779,040.29', received: '2,779,040.29', withdraw_type: '2 step / Instant withdraw', transaction_time: '12/12/2020 03:12:45' }, 
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
        name: 'TOKENS WITHDRAWN',
        cell: (row:any) => <>{row.withdrawn} jr{row.token}-auto</>,
    },       
    {
        name: 'FORFEITS',
        cell: (row:any) => <>{row.forfeits} {row.token}</>,
    },    
    {
        name: 'TOKENS RECEIVED',
        cell: (row:any) => <>{row.received} {row.token}</>,
    },
    {
        name: 'WITHDRAW TYPE',
        selector: 'withdraw_type',
    },    
    {
        name: 'TRANSACTION HASH / TIMESTAMP',
        selector: 'transaction_time',
    },
  ];

	return (
		<>
      <div className="tranche_txt1 mb-3"><b>Total BALANCE</b>$ 2,139,934.09</div>
	    <Tab.Container defaultActiveKey="tab_activePositions">
          <Nav className="tab-list nav-juniorTranche">
              <Nav.Item>
                  <Nav.Link eventKey="tab_activePositions"  className="tab-item">Active Positions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link eventKey="tab_lockedPositions"  className="tab-item">Locked Positions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link eventKey="tab_pastPositions"  className="tab-item">Past Positions</Nav.Link>
              </Nav.Item>
          </Nav>
  
          <Tab.Content>
              <Tab.Pane eventKey="tab_activePositions">
                  <DataTable
                        className="cdo-datatable"
                        columns={ap_columns}
                        data={ap_data}
                        pagination = {false}
                    />
              </Tab.Pane>
              <Tab.Pane eventKey="tab_lockedPositions">
                  <DataTable
                        className="cdo-datatable"
                        columns={lp_columns}
                        data={lp_data}
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
 		</>
	);
}