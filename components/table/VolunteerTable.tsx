import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useSWR from 'swr';
import { UserData } from 'bookem-shared/src/types/database';

interface VolunteerRowData {
  key: number;
  firstName: string;
  email: string;
  phone: string;
  tags: string[];
}

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

const fetcher = (url: string) => fetch(url).then(res => res.json());

const VolunteerTable = () => {
  const { data, error, isLoading } = useSWR<UserData[]>('/api/users/', fetcher);

  const [dataForTable, setDataForTable] = useState<VolunteerRowData[]>([]);

  useEffect(() => {
    if (data) {
      setDataForTable(convertUserDataToRowData(data));
    }
  }, []);

  const [filterTable, setFilterTable] = useState<any>(null);
  const [totalVolunteers, setTotalVolunteers] = useState(dataForTable.length);

  // check for errors and loading
  if (error) return <div>Failed to load volunteer table</div>;
  if (isLoading) return <div>Loading...</div>;

  // function that determines what the table looks like after a search by the user
  const onTableSearch = (value: string) => {
    let filterTable = dataForTable.filter((o: { [x: string]: any }) =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
    setTotalVolunteers(filterTable.length);
  };

  // function to export what is on the table at the time to an excel file
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
            dataSource={filterTable === null ? dataForTable : filterTable}
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

const convertUserDataToRowData = (data: UserData[]) => {
  const result = data.map((user, index) => {
    return {
      key: index,
      firstName: user.name,
      email: user.email,
      phone: user.phone,
      tags: user.tags,
    };
  });
  return result;
};

export default VolunteerTable;
