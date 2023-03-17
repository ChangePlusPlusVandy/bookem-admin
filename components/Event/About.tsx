import React from 'react';
import {
  AboutBox,
  AboutContent,
  AboutHeader,
} from '@/styles/components/Event/about.styles';

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
