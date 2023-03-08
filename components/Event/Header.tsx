import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const HeaderBox = styled.div`
  display: flex;
  height: 48px;
`;

/**
 * Arrow Image as a link
 */
const ArrowLink = styled(Link)``;
const ArrowImg = styled(Image)``;

const EventDetailText = styled.span`
  margin-left: 38px;
  font-size: 40px;
`;

/**
 * Contain the Header Event Detail
 */
const Header = (props: any) => {
  return (
    <>
      <HeaderBox>
        <ArrowLink href="/">
          <ArrowImg src="/event/arrow-left.png" alt="" width={48} height={48} />
        </ArrowLink>
        <EventDetailText>Event Details</EventDetailText>
      </HeaderBox>
    </>
  );
};

export default Header;
