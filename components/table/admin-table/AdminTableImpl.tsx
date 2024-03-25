import React, { useState } from 'react';
import { Button, Table, TableProps, message } from 'antd';
import type {
  ColumnType,
  ColumnsType,
  SorterResult,
} from 'antd/es/table/interface';
import { ArrowRightOutlined } from '@ant-design/icons';
import { TableContainer } from '@/styles/table.styles';
import CreateAdminPopupWindow from '@/components/Forms/CreateAdminPopupWindow';
import { AdminDataIndex, AdminRowData } from '@/utils/table-types';
import TableHeader from '../admin-table/TableHeader';

/**
 * Contains the "UI" part of Event Table
 * @returns
 */
const AdminTableImpl = ({
  getColumnSearchProps,
  sortedInfo,
  handleChange,
  dataForTable,
  searchInput,
}: {
  getColumnSearchProps: (dataIndex: AdminDataIndex) => ColumnType<AdminRowData>;
  sortedInfo: SorterResult<AdminRowData>;
  handleChange: TableProps<AdminRowData>['onChange'];
  dataForTable: AdminRowData[];
  searchInput: React.RefObject<any>;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTag, setShowPopupTag] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Define columns for the Ant Design table
  const columns: ColumnsType<AdminRowData> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    { title: 'Role', dataIndex: 'status', key: 'status' },
    {
      title: 'View',
      dataIndex: '',
      render: () => (
        <a>
          <Button
            icon={<ArrowRightOutlined rev={undefined} />}
            onClick={() => {}}
            style={{
              width: 30,
              borderRadius: 70,
              marginLeft: 30,
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'black',
            }}></Button>
        </a>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      {showPopup && (
        <CreateAdminPopupWindow
          messageApi={messageApi}
          setShowPopup={setShowPopup}
        />
      )}

      <TableHeader
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        setShowPopupTag={setShowPopupTag}
        showPopupTag={showPopup}
        searchInput={searchInput}
      />
      <TableContainer>
        <div id="table-container">
          <Table
            dataSource={dataForTable}
            onChange={handleChange}
            columns={columns}
            pagination={false}
            scroll={{ y: 550 }}
          />
        </div>
      </TableContainer>
    </>
  );
};

export default AdminTableImpl;
