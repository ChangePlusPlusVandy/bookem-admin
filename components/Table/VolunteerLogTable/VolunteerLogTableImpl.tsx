import { VolunteerLogRowData } from '@/utils/table-types';
import { fetcher } from '@/utils/utils';
import {
  QueriedUserData,
  QueriedVolunteerLogDTO,
} from 'bookem-shared/src/types/database';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Table } from 'antd';
import {
  convertUserDataToRowData,
  convertVolunteerLogDataToRowData,
} from '@/utils/table-utils';
import {
  BottomRow,
  StyledTypography,
  TableContainer,
} from '@/styles/table.styles';
import { ColumnsType, Key } from 'antd/es/table/interface';
import { VolunteerLogTableContext } from './VolunteerLogTable';
import TableHeader from './TableHeader';

const VolunteerLogTableImpl = () => {
  const { getColumnSearchProps, rowSelection, sortedInfo, handleChange } =
    useContext(VolunteerLogTableContext);

  const { data, error, isLoading, mutate } = useSWR<QueriedVolunteerLogDTO[]>(
    '/api/volunteer-logs/pending/',
    fetcher,
    {
      onSuccess: data => {
        setDataForTable(convertVolunteerLogDataToRowData(data));
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleSelectStatus = (value: string) => {
    fetch('/api/volunteer-logs/' + value)
      .then(data => data.json())
      .then(data => setDataForTable(convertVolunteerLogDataToRowData(data)));
  };

  const [dataForTable, setDataForTable] = useState<VolunteerLogRowData[]>([]);
  const [hours, setHours] = useState<number>();
  const [totalVolunteers, setTotalVolunteers] = useState(dataForTable.length);

  // TODO: extract to utils/constants in the future
  const columns: ColumnsType<VolunteerLogRowData> = [
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
    },
    {
      title: 'Event',
      dataIndex: 'eventName',
      key: 'eventName',
      ...getColumnSearchProps('eventName'),
      ellipsis: true,
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Books Donated',
      dataIndex: 'numBooks',
      key: 'numBooks',
    },
    {
      title: 'Date attended',
      dataIndex: 'date',
      key: 'date',
      // Custom sorter based on date values
      sorter: (a: VolunteerLogRowData, b: VolunteerLogRowData) => {
        return a.date.getTime() - b.date.getTime();
      },
      // Configuring the sort order based on the 'date' column
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,

      render(_: any, { date }: VolunteerLogRowData) {
        return <>{date.toLocaleDateString()}</>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  // Refetch data when data is updated
  useEffect(() => {
    mutate();
  }, [mutate, data]);

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TableHeader handleSelectStatus={handleSelectStatus} />
      <TableContainer>
        <div id="table-container">
          <Table
            dataSource={dataForTable}
            rowSelection={rowSelection}
            onChange={handleChange}
            columns={columns}
            pagination={false}
            scroll={{ y: 700 }}
          />
        </div>
      </TableContainer>
    </>
  );
};

export default VolunteerLogTableImpl;
