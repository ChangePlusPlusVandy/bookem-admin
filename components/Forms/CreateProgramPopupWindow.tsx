import React, { useState } from 'react';
import PopupWindow from '@/components/PopupWindow';
import {
  CreateEventForm,
  FormLabel,
  FormHeader,
  InputFlex,
  FormInput,
  LargeFormInput,
  LongFormInput,
  CreateProgramContainer,
} from '@/styles/components/createProgram.styles';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import { useForm } from 'react-hook-form';
import { VolunteerProgramData } from 'bookem-shared/src/types/database';
import { fetcher } from '@/utils/utils';
import useSWR from 'swr';
import { Modal, message } from 'antd';

const CreateProgramPopupWindow = ({
  setShowPopup,
  messageApi,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi: any;
}) => {
  const {
    data: allPrograms,
    isLoading,
    error,
    mutate, // Used to refetch the data
  } = useSWR<VolunteerProgramData[]>('/api/program/', fetcher, {
    onSuccess: data => {
      console.log(allPrograms);
    },
  });
  // ANTD message
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if the program name already exists
    if (allPrograms?.some(p => p.name === programName)) {
      messageApi.open({
        type: 'warning',
        content: 'Program name already exists.',
      });
    } else {
      const response = await fetch('/api/program/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: programName,
          description: programDescription,
        }),
      });
      if (response.ok) {
        const resObj = await response.json();
        console.log(resObj);
        messageApi.open({
          type: 'success',
          content: resObj.message,
        });
        mutate();
        setShowPopup(false);
      } else {
        messageApi.open({
          type: 'error',
          content: 'Failed to create program',
        });
      }
    }
  };

  return (
    <>
      <PopupWindow hidePopup={() => setShowPopup(false)}>
        <CreateProgramContainer>
          <CreateEventForm onSubmit={handleSubmit}>
            <FormHeader>Create Program</FormHeader>
            <FormLabel>Program Name</FormLabel>
            <InputFlex>
              <LongFormInput
                type="text"
                placeholder="Program Name"
                title="Input must be text"
                value={programName}
                onChange={e => setProgramName(e.target.value)}
                maxLength={50}
              />
            </InputFlex>

            <FormLabel>Program Description</FormLabel>
            <LargeFormInput
              placeholder="Program Description"
              value={programDescription}
              onChange={e => setProgramDescription(e.target.value)}
              maxLength={250}
            />

            <ButtonCenter>
              <SubmitButton type="submit">Create</SubmitButton>
            </ButtonCenter>
          </CreateEventForm>
        </CreateProgramContainer>
      </PopupWindow>
    </>
  );
};

export default CreateProgramPopupWindow;
