import {
  AboutEvent,
  FormLogistics,
  ShortFormInput,
  LongFormInput,
  LargeFormInput,
  InputRowFlex,
  InputColumnFlex,
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
import React, { useState, ChangeEvent } from 'react';
import PopupWindow from '@/components/PopupWindow';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import moment, { Moment } from 'moment';
import { DatePicker, TimePicker } from 'antd';
import { useForm } from 'react-hook-form';
import type { DatePickerProps, GetProps } from 'antd';
import { database } from 'bookem-shared';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);

const CreateEventPopupWindow = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {



  const [eventName, setEventName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [eventCategory, setEventCategory] = useState<string>('');
  const [maxSpot, setMaxSpot] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { RangePicker } = DatePicker;

  const handleSubmit = () => {
    console.log(startDate);
  };

  const handleRangeChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const handleStartTimeChange = (time: Dayjs | null, timeString: string) => {
    console.log(time, timeString);
  };

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <CreateEventContainer>
        <CreateEventForm>
          <FormHeader>Create new events</FormHeader>

          <InputRowFlex>
            <InputColumnFlex>
              <FormLabel>Event Name</FormLabel>
              <FormInput
                // {...register('name')}
                type="text"
                placeholder="Event Name"
                pattern="[A-Za-z]"
                title="Input must be text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEventName(e.target.value)}
              ></FormInput>
            </InputColumnFlex>

            <InputColumnFlex>
              <FormLabel>Event Category (Optional)</FormLabel>
              <FormInput
                // {...register('program')}
                type="text"
                placeholder="Category"
                pattern="[A-Za-z]"
                title="Input must be text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEventCategory(e.target.value)}
                ></FormInput>
            </InputColumnFlex>
          </InputRowFlex>
          
          <FormLabel>Logistics</FormLabel>

          <RangePicker onChange={handleRangeChange} />
          <InputRowFlex>
            <TimePicker
              use12Hours
              format="h:mm a"
              defaultValue={dayjs(
                // Dayjs(eventData?.startDate.getTime()),
                'HH:mm'
              )}
              onChange={handleStartTimeChange}
              
            />
            <TimePicker
              use12Hours
              format="h:mm a"
              defaultValue={dayjs(
                // Dayjs(eventData?.startDate.getTime()),
                'HH:mm'
              )}
              onChange={(value, endTime) => {
                setEndTime(endTime);
                console.log(endTime);
              }}
            />
          </InputRowFlex>

          <InputRowFlex>
            <ShortFormInput
              // {...register('maxSpot')}
              type="text"
              placeholder="#"
              pattern="^[0-9]*$"
              title="Input must be a whole number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxSpot(e.target.value)}
            ></ShortFormInput>
            <FormLogistics>max spots</FormLogistics>
          </InputRowFlex>

          <FormLabel>Address</FormLabel>
          <LongFormInput
            // {...register('street')}
            type="text"
            placeholder="Street"
            pattern="[A-Za-z0-9]"
            title="Input must be in address format"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            // defaultValue={locationData?.street}
          ></LongFormInput>
          <InputRowFlex>
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
          </InputRowFlex>
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
            <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
          </ButtonCenter>
        </CreateEventForm>
      </CreateEventContainer>
    </PopupWindow>
  );
};

export default CreateEventPopupWindow;
