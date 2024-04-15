import React, { useState, useEffect, useRef, createContext } from 'react';
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
import { TableContainer } from '@/styles/table.styles';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { VolunteerDataIndex, VolunteerRowData } from '@/utils/table-types';
import VolunteerTableImpl from './VolunteerTableImpl';
import { useActiveRoute } from '@/lib/useActiveRoute';
import VolunteersInEvent from './VolunteersInEvent';

export const VolunteerTableContext = createContext<{
  getColumnSearchProps: (
    dataIndex: VolunteerDataIndex
  ) => ColumnType<VolunteerRowData>;
  handleChange: TableProps<VolunteerRowData>['onChange'];
  isFiltering: boolean;
  filterTable: VolunteerRowData[];
}>({
  getColumnSearchProps: () => ({}),
  handleChange: () => {},
  isFiltering: false,
  filterTable: [],
});

const VolunteerTable = ({ eventId }: { eventId?: string }) => {
  // const { data: totalHours } = useSWR<number>('/api/users/totalHours', fetcher);
  const [filterTable, setFilterTable] = useState<VolunteerRowData[]>([]);
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

  const route = useActiveRoute();

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

  // useEffect(() => {
  //   if (!isLoading && totalHours) {
  //     setHours(totalHours);
  //   }
  // }, [totalHours, isLoading]);

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

  return (
    <>
      {/* <Button onClick={clearFilters}>Clear filters</Button> */}
      <VolunteerTableContext.Provider
        value={{
          getColumnSearchProps,
          handleChange,
          isFiltering,
          filterTable,
        }}>
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
          {route === '/volunteer' && <VolunteerTableImpl />}
          {route === '/volunteers/event/[pid]' && (
            <VolunteersInEvent eventId={eventId} />
          )}
        </TableContainer>
      </VolunteerTableContext.Provider>
    </>
  );
};

export default VolunteerTable;
