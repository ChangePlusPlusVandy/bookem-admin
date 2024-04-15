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
  setShowPopup,
  showPopup,
  setShowPopupTag,
  showPopupTag,
  searchInput,
}: {
  setShowPopup: (a: boolean) => void;
  showPopup: boolean;
  setShowPopupTag: (a: boolean) => void;
  showPopupTag: boolean;
  searchInput: React.RefObject<any>;
}) => {
  return (
    <>
      <div>
        <SearchContainter style={{ marginLeft: 0 }}>
          <Button
            icon={<PlusOutlined rev={undefined} />}
            onClick={() => setShowPopup(!showPopup)}
            style={{
              width: 50,
              marginLeft: 1000,
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
