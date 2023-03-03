import React, { useState } from 'react';
import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    render: (_: any) => (
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
  const [totalVolunteers, setTotalVolunteers] = useState(data.length);

  const onTableSearch = (value: string) => {
    let filterTable = baseData.filter((o: { [x: string]: any }) =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
    setTotalVolunteers(filterTable.length);
  };

  const handleExport = () => {
    const workbook = XLSX.utils.table_to_book(
      document.querySelector('#table-container table')
    );
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'volunteers.xlsx');
  };

  return (
    <>
      <div>
        <Input.Search
          placeholder="Search "
          enterButton
          onSearch={onTableSearch}
        />
      </div>
      <div>
        <div id="table-container">
          <Table
            dataSource={filterTable === null ? baseData : filterTable}
            columns={columns}
          />
        </div>
        <Button onClick={handleExport}>Export to Excel</Button>
      </div>
      <div>
        <Typography>Total volunteers: {totalVolunteers}</Typography>
      </div>
    </>
  );
};

export default VolunteerTable;
