import React from 'react';
import styled from 'styled-components';

const AboutBox = styled.div`
  width: 700px;
`;

const AboutHeader = styled.div`
  font-size: 30px;
`;
const AboutContent = styled.div`
  margin-top: 33px;
`;

/**
 * Contains the program description
 * @param description Description of the current event
 */
const About = ({ description }: { description: string }) => {
  return (
    <>
      <AboutBox>
        <AboutHeader>About</AboutHeader>
        <AboutContent>{description}</AboutContent>
      </AboutBox>
    </>
  );
};

export default About;
