import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import React, { useState } from 'react';
import Image from 'next/image';
import Header from './Header';
import BookIcon from './BookIcon';
// import EventName from './EventName';
import TimeAndPlace from './TimeAndPlace';
import About from './About';
import Contact from './Contact';
import {
  EventBox,
  MiddleBox,
  BottomBox,
  EditButton,
} from '@/styles/components/Event/event.styles';
import EditEventPopupWindowForm from '../Forms/EditEventPopupWindowForm';

/**
 * Event Detail
 * @param event Data about the event
 */
const Event = ({ event }: { event: QueriedVolunteerEventData }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <EventBox>
      <EditButton onClick={() => setShowPopup(prev => !prev)}>
        <Image
          src="/event/pencil.png"
          alt="Pencil icon"
          width="20"
          height="20"
        />
        Edit
      </EditButton>

      {/* edit button */}
      {showPopup && <EditEventPopupWindowForm setShowPopup={setShowPopup} />}

      <Header />

      {/* Book Icon and Event name */}
      <MiddleBox>
        <BookIcon />
        {/* <EventName event={event} /> */}
      </MiddleBox>

      {/* Time and Place of the event */}
      <TimeAndPlace eventDate={event.startDate} location={event.location} />

      {/* Event Description and Contact Info */}
      <BottomBox>
        <About description={event.description} />
        <Contact phone={event.phone} email={event.email} />
      </BottomBox>
    </EventBox>
  );
};

export default Event;
