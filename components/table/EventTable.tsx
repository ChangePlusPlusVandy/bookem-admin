import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Tag, Table, TableProps, InputRef } from 'antd';
import type {
  ColumnType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
import { ObjectId } from 'mongodb';
import CreateEventPopupWindow from '@/components/Forms/CreateEventPopupWindow';
import type { FilterConfirmProps } from 'antd/es/table/interface';

interface EventRowData {
  key: number;
  eventName: string;
  date: string;
  numVolunteers: number;
  tags: QueriedTagData[];
  id: ObjectId;
}

type DataIndex = keyof EventRowData;

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventTable = () => {
  const { data, error, isLoading } = useSWR<QueriedVolunteerEventDTO[]>(
    '/api/event/',
    fetcher
  );
  const [showPopup, setShowPopup] = useState(false);
  const [dataForTable, setDataForTable] = useState<EventRowData[]>([]);
  const [isFiltering, setIsFilter] = useState<boolean>(false);
  const [filterTable, setFilterTable] = useState<EventRowData[]>([]);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<EventRowData>>({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<EventRowData> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
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
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#1677ff' : undefined }}
        rev={undefined}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
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

  const columns: any = [
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      ...getColumnSearchProps('eventName'),
      // filters: [
      //   {
      //     text: 'Office work',
      //     value: 'Office work',
      //   },
      //   {
      //     text: 'Distribute books',
      //     value: 'Distribute books',
      //   },
      //   {
      //     text: 'Interactive reading',
      //     value: 'Interactive reading',
      //   },
      //   {
      //     text: 'Book sort, clean, process',
      //     value: 'Book sort, clean, process',
      //   },
      //   {
      //     text: 'Book drive',
      //     value: 'Book drive',
      //   },
      //   {
      //     text: 'Reading role model',
      //     value: 'Reading role model',
      //   },
      //   {
      //     text: 'Book bus',
      //     value: 'Book bus',
      //   },
      // ],
      // onFilter: (value: string, record: { eventName: string }) =>
      //   record.eventName.includes(value),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: EventRowData, b: EventRowData) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate.getTime() - bDate.getTime();
      },
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: '# Of Volunteers',
      dataIndex: 'numVolunteers',
      key: 'numVolunteers',
      sorter: (a: EventRowData, b: EventRowData) =>
        a.numVolunteers - b.numVolunteers,
      sortOrder:
        sortedInfo.columnKey === 'numVolunteers' ? sortedInfo.order : null,
      ellipsis: true,
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
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (_: any, { id, eventName }: EventRowData) => (
        <>
          <Link key={eventName} href={`/event/${id}`}>
            [button]
            {/* want to insert a button icon, this is a placeholder */}
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      {showPopup && <CreateEventPopupWindow setShowPopup={setShowPopup} />}
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

const convertEventDataToRowData = (data: QueriedVolunteerEventDTO[]) => {
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
