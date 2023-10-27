import React, { useEffect, useState } from 'react';
import { Flex, Space } from 'antd';
import { SortingDropDown, SearchInput, UserCard, AutoCompleteInput } from './../components';
import { filterUserData, sortUsers } from '../helpers';
import { userData } from '../mock-data';
import { useCallHistoryProvider } from '../context/CallHIstoryContext';


export const UserList = ({ setSelectedUser, selectedUser }) => {
  const [searchInput, setSearchInput] = useState('');
  const [sortValue, setSortValue] = useState('date');
  //const sortedData = sortUsers(data, sortValue);
  const { getUniquePatientData, callerList, fetchPatientCallData, callList, selectedCall, handleCallSelect } = useCallHistoryProvider();
  console.log({ callerList })
  useEffect(() => {
    getUniquePatientData("", "", "hunnurji@voicecare.ai", "test-session-id");   
  }, [])

// {
//   call_end_time: "2023-05-10 12:30:59";
//   call_id: "ZCZRhK5HraJPSXLfgobJKL";
//   call_start_time: "2023-05-10 12:30:15";
//   caller_handler_type: "bot";
//   member_id: "m1234501";
//   member_name: null;
// }
  const renderUserCardList = () => {
    return (
      <Flex vertical gap={10} className='scroll-container' style={{ maxHeight: '65vh'}}>
        {
          callList.map(item => {
            return (
              <UserCard
                key={item.call_id}
                username={item.member_name}
                datetime={item.call_start_time}
                onClick={() => handleCallSelect(item.call_id)}
                selectedUser={selectedCall}
                isActive={selectedCall === String(item.call_id)}
                handlerType={item.caller_handler_type}
              />
            )
          })
        }
      </Flex>
    )
  }
  return (
    <Space direction='vertical' size='middle' className='call-history__user-list'>
      <AutoCompleteInput />
      <SortingDropDown sortValue={sortValue} setSortValue={setSortValue} />
      {renderUserCardList()}
    </Space>
  );
};
