import React, { useState, useEffect } from 'react';
import { Button, Input, Tag } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useSWR from 'swr';
import {
  QueriedTagData,
  QueriedVolunteerEventData,
} from 'bookem-shared/src/types/database';
import {
  SearchContainter,
  StyledTable,
  TableButton,
  TableContainer,
} from '@/styles/table.styles';
import Link from 'next/link';
import Image from 'next/image';
import { ObjectId } from 'mongodb';

interface EventRowData {
  key: number;
  eventName: string;
  date: string;
  numVolunteers: number;
  tags: QueriedTagData[];
  id: ObjectId;
}

const columns: any = [
  {
    title: 'Event Name',
    dataIndex: 'eventName',
    key: 'eventName',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '# Of Volunteers',
    dataIndex: 'numVolunteers',
    key: 'numVolunteers',
  },
  {
    // TODO: update filters to contain all possible tags
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: QueriedTagData) => {
          return <Tag key={tag.tagName}>{tag.tagName}</Tag>;
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
    render: (_: any, { id, eventName }: EventRowData) => (
      <>
        <Link key={eventName} href={`/event/${id}`}>
          See More
        </Link>
      </>
    ),
  },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventTable = () => {
  const { data, error, isLoading } = useSWR<QueriedVolunteerEventData[]>(
    '/api/event/',
    fetcher
  );
  const [dataForTable, setDataForTable] = useState<EventRowData[]>([]);
  const [filterTable, setFilterTable] = useState<EventRowData[]>([]);
  const [isFiltering, setIsFilter] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && data) {
      setDataForTable(convertEventDataToRowData(data));
    }
  }, [data, isLoading]);

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;

  // function that determines what the table looks like after a search by the user
  const onTableSearch = async (value: string) => {
    if (value === '') {
      setFilterTable([]);
      setIsFilter(false);
      return;
    }

    let filterTable = dataForTable.filter((o: { [x: string]: any }) =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
    setIsFilter(true);
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
    saveAs(blob, 'events.xlsx');
  };
  return (
    <>
      <div>
        <SearchContainter>
          <Input.Search
            placeholder="Search "
            onSearch={onTableSearch}
            style={{ width: 800, marginRight: 20 }}
            allowClear
          />
          <TableButton
            onClick={() => {
              alert('TODO: open create event modal');
            }}>
            <Image
              src="/table/addbutton.png"
              alt=""
              width={32}
              height={32}
              style={{ marginRight: 20 }}
            />
          </TableButton>
          <TableButton
            onClick={() => {
              alert('TODO: redirect to tags page');
            }}>
            <Image src="/table/tagsbutton.png" alt="" width={32} height={32} />
          </TableButton>
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
            dataSource={isFiltering ? filterTable : dataForTable}
            columns={columns}
            pagination={false}
            scroll={{ y: 550 }}
          />
        </div>
      </TableContainer>
    </>
  );
};

const convertEventDataToRowData = (data: QueriedVolunteerEventData[]) => {
  const result = data.map((event, index) => {
    // Convert eventDate into a string date formatted mm/dd/yyyy
    const date = new Date(event.startDate);
    const stringDate =
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)) +
      '/' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
      '/' +
      date.getFullYear();

    return {
      key: index,
      eventName: event.name,
      date: stringDate,
      numVolunteers: event.volunteers.length,
      tags: event.tags,
      id: event._id,
    };
  });
  return result;
};

export default EventTable;