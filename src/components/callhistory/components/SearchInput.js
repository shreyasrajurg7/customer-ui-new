import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Colors } from '../helpers';

const SearchIcon = <SearchOutlined style={{ fontSize: 18, color: Colors.text }} />;

export const SearchInput = ({ placeholder, searchInput, setSearchInput, className }) => (
  <Input addonBefore={SearchIcon} placeholder={placeholder} className={`call-history__searchInput ${className || ''}`} value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
);