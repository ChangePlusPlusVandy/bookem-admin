import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Tag, Table, TableProps, InputRef } from 'antd';
import type {
  ColumnType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import {
  PlusOutlined,
  SearchOutlined,
  MinusOutlined,
  ArrowRightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useSWR from 'swr';
import Highlighter from 'react-highlight-words';
import { QueriedAdminData } from 'bookem-shared/src/types/database';
import { SearchContainter, TableContainer } from '@/styles/table.styles';
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import CreateEventPopupWindow from '@/components/Forms/CreateEventPopupWindow';
import type { FilterConfirmProps } from 'antd/es/table/interface';

interface AdminRowData {
  key: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  id: ObjectId;
}

type DataIndex = keyof AdminRowData;

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AdminTable = () => {
  const { data, error, isLoading } = useSWR<QueriedAdminData[]>(
    '/api/admin/',
    fetcher
  );
  const [showPopup, setShowPopup] = useState(false);
  const [dataForTable, setDataForTable] = useState<AdminRowData[]>([]);
  const [isFiltering, setIsFilter] = useState<boolean>(false);
  const [filterTable, setFilterTable] = useState<AdminRowData[]>([]);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<AdminRowData>>({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleChange: TableProps<AdminRowData>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<AdminRowData>);
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
  ): ColumnType<AdminRowData> => ({
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
          {/* Filter and close buttons */}
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

  useEffect(() => {
    if (!isLoading && data) {
      setDataForTable(convertAdminDataToRowData(data));
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

  // Define columns for the Ant Design table
  const columns: any = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'View',
      dataIndex: '',
      key: 'x',
      render: () => (
        <a>
          <Button
            icon={<ArrowRightOutlined rev={undefined} />}
            onClick={() => {}}
            style={{
              width: 30,
              borderRadius: 70,
              marginLeft: 30,
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'black',
            }}></Button>
        </a>
      ),
    },
  ];

  return (
    <>
      {showPopup && <CreateEventPopupWindow setShowPopup={setShowPopup} />}

      <SearchContainter style={{ marginLeft: 0 }}>
        <Input
          ref={searchInput}
          placeholder={'Search'}
          onChange={e => (e.target.value ? [e.target.value] : [])}
          prefix={<SearchOutlined rev={undefined} />}
          style={{ width: 1000, display: 'flex' }}
        />
        <Button
          icon={<PlusOutlined rev={undefined} />}
          onClick={() => {}}
          style={{
            width: 50,
            marginLeft: 10,
            borderRadius: 100,
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
          }}></Button>
        <Button
          icon={<MinusOutlined rev={undefined} />}
          onClick={() => {}}
          style={{
            width: 50,
            marginLeft: 10,
            borderRadius: 100,
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
          }}></Button>
        <Button
          icon={<UserOutlined rev={undefined} />}
          onClick={() => {}}
          style={{
            width: 250,
            marginLeft: 10,
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
          }}>
          Your Account
        </Button>
      </SearchContainter>

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

// const convertEventDataToRowData = (data: QueriedVolunteerEventDTO[]) => {
//   const result = data.map((event, index) => {
//     return {
//       key: index,
//       firstName: 'Manish',
//       lastName: 'Acharya',
//       email: 'manish@gmail.com',
//       phone: '1234567890',
//       role: 'Super Admin',
//     };
//   });
//   return result;
// };

const convertAdminDataToRowData = (data: QueriedAdminData[]) => {
  const result = data.map((user, index) => {
    return {
      key: index,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.status,
      id: user._id,
    };
  });
  return result;
};

export default AdminTable;
