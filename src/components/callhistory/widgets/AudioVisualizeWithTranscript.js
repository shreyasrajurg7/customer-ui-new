import React, { useState } from 'react';
import { UserInfoCard, SearchInput, Transcripts, AudioVisualizer } from './../components';
import { Space } from 'antd';


export const AudioVisualizerWithTranscription = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <Space direction='vertical' size='middle' className='call-history__audio-visual'>
      <UserInfoCard username={'Josh Deo'} patientId={'1235985'}/>
      <SearchInput className={'audio-transcript-search'} searchInput={searchInput} setSearchInput={setSearchInput} placeholder={'Search Transcript'} />
      <AudioVisualizer />
      <Transcripts />
    </Space>
  )
}
