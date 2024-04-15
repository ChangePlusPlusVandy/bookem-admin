import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

/**
 * Container of sidebar
 */
export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  width: 120px;
  background-color: ${props => props.theme.colors.BOOKEM_LIGHT_GRAY};
`;

/**
 * Container of icon
 */
export const IconContainer = styled.div<{
  hoveredcolor?: string;
  color?: string;
}>`
  color: ${props => props.color || 'white'};
  &:hover {
    color: ${props => props.hoveredcolor};
  }
`;

/**
 * Make each icon a link
 * @hoveredsrc src of the img when hovered or focused
 * @backgroundcolor The background color of the link according to the route
 * @imgsrc The src of the icon according to the route
 */
export const IconLink = styled(Link)<{
  hoveredsrc: string;
  backgroundcolor: string;
  imgsrc: string;
}>`
  display: inline-block;
  padding: 25px 0px 25px 0px;
  width: 100%;
  background-color: ${props => props.backgroundcolor};

  img {
    content: url(${props => props.imgsrc});
  }

  &:hover {
    background-color: ${props => props.theme.colors.BOOKEM_BLACK};
    img {
      content: url(${props => props.hoveredsrc});
    }
  }
`;

/**
 * Contains the icon image + the text
 * Flex horizontally
 */
export const IconFlexBox = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: space-around;
  }

  @media (min-width: 767px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

/**
 * Text associated with an icon
 * @color Color of the text
 */
export const IconText = styled.span`
  font-family: ${props => props.theme.fonts.PRIMARY};
  font-style: normal;
  font-weight: 400;
  @media (max-width: 767px) {
    font-size: 20px;
  }
  @media (min-width: 768px) {
    font-size: 15px;
  }
  line-height: 24px;
`;
