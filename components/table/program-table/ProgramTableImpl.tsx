import CreateProgramPopupWindow from '@/components/Forms/CreateProgramPopupWindow';
import React, { useState } from 'react';
import TableHeader from './TableHeader';
import { TableContainer } from '@/styles/table.styles';
import { Button, message } from 'antd';
import { ProgramDataIndex, ProgramRowData } from '@/utils/table-types';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Table } from 'antd';

const ProgramTableImpl = ({
  getColumnSearchProps,
  dataForTable,
}: {
  getColumnSearchProps: (
    dataIndex: ProgramDataIndex
  ) => ColumnType<ProgramRowData>;
  dataForTable: ProgramRowData[];
}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const columns: ColumnsType<ProgramRowData> = [
    {
      title: 'Program Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Events',
      dataIndex: 'events',
      key: 'events',
      render: () => <Button type="link">See Events</Button>,
    },
  ];
  return (
    <>
      {contextHolder}
      {showPopUp && (
        <CreateProgramPopupWindow
          messageApi={messageApi}
          setShowPopup={setShowPopUp}
        />
      )}
      <div>
        <TableHeader setShowPopUp={setShowPopUp} showPopUp={showPopUp} />
        <TableContainer>
          <div id="table-container">
            <Table
              dataSource={dataForTable}
              columns={columns}
              pagination={false}
              scroll={{ y: 550 }}
            />
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default ProgramTableImpl;
