import React, { useState, useEffect, useRef, createContext } from 'react';
import type { TableProps } from 'antd';
import { Button, Space, Table, Input, Tag, InputRef, message } from 'antd';
import type {
  ColumnType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { TableContainer } from '@/styles/table.styles';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import {
  VolunteerLogDataIndex,
  VolunteerLogRowData,
} from '@/utils/table-types';
import ApplicationTableImpl from './ApplicationTableImpl';
import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';

export const ApplicationTableContext = createContext<{
  getColumnSearchProps: (
    dataIndex: VolunteerLogDataIndex
  ) => ColumnType<VolunteerLogRowData>;
  rowSelection: any;
  sortedInfo: SorterResult<VolunteerLogRowData>;
  handleChange: TableProps<VolunteerLogRowData>['onChange'];
  successMessage: (str: string) => void;
  errorMessage: (str: string) => void;
  event: QueriedVolunteerEventDTO;
}>({
  getColumnSearchProps: () => ({}),
  rowSelection: {},
  sortedInfo: {},
  handleChange: () => {},
  successMessage: () => {},
  errorMessage: () => {},
  event: {} as QueriedVolunteerEventDTO,
});

const ApplicationTable = ({ event }: { event: QueriedVolunteerEventDTO }) => {
  const [filterTable, setFilterTable] = useState<VolunteerLogRowData[]>([]);
  const [isFiltering, setIsFilter] = useState<boolean>(false);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<VolunteerLogRowData>
  >({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleApproveLog = () => {
    console.log(selectedRowKeys);
  };

  const handleRejectLog = () => {
    console.log(selectedRowKeys);
  };

  const handleChange: TableProps<VolunteerLogRowData>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<VolunteerLogRowData>);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: VolunteerLogDataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // Function to get column search properties for VolunteerLogRowData
  const getColumnSearchProps = (
    dataIndex: VolunteerLogDataIndex
  ): ColumnType<VolunteerLogRowData> => ({
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
      (record[dataIndex] ?? '')
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

  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  const errorMessage = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  return (
    <>
      {contextHolder}
      <ApplicationTableContext.Provider
        value={{
          getColumnSearchProps,
          rowSelection,
          sortedInfo,
          handleChange,
          successMessage,
          errorMessage,
          event,
        }}>
        <TableContainer>
          <ApplicationTableImpl />
        </TableContainer>
      </ApplicationTableContext.Provider>
    </>
  );
};

export default ApplicationTable;
