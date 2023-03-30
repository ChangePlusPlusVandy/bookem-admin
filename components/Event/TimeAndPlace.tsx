import { convertToDate, getTime } from '@/utils/utils';
import React from 'react';
import Image from 'next/image';

import {
  TimeAndPlaceBox,
  IconBox,
  IconText,
} from '@/styles/components/Event/timeAndPlace.styles';

/**
 * Contain Program's date and location
 * @param programDate
 */
const TimeAndPlace = ({
  programDate,
  location,
}: {
  programDate: Date;
  // TODO: fix this to use type
  location: { street: String; city: String; state: String; zip: Number };
}) => {
  return (
    <TimeAndPlaceBox>
      {/* Calendar */}
      <IconBox>
        <Image src={'/event/calendar.png'} alt="" width={50} height={50} />
        <IconText>{convertToDate(programDate.toString())}</IconText>
      </IconBox>

      {/* Clock */}
      <IconBox>
        <Image src={'/event/clock.png'} alt="" width={50} height={50} />
        <IconText>{getTime(programDate.toString())}</IconText>
      </IconBox>

      {/* Location */}
      <IconBox>
        <Image src={'/event/map-pin.png'} alt="" width={50} height={50} />
        {/* TODO: parse location object into string */}
        <IconText>
          {location.street +
            ', ' +
            location.city +
            ', ' +
            location.state +
            ' ' +
            location.zip}
        </IconText>
      </IconBox>
    </TimeAndPlaceBox>
  );
};

export default TimeAndPlace;
