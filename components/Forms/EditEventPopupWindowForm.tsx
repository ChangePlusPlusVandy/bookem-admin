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
// import { useForm } from 'react-hook-form';
import PopupWindow from '@/components/PopupWindow';
import {
  QueriedVolunteerEventDTO,
  QueriedVolunteerEventData,
  VolunteerEventData,
  VolunteerEventLocation,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import { DatePicker, Select, Space, DatePickerProps } from 'antd';

interface ModifiedVolunteerEventData
  extends Omit<VolunteerEventData, 'volunteers'> {}

const EditEventPopupWindowForm = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { pid } = router.query;

  const [eventData, setEventData] = useState<QueriedVolunteerEventDTO>();
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [name, setName] = useState<string>();
  const [program, setProgram] = useState<string>();
  const [max, setMax] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [zip, setZip] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<Error>();

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const tagArray: string[] =
    eventData?.tags?.map(tag => String(tag.tagName)) ?? [];

  // create a options that include all the tags
  const options: string[] = [];

  for (let i = 0; i < tagArray.length; i++) {
    options.push(tagArray[i]);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/event/' + pid);
      const data = await response.json();
      console.log('aaaaa', data);
      setEventData(data);
      setName(data?.name);
      setProgram(data?.program?.name);
      setMax(data?.maxSpot);
      setStreet(data?.location?.street);
      setCity(data?.location?.city);
      setState(data?.location?.state);
      setZip(data?.location?.zip);
      setDescription(data?.description);
      setPhone(data?.phone);
      setEmail(data?.email);
    };

    fetchData();
  }, [pid]);

  // TODO:fetch tags data from database
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
  //       .then(eventData => {
  //         // Access the tags field from the eventData
  //         if (eventData && eventData.tags) {
  //           console.log(eventData.tags);
  //           setTags(eventData.tags);
  //         } else {
  //           // Handle the case where tags are not present
  //           console.log('tags not fetched');
  //           setTags([]);
  //         }
  //       })
  //       .catch(err => setError(err));
  //   } else setError(new Error('No pid found'));
  // }, [pid]);

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
  };

  const onChange1 = (value: DatePickerProps['value'], dateString: any) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);

    setStartDate(value);
    console.log(startDate);
  };

  const onChange2 = (value: DatePickerProps['value'], dateString: any) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);

    setEndDate(value);
    console.log(endDate);
  };

  const onOk1 = (value: DatePickerProps['value']) => {
    console.log('onOk1: ', value);
    setStartDate(value);
    console.log(startDate);
  };

  const onOk2 = (value: DatePickerProps['value']) => {
    console.log('onOk2: ', value);
    setEndDate(value);
    console.log(endDate);
  };

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <EditEventContainer>
        <EditEventForm>
          <FormHeader>Edit Event</FormHeader>

          <FormLabel>Event Name</FormLabel>
          <InputFlex>
            <FormInput
              type="text"
              placeholder="Event Name"
              pattern="[A-Za-z]"
              title="Input must be text"
              defaultValue={name}></FormInput>
            <FormInput
              type="text"
              placeholder="Event Category (optional)"
              pattern="[A-Za-z]"
              title="Input must be text"
              defaultValue={program}></FormInput>
          </InputFlex>

          <InputFlex>
            <Space style={{ width: '100%' }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select tags"
                // defaultValue={tagArray}
                // Todo: change the hard coded tags to tags from database
                defaultValue={['hidden', 'saved']}
                onChange={handleChange}
                options={tags}
              />
            </Space>
          </InputFlex>

          <FormLabel>Logistics</FormLabel>

          <DatePicker showTime onChange={onChange1} onOk={onOk1} />
          <DatePicker showTime onChange={onChange2} onOk={onOk2} />

          <InputFlex>
            <ShortFormInput
              type="text"
              placeholder="#"
              pattern="^[0-9]*$"
              title="Input must be a whole number"
              defaultValue={max}></ShortFormInput>
            <FormLogistics>max spots</FormLogistics>
          </InputFlex>
          <FormLabel>Address</FormLabel>
          <LongFormInput
            type="text"
            placeholder="Street"
            pattern="[A-Za-z0-9]"
            title="Input must be in address format"
            defaultValue={street}></LongFormInput>
          <InputFlex>
            <FormInput
              type="text"
              placeholder="City"
              pattern="[A-Za-z]"
              title="Input must be a valid city"
              defaultValue={city}></FormInput>
            <FormInput
              type="text"
              placeholder="State"
              pattern="[A-Za-z]"
              title="Input must be a valid state"
              defaultValue={state}></FormInput>
          </InputFlex>
          <FormInput
            type="text"
            placeholder="Zip Code"
            pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            title="Input must be in proper zip code format"
            defaultValue={zip}></FormInput>

          <FormLabel>About the event</FormLabel>
          <AboutEvent>
            <LargeFormInput
              placeholder="About..."
              defaultValue={description}></LargeFormInput>
          </AboutEvent>
          <FormLabel>Contact</FormLabel>
          <FormInput
            type="text"
            placeholder="Phone number"
            pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
            title="Input must be a valid phone number"
            defaultValue={phone}></FormInput>
          <FormInput
            type="text"
            placeholder="Email address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Input must be a valid email address"
            defaultValue={email}></FormInput>
          <ButtonCenter>
            <SubmitButton onClick={onSubmit}>Save</SubmitButton>
          </ButtonCenter>
        </EditEventForm>
      </EditEventContainer>
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
