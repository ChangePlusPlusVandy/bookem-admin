import { VolunteerRowData } from '@/utils/table-types';
import { fetcher } from '@/utils/utils';
import { QueriedUserData } from 'bookem-shared/src/types/database';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { VolunteerTableContext } from './VolunteerTable';
import Link from 'next/link';
import { Table } from 'antd';
import { convertUserDataToRowData } from '@/utils/table-utils';
import { BottomRow, StyledTypography } from '@/styles/table.styles';

const VolunteerTableImpl = () => {
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

  const { getColumnSearchProps, isFiltering, filterTable, handleChange } =
    useContext(VolunteerTableContext);

  // TODO: extract to utils/constants in the future
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onFilter: (value: string, record: any) => record.name.includes(value),
      ellipsis: true,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      render(_: any, { email }: VolunteerRowData) {
        return <Link href={'mailto:' + email}>{email}</Link>;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (_: any, { id, email }: VolunteerRowData) => (
        <Link key={email} href={`/volunteer/${id}`}>
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
          dataSource={isFiltering ? filterTable : dataForTable}
          onChange={handleChange}
          columns={columns}
          pagination={false}
          scroll={{ y: 550 }}
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

export default VolunteerTableImpl;
