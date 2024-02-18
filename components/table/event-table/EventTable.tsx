import { EventDataIndex, EventRowData } from '@/utils/table-types';
import { Button, Input, InputRef, Space, TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import {
  ColumnType,
  FilterConfirmProps,
  SorterResult,
} from 'antd/es/table/interface';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import EventTableImpl from './EventTableImpl';
import useSWR from 'swr';
import { convertEventDataToRowData } from '@/utils/table-utils';
import { fetcher } from '@/utils/utils';
import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';

/**
 * Contains the "Functionality" part of Event Table including data fetching, search, filter and sort
 * @returns
 */
const EventTable = () => {
  const [sortedInfo, setSortedInfo] = useState<SorterResult<EventRowData>>({});
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [allData, setAllData] = useState<EventRowData[]>([]);
  const [dataForTable, setDataForTable] = useState<EventRowData[]>([]);
  const { data, error, isLoading, mutate } = useSWR<QueriedVolunteerEventDTO[]>(
    '/api/event/',
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

  const filteredDataByTags = dataForTable.filter(
    event =>
      selectedTags.length === 0 || // Show all events if no tags are selected
      selectedTags.every(tag =>
        event.tags.some(eventTag => eventTag.tagName.includes(tag))
      )
  );

  /**
   * Used for sort and filters
   * @param _pagination
   * @param _filters
   * @param sorter
   */
  const handleChange: TableProps<EventRowData>['onChange'] = (
    _pagination,
    _filters,
    sorter
  ) => {
    setSortedInfo(sorter as SorterResult<EventRowData>);
  };

  /**
   * Used for search bar
   * @param selectedKeys
   * @param confirm
   * @param dataIndex
   */
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: EventDataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  /**
   * Clear all search input
   * @param clearFilters
   */
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  /**
   * Documentation: https://ant.design/components/table#components-table-demo-custom-filter-panel
   * @param dataIndex
   * @returns
   */
  // Function to get column search properties
  const getColumnSearchProps = (
    dataIndex: EventDataIndex
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
  return (
    <>
      <Input
        placeholder="Enter tags separated by commas"
        onChange={e => {
          const tags = e.target.value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');
          setSelectedTags(tags);
        }}
      />

      <EventTableImpl
        getColumnSearchProps={getColumnSearchProps}
        sortedInfo={sortedInfo}
        handleChange={handleChange}
        dataForTable={filteredDataByTags}
        setSelectedTags={setSelectedTags} // Pass this as a prop
      />
    </>
  );
};

export default EventTable;
