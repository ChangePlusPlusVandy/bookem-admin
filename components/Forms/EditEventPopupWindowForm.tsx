import {
  EditEventForm,
  FormHeader,
  FormLabel,
  FormLogistics,
  FormInput,
  InputFlex,
  ShortFormInput,
  MediumFormInput,
  LongFormInput,
  LargeFormInput,
  AboutEvent,
  EditEventContainer,
} from '@/styles/components/editEventPopupWindowForm.styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PopupWindow from '@/components/PopupWindow';
import { QueriedVolunteerProgramData } from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import { convertToDate, getTime } from '@/utils/utils';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';

const EditEventPopupWindowForm = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { pid } = router.query;

  const { register, handleSubmit } = useForm();
  const [eventData, setEventData] = useState<QueriedVolunteerProgramData>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (pid) {
      fetch('/api/event/' + pid)
        .then(res => {
          if (!res.ok) {
            throw new Error(
              'An error has occurred while fetching: ' + res.statusText
            );
          }
          return res.json();
        })
        .then(data => {
          setEventData(data);
          console.log(data);
        })
        .catch(err => setError(err));
    } else setError(new Error('No pid found'));
  }, []);

  const pages = ['Info #1', 'Info #2'];

  const onSubmit = (data: any) => {
    const results = JSON.stringify({
      eventName: data.EventName,
      eventCategory: data.EventCategory,
      date: data.Date,
      hh: data.Hour,
      mm: data.Min,
      time: data.Time,
      numSpots: data.Spots,
      street: data.Street,
      city: data.City,
      state: data.State,
      zip: data.Zip,
      about: data.About,
      phoneNumber: data.PhoneNumber,
      email: data.Email,
      numBooks: data.NumberOfBooks,
    });
    console.log(results);
  };

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <EditEventContainer>
        <EditEventForm>
          <FormHeader>Edit Event</FormHeader>

          <FormLabel>Event Name</FormLabel>
          <InputFlex>
            <FormInput
              {...register('EventName')}
              type="text"
              placeholder="Event Name"
              pattern="[A-Za-z]"
              title="Input must be text"
              defaultValue={eventData?.name}></FormInput>
            <FormInput
              {...register('EventCategory')}
              type="text"
              placeholder="Event Category (optional)"
              pattern="[A-Za-z]"
              title="Input must be text"
              defaultValue={eventData?.category}></FormInput>
          </InputFlex>

          <FormLabel>Logistics</FormLabel>
          <FormInput
            {...register('Date')}
            type="text"
            placeholder="Date"
            pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
            title="Input must be in MM/DD/YYYY format"
            defaultValue={convertToDate(
              eventData?.programDate.toString() || ''
            )}></FormInput>
          <InputFlex>
            <ShortFormInput
              {...register('Hour')}
              type="text"
              placeholder="HH"
              pattern="[0-1]?[0-9]|2[0-4]"
              title="Input must be in HH:MM format"></ShortFormInput>
            <FormLogistics>:</FormLogistics>
            <ShortFormInput
              {...register('Min')}
              type="text"
              placeholder="MM"
              pattern="[0-5]?[0-9]?"
              title="Input must be in HH:MM format"></ShortFormInput>
            <MediumFormInput
              {...register('Time')}
              type="text"
              placeholder="AM/PM"
              pattern="(AM|PM)"
              title="Input must be in text format"></MediumFormInput>
          </InputFlex>
          <InputFlex>
            <ShortFormInput
              {...register('Spots')}
              type="text"
              placeholder="#"
              pattern="^[0-9]*$"
              title="Input must be a whole number"></ShortFormInput>
            <FormLogistics>spots filled out of</FormLogistics>
            <ShortFormInput
              {...register('MaxSpots')}
              type="text"
              placeholder="#"
              pattern="^[0-9]*$"
              title="Input must be a whole number"
              defaultValue={eventData?.maxSpot}></ShortFormInput>
            <FormLogistics>max spots</FormLogistics>
          </InputFlex>
          <FormLabel>Address</FormLabel>
          <LongFormInput
            {...register('Street')}
            type="text"
            placeholder="Street"
            pattern="[A-Za-z0-9]"
            title="Input must be in address format"
            defaultValue={eventData?.location.street}></LongFormInput>
          <InputFlex>
            <FormInput
              {...register('City')}
              type="text"
              placeholder="City"
              pattern="[A-Za-z]"
              title="Input must be a valid city"
              defaultValue={eventData?.location.city}></FormInput>
            <FormInput
              {...register('State')}
              type="text"
              placeholder="State"
              pattern="[A-Za-z]"
              title="Input must be a valid state"
              defaultValue={eventData?.location.state}></FormInput>
          </InputFlex>
          <FormInput
            {...register('Zip')}
            type="text"
            placeholder="Zip Code"
            pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            title="Input must be in proper zip code format"
            defaultValue={eventData?.location.zip}></FormInput>

          <FormLabel>About the event</FormLabel>
          <AboutEvent>
            <LargeFormInput
              {...register('About')}
              placeholder="About..."
              defaultValue={eventData?.description}></LargeFormInput>
          </AboutEvent>
          <FormLabel>Contact</FormLabel>
          <FormInput
            {...register('PhoneNumber')}
            type="text"
            placeholder="Phone number"
            pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
            title="Input must be a valid phone number"
            defaultValue={eventData?.phone}></FormInput>
          <FormInput
            {...register('Email')}
            type="text"
            placeholder="Email address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Input must be a valid email address"
            defaultValue={eventData?.email}></FormInput>
          <ButtonCenter>
            <SubmitButton onClick={onSubmit}>Done</SubmitButton>
          </ButtonCenter>
        </EditEventForm>
      </EditEventContainer>
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
