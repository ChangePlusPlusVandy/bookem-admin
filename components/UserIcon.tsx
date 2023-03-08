import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

/**
 * Circular header image container
 */
const HeaderImgContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: white;
  margin: auto;
`;

/**
 * Image that automatically fits the container
 */
const HeaderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserNameDiv = styled.div`
  margin: auto;
  text-align: center;
  color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;
export const UserIcon = () => {
  return (
    <>
      <HeaderImgContainer>
        <HeaderImg src="#" alt="" />
      </HeaderImgContainer>
      <UserNameDiv>Linda S.</UserNameDiv>
    </>
  );
};
