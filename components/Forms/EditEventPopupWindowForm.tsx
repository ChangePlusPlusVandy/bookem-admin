import React from 'react';
import PopupWindow from '@/components/PopupWindow';

const EditEventPopupWindowForm = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <div>TODO: Add form for event here</div>
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
