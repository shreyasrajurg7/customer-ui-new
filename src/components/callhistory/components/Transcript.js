import { Flex, Space, Typography } from 'antd';
import React from 'react';
import { Colors } from '../helpers';
import { randomTranscriptData } from '../mock-data';


const { Text } = Typography;


export const Transcripts = () => {
  const renderTranscript = ({ time, transcript, isComplete }) => {
    return (
      <Flex className='call-history__transcript-wrapper'>
        <Text style={{ color: Colors.textLight }}>{time}</Text>
        <Flex className={`call-history__transcript ${isComplete ? 'completed' : ''}`}>
          <Text>{transcript}</Text>
        </Flex>
      </Flex>
    );
  };
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Text style={{ color: Colors.text, fontSize: 18, marginTop: 14 }}>Call Transcript</Text>
      <Space className='scroll-container' style={{maxHeight: '30vh', overflow: 'auto'}} direction='vertical'>
        {
          randomTranscriptData.map((item, i) => {
            return renderTranscript({ time: item.time, transcript: item.transcript, isComplete: i < 2 })
          })
        }
      </Space>
    </Space>
  );
};
