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
  location: string;
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
        <IconText>{location}</IconText>
      </IconBox>
    </TimeAndPlaceBox>
  );
};

export default TimeAndPlace;
