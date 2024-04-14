import {
  SearchContainter,
  TableButton,
  TableIcon,
} from '@/styles/table.styles';
import React from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { handleExport } from '@/utils/utils';

const TableHeader = ({
  setShowPopUp,
  showPopUp,
}: {
  setShowPopUp: (b: boolean) => void;
  showPopUp: boolean;
}) => {
  return (
    <>
      <SearchContainter>
        <TableIcon onClick={() => setShowPopUp(!showPopUp)}>
          <Image
            src="/table/addbutton.png"
            alt=""
            width={32}
            height={32}
            style={{ marginLeft: 150 }}
          />
        </TableIcon>
        <TableButton onClick={() => handleExport('programs')}>
          Export
        </TableButton>
      </SearchContainter>
    </>
  );
};

export default TableHeader;
