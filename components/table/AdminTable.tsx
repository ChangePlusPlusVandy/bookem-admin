import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Tag } from 'antd';
import useSWR from 'swr';
import { AdminData } from 'bookem-shared/src/types/database';
import {
  BottomRow,
  ButtonText,
  RoundButton,
  SearchContainter,
  StyledTable,
  TableContainer,
} from '@/styles/components/Admin/adminTable.styles';
import { ObjectId } from 'mongodb';
import PopupWindow from '../PopupWindow';
import AdminInfo from '../Admin/AdminInfo';

// TODO: check if the account superadmin
// TODO: extract to utils/types in the future
interface AdminRowData {
  key: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

// TODO: extract to utils/constants in the future
const columns: any = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'View',
    dataIndex: 'seeMore',
    key: 'seeMore',
    render: (_: any) => (
      <Space size="middle">
        <a>See More</a>
      </Space>
    ),
  },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AdminTable = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR<AdminData[]>(
    '/api/admins/',
    fetcher
  );

  const [dataForTable, setDataForTable] = useState<AdminRowData[]>([]);
  const [filterTable, setFilterTable] = useState<AdminRowData[]>([]);
  const [isFiltering, setIsFilter] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && data) {
      setDataForTable(convertUserDataToRowData(data));
    }
  }, [data, isLoading, dataForTable.length]);

  // check for errors and loading
  if (error) return <div>Failed to load admin table</div>;
  if (isLoading) return <div>Loading...</div>;

  // function that determines what the table looks like after a search by the user
  const onTableSearch = async (value: string) => {
    if (value === '') {
      setFilterTable([]);
      setTotalVolunteers(dataForTable.length);
      setIsFilter(false);
      return;
    }

    let filterTable = dataForTable.filter((o: { [x: string]: any }) =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
    setIsFilter(true);
  };

  return (
    <>
      <SearchContainter>
        {showPopup && (
          <PopupWindow hidePopup={() => setShowPopup(false)}>
            <div><AdminInfo></AdminInfo></div>
          </PopupWindow>
        )}
        <Input.Search
          placeholder="Search "
          onSearch={onTableSearch}
          style={{ width: 800 }}
          allowClear
        />
        <RoundButton>
          <ButtonText>+</ButtonText>
        </RoundButton>
        <RoundButton>
        <ButtonText>-</ButtonText>
        </RoundButton>
        <Button
          onClick={() => setShowPopup(true)}
          style={{
            width: 250,
            marginLeft: 90,
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
          }}>
          Your Account
        </Button>
      </SearchContainter>

      <TableContainer>
        <div id="table-container">
          <StyledTable
            dataSource={isFiltering ? filterTable : dataForTable}
            columns={columns}
            pagination={false}
            scroll={{ y: 550 }}
          />
        </div>
      </TableContainer>
      <Button
          style={{
            width: '30%',
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
            alignSelf: 'center',
          }}>
          Log Out
        </Button>
    </>
  );
};

// TODO: move to utils folder
const convertUserDataToRowData = (data: AdminData[]) => {
  const result = data.map((user, index) => {
    return {
      key: index,
      firstName: user.name,
      lastName: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
  });
  return result;
};

export default AdminTable;
function setTotalVolunteers(length: number) {
  throw new Error('Function not implemented.');
}
