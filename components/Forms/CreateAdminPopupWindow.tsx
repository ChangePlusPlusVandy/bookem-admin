import {
  AboutEvent,
  FormLogistics,
  ShortFormInput,
  LongFormInput,
  LargeFormInput,
  InputFlex,
  FormInput,
  FormLabel,
  CreateEventForm,
  FormHeader,
  CreateEventContainer,
} from '@/styles/components/event.styles';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import React, { useState } from 'react';
import PopupWindow from '@/components/PopupWindow';
import { useForm } from 'react-hook-form';
import { Form, type FormProps } from 'antd';

const CreateEventPopupWindow = ({
  setShowPopup,
  messageApi,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi: any;
}) => {
  const { register, handleSubmit } = useForm({});

  const onSubmit = (data: any) => {
    const results = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password,
    });
    console.log('Here are the results: ', results);
    createAdmin(results);
  };

  const createAdmin = async (data: any) => {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        // Specify the content type in the headers
        'Content-Type': 'application/json',
      },
      // Stringify the JSON body
      body: data,
    });

    if (res.ok) {
      const resObj = await res.json();
      messageApi.open({
        type: 'success',
        content: resObj.message,
      });
    } else {
      const resObj = await res.json();
      messageApi.open({
        type: 'error',
        content: resObj.message,
      });
    }

    setShowPopup(false);
  };

  return (
    <>
      <PopupWindow hidePopup={() => setShowPopup(false)}>
        <CreateEventContainer>
          <CreateEventForm>
            <FormHeader>Add new account</FormHeader>

            <InputFlex>
              <FormInput
                {...register('firstName')}
                type="text"
                placeholder="First Name"
                pattern="[A-Za-z]"
                title="Input must be text"></FormInput>
              <FormInput
                {...register('lastName')}
                type="text"
                placeholder="Last Name"
                pattern="[A-Za-z]"
                title="Input must be text"></FormInput>
            </InputFlex>

            <LongFormInput
              {...register('email')}
              type="text"
              placeholder="Email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Input must be a valid email address"
              // defaultValue={eventData?.email}
            ></LongFormInput>

            <LongFormInput
              {...register('phone')}
              type="text"
              placeholder="Phone number"
              pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
              title="Input must be a valid phone number"
              // defaultValue={eventData?.phone}
            ></LongFormInput>

            <LongFormInput
              {...register('password')}
              type="password"
              placeholder="Password"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Input must be a valid password"
              // defaultValue={eventData?.email}
            ></LongFormInput>
            <LongFormInput
              // {...register('email')}
              type="password"
              placeholder="Confirm Password"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Input must be a valid password"
              // defaultValue={eventData?.email}
            ></LongFormInput>

            <ButtonCenter>
              <SubmitButton onClick={handleSubmit(onSubmit)}>Add</SubmitButton>
            </ButtonCenter>
          </CreateEventForm>
        </CreateEventContainer>
      </PopupWindow>
    </>
  );
};

export default CreateEventPopupWindow;
