import React from 'react';
import { Table } from 'antd';

const VolunteerTable = () => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first-name',
      key: 'first-name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last-name',
      key: 'last-name',
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
      dataIndex: 'see-more',
      key: 'see-more',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
};

export default VolunteerTable;
