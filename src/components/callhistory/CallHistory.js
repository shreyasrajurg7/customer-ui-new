import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { UserList, AudioVisualizerWithTranscription } from './widgets';
import './CallHistory.css';
import { CallSummaryInfo } from './widgets/CallSummary';

export const CallHistory = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div style={{ padding: '1vh', margin: 'auto', border: '1px solid #000', maxWidth: '1440px', height: '82vh' }} className='call-history'>
      <Row style={{ width: '100%' }}>
        <Col span={6} style={{ height: '85vh'}}>
         <div className='call-history-user-list-wrapper' style={{ width: '22vw'}}>
          <UserList setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
         </div>
        </Col>
        <Col span={9} style={{ height: '85vh'}}>
          <div className='call-history-audio-visualizer-wrapper' style={{ width: '32vw'}}>
            <AudioVisualizerWithTranscription />
          </div>
        </Col>
        <Col span={9} style={{ height: '85vh'}}>
          <div className='call-history-call-summary-wrapper' style={{ width: '100%'}}>
            <CallSummaryInfo />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CallHistory;