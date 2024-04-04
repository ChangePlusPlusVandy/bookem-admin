import React, { useState, useEffect, useRef } from 'react';
import type { TableProps } from 'antd';
import { Button, Space, Table, Input, Tag, InputRef } from 'antd';
import type {
  ColumnType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
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
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { fetcher } from '@/utils/utils';
import { convertUserDataToRowData } from '@/utils/table-utils';
import { VolunteerDataIndex, VolunteerRowData } from '@/utils/table-types';

const VolunteerTable = ({ eventId }: { eventId?: string | undefined }) => {
  const { data, error, isLoading } = useSWR<QueriedUserData[]>(
    '/api/users/',
    fetcher
  );
  // const { data: totalHours } = useSWR<number>('/api/users/totalHours', fetcher);
  const [dataForTable, setDataForTable] = useState<VolunteerRowData[]>([]);
  const [filterTable, setFilterTable] = useState<VolunteerRowData[]>([]);
  const [totalVolunteers, setTotalVolunteers] = useState(dataForTable.length);
  const [hours, setHours] = useState<number>();
  const [isFiltering, setIsFilter] = useState<boolean>(false);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<VolunteerRowData>>(
    {}
  );
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleChange: TableProps<VolunteerRowData>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<VolunteerRowData>);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: VolunteerDataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // Function to get column search properties for VolunteerRowData
  const getColumnSearchProps = (
    dataIndex: VolunteerDataIndex
  ): ColumnType<VolunteerRowData> => ({
    // Configuration for the filter dropdown
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
        {/* Buttons for search, reset, filter, and close */}
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
            onClick={() => {
              clearFilters && handleReset(clearFilters);
            }}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          {/* Filter button with logic to set search parameters */}
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
          {/* Close button for the filter dropdown */}
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
    // Configuration for the filter icon
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#1677ff' : undefined }}
        rev={undefined}
      />
    ),
    // Filtering logic applied on each record
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    // Callback when the filter dropdown visibility changes
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

  const clearFilters = () => {
    setFilteredInfo({});
  };

  // useEffect(() => {
  //   if (!isLoading && totalHours) {
  //     setHours(totalHours);
  //   }
  // }, [totalHours, isLoading]);

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

  // TODO: extract to utils/constants in the future
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onFilter: (value: string, record: any) => record.name.includes(value),
      ellipsis: true,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      render(_: any, { email }: VolunteerRowData) {
        return <Link href={'mailto:' + email}>{email}</Link>;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (_: any, { id, email }: VolunteerRowData) => (
        <Link key={email} href={`/volunteer/${id}`}>
          See more
        </Link>
      ),
    },
  ];

  return (
    <>
      {/* <Button onClick={clearFilters}>Clear filters</Button> */}
      <TableContainer>
        <Button
          onClick={handleExport}
          style={{
            width: 250,
            float: 'right',
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
          }}>
          Export
        </Button>
        <div id="table-container">
          <Table
            dataSource={isFiltering ? filterTable : dataForTable}
            onChange={handleChange}
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

export default VolunteerTable;
