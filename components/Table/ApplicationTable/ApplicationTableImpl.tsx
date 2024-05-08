import { VolunteerLogRowData } from '@/utils/table-types';
import { calculateTotalCharacters, fetcher } from '@/utils/utils';
import {
  QueriedVolunteerApplicationData,
  QueriedVolunteerLogDTO,
} from 'bookem-shared/src/types/database';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Table } from 'antd';
import { convertVolunteerLogDataToRowData } from '@/utils/table-utils';
import { TableContainer } from '@/styles/table.styles';
import { ColumnsType, Key } from 'antd/es/table/interface';
import { ApplicationTableContext } from './ApplicationTable';
import { LOCALE_DATE_FORMAT } from '@/utils/constants';
import TableHeader from './TableHeader';

const ApplicationTableImpl = () => {
  const {
    getColumnSearchProps,
    rowSelection,
    sortedInfo,
    handleChange,
    errorMessage,
    event,
  } = useContext(ApplicationTableContext);

  const [status, setStatus] = useState<string>('pending');
  const [tableWidth, setTableWidth] = useState<number>(0);
  const { data, error, isLoading, mutate } =
    useSWR<QueriedVolunteerApplicationData>(
      '/api/event/' +
        event._id +
        '/applications?' +
        new URLSearchParams({ status }),
      fetcher,
      {
        onSuccess: data => {
          // setDataForTable(convertVolunteerLogDataToRowData(data));
          // console.log(data);

          const newColumns: any[] = [];
          data.questions.forEach(question => {
            newColumns.push({
              title: question.title,
              dataIndex: question,
              key: question._id,
              ...getColumnSearchProps(question.title),
              ellipsis: false,
            });
          });

          const finalColumns = [...defaultColumns, ...newColumns];
          setTableWidth(
            calculateTotalCharacters(finalColumns.map(c => c.title)) * 15
          );
          setColumns(finalColumns);
        },
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }
    );

  const handleSelectStatus = (value: string) => {
    // fetch('/api/volunteer-logs/' + value)
    //   .then(data => data.json())
    //   .then(data => setDataForTable(convertVolunteerLogDataToRowData(data)))
    //   .then(() => setStatus(value))
    //   .catch(err => {
    //     errorMessage('Sorry an error occurred');
    //     console.error(err);
    //   });
  };

  const [dataForTable, setDataForTable] = useState<any[]>([]);

  const defaultColumns: ColumnsType<any> = [
    {
      title: 'Volunteer',
      dataIndex: 'userName',
      key: 'userName',
      ...getColumnSearchProps('userName'),
      ellipsis: true,
    },
    {
      title: 'Volunteer Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      render(_: any, { userEmail }: VolunteerLogRowData) {
        return <Link href={'mailto:' + userEmail}>{userEmail}</Link>;
      },
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const [columns, setColumns] = useState<ColumnsType<any>>(defaultColumns);

  useEffect(() => {
    fetch('/api/event/' + event._id + '/applications')
      .then(res => res.json())
      .then(console.log);
  });

  // Refetch data when data is updated
  useEffect(() => {
    mutate();
  }, [mutate, data]);

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TableContainer>
        <TableHeader
          handleSelectStatus={handleSelectStatus}
          mutate={mutate}
          status={status}
        />
        <div id="table-container">
          <Table
            dataSource={dataForTable}
            rowSelection={rowSelection}
            onChange={handleChange}
            columns={columns}
            pagination={false}
            scroll={{ y: 700, x: tableWidth }}
          />
        </div>
      </TableContainer>
    </>
  );
};

export default ApplicationTableImpl;
