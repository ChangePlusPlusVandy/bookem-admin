import React, { useState } from 'react';
import { Input, Table, TableProps } from 'antd';

// VolunteerTable with dummy data (for now)

const VolunteerTable = () => {
  const data = [
    {
      key: '1',
      firstName: 'Davy',
      lastName: 'Jones',
      phone: '724-704-1663',
      email: 'test_user@bookem.org',
      tags: 'RFR',
    },
    {
      key: '2',
      firstName: 'Mike',
      lastName: 'Nesmith',
      phone: '212-359-0913',
      email: 'test_user2@bookem.org',
      tags: 'RIF',
    },
  ];

  const columns: any = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      filters: [
        {
          text: 'RFR',
          value: 'RFR',
        },
        {
          text: 'RIF',
          value: 'RIF',
        },
      ],
      onFilter: (value: string, record: { tags: string }) =>
        record.tags.startsWith(value),
    },
    {
      title: 'See More',
      dataIndex: 'seeMore',
      key: 'seeMore',
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns}></Table>
    </div>
  );
};

export default VolunteerTable;
