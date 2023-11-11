import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Tag } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useSWR from 'swr';
import { QueriedUserData, UserData } from 'bookem-shared/src/types/database';
import {
  BottomRow,
  SearchContainter,
  StyledTable,
  StyledTypography,
  TableContainer,
} from '@/styles/table.styles';
import { ObjectId } from 'mongodb';
import Link from 'next/link';

// TODO: extract to utils/types in the future
interface VolunteerRowData {
  key: number;
  firstName: string;
  email: string;
  phone: string;
  id: ObjectId;
}

// TODO: extract to utils/constants in the future
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
          // TODO: add documentation for this
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
    render: (_: any, { id, email }: VolunteerRowData) => (
      <Link key={email} href={`/volunteer/${id}`}>
        See more
      </Link>
    ),
  },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const VolunteerTable = () => {
  const { data, error, isLoading } = useSWR<QueriedUserData[]>(
    '/api/users/',
    fetcher
  );
  const { data: totalHours } = useSWR<number>('/api/users/totalHours', fetcher);
  const [dataForTable, setDataForTable] = useState<VolunteerRowData[]>([]);
  const [filterTable, setFilterTable] = useState<VolunteerRowData[]>([]);
  const [totalVolunteers, setTotalVolunteers] = useState(dataForTable.length);
  const [hours, setHours] = useState<number>();
  const [isFiltering, setIsFilter] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && totalHours) {
      setHours(totalHours);
    }
  }, [totalHours, isLoading]);

  useEffect(() => {
    if (!isLoading && data) {
      setDataForTable(convertUserDataToRowData(data));
      setTotalVolunteers(dataForTable.length);
    }
  }, [data, isLoading, dataForTable.length]);

  // check for errors and loading
  if (error) return <div>Failed to load volunteer table</div>;
  if (isLoading) return <div>Loading...</div>;

  // function that determines what the table looks like after a search by the user
  const onTableSearch = async (value: string) => {
    if (value === '') {
      setFilterTable([]);
      setTotalVolunteers(dataForTable.length);
      setIsFilter(false);
      return;
    }

    let filterTable = dataForTable.filter((o: { [x: string]: any }) =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    // make a fetch request to get gotal hours for the filtered table
    const ids = filterTable.map(obj => obj.id);
    const newHours = await queryTotalHours(ids);

    // handle error if newHours is an error object
    if ('error' in newHours) {
      alert(
        'Error: could not get total hours for filtered table. Please contact for support'
      );
      return;
    }

    setHours(newHours);
    setFilterTable(filterTable);
    setTotalVolunteers(filterTable.length);
    setIsFilter(true);
  };

  const queryTotalHours = async (ids: any[]) => {
    const totalHours = await fetch('/api/users/totalHours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filters: ids }),
    });
    const data = await totalHours.json();
    return data;
  };

  // function to export what is on the table at the time to an excel file
  const handleExport = () => {
    const workbook = XLSX.utils.table_to_book(
      document.querySelector('#table-container')
    );
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    // TODO: automatically add date to file name for easier organization
    saveAs(blob, 'volunteers.xlsx');
  };

  return (
    <>
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

      <TableContainer>
        <div id="table-container">
          <StyledTable
            dataSource={isFiltering ? filterTable : dataForTable}
            columns={columns}
            pagination={false}
            scroll={{ y: 550 }}
          />
        </div>
        <BottomRow>
          <StyledTypography>
            Total volunteers: {totalVolunteers}
          </StyledTypography>
          <StyledTypography>
            <>Total hours: {hours}</>
          </StyledTypography>
        </BottomRow>
      </TableContainer>
    </>
  );
};

// TODO: move to utils folder
const convertUserDataToRowData = (data: QueriedUserData[]) => {
  const result = data.map((user, index) => {
    return {
      key: index,
      firstName: user.name,
      email: user.email,
      phone: user.phone,
      id: user._id,
    };
  });
  return result;
};

export default VolunteerTable;
