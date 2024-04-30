import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import React, { useCallback, useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import { Button, ConfigProvider, Flex, Modal, Tag, message } from 'antd';
import { BOOKEM_THEME } from '@/utils/constants';
import {
  CheckCircleOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

const { confirm } = Modal;

/**
 * Event Detail
 * @param pid - event id
 */
const Event = ({ pid }: { pid: string }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [event, setEvent] = useState<QueriedVolunteerEventDTO>();
  const [error, setError] = useState<Error>();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchEvent = useCallback(() => {
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
  }, [pid]);

  useEffect(() => {
    if (!showPopup) {
      fetchEvent();
    }
  }, [showPopup, fetchEvent]);

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure about publishing this event?',
      icon: <ExclamationCircleFilled />,
      content:
        "After the event is published, you will no longer be able to modify the application questions, but you can still edit the event details using 'Edit Event' button",
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        publishEvent();
      },
    });
  };

  const publishEvent = () => {
    fetch('/api/event/' + pid + '/publish', {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          messageApi.open({
            content: data.message,
            type: 'success',
          });
          fetchEvent();
        } else {
          messageApi.open({
            content: data.message,
            type: 'error',
          });
        }
      })
      .catch(err => console.error(err));
  };

  if (error) return <div>Event not found!</div>;
  if (!event) return <div>Loading...</div>;

  return (
    <EventBox>
      {contextHolder}
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
            {event.volunteers.length} / {event.maxSpot} spots filled
          </SpotsFilled>
          <Flex style={{ margin: '0 0 10px 50px' }} gap="4px 0" wrap="wrap">
            {event.published && (
              <Tag icon={<CheckCircleOutlined />} color="success">
                published
              </Tag>
            )}
          </Flex>
          <ButtonContainer>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultHoverColor: BOOKEM_THEME.colors.BOOKEM_BLACK,
                    defaultHoverBorderColor: BOOKEM_THEME.colors.BOOKEM_BLACK,
                  },
                },
              }}>
              <Button size="large" onClick={() => setShowPopup(prev => !prev)}>
                Edit event
              </Button>
              <Button
                size="large"
                style={{ marginLeft: '10px' }}
                onClick={() => router.push('/volunteers/event/' + pid)}>
                See sign-Ups
              </Button>
              {event.published ? (
                <Button
                  size="large"
                  style={{ marginLeft: '10px' }}
                  onClick={() => {}}>
                  See Applications
                </Button>
              ) : (
                <Button
                  size="large"
                  style={{ marginLeft: '10px' }}
                  onClick={() =>
                    router.push(router.basePath + pid + '/application')
                  }>
                  Add/Edit application
                </Button>
              )}

              <Button
                size="large"
                style={{ marginLeft: '10px' }}
                onClick={showDeleteConfirm}>
                Publish
              </Button>
            </ConfigProvider>
            {/* <Image src="/event/bookmarks.png" alt="" width={50} height={50} /> */}
          </ButtonContainer>
        </TextContainer>
      </MiddleBox>

      {/* edit button */}
      {showPopup && (
        <EventPopupWindowForm
          event={event}
          setShowPopup={setShowPopup}
          mutate={fetchEvent}
          messageApi={messageApi}
        />
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
