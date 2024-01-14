import React, { useState } from 'react';
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
  InfoList,
  InfoListItem,
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
  const [showInfo, setShowInfo] = useState(false);

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <TagEventContainer>
        <TagEventHeader>Manage tags</TagEventHeader>
        <TagBodyContainer>
          {showInfo && (
            <TagInfoContainer>
              <InfoTextBox>
                <InfoHeader>Tips</InfoHeader>
                <InfoSubheader>How to use this page?</InfoSubheader>
                <InfoList>
                  <InfoListItem>Tags are categories of events.</InfoListItem>
                  <InfoListItem>
                    To create new tags: enter tag names and click check mark.
                  </InfoListItem>
                  <InfoListItem>
                    To edit existing tags: double click a tag and modify.
                  </InfoListItem>
                  <InfoListItem>
                    To delete a tag: hover over a tag and click the trash icon.
                  </InfoListItem>
                </InfoList>
              </InfoTextBox>
            </TagInfoContainer>
          )}

          <MiddleContainer>
            <SearchContainer>
              <Image
                onMouseOver={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                src="/./event/Info.png"
                alt="info button"
                width="20"
                height="20"
              />
              <SearchInput placeholder="Enter tag name here..." />
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
