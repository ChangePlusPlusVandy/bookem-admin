import { SearchContainter, TableButton } from '@/styles/table.styles';
import React from 'react';
import Image from 'next/image';

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
      </SearchContainter>
    </>
  );
};

export default TableHeader;
