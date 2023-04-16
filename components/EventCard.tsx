import React from 'react';
import Image from 'next/image';
import { convertToDate, getTime } from '@/utils/utils';
import { EventType } from '@/types/types';
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
const toRatio = (size: 'large' | 'medium' | 'small'): number => {
  let ratio = sizeMap.get(size);
  if (ratio !== undefined) return ratio;
  else return 1;
};

const EventCard = ({
  eventData,
  size,
}: {
  // TODO: change type of eventData
  eventData: EventType;
  // specify the size of the EventCard
  size: 'large' | 'medium' | 'small';
}) => {
  // convert the event date to Date format
  const eventDate = new Date(eventData.date);

  // get ratio based on size to be used in computing distances
  const ratio = toRatio(size);

  return (
    <Container ratio={ratio}>
      <EventImage ratio={ratio}>
        <Image
          src="/event-image.png"
          alt="Event image icon"
          width={`${Math.round(ratio * 138)}`}
          height={`${Math.round(ratio * 138)}`}
        />
      </EventImage>
      <Name ratio={ratio}>{eventData.name}</Name>

      <AddressContainer ratio={ratio}>
        <AddressIcon>
          <Image
            src="/map.png"
            alt="Map icon"
            width={`${Math.round(ratio * 21)}`}
            height={`${Math.round(ratio * 23.99)}`}
          />
        </AddressIcon>
        {eventData.location}
      </AddressContainer>

      <InfoContainer ratio={ratio}>
        <ClockIcon>
          <Image
            src="/date-icon.png"
            alt="Clock icon"
            width={`${Math.round(ratio * 21.27)}`}
            height={`${Math.round(ratio * 22.14)}`}
          />
        </ClockIcon>

        <InfoFlex>
          <InfoFlexChild ratio={ratio}>
            {convertToDate(eventDate) + ' ' + getTime(eventDate)}
          </InfoFlexChild>
          {/* <InfoFlexChild ratio={ratio}>{eventData.time}</InfoFlexChild> */}
          <InfoFlexChild ratio={ratio}>
            {eventData.availability} spots
          </InfoFlexChild>
        </InfoFlex>
      </InfoContainer>
    </Container>
  );
};

export default EventCard;
