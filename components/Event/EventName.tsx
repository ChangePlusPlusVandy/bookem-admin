import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import React from 'react';
import {
  EventNameBox,
  NameAndSpot,
} from '@/styles/components/Event/eventName.styles';

/**
 * Contain the Event name and sign up button
 * @param event
 */
const EventName = ({ event }: { event: QueriedVolunteerEventData }) => {
  /**
   * Calculate the length of the event volunteers
   * If event.volunteers is undefined, return 0
   */
  const getEventLength = () => {
    if (event.volunteers && event.volunteers.length)
      return event.volunteers.length;
    else return 0;
  };

  return (
    <EventNameBox>
      <NameAndSpot>
        <b>{event.name}</b> ({event.program.tagName}) <br />
        {getEventLength()}/{event.maxSpot} spots filled
      </NameAndSpot>
    </EventNameBox>
  );
};

export default EventName;
