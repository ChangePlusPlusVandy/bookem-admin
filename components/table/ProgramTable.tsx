// import React, { useRef, useState } from 'react';
// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';

// import { Button, Input, Space, Tag, Table, TableProps, InputRef } from 'antd';
// import type { ColumnType, ColumnsType } from 'antd/es/table';
// import type { FilterConfirmProps } from 'antd/es/table/interface';
// import {
//   SearchContainter,
//   StyledTable,
//   TableButton,
//   TableContainer,
// } from '@/styles/table.styles';

// import { ObjectId } from 'mongodb';
// import Link from 'next/link';
// import Image from 'next/image';
// import CreateProgramPopupWindow from '@/components/Forms/CreateProgramPopupWindow';

// interface ProgramRowData {
//   key: number;
//   programName: string;
//   programDesc: string;
// }

// type DataIndex = keyof ProgramRowData;

// const fetcher = (url: string) => fetch(url).then(res => res.json());

// const ProgramTable = () => {
//   const [showPopUp, setShowPopUp] = useState(false);
//   const [dataForTable, setDataForTable] = useState<ProgramRowData[]>([
//     {
//       key: 1,
//       programName: 'test',
//       programDesc: 'test program',
//     },
//     {
//       key: 2,
//       programName: 'test 2',
//       programDesc: 'test program 2',
//     },
//   ]);
//   const [filterTable, setFilterTable] = useState<ProgramRowData[]>([]);
//   const [isFiltering, setIsFilter] = useState<boolean>(false);

//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');
//   const searchInput = useRef<InputRef>(null);

//   const handleSearch = (
//     selectedKeys: string[],
//     confirm: (param?: FilterConfirmProps) => void,
//     dataIndex: DataIndex
//   ) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters: () => void) => {
//     clearFilters();
//     setSearchText('');
//   };

//   const getColumnSearchProps = (
//     dataIndex: DataIndex
//   ): ColumnType<ProgramRowData> => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={e =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             handleSearch(selectedKeys as string[], confirm, dataIndex)
//           }
//           style={{ marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() =>
//               handleSearch(selectedKeys as string[], confirm, dataIndex)
//             }
//             icon=""
//             size="small"
//             style={{ width: 90 }}>
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}>
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText((selectedKeys as string[])[0]);
//               setSearchedColumn(dataIndex);
//             }}>
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}>
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: boolean) => (
//       <SearchOutlined
//         style={{ color: filtered ? '#1677ff' : undefined }}
//         rev={undefined}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         .toString()
//         .toLowerCase()
//         .includes((value as string).toLowerCase()),
//     onFilterDropdownOpenChange: visible => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: text =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });
//   const columns: any = [
//     {
//       title: 'Program Name',
//       dataIndex: 'programName',
//       key: 'programName',
//       ...getColumnSearchProps('programName'),
//     },
//     {
//       title: 'Description',
//       dataIndex: 'programDesc',
//       key: 'programDesc',
//     },
//     {
//       title: 'Events',
//       dataIndex: 'programEvent',
//       key: 'programEvent',
//     },
//     {
//       title: 'Volunteers',
//       dataIndex: 'programVolunteer',
//       key: 'programVolunteer',
//     },
//   ];

//   return (
//     <>
//       {showPopUp && <CreateProgramPopupWindow setShowPopup={setShowPopUp} />}
//       <div>
//         <SearchContainter>
//           <TableButton onClick={() => setShowPopUp(prev => !prev)}>
//             <Image
//               src="/table/addbutton.png"
//               alt=""
//               width={32}
//               height={32}
//               style={{ marginLeft: 150 }}
//             />
//           </TableButton>
//         </SearchContainter>
//         <TableContainer>
//           <div id="table-container">
//             <StyledTable
//               dataSource={isFiltering ? filterTable : dataForTable}
//               columns={columns}
//               pagination={false}
//               scroll={{ y: 550 }}
//             />
//           </div>
//         </TableContainer>
//       </div>
//     </>
//   );
// };

// export default ProgramTable;

import React, { useState } from 'react';
import { Table } from 'antd';
import useSWR from 'swr';
import CreateProgramPopupWindow from '@/components/Forms/CreateProgramPopupWindow';

// Define the structure for the program data based on the API response
interface ProgramData {
  // Update these fields based on your actual data structure
  _id: string;
  name: string;
  description: string;
  // Add other fields as needed
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ProgramTable = () => {
  const { data, error } = useSWR<ProgramData[]>('/api/program/', fetcher);
  const [showPopup, setShowPopup] = useState(false);

  if (error) return <div>Failed to load programs</div>;
  if (!data) return <div>Loading...</div>;

  const columns = [
    {
      title: 'Program Name',
      dataIndex: 'name', // This should match the field in your API response
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description', // This should match the field in your API response
      key: 'description',
    },
    // ... other columns as needed
  ];

  return (
    <>
      {showPopup && <CreateProgramPopupWindow setShowPopup={setShowPopup} />}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={record => record._id} // Use the unique identifier from your data
      />
    </>
  );
};

export default ProgramTable;
