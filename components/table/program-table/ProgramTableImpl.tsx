import CreateProgramPopupWindow from '@/components/Forms/CreateProgramPopupWindow';
import React, { useState } from 'react';
import TableHeader from './TableHeader';
import { StyledTable, TableContainer } from '@/styles/table.styles';
import { Button } from 'antd';

const ProgramTableImpl = ({
  getColumnSearchProps,
  dataForTable,
}: {
  getColumnSearchProps: any;
  dataForTable: any;
}) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const columns: any = [
    {
      title: 'Program Name',
      dataIndex: 'programName',
      key: 'programName',
      ...getColumnSearchProps('programName'),
    },
    {
      title: 'Description',
      dataIndex: 'programDesc',
      key: 'programDesc',
    },
    {
      title: 'Events',
      dataIndex: 'programEvent',
      key: 'programEvent',
      render: () => <Button type="link">See Events</Button>,
    },
    {
      title: 'Volunteers',
      dataIndex: 'programVolunteer',
      key: 'programVolunteer',
      render: () => <Button type="link">See Volunteers</Button>,
    },
  ];
  return (
    <>
      {showPopUp && <CreateProgramPopupWindow setShowPopup={setShowPopUp} />}
      <div>
        <TableHeader setShowPopUp={setShowPopUp} showPopUp={showPopUp} />
        <TableContainer>
          <div id="table-container">
            <StyledTable
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
