import React, { useState } from 'react';
import { AutoComplete, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Colors } from '../helpers';
import { useCallHistoryProvider } from '../context/CallHIstoryContext';
const { Text } = Typography;

const SearchIcon = <SearchOutlined style={{ fontSize: 18, color: Colors.text }} />;

export const SearchInput = ({ placeholder, searchInput, setSearchInput, className }) => (
  <Input addonBefore={SearchIcon} placeholder={placeholder} className={`call-history__searchInput ${className || ''}`} value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
);
 
const searchResult = (data) => {
  return (
    data?.map((item) => {
      return {
        value: item.member_name,
        id: item.member_id,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              background: Colors.bgLite,
              cursor: 'pointer',
            }}
          >
            <Text style={{ color: Colors.textLight, fontSize: 14 }}>{item.member_name}</Text>             
          </div>
        ),
      };
    })
  )
} 

export const AutoCompleteInput = ({ className }) => {
  const [options, setOptions] = useState([]);
  const { callerList, fetchPatientCallData, setSelectedMember } = useCallHistoryProvider();

  const handleSearch = (value) => {
    if (!value) setOptions([]);
    const data = callerList?.filter(item => {
      return item.member_name?.toLowerCase().includes(value?.toLowerCase());
    })
    setOptions(searchResult(data));
  };

  const onSelect = (value, option) => {
    console.log('onSelect', value, option);
    const id = option?.id;
    if (id) {
      setSelectedMember(id);
      fetchPatientCallData(id);
    }
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={'100%'}
      style={{ width: '100%' }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      size="large"
      dropdownStyle={{
        background: Colors.bgLite
      }}
    >
      <Input addonBefore={SearchIcon} placeholder={'Type a Name'} className={`call-history__searchInput ${className || ''}`} />
    </AutoComplete>
  );
};
