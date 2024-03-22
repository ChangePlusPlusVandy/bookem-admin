import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import React, { useEffect, useState } from 'react';
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
  CopyButton,
  EventName,
  SpotsFilled,
  TextContainer,
  SeeSignUpButton,
  ButtonContainer,
} from '@/styles/components/Event/event.styles';
import EventPopupWindowForm from '../Forms/EventPopupWindowForm';

/**
 * Event Detail
 * @param pid - event id
 */
const Event = ({ pid }: { pid: string }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [event, setEvent] = useState<QueriedVolunteerEventDTO>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchEvent = () => {
      fetch('/api/event/' + pid)
        .then(res => {
          if (!res.ok) {
            throw new Error(
              'An error has occurred while fetching: ' + res.statusText
            );
          }
          return res.json();
        })
        .then(data => setEvent(data))
        .catch(err => setError(err));
    };
    if (!showPopup) {
      fetchEvent();
    }
  }, [pid, showPopup]);

  if (error) return <div>Event not found!</div>;
  if (!event) return <div>Loading...</div>;

  return (
    <EventBox>
      <CopyButton
        onClick={() => {
          navigator.clipboard.writeText(
            'bookem-user.vercel.app/event/' + event._id.toString()
          );
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        }}>
        <span>
          {isCopied ? (
            <Image
              src="/event/check-mark.png"
              alt="Check mark icon"
              width="25"
              height="25"
            />
          ) : (
            <Image
              src="/event/copy-link.svg"
              alt="Copy link icon"
              width="20"
              height="20"
            />
          )}
        </span>
      </CopyButton>

      <Header />

      {/* Book Icon and Event name */}
      <MiddleBox>
        <BookIcon />
        <TextContainer>
          <EventName> {event.name}</EventName>
          <SpotsFilled>
            {' '}
            {event.volunteers.length} / {event.maxSpot} spots filled
          </SpotsFilled>
          <ButtonContainer>
            <EditButton onClick={() => setShowPopup(prev => !prev)}>
              Edit
            </EditButton>
            <SeeSignUpButton> See sign-Ups </SeeSignUpButton>
            <Image src="/event/bookmarks.png" alt="" width={50} height={50} />
          </ButtonContainer>
        </TextContainer>
      </MiddleBox>

      {/* edit button */}
      {showPopup && (
        <EventPopupWindowForm event={event} setShowPopup={setShowPopup} />
      )}

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
