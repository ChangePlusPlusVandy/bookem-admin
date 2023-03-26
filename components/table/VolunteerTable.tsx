import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table, TableProps, Tag, Typography } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useSWR from 'swr';
import { UserData } from 'bookem-shared/src/types/database';
import {
  BottomRow,
  Header,
  SearchContainter,
  StyledTable,
  StyledTypography,
  TableContainer,
} from '@/styles/volunteerTable.styles';

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

  useEffect(() => {
    console.log(data);
    if (!isLoading && data) {
      setDataForTable(convertUserDataToRowData(data));
    }
  }, [data, isLoading]);

  const [dataForTable, setDataForTable] = useState<VolunteerRowData[]>([]);
  const [filterTable, setFilterTable] = useState<VolunteerRowData[]>([]);
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
      document.querySelector('#table-container')
    );
    console.log(workbook);
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
        <Header>Volunteer Management</Header>
        <SearchContainter>
          <Input.Search
            placeholder="Search "
            onSearch={onTableSearch}
            style={{ width: 800 }}
            allowClear
          />
          <Button
            onClick={handleExport}
            style={{
              width: 250,
              marginLeft: 90,
              backgroundColor: 'darkgray',
              color: 'whitesmoke',
            }}>
            Export
          </Button>
        </SearchContainter>
      </div>
      <TableContainer>
        <div id="table-container">
          <StyledTable
            dataSource={filterTable === null ? dataForTable : filterTable}
            columns={columns}
            pagination={false}
            scroll={{ y: 550 }}
          />
        </div>
        <BottomRow>
          <StyledTypography>
            Total volunteers: {totalVolunteers}
          </StyledTypography>
        </BottomRow>
      </TableContainer>
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
