import React, { useState } from 'react';
import { UserInfoCard, SearchInput, Transcripts, CallSummary, MoreCallDetails } from './../components';
import { Space } from 'antd';


export const CallSummaryInfo = () => {
  return (
    <Space direction='vertical' size='middle' className='call-history__call-summary'>
      <CallSummary />
      <MoreCallDetails />
    </Space>
  )
}
