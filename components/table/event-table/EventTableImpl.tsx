import React, { useState, useEffect } from 'react';
import { Table, TableProps, Tag } from 'antd';
import type {
  ColumnType,
  ColumnsType,
  SorterResult,
} from 'antd/es/table/interface';
import { TableContainer } from '@/styles/table.styles';
import Link from 'next/link';
import CreateEventPopupWindow from '@/components/Forms/CreateEventPopupWindow';
import TagEventPopupWindow from '@/components/Forms/TagEventPopupWindow';
import { EventDataIndex, EventRowData, FilterOption } from '@/utils/table-types';
import { handleExport, handleJsonExport } from '@/utils/utils';
import TableHeader from '@/components/table/event-table/TableHeader';

/**
 * Contains the "UI" part of Event Table
 * @returns
 */
const EventTableImpl = ({
  getColumnSearchProps,
  sortedInfo,
  handleChange,
  dataForTable,
}: {
  getColumnSearchProps: (dataIndex: EventDataIndex) => ColumnType<EventRowData>;
  sortedInfo: SorterResult<EventRowData>;
  handleChange: TableProps<EventRowData>['onChange'];
  dataForTable: EventRowData[];
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTag, setShowPopupTag] = useState(false);

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
      // Column for 'Start Date'
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      // Custom sorter based on date values
      sorter: (a: EventRowData, b: EventRowData) => {
        return a.startDate.getTime() - b.startDate.getTime();
      },
      // Configuring the sort order based on the 'date' column
      sortOrder: sortedInfo.columnKey === 'startDate' ? sortedInfo.order : null,
      ellipsis: true,
      render(_: any, { startDate }: EventRowData) {
        return <>{startDate.toLocaleDateString()}</>;
      },
    },
    {
      // Column for 'End Date'
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      // Custom sorter based on date values
      sorter: (a: EventRowData, b: EventRowData) => {
        return a.endDate.getTime() - b.endDate.getTime();
      },
      // Configuring the sort order based on the 'date' column
      sortOrder: sortedInfo.columnKey === 'endDate' ? sortedInfo.order : null,
      ellipsis: true,
      render(_: any, { endDate }: EventRowData) {
        return <>{endDate.toLocaleDateString()}</>;
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
      // Column for 'Programs'
      title: 'Program',
      dataIndex: 'programName',
      key: 'programName',
      ...getColumnSearchProps('programName'),
      render(_: any, { programName }: EventRowData) {
        return <>{programName}</>;
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
  const onExportPress = (option: FilterOption[]) => {
    // delete once option is implemented
    option = [
      {
        key: 'name',
        text: 'Event Name',
      },
      {
        key: 'startDate',
        text: 'Start Date',
      },
    ]
    // replace with the keys you want to keep for each row in the table.
    // these keys are the member values of the dataForTable array.
    const keep = option.map((opt) => opt.key); 
    // for each option, there should be a corresponding header for it
    // example: name -> Event Name or programName -> Program
    const header = [option.map((opt) => opt.text)]; 
    const data = dataForTable.map((row) => {
      return keep.map((key) => {
        // can do some preprocessing here
        // todo: abstract this to be a part of filter options
        if (key === 'tags') {
          return row[key].map((tag) => tag.tagName).join('; ');
        }
        // if (key === 'startDate' || key === 'endDate') {
        //   return row[key].toLocaleDateString();
        // }
        return row[key];
      });
    });
    console.log(data);
    handleJsonExport(data, 'events', header);
  }
  return (
    <>
      {showPopup && <CreateEventPopupWindow setShowPopup={setShowPopup} />}
      {showPopupTag && <TagEventPopupWindow setShowPopup={setShowPopupTag} />}
      <TableHeader
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        setShowPopupTag={setShowPopupTag}
        showPopupTag={showPopup}
        onExportPress={onExportPress}
      />
      <TableContainer>
        <div id="table-container">
          <Table
            dataSource={dataForTable}
            onChange={handleChange}
            columns={columns}
            pagination={false}
            scroll={{ y: 550 }}
          />
        </div>
      </TableContainer>
    </>
  );
};

export default EventTableImpl;
