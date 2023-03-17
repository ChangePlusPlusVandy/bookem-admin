import { QueriedVolunteerProgramData } from 'bookem-shared/src/types/database';
import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Event/Header';
import BookIcon from '@/components/Event/BookIcon';
import ProgramName from '@/components/Event/ProgramName';
import TimeAndPlace from '@/components/Event/TimeAndPlace';
import About from '@/components/Event/About';
import Contact from '@/components/Event/Contact';
import EditEventPopupform from '@/components/Event/EditEventPopupForm';
import {
  BottomBox,
  EditButton,
  EventBox,
  MiddleBox,
} from '@/styles/components/Event/event.styles';

/**
 * Event Detail
 * @param event Data about the event
 */
const Event = ({ event }: { event: QueriedVolunteerProgramData }) => {
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
      {showPopup && <EditEventPopupform setShowPopup={setShowPopup} />}

      <Header />

      {/* Book Icon and Program name */}
      <MiddleBox>
        <BookIcon />
        <ProgramName program={event} />
      </MiddleBox>

      {/* Time and Place of the program */}
      <TimeAndPlace programDate={event.programDate} location={event.location} />

      {/* Program Description and Contact Info */}
      <BottomBox>
        <About description={event.description} />
        <Contact phone={event.phone} email={event.email} />
      </BottomBox>
    </EventBox>
  );
};

export default Event;
