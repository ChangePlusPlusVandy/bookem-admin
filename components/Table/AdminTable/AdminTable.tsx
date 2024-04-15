import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, TableProps, InputRef } from 'antd';
import type {
  ColumnType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import Highlighter from 'react-highlight-words';
import { QueriedAdminData } from 'bookem-shared/src/types/database';
import { convertAdminDataToRowData } from '@/utils/table-utils';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { AdminDataIndex, AdminRowData } from '@/utils/table-types';
import AdminTableImpl from './AdminTableImpl';
import { fetcher } from '@/utils/utils';

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
    dataIndex: AdminDataIndex
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
    dataIndex: AdminDataIndex
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
  if (error) return <div>Failed to load admin table</div>;
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

  return (
    <>
      <AdminTableImpl
        getColumnSearchProps={getColumnSearchProps}
        sortedInfo={sortedInfo}
        handleChange={handleChange}
        dataForTable={dataForTable}
        searchInput={searchInput}
      />
    </>
  );
};
export default AdminTable;
