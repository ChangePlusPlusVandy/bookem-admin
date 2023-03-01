import React, { useState } from 'react';
import { Input, Space, Table, TableProps, Tag } from 'antd';

// VolunteerTable with dummy data (for now)

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
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: string) => {
          try {
            let color = 'green';
            if (tag.toLowerCase() === 'rfr') {
              color = 'blue';
            }
            if (tag === 'rif') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          } catch (e: any) {
            console.log('Error loading tags: ' + e.what());
          }
        })}
      </>
    ),
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
      record.tags.includes(value),
  },
  {
    dataIndex: 'seeMore',
    key: 'seeMore',
    render: (
      _: any,
      record: {
        name:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined;
      }
    ) => (
      <Space size="middle">
        <a>See More</a>
      </Space>
    ),
  },
];

const data: any = [
  {
    key: '1',
    firstName: 'Davy',
    lastName: 'Jones',
    phone: '724-704-1663',
    email: 'test_user@bookem.org',
    tags: ['RFR'],
  },
  {
    key: '2',
    firstName: 'Mike',
    lastName: 'Nesmith',
    phone: '212-359-0913',
    email: 'test_user2@bookem.org',
    tags: ['RIF'],
  },
];

const VolunteerTable = () => {
  const [filterTable, setFilterTable] = useState(null);
  const [baseData] = useState(data);

  const onTableSearch = (value: string) => {
    // console.log("PASS", { value });

    let filterTable = baseData.filter((o: { [x: string]: any }) =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

  return (
    <>
      <div>
        <Input.Search
          // style={{ border: "3px solid red", margin: "0 0 10px 0" }}
          placeholder="Search "
          enterButton
          onSearch={onTableSearch}
        />
      </div>
      <div>
        <Table
          dataSource={filterTable === null ? baseData : filterTable}
          columns={columns}></Table>
      </div>
    </>
  );
};

export default VolunteerTable;
