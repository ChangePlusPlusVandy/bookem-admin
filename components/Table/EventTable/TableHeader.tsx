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
  setShowPopup,
  showPopup,
  setShowPopupTag,
  showPopupTag,
  hasSelected,
  numSelected,
}: {
  setShowPopup: (a: boolean) => void;
  showPopup: boolean;
  setShowPopupTag: (a: boolean) => void;
  showPopupTag: boolean;
  hasSelected: boolean;
  numSelected: number;
}) => {
  return (
    <>
      <div>
        <SearchContainter>
          <TableIcon>
            <Image
              onClick={() => setShowPopup(!showPopup)}
              src="/table/addbutton.png"
              alt=""
              width={32}
              height={32}
              style={{ marginRight: 20 }}
            />
          </TableIcon>
          <TableIcon>
            <Image
              onClick={() => {
                setShowPopup(false);
                setShowPopupTag(!showPopupTag);
              }}
              src="/table/tagsbutton.png"
              alt=""
              width={32}
              height={32}
            />
          </TableIcon>
          <TableButton disabled={!hasSelected}>
            {numSelected > 0 ? `Add ${numSelected} events` : 'Add event'}
          </TableButton>
          <TableButton onClick={() => handleExport('events')}>
            Export
          </TableButton>
        </SearchContainter>
      </div>
    </>
  );
};

export default TableHeader;
