import {
  EditEventForm,
  FormHeader,
  FormLabel,
  FormLogistics,
  FormInput,
  FormRowInput,
  ShortFormInput,
  MediumFormInput,
  LongFormInput,
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

  const pages = ['Info #1', 'Info #2', 'Review'];

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
      <WindowFlow
        pages={pages}
        onSubmit={handleSubmit(onSubmit)}
        components={[
          <EditEventForm key={pages[0]}>
            <FormHeader>Edit Event</FormHeader>

            <FormLabel>Event Name</FormLabel>
            <FormRowInput>
              <FormInput
                {...register('EventName')}
                type="text"
                placeholder="Event Name"
                pattern="[A-Za-z]"
                title="Input must be text"></FormInput>
              <FormInput
                {...register('EventCategory')}
                type="text"
                placeholder="Event Category (optional)"
                pattern="[A-Za-z]"
                title="Input must be text"></FormInput>
            </FormRowInput>

            <FormLabel>Logistics</FormLabel>
            <FormInput
              {...register('Date')}
              type="text"
              placeholder="Date"
              pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
              title="Input must be in MM/DD/YYYY format"></FormInput>
            <FormRowInput>
              <ShortFormInput
                {...register('Hour')}
                type="text"
                placeholder="HH"
                pattern="^[1-12]*$"
                title="Input must be in HH:MM format"></ShortFormInput>
              <FormLogistics>:</FormLogistics>
              <ShortFormInput
                {...register('Min')}
                type="text"
                placeholder="MM"
                pattern="^[1-12]*$"
                title="Input must be in HH:MM format"></ShortFormInput>
              <MediumFormInput
                {...register('Time')}
                type="text"
                placeholder="AM/PM"
                pattern="(AM|PM)"
                title="Input must be in text format"></MediumFormInput>
            </FormRowInput>
            <FormRowInput>
              <ShortFormInput
                {...register('Spots')}
                type="text"
                placeholder="#"
                pattern="^[0-9]*$"
                title="Input must be a whole number"></ShortFormInput>
              <FormLogistics>spots available</FormLogistics>
            </FormRowInput>
            <FormLabel>Address</FormLabel>
            <LongFormInput
              {...register('Street')}
              type="text"
              placeholder="Street"
              pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
              title="Input must be in MM/DD/YYYY format"></LongFormInput>
            <FormRowInput>
              <FormInput
                {...register('City')}
                type="text"
                placeholder="City"
                pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
                title="Input must be in MM/DD/YYYY format"></FormInput>
              <FormInput
                {...register('State')}
                type="text"
                placeholder="State"
                pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
                title="Input must be in MM/DD/YYYY format"></FormInput>
            </FormRowInput>
            <FormInput
              {...register('Zip')}
              type="text"
              placeholder="Zip Code"
              pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
              title="Input must be in MM/DD/YYYY format"></FormInput>
          </EditEventForm>,

          <EditEventForm key={pages[1]}>
            <FormLabel>About the event</FormLabel>
            <LargeFormInput
              {...register('About')}
              placeholder="About..."></LargeFormInput>
            <FormLabel>Contact</FormLabel>
            <FormInput
              {...register('PhoneNumber')}
              type="text"
              placeholder="Phone number"
              pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
              title="Input must be a valid phone number"></FormInput>
            <FormInput
              {...register('Email')}
              type="text"
              placeholder="Email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Input must be a valid email address"></FormInput>
          </EditEventForm>,

          <EditEventForm key={pages[1]}>{/* Review page */}</EditEventForm>,
        ]}
      />
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
