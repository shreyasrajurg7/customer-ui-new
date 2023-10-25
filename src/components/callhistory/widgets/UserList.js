import React, { useState } from 'react';
import { Flex, Space } from 'antd';
import { SortingDropDown, SearchInput, UserCard } from './../components';
import { filterUserData, sortUsers } from '../helpers';
import { userData } from '../mock-data';


export const UserList = ({ setSelectedUser, selectedUser }) => {
  const [searchInput, setSearchInput] = useState('');
  const [sortValue, setSortValue] = useState('date');
  const data = filterUserData(userData, searchInput);
  const sortedData = sortUsers(data, sortValue);

  const renderUserCardList = () => {
    return (
      <Flex vertical gap={10} className='scroll-container' style={{ maxHeight: '65vh'}}>
        {
          sortedData.map(item => {
            return (
              <UserCard
                key={item.id}
                username={item.username}
                datetime={item.dateTime}
                onClick={() => setSelectedUser(item.id)}
                selectedUser={selectedUser}
                isActive={selectedUser === String(item.id)}
              />
            )
          })
        }
      </Flex>
    )
  }
  return (
    <Space direction='vertical' size='middle' className='call-history__user-list'>
      <SearchInput placeholder={'Type a Name'} searchInput={searchInput} setSearchInput={setSearchInput} />
      <SortingDropDown sortValue={sortValue} setSortValue={setSortValue} />
      {renderUserCardList()}
    </Space>
  );
};
