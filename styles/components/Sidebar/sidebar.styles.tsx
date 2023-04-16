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
  background: ${props => props.theme.colors.BOOKEM_LIGHT_GRAY};
`;

/**
 * Container of icon
 */

export const IconText = styled.span<{ color: string }>`
  color: ${props => props.color};
  font-family: ${props => props.theme.fonts.PRIMARY};
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
`;
export const IconContainer = styled.div`
  padding-top: 20px;
`;

export const IconFlexBox = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;
  justify-content: space-between;
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
    background-color: #d9d9d9;
    img {
      content: url(${props => props.hoveredsrc});
    }
  }
`;
