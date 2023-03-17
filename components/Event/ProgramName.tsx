import { QueriedVolunteerProgramData } from 'bookem-shared/src/types/database';
import React from 'react';
import {
  ProgramNameBox,
  NameAndSpot,
} from '@/styles/components/Event/programName.styles';

/**
 * Contain the Program name and sign up button
 * @param program
 */
const ProgramName = ({ program }: { program: QueriedVolunteerProgramData }) => {
  /**
   * Calculate the length of the program volunteers
   * If program.volunteers is undefined, return 0
   */
  const getProgramLength = () => {
    if (program.volunteers && program.volunteers.length)
      return program.volunteers.length;
    else return 0;
  };

  return (
    <ProgramNameBox>
      <NameAndSpot>
        <b>{program.name}</b> ({program.category}) <br />
        {getProgramLength()}/{program.maxSpot} spots filled
      </NameAndSpot>
    </ProgramNameBox>
  );
};

export default ProgramName;
