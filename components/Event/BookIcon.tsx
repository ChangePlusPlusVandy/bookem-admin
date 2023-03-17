import React from 'react';
import Image from 'next/image';
import { IconContainer } from '@/styles/components/Event/bookIcon.styles';

/**
 * Contains the circle + the book icon
 */
const BookIcon = () => {
  return (
    <IconContainer>
      <Image src="/event/bookmark.png" alt="" width={120} height={120} />
    </IconContainer>
  );
};

export default BookIcon;
