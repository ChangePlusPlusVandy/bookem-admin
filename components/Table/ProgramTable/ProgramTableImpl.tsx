import CreateProgramPopupWindow from '@/components/Forms/CreateProgramPopupWindow';
import React, { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import {
  SpaceBetweenFlexContainer,
  TableContainer,
} from '@/styles/table.styles';
import { Button, Popconfirm, message } from 'antd';
import { ProgramDataIndex, ProgramRowData } from '@/utils/table-types';
import Link from 'next/link';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import mongoose from 'mongoose';
import { QueriedVolunteerProgramData } from 'bookem-shared/src/types/database';
import { fetcher } from '@/utils/utils';
import { convertProgramDataToRowData } from '@/utils/table-utils';
import useSWR from 'swr';

const ProgramTableImpl = ({
  getColumnSearchProps,
}: {
  getColumnSearchProps: (
    dataIndex: ProgramDataIndex
  ) => ColumnType<ProgramRowData>;
}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [dataForTable, setDataForTable] = useState<ProgramRowData[]>([]);

  const { data, error, isLoading, mutate } = useSWR<
    QueriedVolunteerProgramData[]
  >('/api/program/', fetcher, {
    onSuccess: data => {
      setDataForTable(convertProgramDataToRowData(data));
    },
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // Extra defense to refetch data if needed
  useEffect(() => {
    mutate();
  }, [mutate, data]);

  const handleDeleteProgram = async (_id: mongoose.Types.ObjectId) => {
    console.log(_id);
    const res = await fetch(`/api/program/${_id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const resObj = await res.json();
      messageApi.open({
        type: 'success',
        content: resObj.message,
      });
      mutate();
    } else {
      messageApi.open({
        type: 'error',
        content: 'There was an error deleting the tag',
      });
    }
  };

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
      // Render function to display a link to the detailed view of the event
      render: (_: any, { _id, name }: ProgramRowData) => (
        <>
          <Link key={name} href={`/events/program/${_id.toString()}`}>
            See events
          </Link>
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, { _id }: ProgramRowData) => (
        <Popconfirm
          title="Delete the program"
          description="Are you sure to delete this program?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteProgram(_id)}>
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;

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
              scroll={{ y: 700 }}
            />
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default ProgramTableImpl;
