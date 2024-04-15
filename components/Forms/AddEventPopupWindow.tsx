import React, { useEffect, useState } from 'react';
import PopupWindow from '@/components/PopupWindow';
import Image from 'next/image';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { QueriedTagData } from 'bookem-shared/src/types/database';
import useSWR from 'swr';
import { ObjectId } from 'mongodb';
import { Modal, message } from 'antd';
import { fetcher } from '@/utils/utils';

const AddEventPopupWindow = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* ANTD message context holder */}

      <PopupWindow hidePopup={() => setShowPopup(false)}>
        <></>
      </PopupWindow>
    </>
  );
};

export default AddEventPopupWindow;
