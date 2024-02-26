import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HeaderBox,
  EventDetailText,
} from '@/styles/components/Event/header.styles';

/**
 * Contain the Header Event Detail
 */
const Header = () => {
  return (
    <HeaderBox>
      <Link href="#" onClick={() => window.history.back()}>
        <Image src="/event/arrow-left.png" alt="" width={48} height={48} />
      </Link>
      <EventDetailText>Event Details</EventDetailText>
    </HeaderBox>
  );
};

export default Header;
