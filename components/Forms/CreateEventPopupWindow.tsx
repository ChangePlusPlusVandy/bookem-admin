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
} from '@/styles/components/program.styles';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import React, { useState } from 'react';
import PopupWindow from '@/components/PopupWindow';
import Dayjs from 'dayjs';
import { DatePicker, TimePicker } from 'antd';
import { useForm } from 'react-hook-form';

const CreateEventPopupWindow = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { RangePicker } = DatePicker;

  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('12:00');

  const { handleSubmit } = useForm({});

  const onSubmit = (data: any) => {};

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <CreateEventContainer>
        <CreateEventForm>
          <FormHeader>Create Event</FormHeader>

          <FormLabel>Event Name</FormLabel>
          <InputFlex>
            <FormInput
              // {...register('name')}
              type="text"
              placeholder="Event Name"
              pattern="[A-Za-z]"
              title="Input must be text"></FormInput>
            <FormInput
              // {...register('program')}
              type="text"
              placeholder="Event Category (optional)"
              pattern="[A-Za-z]"
              title="Input must be text"></FormInput>
          </InputFlex>

          <FormLabel>Logistics</FormLabel>
          <RangePicker />
          <InputFlex>
            <TimePicker
              use12Hours
              format="h:mm a"
              defaultValue={Dayjs(
                // Dayjs(eventData?.startDate.getTime()),
                'HH:mm'
              )}
              onChange={(value, startTime) => {
                setStartTime(startTime);
                console.log(startTime);
              }}
            />
            <TimePicker
              use12Hours
              format="h:mm a"
              defaultValue={Dayjs(
                // Dayjs(eventData?.startDate.getTime()),
                'HH:mm'
              )}
              onChange={(value, endTime) => {
                setEndTime(endTime);
                console.log(endTime);
              }}
            />
          </InputFlex>

          <InputFlex>
            <ShortFormInput
              // {...register('maxSpot')}
              type="text"
              placeholder="#"
              pattern="^[0-9]*$"
              title="Input must be a whole number"
              // defaultValue={eventData?.maxSpot}
            ></ShortFormInput>
            <FormLogistics>max spots</FormLogistics>
          </InputFlex>

          <FormLabel>Address</FormLabel>
          <LongFormInput
            // {...register('street')}
            type="text"
            placeholder="Street"
            pattern="[A-Za-z0-9]"
            title="Input must be in address format"
            // defaultValue={locationData?.street}
          ></LongFormInput>
          <InputFlex>
            <FormInput
              // {...register('city')}
              type="text"
              placeholder="City"
              pattern="[A-Za-z]"
              title="Input must be a valid city"
              // defaultValue={locationData?.city}
            ></FormInput>
            <FormInput
              // {...register('state')}
              type="text"
              placeholder="State"
              pattern="[A-Za-z]"
              title="Input must be a valid state"
              // defaultValue={locationData?.state}
            ></FormInput>
          </InputFlex>
          <FormInput
            // {...register('zip')}
            type="text"
            placeholder="Zip Code"
            pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            title="Input must be in proper zip code format"
            // defaultValue={locationData?.zip}
          ></FormInput>

          <FormLabel>About the event</FormLabel>
          <AboutEvent>
            <LargeFormInput
              // {...register('description')}
              placeholder="About..."
              // defaultValue={eventData?.description}
            ></LargeFormInput>
          </AboutEvent>
          <FormLabel>Contact</FormLabel>
          <FormInput
            // {...register('phone')}
            type="text"
            placeholder="Phone number"
            pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
            title="Input must be a valid phone number"
            // defaultValue={eventData?.phone}
          ></FormInput>
          <FormInput
            // {...register('email')}
            type="text"
            placeholder="Email address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Input must be a valid email address"
            // defaultValue={eventData?.email}
          ></FormInput>
          <ButtonCenter>
            <SubmitButton onClick={handleSubmit(onSubmit)}>Create</SubmitButton>
          </ButtonCenter>
        </CreateEventForm>
      </CreateEventContainer>
    </PopupWindow>
  );
};

export default CreateEventPopupWindow;
