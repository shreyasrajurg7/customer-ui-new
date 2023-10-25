import { UserOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Flex, Typography } from 'antd';
import { Colors, formatDateTime } from '../helpers';

const { Text } = Typography;

export const UserCard = ({ avatarSrc, username, datetime, onClick, selectedUser, isActive }) => {
  const { date, time } = formatDateTime(datetime);
  return (
    <Flex direction='horizontal' size={16} className={`call-history__user-card ${isActive ? 'active' :''}`} justify='space-between' onClick={onClick}>
      <Flex justify='center' align='center' gap={10}>
        <Avatar shape='square' size={40} icon={<UserOutlined />} className='call-history__avatar' />
        <Flex vertical gap={1}>
          <Text ellipsis style={{ color: Colors.text, fontWeight: '600' }}>
            {username}
          </Text>
          <Text style={{ color: Colors.textLight, fontSize: 12 }} ellipsis type='secondary'>
            {' '}
            <ArrowUpOutlined style={{ color: Colors.textLight, rotate: '45deg' }} /> Bot Called
          </Text>
        </Flex>
      </Flex>
      <Flex vertical gap={1} style={{}} justify='center' align='end'>
        <Text style={{ color: Colors.textLight, fontSize: 14 }}>{date}</Text>
        <Text style={{ color: Colors.textLight, fontSize: 14 }} type='secondary'>
          {time}
        </Text>
      </Flex>
    </Flex>
  );
};

export const UserInfoCard = ({  username, patientId }) => {
  return (
    <Flex direction='horizontal' size={16} className='call-history__user-card user-info' justify='space-between' style={{ paddingLeft: 0 }}>
      <Flex justify='center' align='center' gap={10}>
        <Avatar shape='square' size={50} icon={<UserOutlined />} className='call-history__avatar' />
        <Flex vertical gap={1}>
          <Text ellipsis style={{ color: Colors.orange, fontWeight: '600', fontSize: 18 }}>
            {username}
          </Text>
          <Text style={{ color: Colors.textLight, fontSize: 16 }} ellipsis type='secondary'>
            Patient ID: {patientId}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};


