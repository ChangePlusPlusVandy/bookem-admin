import { QueriedVolunteerProgramData } from 'bookem-shared/src/types/database';
import React, { useState } from 'react';
import Image from 'next/image';
import Header from './Header';
import BookIcon from './BookIcon';
// import ProgramName from './ProgramName';
import TimeAndPlace from './TimeAndPlace';
import About from './About';
import Contact from './Contact';
import {
  ProgramBox,
  MiddleBox,
  BottomBox,
  EditButton,
  CopyButton,
} from '@/styles/components/Program/program.styles';
import EditProgramPopupWindowForm from '../Forms/EditProgramPopupWindowForm';

/**
 * Program Detail
 * @param program Data about the program
 */
const Program = ({ program }: { program: QueriedVolunteerProgramData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <ProgramBox>
      <CopyButton
        onClick={() => {
          navigator.clipboard.writeText(
            'bookem-user.vercel.app/program/' + program._id.toString()
          );
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        }}>
        <span>
          {isCopied ? (
            <Image
              src="/program/check-mark.png"
              alt="Check mark icon"
              width="25"
              height="25"
            />
          ) : (
            <Image
              src="/program/copy-link.svg"
              alt="Copy link icon"
              width="20"
              height="20"
            />
          )}
        </span>
      </CopyButton>

      <EditButton onClick={() => setShowPopup(prev => !prev)}>
        <Image
          src="/program/pencil.png"
          alt="Pencil icon"
          width="20"
          height="20"
        />
        Edit
      </EditButton>

      {/* edit button */}
      {showPopup && <EditProgramPopupWindowForm setShowPopup={setShowPopup} />}

      <Header />

      {/* Book Icon and Program name */}
      <MiddleBox>
        <BookIcon />
        {/* <ProgramName program={program} /> */}
      </MiddleBox>

      {/* Time and Place of the program */}
      <TimeAndPlace
        programDate={program.startDate}
        location={program.location}
      />

      {/* Program Description and Contact Info */}
      <BottomBox>
        <About description={program.description} />
        <Contact phone={program.phone} email={program.email} />
      </BottomBox>
    </ProgramBox>
  );
};

export default Program;
