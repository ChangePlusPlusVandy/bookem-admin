import React, { useState, useEffect, useContext } from 'react';
import { Table, TableProps, Tag } from 'antd';
import type {
  ColumnType,
  ColumnsType,
  SorterResult,
} from 'antd/es/table/interface';
import { TableContainer, PageLayout } from '@/styles/table.styles';
import Link from 'next/link';
import CreateEventPopupWindow from '@/components/Forms/EventPopupWindowForm';
import TagEventPopupWindow from '@/components/Forms/TagEventPopupWindow';
import { EventDataIndex, EventRowData } from '@/utils/table-types';
import { fetcher, handleExport } from '@/utils/utils';
import TableHeader from '@/components/Table/EventTable/TableHeader';
import { convertEventDataToRowData } from '@/utils/table-utils';
import useSWR from 'swr';
import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import { LOCALE_DATE_FORMAT } from '@/utils/constants';
import { EventTableContext } from './EventTable';

/**
 * Contains the "UI" part of Program Event Table
 * @returns
 */
const ProgramEventTableImpl = ({ programID }: { programID: string }) => {
  const { sortedInfo, handleChange, getColumnSearchProps, rowSelection } =
    useContext(EventTableContext);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTag, setShowPopupTag] = useState(false);

  const [dataForTable, setDataForTable] = useState<EventRowData[]>([]);
  const { data, error, isLoading, mutate } = useSWR<QueriedVolunteerEventDTO[]>(
    '/api/events/program/' + programID,
    fetcher,
    {
      onSuccess: data => {
        setDataForTable(convertEventDataToRowData(data));
      },
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  // Extra defense to refetch data if needed
  useEffect(() => {
    mutate();
  }, [mutate, data]);

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;

  // Define columns for the Ant Design table
  const columns: ColumnsType<EventRowData> = [
    {
      // Column for 'Event Name'
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
      // Apply custom search properties using getColumnSearchProps
      ...getColumnSearchProps('name'),
    },
    {
      // Column for 'Date'
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // Custom sorter based on date values
      sorter: (a: EventRowData, b: EventRowData) => {
        return a.startDate.getTime() - b.startDate.getTime();
      },
      // Configuring the sort order based on the 'date' column
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      ellipsis: true,
      render(_: any, { startDate }: EventRowData) {
        return <>{startDate.toLocaleDateString('en-US', LOCALE_DATE_FORMAT)}</>;
      },
    },
    {
      // Column for '# Of Volunteers'
      title: '# Of Volunteers',
      dataIndex: 'numVolunteers',
      key: 'numVolunteers',
      // Custom sorter based on the number of volunteers
      sorter: (a: EventRowData, b: EventRowData) =>
        a.numVolunteers - b.numVolunteers,
      // Configuring the sort order based on the 'numVolunteers' column
      sortOrder:
        sortedInfo.columnKey === 'numVolunteers' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      // Column for 'Tags'
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',

      render(_: any, { tags }: EventRowData) {
        return (
          <>
            {tags.map(tag => (
              <Tag color="" key={tag._id.toString()}>
                {tag.tagName}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      // Column for 'View' with a link to see more details
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      // Render function to display a link to the detailed view of the event
      render: (_: any, { _id, name }: EventRowData) => (
        <>
          <Link key={name} href={`/event/${_id.toString()}`}>
            See more
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      {showPopup && <CreateEventPopupWindow setShowPopup={setShowPopup} />}
      {showPopupTag && <TagEventPopupWindow setShowPopup={setShowPopupTag} />}
      <TableHeader
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        setShowPopupTag={setShowPopupTag}
        showPopupTag={showPopup}
      />
      <TableContainer>
        <div id="table-container">
          <Table
            rowSelection={rowSelection}
            dataSource={dataForTable}
            onChange={handleChange}
            columns={columns}
            pagination={false}
            scroll={{ y: 700 }}
          />
        </div>
      </TableContainer>
    </>
  );
};

export default ProgramEventTableImpl;
