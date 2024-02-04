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
import { DatePicker, TimePicker } from 'antd';
import { useForm } from 'react-hook-form';
import type { DatePickerProps, GetProps } from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);

interface Location {
  city: string;
  state: string;
  street: string;
  zip: number;
}

const CreateEventPopupWindow = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [eventName, setEventName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
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

  const handleSubmit = async () => {
    const eventObject = {
      name: eventName,
      description: description,
      startDate: convertToMongoDate(startDate, startTime),
      endDate: convertToMongoDate(endDate, endTime),
      maxSpot: parseInt(maxSpot, 10),
      location: {
        city: city,
        state: state,
        street: address,
        zip: zip,
      },
      phone: phone,
      email: email,
      program: null,
      requireApplication: false,
      tags: [],
      volunteers: [],
    };

    try {
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventObject),
      });

      console.log(eventObject);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle errors (e.g., show an error message)
    }
  };

  const handleRangeChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  function convertToMongoDate(dateStr: string, timeStr: string): string {
    // Check for invalid inputs
    if (!dateStr || !timeStr) {
      throw new Error('Invalid input for date or time');
    }

    // Parse the time string
    const timeParts: RegExpMatchArray | null =
      timeStr.match(/(\d+):(\d+) (\w+)/);
    if (!timeParts) {
      throw new Error('Invalid time format');
    }

    let hours: number = parseInt(timeParts[1], 10);
    const minutes: number = parseInt(timeParts[2], 10);
    const ampm: string = timeParts[3];

    if (ampm.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    } else if (ampm.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    // Combine the date and time into a standard format.
    const combinedDateTimeStr: string = `${dateStr} ${hours}:${minutes}`;

    // Create a Date object.
    const dateObj: Date = new Date(combinedDateTimeStr);

    // Convert to ISO 8601 string format (used by MongoDB).
    return dateObj.toISOString();
  }

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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEventName(e.target.value)
                }></FormInput>
            </InputColumnFlex>

            <InputColumnFlex>
              <FormLabel>Event Category (Optional)</FormLabel>
              <FormInput
                // {...register('program')}
                type="text"
                placeholder="Category"
                pattern="[A-Za-z]"
                title="Input must be text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEventCategory(e.target.value)
                }></FormInput>
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
              onChange={(time: Dayjs | null, timeString: string) => {
                setStartTime(timeString);
              }}
            />
            <TimePicker
              use12Hours
              format="h:mm a"
              defaultValue={dayjs(
                // Dayjs(eventData?.startDate.getTime()),
                'HH:mm'
              )}
              onChange={(time: Dayjs | null, timeString: string) => {
                setEndTime(timeString);
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMaxSpot(e.target.value)
              }></ShortFormInput>
            <FormLogistics>max spots</FormLogistics>
          </InputRowFlex>

          <FormLabel>Address</FormLabel>
          <LongFormInput
            // {...register('street')}
            type="text"
            placeholder="Street"
            pattern="[A-Za-z0-9]"
            title="Input must be in address format"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
            // defaultValue={locationData?.street}
          ></LongFormInput>
          <InputRowFlex>
            <FormInput
              // {...register('city')}
              type="text"
              placeholder="City"
              pattern="[A-Za-z]"
              title="Input must be a valid city"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }></FormInput>
            <FormInput
              // {...register('state')}
              type="text"
              placeholder="State"
              pattern="[A-Za-z]"
              title="Input must be a valid state"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value)
              }></FormInput>
          </InputRowFlex>
          <FormInput
            // {...register('zip')}
            type="text"
            placeholder="Zip Code"
            pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            title="Input must be in proper zip code format"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setZip(e.target.value)
            }></FormInput>

          <FormLabel>About the event</FormLabel>
          <AboutEvent>
            <LargeFormInput
              // {...register('description')}
              placeholder="About..."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }></LargeFormInput>
          </AboutEvent>
          <FormLabel>Contact</FormLabel>
          <FormInput
            // {...register('phone')}
            type="text"
            placeholder="Phone number"
            pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
            title="Input must be a valid phone number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }></FormInput>
          <FormInput
            // {...register('email')}
            type="text"
            placeholder="Email address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Input must be a valid email address"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }></FormInput>

          <ButtonCenter>
            <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
          </ButtonCenter>
        </CreateEventForm>
      </CreateEventContainer>
    </PopupWindow>
  );
};

export default CreateEventPopupWindow;
