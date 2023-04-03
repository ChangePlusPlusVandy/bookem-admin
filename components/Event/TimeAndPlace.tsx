import { convertToDate, getTime } from '@/utils/utils';
import React from 'react';
import Image from 'next/image';
import {
  TimeAndPlaceBox,
  IconBox,
  IconText,
} from '@/styles/components/Event/timeAndPlace.styles';
import { VolunteerEventLocation } from 'bookem-shared/src/types/database';
import { convertLocationToString } from 'bookem-shared/src/utils/utils';

/**
 * Contain event's date and location
 * @param eventDate
 * @param location
 */
const TimeAndPlace = ({
  eventDate,
  location,
}: {
  eventDate: Date;
  location: VolunteerEventLocation;
}) => {
  return (
    <TimeAndPlaceBox>
      {/* Calendar */}
      <IconBox>
        <Image src={'/event/calendar.png'} alt="" width={50} height={50} />
        <IconText>{convertToDate(eventDate.toString())}</IconText>
      </IconBox>

      {/* Clock */}
      <IconBox>
        <Image src={'/event/clock.png'} alt="" width={50} height={50} />
        <IconText>{getTime(eventDate.toString())}</IconText>
      </IconBox>

      {/* Location */}
      <IconBox>
        <Image src={'/event/map-pin.png'} alt="" width={50} height={50} />
        <IconText>{convertLocationToString(location)}</IconText>
      </IconBox>
    </TimeAndPlaceBox>
  );
};

export default TimeAndPlace;
