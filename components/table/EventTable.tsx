import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Space, Table, TableProps, InputRef } from 'antd';
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import Highlighter from 'react-highlight-words';
import {
  QueriedTagData,
  QueriedVolunteerEventDTO,
} from 'bookem-shared/src/types/database';
import {
  SearchContainter,
  StyledTable,
  TableButton,
  TableContainer,
} from '@/styles/table.styles';
import Link from 'next/link';
import Image from 'next/image';
import CreateEventPopupWindow from '@/components/Forms/CreateEventPopupWindow';
import TagEventPopupWindow from '@/components/Forms/TagEventPopupWindow';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { EventRowData } from '@/utils/table-types';
import { handleExport } from '@/utils/utils';

type DataIndex = keyof EventRowData;

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTag, setShowPopupTag] = useState(false);

  const [dataForTable, setDataForTable] = useState<EventRowData[]>([]);
  const [filterTable, setFilterTable] = useState<EventRowData[]>([]);

  const [isFiltering, setIsFilter] = useState<boolean>(false);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const [sortedInfo, setSortedInfo] = useState<SorterResult<EventRowData>>({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const { data, error, isLoading, mutate } = useSWR<QueriedVolunteerEventDTO[]>(
    '/api/event/',
    fetcher,
    {
      onSuccess: data => {
        console.log(data[0]);
        console.log(data[0].startDate);
        console.log(new Date(data[0].startDate));
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

  /**
   * Used for sort and filters
   * @param pagination
   * @param filters
   * @param sorter
   */
  const handleChange: TableProps<EventRowData>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<EventRowData>);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  /**
   * Documentation: https://ant.design/components/table#components-table-demo-custom-filter-panel
   * @param dataIndex
   * @returns
   */
  // Function to get column search properties
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<EventRowData> => ({
    // Filter dropdown configuration
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      // Custom filter dropdown UI
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        {/* Input for searching */}
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        {/* Buttons for search, reset, and filter */}
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined rev={undefined} />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            Close
          </Button>
        </Space>
      </div>
    ),
    // Filter icon configuration
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#1677ff' : undefined }}
        rev={undefined}
      />
    ),
    // Filter function to apply on each record
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    // Callback when filter dropdown visibility changes
    onFilterDropdownOpenChange: visible => {
      // Select the search input when the filter dropdown opens
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // Render function to highlight search results
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  // Define columns for the Ant Design table
  const columns: ColumnsType<EventRowData> = [
    {
      // Column for 'Event Name'
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
      // Apply custom search properties using getColumnSearchProps
      ...getColumnSearchProps('name'),
      // Example: Uncomment the following lines to add filters
      // filters: [
      //   { text: 'Office work', value: 'Office work' },
      //   { text: 'Distribute books', value: 'Distribute books' },
      //   // Add more filter options as needed
      // ],
      // onFilter: (value: string, record: { eventName: string }) =>
      //   record.eventName.includes(value),
    },
    {
      // Column for 'Date'
      title: 'Date',
      dataIndex: 'startDate',
      key: 'startDate',
      // Custom sorter based on date values
      sorter: (a: EventRowData, b: EventRowData) => {
        return a.startDate.getTime() - b.startDate.getTime();
      },
      // Configuring the sort order based on the 'date' column
      sortOrder: sortedInfo.columnKey === 'startDate' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      // Column for '# Of Volunteers'
      title: '# Of Volunteers',
      dataIndex: 'numVolunteers',
      key: 'numVolunteers',
      // Custom sorter based on the number of volunteers
      sorter: (a: EventRowData, b: EventRowData) =>
        a.volunteers.length - b.volunteers.length,
      // Configuring the sort order based on the 'numVolunteers' column
      sortOrder:
        sortedInfo.columnKey === 'numVolunteers' ? sortedInfo.order : null,
      ellipsis: true,
    },
    // Example: Uncomment the following block to add a 'Tags' column
    // {
    //   title: 'Tags',
    //   dataIndex: 'tags',
    //   key: 'tags',
    //   // Render function to display tags using Ant Design Tag component
    //   render: (_: any, { tags }: any) => (
    //     <>
    //       {tags.map((tag: QueriedTagData) => {
    //         return <Tag key={tag.tagName}>{tag.tagName}</Tag>;
    //       })}
    //     </>
    //   ),
    //   // Example: Uncomment the following lines to add filters
    //   // filters: [
    //   //   { text: 'RFR', value: 'RFR' },
    //   //   { text: 'RIF', value: 'RIF' },
    //   //   // Add more filter options as needed
    //   // ],
    //   // onFilter: (value: string, record: { tags: string }) =>
    //   //   record.tags.includes(value),
    // },
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
      <div>
        <SearchContainter>
          <TableButton>
            <Image
              onClick={() => setShowPopup(prev => !prev)}
              src="/table/addbutton.png"
              alt=""
              width={32}
              height={32}
              style={{ marginRight: 20 }}
            />
          </TableButton>
          <TableButton>
            <Image
              onClick={() => {
                setShowPopup(false);
                setShowPopupTag(prev => !prev);
              }}
              src="/table/tagsbutton.png"
              alt=""
              width={32}
              height={32}
            />
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
          <Table
            dataSource={isFiltering ? filterTable : dataForTable}
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

const convertEventDataToRowData = (
  data: QueriedVolunteerEventDTO[]
): EventRowData[] => {
  return data.map(event => {
    return {
      ...event,
      key: event._id.toString(),
      numVolunteers: event.volunteers.length,
    };
  });
};

export default EventTable;
