import React from 'react';
import { Table } from 'antd';

// VolunteerTable with dummy data (for now)

const VolunteerTable = () => {
  const columns = [
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
    },
    {
      title: 'See More',
      dataIndex: 'seeMore',
      key: 'seeMore',
    },
  ];

  const dataSource = [
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

  return (
    <div>
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
};

export default VolunteerTable;
