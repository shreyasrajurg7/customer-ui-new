import { Flex, Space, Typography } from 'antd';
import React from 'react';
import { Colors, convertMsToTime } from '../helpers';
import { randomTranscriptData } from '../mock-data';
import { useCallHistoryProvider } from '../context/CallHIstoryContext';


const { Text } = Typography;



export const Transcripts = () => {
  const { callContent } = useCallHistoryProvider();
  const { call_transcription_fragment } = callContent || {};
  
  const renderTranscript = ({ telecom_persona_type, time_end, text, time_start}) => {
    const time = convertMsToTime(new Date(time_end) - new Date(time_start))
    const isComplete = false // TODO: 
    return (
      <Flex className='call-history__transcript-wrapper'>
        <Text style={{ color: Colors.textLight }}>{telecom_persona_type} {time}</Text>
        <Flex className={`call-history__transcript ${isComplete ? 'completed' : ''}`}>
          <Text>{text}</Text>
        </Flex>
      </Flex>
    );
  };
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Text style={{ color: Colors.text, fontSize: 18, marginTop: 14 }}>Call Transcript</Text>
      <Space className='scroll-container' style={{maxHeight: '30vh', overflow: 'auto'}} direction='vertical'>
        {
          call_transcription_fragment?.map((item, i) => {
            return renderTranscript(item)
          })
        }
      </Space>
    </Space>
  );
};
