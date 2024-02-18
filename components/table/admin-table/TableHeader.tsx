import { SearchContainter, TableButton } from '@/styles/table.styles';
import React, { useRef } from 'react';
import { Button, Input, InputRef } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  MinusOutlined,
  UserOutlined,
} from '@ant-design/icons';

const TableHeader = ({
  searchInput,
}: {
  searchInput: React.RefObject<any>;
}) => {
  return (
    <>
      <div>
        <SearchContainter style={{ marginLeft: 0 }}>
          <Input
            ref={searchInput}
            placeholder={'Search'}
            onChange={e => (e.target.value ? [e.target.value] : [])}
            prefix={<SearchOutlined rev={undefined} />}
            style={{ width: 1000, display: 'flex' }}
          />
          <Button
            icon={<PlusOutlined rev={undefined} />}
            onClick={() => {}}
            style={{
              width: 50,
              marginLeft: 10,
              borderRadius: 100,
              backgroundColor: 'darkgray',
              color: 'whitesmoke',
            }}></Button>
          <Button
            icon={<MinusOutlined rev={undefined} />}
            onClick={() => {}}
            style={{
              width: 50,
              marginLeft: 10,
              borderRadius: 100,
              backgroundColor: 'darkgray',
              color: 'whitesmoke',
            }}></Button>
          <Button
            icon={<UserOutlined rev={undefined} />}
            onClick={() => {}}
            style={{
              width: 250,
              marginLeft: 10,
              backgroundColor: 'darkgray',
              color: 'whitesmoke',
            }}>
            Your Account
          </Button>
        </SearchContainter>
      </div>
    </>
  );
};

export default TableHeader;
