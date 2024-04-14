import React, { useState, useEffect } from 'react';
import {
  Table,
  TableProps,
  Tag,
  Input,
  Popover,
  Button,
  Popconfirm,
  message,
} from 'antd';
import type {
  ColumnType,
  ColumnsType,
  SorterResult,
} from 'antd/es/table/interface';
import {
  SpaceBetweenFlexContainer,
  TableContainer,
} from '@/styles/table.styles';
import Link from 'next/link';
import EventPopupWindowForm from '@/components/Forms/EventPopupWindowForm';
import TagEventPopupWindow from '@/components/Forms/TagEventPopupWindow';
import { EventDataIndex, EventRowData } from '@/utils/table-types';
import { fetcher } from '@/utils/utils';
import TableHeader from '@/components/Table/EventTable/TableHeader';
import { convertEventDataToRowData } from '@/utils/table-utils';
import useSWR from 'swr';
import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import { FilterOutlined } from '@ant-design/icons';
import {
  FilterIcon,
  TagTitle,
} from '@/styles/components/Table/EventTable.styles';
import mongoose from 'mongoose';

/**
 * Contains the "UI" part of Event Table
 * @returns
 */
const EventTableImpl = ({
  getColumnSearchProps,
  sortedInfo,
  handleChange,
  filteredDataByTags,
  setFilteredDataByTags,
  handleFilterByTags,
}: {
  getColumnSearchProps: (dataIndex: EventDataIndex) => ColumnType<EventRowData>;
  sortedInfo: SorterResult<EventRowData>;
  handleChange: TableProps<EventRowData>['onChange'];
  filteredDataByTags: EventRowData[];
  setFilteredDataByTags: (data: EventRowData[]) => void;
  handleFilterByTags: (
    e: React.KeyboardEvent<HTMLInputElement>,
    dataForTable: EventRowData[]
  ) => void;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTag, setShowPopupTag] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [dataForTable, setDataForTable] = useState<EventRowData[]>([]);
  const { data, error, isLoading, mutate } = useSWR<QueriedVolunteerEventDTO[]>(
    '/api/event/',
    fetcher,
    {
      onSuccess: data => {
        setDataForTable(convertEventDataToRowData(data));
        setFilteredDataByTags(dataForTable);
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Refetch data when data is updated
  useEffect(() => {
    mutate();
  }, [mutate, data]);

  //Reset filtered data if data is updated
  useEffect(() => {
    setFilteredDataByTags(dataForTable);
  }, [dataForTable, setFilteredDataByTags]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const hasSelected = selectedRowKeys.length > 0;
  const handleAddEvent = () => {
    console.log(selectedRowKeys);
  };

  const handleDeleteEvent = async (_id: mongoose.Types.ObjectId) => {
    const res = await fetch(`/api/event/${_id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const resObj = await res.json();
      messageApi.open({
        type: 'success',
        content: resObj.message,
      });
      mutate();
    } else {
      messageApi.open({
        type: 'error',
        content: 'There was an error deleting the tag',
      });
    }
  };

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;

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
      title: (
        <TagTitle>
          <span>Tags</span>
          <Popover
            content={
              <Input
                placeholder="Enter tags separated by commas"
                onPressEnter={e => handleFilterByTags(e, dataForTable)}
                style={{ width: '300px' }}
              />
            }
            trigger="click"
            title="Filter by Tags">
            <FilterIcon />
          </Popover>
        </TagTitle>
      ),
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
      title: '',
      dataIndex: 'view',
      key: 'view',
      // Render function to display a link to the detailed view of the event
      render: (_: any, { _id, name }: EventRowData) => (
        <>
          <SpaceBetweenFlexContainer>
            <Link key={name} href={`/event/${_id.toString()}`}>
              See more
            </Link>
            <Popconfirm
              title="Delete the event"
              description="Are you sure to delete this event?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteEvent(_id)}>
              <Button danger>Delete</Button>
            </Popconfirm>
          </SpaceBetweenFlexContainer>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      {showPopup && <EventPopupWindowForm setShowPopup={setShowPopup} />}
      {showPopupTag && <TagEventPopupWindow setShowPopup={setShowPopupTag} />}
      {/* <Button type="primary" onClick={handleAddEvent} disabled={!hasSelected} /> */}
      {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}

      <TableHeader
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        setShowPopupTag={setShowPopupTag}
        showPopupTag={showPopup}
        hasSelected={selectedRowKeys.length > 0}
        numSelected={selectedRowKeys.length}></TableHeader>

      <TableContainer>
        <div id="table-container">
          <Table
            rowSelection={rowSelection}
            dataSource={filteredDataByTags}
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

export default EventTableImpl;
