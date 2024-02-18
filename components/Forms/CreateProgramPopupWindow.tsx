import React from 'react';
import PopupWindow from '@/components/PopupWindow';
import {
  CreateEventContainer,
  CreateEventForm,
  FormLabel,
  FormHeader,
  InputFlex,
  FormInput,
  LargeFormInput,
} from '@/styles/components/event.styles';
import { LongFormInput } from '@/styles/components/editEventPopupWindowForm.styles';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import { useForm } from 'react-hook-form';

const CreateProgramPopupWindow = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handleSubmit } = useForm({});
  const onSubmit = (data: any) => {};
  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <CreateEventContainer>
        <CreateEventForm>
          <FormHeader>Create Program</FormHeader>
          <FormLabel>Program Name</FormLabel>
          <InputFlex>
            <LongFormInput
              type="text"
              placeholder="Program Name"
              pattern="[A-Za-z]"
              title="Input must be text"
            />
          </InputFlex>

          <FormLabel>Program Description</FormLabel>
          <LargeFormInput placeholder="Program Description" />

          <ButtonCenter>
            <SubmitButton onClick={handleSubmit(onSubmit)}>Create</SubmitButton>
          </ButtonCenter>
        </CreateEventForm>
      </CreateEventContainer>
    </PopupWindow>
  );
};

export default CreateProgramPopupWindow;
