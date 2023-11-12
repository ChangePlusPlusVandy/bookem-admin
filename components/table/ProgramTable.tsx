import React, { useRef, useState } from 'react';

import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import {
  SearchContainter,
  StyledTable,
  TableButton,
  TableContainer,
} from '@/styles/table.styles';

import Image from 'next/image';
import CreateProgramPopupWindow from '@/components/Forms/CreateProgramPopupWindow';

const SearchOutlined = require('public/arrow-left.png');

interface ProgramRowData {
  key: number;
  programName: string;
  programDesc: string;
}

const columns: any = [
  {
    title: 'Program Name',
    dataIndex: 'programName',
    key: 'programName',

  },
  {
    title: 'Description',
    dataIndex: 'programDesc',
    key: 'programDesc',
  },
];

const ProgramTable = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [dataForTable, setDataForTable] = useState<ProgramRowData[]>([
    { key: 1, programName: 'test', programDesc: 'test program' },
    { key: 2, programName: 'test 2', programDesc: 'test program 2' },
  ]);
  const [filterTable, setFilterTable] = useState<ProgramRowData[]>([]);
  const [isFiltering, setIsFilter] = useState<boolean>(false);

  
  return (
    <>
      {showPopUp && <CreateProgramPopupWindow setShowPopup={setShowPopUp} />}
      <div>
        <SearchContainter>
          <Input.Search
            placeholder="Search "
            // onSearch={onTableSearch}
            style={{ width: 800, marginRight: 20 }}
            allowClear
          />
          <TableButton onClick={() => setShowPopUp(prev => !prev)}>
            <Image
              src="/table/addbutton.png"
              alt=""
              width={32}
              height={32}
              style={{ marginRight: 20 }}
            />
          </TableButton>
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
      </div>
    </>
  );
};

export default ProgramTable;
