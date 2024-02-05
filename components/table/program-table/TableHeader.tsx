import { SearchContainter, TableButton } from '@/styles/table.styles';
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
        <TableButton onClick={() => setShowPopUp(!showPopUp)}>
          <Image
            src="/table/addbutton.png"
            alt=""
            width={32}
            height={32}
            style={{ marginLeft: 150 }}
          />
        </TableButton>
        <Button
          onClick={() => handleExport('programs')}
          style={{
            width: 250,
            marginLeft: 90,
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
          }}>
          Export
        </Button>
      </SearchContainter>
    </>
  );
};

export default TableHeader;
