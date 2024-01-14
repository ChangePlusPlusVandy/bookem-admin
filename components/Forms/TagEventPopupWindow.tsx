import React from 'react';
import PopupWindow from '@/components/PopupWindow';
import Image from 'next/image';
// import {
//   CreateEventContainer,
//   CreateEventForm,
//   FormLabel,
//   FormHeader,
//   InputFlex,
//   FormInput,
//   LargeFormInput,
// } from '@/styles/components/event.styles';
import { LongFormInput } from '@/styles/components/editEventPopupWindowForm.styles';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import { useForm } from 'react-hook-form';
import {
  InfoHeader,
  InfoSubheader,
  InfoTextBox,
  MiddleContainer,
  SearchContainer,
  SearchInput,
  TagBodyContainer,
  TagDisplayContainer,
  TagEventContainer,
  TagEventHeader,
  TagInfoContainer,
} from '@/styles/components/Event/eventTagPopupWindow.styles';

const TagEventPopupWindow = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handleSubmit } = useForm({});
  const onSubmit = (data: any) => {};
  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <TagEventContainer>
        <TagEventHeader>Manage tags</TagEventHeader>
        <TagBodyContainer>
          <TagInfoContainer>
            <InfoTextBox>
              <InfoHeader>Tips</InfoHeader>
              <InfoSubheader>How to use this page?</InfoSubheader>
            </InfoTextBox>
          </TagInfoContainer>

          <MiddleContainer>
            <SearchContainer>
              <Image
                src="/./event/Info.png"
                alt="info button"
                width="20"
                height="20"
              />
              <SearchInput></SearchInput>
              <Image
                src="/./event/CheckSubmit.png"
                alt="submit tag"
                width="30"
                height="30"
              />
            </SearchContainer>

            <TagDisplayContainer></TagDisplayContainer>
          </MiddleContainer>
        </TagBodyContainer>
      </TagEventContainer>
    </PopupWindow>
  );
};

export default TagEventPopupWindow;
