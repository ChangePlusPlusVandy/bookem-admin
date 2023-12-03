import React, { useEffect, useState } from 'react';
import { convertToDate, getTime } from '@/utils/utils';
import { convertLocationToString } from 'bookem-shared/src/utils/utils';
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import Image from 'next/image';
import Link from 'next/link';
import {
  AddressContainer,
  AddressIcon,
  ClockIcon,
  Container,
  EventImage,
  InfoContainer,
  InfoFlex,
  InfoFlexChild,
  Name,
} from '@/styles/components/eventCard.styles';

// EventCard specific implementation of sizeMap
const sizeMap = new Map<string, number>([
  ['large', 328 / 328],
  ['medium', 300 / 328],
  ['small', 250 / 328],
]);

// helper method for converting size to its corresponding ratio
const toRatio = (
  size: 'large' | 'medium' | 'small',
  windowSize: number
): number => {
  let ratio = sizeMap.get(size);

  // updates ratio to be mobile responsive
  if (ratio !== undefined) return windowSize > 767 ? ratio : ratio * 0.8;
  else return 1;
};

const EventCard = ({
  eventData,
  size,
  href,
}: {
  // Volunteer event data
  eventData: QueriedVolunteerEventData;
  // specify the size of the EventCard
  size: 'large' | 'medium' | 'small';
  // the link to redirect to when the EventCard is clicked
  href?: string | undefined;
}) => {
  /* window size handling */

  // gets current window size
  const getCurrentDimension = () => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    } else {
      return {
        width: 768,
        height: 768,
      };
    }
  };

  // state for getting window size
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  // updates window size state
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  // get ratio based on size to be used in computing distances
  const ratio = toRatio(size, screenSize.width);

  return (
    <Container ratio={ratio}>
      <Link href={href || ''}>
        <EventImage ratio={ratio}>
          <Image
            src="/eventCard/event-image.png"
            alt="Event image icon"
            width={`${Math.round(ratio * 138)}`}
            height={`${Math.round(ratio * 138)}`}
          />
        </EventImage>

        <Name ratio={ratio}>{eventData.name}</Name>

        <AddressContainer ratio={ratio}>
          <AddressIcon>
            <Image
              src="/eventCard/map.png"
              alt="Map icon"
              width={`${Math.round(ratio * 21)}`}
              height={`${Math.round(ratio * 23.99)}`}
            />
          </AddressIcon>

          {convertLocationToString(eventData.location)}
        </AddressContainer>

        <InfoContainer ratio={ratio}>
          <ClockIcon>
            <Image
              src="/eventCard/date-icon.png"
              alt="Clock icon"
              width={`${Math.round(ratio * 21.27)}`}
              height={`${Math.round(ratio * 22.14)}`}
            />
          </ClockIcon>

          <InfoFlex>
            <InfoFlexChild ratio={ratio}>
              {convertToDate(eventData.startDate.toString()) +
                ' ' +
                getTime(eventData.startDate.toString())}
            </InfoFlexChild>
            {/* <InfoFlexChild ratio={ratio}>{eventData.time}</InfoFlexChild> */}
            <InfoFlexChild ratio={ratio}>
              {eventData.maxSpot} spots
            </InfoFlexChild>
          </InfoFlex>
        </InfoContainer>
      </Link>
    </Container>
  );
};

export default EventCard;
