import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const ContactBox = styled.div`
  width: 500px;
  margin-left: 147px;
`;

const ContactHeader = styled.div`
  font-size: 30px;
`;

const BigIconBox = styled.div`
  margin-top: 40px;
`;

/**
 * Contains Icon + text
 */
const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Icon = styled(Image)``;

const IconText = styled.span`
  margin-left: 37px;
  font-size: 18px;
`;

/**
 * Parameter of each icon + text box
 * @src src for the icon image
 * @text text associated with that icon
 */
interface IconParams {
  src: string;
  text: string;
}

/**
 * Contain Contact info
 */
const Contact = () => {
  /**
   * List of icon params
   */
  const iconParamList: IconParams[] = [
    {
      src: '/event/phone.png',
      text: '615-383-3837',
    },
    {
      src: '/event/mail.png',
      text: 'bookem@gmail.com',
    },
  ];

  const iconWidth = 23;
  const iconHeight = 23;
  return (
    <>
      <ContactBox>
        <ContactHeader>Contact</ContactHeader>
        <BigIconBox>
          {/* Iterate through iconParamList to generate multiple icon + text box */}
          {iconParamList.map(iconParam => {
            return (
              <IconBox key={iconParam.src}>
                <Icon
                  src={iconParam.src}
                  alt=""
                  width={iconWidth}
                  height={iconHeight}
                />
                <IconText>{iconParam.text}</IconText>
              </IconBox>
            );
          })}
        </BigIconBox>
      </ContactBox>
    </>
  );
};

export default Contact;
