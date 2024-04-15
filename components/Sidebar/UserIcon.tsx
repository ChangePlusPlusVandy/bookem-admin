import React from 'react';
import Image from 'next/image';
import {
  ImageContainer,
  Name,
  UserIconContainer,
} from '@/styles/components/Sidebar/userIcon.styles';
// import { Media } from '@/lib/media';
import { useSession } from 'next-auth/react';

export const UserIcon = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <UserIconContainer>
      <ImageContainer>
        <Image src="/bookem-logo.png" width="100" height="100" alt="" />
      </ImageContainer>
      <Name>{user?.name}</Name>
    </UserIconContainer>
  );
};
