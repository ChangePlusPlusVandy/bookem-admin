import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

/**
 * Container of sidebar
 */
export const SideBarBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  justify-content: space-between;
  width: 120px;
  height: 100vh;
  background-color: #6d6d6d;
`;

/**
 * Container of icon
 */
export const IconBox = styled.div`
  padding-top: 20px;
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

/**
 * Icon image
 */
export const Icon = styled(Image)``;
