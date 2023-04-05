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
import {
  QueriedVolunteerEventData,
  VolunteerEventData,
  VolunteerEventLocation,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import { convertToDate, getTime } from '@/utils/utils';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

interface ModifiedVolunteerEventData
  extends Omit<VolunteerEventData, 'volunteers'> {}

const EditEventPopupWindowForm = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { pid } = router.query;

  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const response = await fetch('/api/event/' + pid);
      const data = await response.json();
      console.log('aaaaa', data);
      return data;
    },
  });
  const [eventData, setEventData] = useState<QueriedVolunteerEventData>();
  const [error, setError] = useState<Error>();

  const { RangePicker } = DatePicker;

  type RangeValue = [Dayjs | null, Dayjs | null] | null;
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  // useEffect(() => {
  //   if (pid) {
  //     fetch('/api/event/' + pid)
  //       .then(res => {
  //         if (!res.ok) {
  //           throw new Error(
  //             'An error has occurred while fetching: ' + res.statusText
  //           );
  //         }
  //         return res.json();
  //       })
  //       .then(data => {
  //         setEventData(data);
  //         console.log(data);
  //       })
  //       .catch(err => setError(err));
  //   } else setError(new Error('No pid found'));
  // }, []);

  const pages = ['Info #1', 'Info #2'];

  const onSubmit = (data: any) => {
    // VolunteerEventData
    console.log('THIS ISDATA: ', data);

    const location: VolunteerEventLocation = {
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
    };

    const dataToSave: ModifiedVolunteerEventData = {
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.startDate,
      maxSpot: data.maxSpot,
      location: location,
      phone: data.phone,
      email: data.email,
      program: data.program,
      requireApplication: false,
      tags: [],
    };

    // how to convert this into VolunteerEventData
    // and then send this to PATCH /api/event/:id
    // await fetch('/api/event/' + pid, {
    //   method: 'PATCH',
    //   body: dataToSave
    // })
  };

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <EditEventContainer>
        <EditEventForm>
          <FormHeader>Edit Event</FormHeader>

          <FormLabel>Event Name</FormLabel>
          <InputFlex>
            <FormInput
              {...register('name')}
              type="text"
              placeholder="Event Name"
              pattern="[A-Za-z]"
              title="Input must be text"
              defaultValue={eventData?.name}></FormInput>
            <FormInput
              {...register('program')}
              type="text"
              placeholder="Event Category (optional)"
              pattern="[A-Za-z]"
              title="Input must be text"
              defaultValue={eventData?.program.tagName}></FormInput>
          </InputFlex>

          <FormLabel>Logistics</FormLabel>

          <RangePicker
            value={dates || value}
            disabledDate={disabledDate}
            onCalendarChange={val => setDates(val)}
            onChange={val => setValue(val)}
            onOpenChange={onOpenChange}
          />
          {/* <InputFlex>
            <FormLogistics>Start Date</FormLogistics>
          </InputFlex>
          <InputFlex>
            <FormInput
              {...register('startDate')}
              type="text"
              placeholder="Start Date"
              pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
              title="Input must be in MM/DD/YYYY format"
              defaultValue={convertToDate(
                eventData?.startDate.toString() || ''
              )}></FormInput>
            <FormInput
              {...register('endDate')}
              type="text"
              placeholder="End Date"
              pattern="^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})"
              title="Input must be in MM/DD/YYYY format"
              defaultValue={convertToDate(
                eventData?.endDate.toString() || ''
              )}></FormInput>
          </InputFlex> */}

          <InputFlex>
            <ShortFormInput
              {...register('hour')}
              type="text"
              placeholder="HH"
              pattern="[0-1]?[0-9]|2[0-4]"
              title="Input must be in HH:MM format"></ShortFormInput>
            <FormLogistics>:</FormLogistics>
            <ShortFormInput
              {...register('minute')}
              type="text"
              placeholder="MM"
              pattern="[0-5]?[0-9]?"
              title="Input must be in HH:MM format"></ShortFormInput>
            <MediumFormInput
              {...register('time')}
              type="text"
              placeholder="AM/PM"
              pattern="(AM|PM)"
              title="Input must be in text format"></MediumFormInput>
          </InputFlex>
          <InputFlex>
            <ShortFormInput
              {...register('maxSpot')}
              type="text"
              placeholder="#"
              pattern="^[0-9]*$"
              title="Input must be a whole number"
              defaultValue={eventData?.maxSpot}></ShortFormInput>
            <FormLogistics>max spots</FormLogistics>
          </InputFlex>
          <FormLabel>Address</FormLabel>
          <LongFormInput
            {...register('street')}
            type="text"
            placeholder="Street"
            pattern="[A-Za-z0-9]"
            title="Input must be in address format"
            defaultValue={eventData?.location.street}></LongFormInput>
          <InputFlex>
            <FormInput
              {...register('city')}
              type="text"
              placeholder="City"
              pattern="[A-Za-z]"
              title="Input must be a valid city"
              defaultValue={eventData?.location.city}></FormInput>
            <FormInput
              {...register('state')}
              type="text"
              placeholder="State"
              pattern="[A-Za-z]"
              title="Input must be a valid state"
              defaultValue={eventData?.location.state}></FormInput>
          </InputFlex>
          <FormInput
            {...register('zip')}
            type="text"
            placeholder="Zip Code"
            pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            title="Input must be in proper zip code format"
            defaultValue={eventData?.location.zip}></FormInput>

          <FormLabel>About the event</FormLabel>
          <AboutEvent>
            <LargeFormInput
              {...register('description')}
              placeholder="About..."
              defaultValue={eventData?.description}></LargeFormInput>
          </AboutEvent>
          <FormLabel>Contact</FormLabel>
          <FormInput
            {...register('phone')}
            type="text"
            placeholder="Phone number"
            pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
            title="Input must be a valid phone number"
            defaultValue={eventData?.phone}></FormInput>
          <FormInput
            {...register('email')}
            type="text"
            placeholder="Email address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Input must be a valid email address"
            defaultValue={eventData?.email}></FormInput>
          <ButtonCenter>
            <SubmitButton onClick={handleSubmit(onSubmit)}>Done</SubmitButton>
          </ButtonCenter>
        </EditEventForm>
      </EditEventContainer>
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
