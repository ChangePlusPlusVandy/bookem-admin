import {
  EditEventForm,
  FormHeader,
  FormLabel,
  FormLogistics,
  FormInput,
  InputFlex,
  ShortFormInput,
  LongFormInput,
  LargeFormInput,
  AboutEvent,
  EditEventContainer,
} from '@/styles/components/editEventPopupWindowForm.styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PopupWindow from '@/components/PopupWindow';
import {
  QueriedVolunteerEventDTO,
  VolunteerEventData,
  VolunteerEventLocation,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import { DatePicker, TimePicker, Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import moment from 'moment';
import Dayjs from 'dayjs';

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
  const [eventData, setEventData] = useState<QueriedVolunteerEventDTO>();
  const [tags, setTags] = useState([]);
  const [locationData, setLocationData] = useState<VolunteerEventLocation>();
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('12:00');
  const [startDate, setStartDate] = useState('01/01/01');
  const [endDate, setEndDate] = useState('01/01/01');

  const [error, setError] = useState<Error>();

  const { RangePicker } = DatePicker;

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  //fetch tags data from database
  useEffect(() => {
    if (pid) {
      fetch('/api/tags/' + pid)
        .then(res => {
          if (!res.ok) {
            throw new Error(
              'An error has occurred while fetching: ' + res.statusText
            );
          }
          return res.json();
        })
        .then(eventData => {
          // Access the tags field from the eventData
          if (eventData && eventData.tags) {
            setTags(eventData.tags);
          } else {
            // Handle the case where tags are not present
            setTags([]);
          }
        })
        .catch(err => setError(err));
    } else setError(new Error('No pid found'));
  }, [pid]);

  // create a options that include all the tags
  const options: SelectProps['options'] = [];

  const tagArray: string[] = eventData?.tags?.map(element => String(element)) ?? [];

  for (let i = 0; i < tagArray.length; i++) {
    options.push(tags[i]);
  }

  // function onChange(time, timeString) {
  //   console.log(time, timeString);
  // }

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
              defaultValue={eventData?.program?.name}></FormInput>
          </InputFlex>
        
          <InputFlex>
            <Space style={{ width: '100%' }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                // defaultValue={(eventData?.tags?.length || 0) > 0 ? eventData?.tags : ['']}
                defaultValue={tagArray}
                onChange={handleChange}
                options={options}
              />
            </Space>
          </InputFlex>

          <FormLabel>Logistics</FormLabel>

          <RangePicker
          // defaultValue:[moment('2020-03-09'), moment('2020-03-27')]
          // onChange={(value, startDate, endDate) => {
          //   setStartDate(startDate);
          //   setEndDate(endDate);
          // }}
          />

          <InputFlex>
            <TimePicker
              use12Hours
              format="h:mm a"
              defaultValue={Dayjs(
                Dayjs(eventData?.startDate.getTime()),
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
                Dayjs(eventData?.startDate.getTime()),
                'HH:mm'
              )}
              onChange={(value, endTime) => {
                setEndTime(endTime);
                console.log(endTime);
              }}
            />
          </InputFlex>

          <InputFlex>
            <TimePicker
              format="h:mm a"
              defaultValue={Dayjs('12:08', 'HH:mm')}
              disabled
            />
            <TimePicker
              format="h:mm a"
              defaultValue={Dayjs('12:09', 'HH:mm')}
              disabled
            />
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
            defaultValue={locationData?.street}></LongFormInput>
          <InputFlex>
            <FormInput
              {...register('city')}
              type="text"
              placeholder="City"
              pattern="[A-Za-z]"
              title="Input must be a valid city"
              defaultValue={locationData?.city}></FormInput>
            <FormInput
              {...register('state')}
              type="text"
              placeholder="State"
              pattern="[A-Za-z]"
              title="Input must be a valid state"
              defaultValue={locationData?.state}></FormInput>
          </InputFlex>
          <FormInput
            {...register('zip')}
            type="text"
            placeholder="Zip Code"
            pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            title="Input must be in proper zip code format"
            defaultValue={locationData?.zip}></FormInput>

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
            <SubmitButton onClick={handleSubmit(onSubmit)}>Save</SubmitButton>
          </ButtonCenter>
        </EditEventForm>
      </EditEventContainer>
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
