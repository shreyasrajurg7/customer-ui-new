import React, { useState } from 'react';
import { UserInfoCard, SearchInput, Transcripts, CallSummary, MoreCallDetails } from './../components';
import { Space } from 'antd';
import { useCallHistoryProvider } from '../context/CallHIstoryContext';


export const CallSummaryInfo = () => {
  const value = useCallHistoryProvider();
  console.log({ value });
  return (
    <Space direction='vertical' size='middle' className='call-history__call-summary'>
      <CallSummary />
      <MoreCallDetails />
    </Space>
  )
}
