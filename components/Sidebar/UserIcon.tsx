import React from 'react';
import Image from 'next/image';
import {
  ImageContainer,
  Name,
} from '@/styles/components/Sidebar/userIcon.styles';
import { useSession } from 'next-auth/react';

export const UserIcon = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <>
      <ImageContainer>
        {/* TODO: add user profile image */}
        <Image src="" width="100" height="100" alt="" />
      </ImageContainer>
      <Name>{user?.name}</Name>
    </>
  );
};
