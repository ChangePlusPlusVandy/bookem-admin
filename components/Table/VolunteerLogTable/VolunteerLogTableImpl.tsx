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
import { BottomRow, StyledTypography } from '@/styles/table.styles';
import { ColumnsType, Key } from 'antd/es/table/interface';

const VolunteerLogTableImpl = () => {
  const { data, error, isLoading, mutate } = useSWR<QueriedVolunteerLogDTO[]>(
    '/api/volunteer-logs/',
    fetcher,
    {
      onSuccess: data => {
        setDataForTable(convertVolunteerLogDataToRowData(data));
        console.log(dataForTable);
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [dataForTable, setDataForTable] = useState<VolunteerLogRowData[]>([]);
  const [hours, setHours] = useState<number>();
  const [totalVolunteers, setTotalVolunteers] = useState(dataForTable.length);

  // TODO: extract to utils/constants in the future
  const columns: ColumnsType<VolunteerLogRowData> = [
    {
      title: 'Volunteer',
      dataIndex: 'userName',
      key: 'userName',
      onFilter: (value: boolean | Key | string, record: VolunteerLogRowData) =>
        record.userName.includes(value as string),
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
      onFilter: (value: boolean | Key | string, record: VolunteerLogRowData) =>
        record.eventName.includes(value as string),
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
      <div id="table-container">
        <Table
          dataSource={dataForTable}
          onChange={() => {}}
          columns={columns}
          pagination={false}
          scroll={{ y: 700 }}
        />
      </div>
      <BottomRow>
        <StyledTypography>Total volunteers: {totalVolunteers}</StyledTypography>
        <StyledTypography>
          <>Total hours: {hours}</>
        </StyledTypography>
      </BottomRow>
    </>
  );
};

export default VolunteerLogTableImpl;
