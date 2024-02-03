import { SearchContainter, TableButton } from '@/styles/table.styles';
import React from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { handleExport } from '@/utils/utils';

const TableHeader = ({
  setShowPopup,
  showPopup,
  setShowPopupTag,
  showPopupTag,
}: {
  setShowPopup: (a: boolean) => void;
  showPopup: boolean;
  setShowPopupTag: (a: boolean) => void;
  showPopupTag: boolean;
}) => {
  return (
    <>
      <div>
        <SearchContainter>
          <TableButton>
            <Image
              onClick={() => setShowPopup(!showPopup)}
              src="/table/addbutton.png"
              alt=""
              width={32}
              height={32}
              style={{ marginRight: 20 }}
            />
          </TableButton>
          <TableButton>
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
          </TableButton>
          <Button
            onClick={() => handleExport('events')}
            style={{
              width: 250,
              marginLeft: 90,
              backgroundColor: 'darkgray',
              color: 'whitesmoke',
            }}>
            Export
          </Button>
        </SearchContainter>
      </div>
    </>
  );
};

export default TableHeader;
