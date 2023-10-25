import { Flex, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Colors } from '../helpers';

const { Text } = Typography;

const data = [
  { in_out_network: 'in-network' },
  { individual_coinsurance_facility_complex_imaging: '90%' },
  { individual_copay_facility_complex_imaging: 'zero dollars' },
  { deductible_waived: 'applies' },
  { individual_coinsurance_complex_imaging_professional_component: '90%' },
  { individual_copay_complex_imaging_professional_component: 'zero dollars' },
  { deductible_waived: 'applies' },
  { individual_deductible: '$250' },
  { individual_deductible_met: 'met' },
  { individual_coinsurance_limit: 'not included' },
  { individual_deductible: '$500' },
  { individual_deductible_met: 'met' },
  { individual_coinsurance_limit: 'not included' },
  { individual_coinsurance_limit: '1500 dollars' },
  { remaining_individual_coinsurance_limit: '$1419.57 cents' },
  { family_coinsurance_limit: '$3000' },
  { remaining_family_coinsurance_limit: '$2794.72 cents' },
  { individual_annual_maximum_copay_limit: '$4800' },
  { remaining_individual_annual_maximum_copay_limit: '$4760' },
];

const moreCallDetails = {
  'Conversation ID': '12in4erf398h12',
  'Start Time Stamp': '13-09-2023 11:30:41',
  'End Time Stamp': '13-09-2023 11:43:17',
  'Total Duration': '4 hrs 12 min',
  'Caller Name': 'John Doe',
};

const transferCallDetails = {
  'Caller Name': 'John Doe',
  'Conversation ID': '12in4erf398h12',
  'Total Duration': '4 hrs 12 min',
  'Start Time Stamp': '13-09-2023 11:30:41',
  'End Time Stamp': '13-09-2023 11:43:17',
};

export const CallSummary = () => {
  const renderKeyValues = ({ key, value }) => {
    return (
      <Flex justify='space-between'>
        <Flex style={{ width: '70%' }}>
          <Text style={{ color: Colors.text, fontSize: 12 }}>{key}</Text>
        </Flex>
        <Flex style={{ width: '30%', marginLeft: 'auto' }}>
          <Text style={{ color: Colors.textLight, fontSize: 12, marginRight: 8 }}>:</Text>
          <Text style={{ color: Colors.textLight, fontSize: 12 }}>{value}</Text>
        </Flex>
      </Flex>
    );
  };
  return (
    <Space direction='vertical' className='call-summary-copay-wrapper'>
      <Typography style={{ color: Colors.text, fontSize: 18, marginTop: 14 }}>Call Summary: Copays</Typography>
      <Flex vertical gap={4} style={{ maxHeight: '40vh' }} className='scroll-container'>
        {data.map((item) => {
          const [key, value] = Object.entries(item).flat();
          return renderKeyValues({ key, value });
        })}
      </Flex>
    </Space>
  );
};

export const MoreCallDetails = () => {
  const [activeTab, setActiveTab] = useState('more-details');

  const data = {
    'more-details': moreCallDetails,
    'transfer-details': transferCallDetails,
  }

  const renderKeyValues = ({ key, value }) => {
    return (
      <Flex justify='space-between' style={{ width: '100%' }}>
        <Text style={{ color: Colors.text, fontSize: 12, width: '50%', paddingLeft: 20 }}>{key}</Text>
        <Text style={{ color: Colors.textLight, fontSize: 12, width: '20%' }}>:</Text>
        <Text style={{ color: Colors.textLight, fontSize: 12, width: '30%', marginLeft: 'auto' }}>{value}</Text>
      </Flex>
    );
  };
  return (
    <Space className='call-summary-more-wrapper' direction='vertical'>
      <Flex className='call-summary-more-headers-wrapper'>
        <div className={`more-details ${activeTab === 'more-details' ? 'active' : ''}`} onClick={() => setActiveTab('more-details')}>
          <Text style={{ color: Colors.text, fontSize: 12 }}>More Call Details</Text>
        </div>
        <div className={`transfer-details ${activeTab === 'transfer-details' ? 'active' : ''}`} onClick={() => setActiveTab('transfer-details')}>
          <Text style={{ color: Colors.text, fontSize: 12 }}>More Call Details</Text>
        </div>
      </Flex>
      <Flex vertical gap={4}>
          {
            Object.entries(data[activeTab]).map(([key, value]) => {
              return renderKeyValues({key, value})
            })
          }
      </Flex>
    </Space>
  )
};
