import CreateProgramPopupWindow from '@/components/Forms/CreateProgramPopupWindow';
import React, { useState } from 'react';
import TableHeader from './TableHeader';
import { TableContainer } from '@/styles/table.styles';
import { Button } from 'antd';
import { ProgramDataIndex, ProgramRowData } from '@/utils/table-types';
import Link from 'next/link';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import { Table, TableProps } from 'antd';

const ProgramTableImpl = ({
  getColumnSearchProps,
  sortedInfo,
  dataForTable,
  handleChange,
}: {
  getColumnSearchProps: (
    dataIndex: ProgramDataIndex
  ) => ColumnType<ProgramRowData>;
  dataForTable: ProgramRowData[];
  sortedInfo: SorterResult<ProgramRowData>;
  handleChange: TableProps<ProgramRowData>['onChange'];
}) => {
  const [showPopUp, setShowPopUp] = useState(false);

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
      // Column for 'Number of Events'
      title: 'Number of Events',
      dataIndex: 'numEvents',
      key: 'numEvents',
      // Custom sorter based on the number of events
      sorter: (a: ProgramRowData, b: ProgramRowData) =>
        a.numEvents - b.numEvents,
      // Configuring the sort order based on the 'numEvents' column
      sortOrder: sortedInfo.columnKey === 'numEvents' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Events',
      dataIndex: 'events',
      key: 'events',
      // Render function to display a link to the detailed view of the event
      render: (_: any, { _id, name }: ProgramRowData) => (
        <>
          <Link key={name} href={`/events/program/${_id.toString()}`}>
            See events
          </Link>
        </>
      ),
    },
  ];
  return (
    <>
      {showPopUp && <CreateProgramPopupWindow setShowPopup={setShowPopUp} />}
      <div>
        <TableHeader setShowPopUp={setShowPopUp} showPopUp={showPopUp} />
        <TableContainer>
          <div id="table-container">
            <Table
              dataSource={dataForTable}
              columns={columns}
              onChange={handleChange}
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
