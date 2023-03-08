import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: max(17vw, 150px);
  height: max(17vw, 150px);
  border-radius: 50%;
  border: 10px solid #5a5a5a;
`;

const Icon = styled(Image)``;

/**
 * Contains the circle + the book icon
 */
const BookIcon = () => {
  return (
    <IconContainer>
      <Icon src="/event/bookmark.png" alt="" width={120} height={120} />
    </IconContainer>
  );
};

export default BookIcon;
