import {
  EditEventForm,
  FormHeader,
  FormLabel,
  FormInput,
  LargeFormInput,
} from '@/styles/components/editEventPopupWindowForm.styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import PopupWindow from '@/components/PopupWindow';
import WindowFlow from '@/components/WindowFlow';

const EditEventPopupWindowForm = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { register, handleSubmit } = useForm();

  const pages = ['Program', 'Date/Location', 'Contact', 'Comments'];

  const onSubmit = (data: any) => {
    const results = JSON.stringify({
      hours: parseInt(data.NumberOfHours),
      date: data.DateOfVisit,
      feedback: data.Comment,
      numBooks: data.NumberOfBooks,
    });
    console.log(results);
  };

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <WindowFlow
        pages={pages}
        onSubmit={handleSubmit(onSubmit)}
        components={[
          <EditEventForm key={pages[0]}>
            {/* page 1 */}
            hi
          </EditEventForm>,

          <EditEventForm key={pages[1]}>
            {/* page 2 */}
            hi
          </EditEventForm>,

          <EditEventForm key={pages[1]}>
            {/* page 3*/}
            hi
          </EditEventForm>,

          <EditEventForm key={pages[1]}>
            {/* page 4 */}
            hi
          </EditEventForm>,
        ]}
      />
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
