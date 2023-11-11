import React from 'react';
import Image from 'next/image';
import {
  Container,
  ImgContainer,
  HeaderFont,
} from '@/styles/components/leftDisplay.styles';
import { BOOKEM_THEME } from '@/utils/constants';

const LeftDisplay = ({
  // background color of the left display
  bgColor,
  // the image to be displayed on the left display
  imgSrc,
  // the text to be displayed below the image
  texts,
  // the color of the text
  textColor = BOOKEM_THEME.colors.BOOKEM_BLACK,
}: {
  bgColor: string;
  imgSrc: string;
  texts: string[];
  textColor?: string;
}) => {
  return (
    <Container style={{ backgroundColor: bgColor }}>
      <ImgContainer>
        {imgSrc && (
          <Image
            src={imgSrc}
            fill
            style={{ objectFit: 'contain' }}
            alt="BookEm Background"
          />
        )}
      </ImgContainer>

      {texts.map((text, index) => (
        <HeaderFont key={index} style={{ color: textColor }}>
          {text}
        </HeaderFont>
      ))}
    </Container>
  );
};

export default LeftDisplay;