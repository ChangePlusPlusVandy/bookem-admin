import React from 'react';
import styled from 'styled-components';

const ProgramNameBox = styled.div`
  margin-left: 82px;
  height: auto;
`;

const NameAndSpot = styled.div`
  font-size: 30px;
  line-height: 50px;
`;

const SignupButton = styled.button`
  width: 135px;
  margin-top: 30px;
  padding: 12px;
  background: #5a5a5a;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 30px;
`;

/**
 * Contain the Program name and sign up button
 * @param programName
 */
const ProgramName = ({ programName }: { programName: string }) => {
  return (
    <ProgramNameBox>
      <NameAndSpot>
        <b>{programName}</b> (Program category) <br />
        9/10 spots filled
      </NameAndSpot>
      <SignupButton>Sign up</SignupButton>
    </ProgramNameBox>
  );
};

export default ProgramName;
