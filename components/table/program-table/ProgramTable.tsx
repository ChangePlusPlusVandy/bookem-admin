import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, InputRef } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { QueriedVolunteerProgramData } from 'bookem-shared/src/types/database';
import useSWR from 'swr';
import { ProgramDataIndex, ProgramRowData } from '@/utils/table-types';
import { convertProgramDataToRowData } from '@/utils/table-utils';
import { fetcher } from '@/utils/utils';
import ProgramTableImpl from './ProgramTableImpl';

const ProgramTable = () => {
  const { data, error, isLoading, mutate } = useSWR<
    QueriedVolunteerProgramData[]
  >('/api/program/', fetcher, {
    onSuccess: data => {
      setDataForTable(convertProgramDataToRowData(data));
    },
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // Extra defense to refetch data if needed
  useEffect(() => {
    mutate();
  }, [mutate, data]);

  const [dataForTable, setDataForTable] = useState<ProgramRowData[]>([]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: ProgramDataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: ProgramDataIndex
  ): ColumnType<ProgramRowData> => ({
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
            icon=""
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

  return (
    <>
      <ProgramTableImpl
        getColumnSearchProps={getColumnSearchProps}
        dataForTable={dataForTable}
      />
    </>
  );
};
export default ProgramTable;
