import { VolunteerRowData } from '@/utils/table-types';
import { fetcher } from '@/utils/utils';
import { QueriedUserData } from 'bookem-shared/src/types/database';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Table } from 'antd';
import { convertUserDataToRowData } from '@/utils/table-utils';
import { BottomRow, StyledTypography } from '@/styles/table.styles';
import { ColumnsType, Key } from 'antd/es/table/interface';

const VolunteerLogTableImpl = () => {
  const { data, error, isLoading, mutate } = useSWR<QueriedUserData[]>(
    '/api/users/',
    fetcher,
    {
      onSuccess: data => {
        setDataForTable(convertUserDataToRowData(data));
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [dataForTable, setDataForTable] = useState<VolunteerRowData[]>([]);
  const [hours, setHours] = useState<number>();
  const [totalVolunteers, setTotalVolunteers] = useState(dataForTable.length);

  // TODO: extract to utils/constants in the future
  const columns: ColumnsType<VolunteerRowData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onFilter: (value: boolean | Key | string, record: VolunteerRowData) =>
        record.name.includes(value as string),
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render(_: any, { email }: VolunteerRowData) {
        return <Link href={'mailto:' + email}>{email}</Link>;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (_: any, { _id, email }: VolunteerRowData) => (
        <Link key={email} href={`/volunteer/${_id}`}>
          See more
        </Link>
      ),
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
