import styled from 'styled-components';
import Image from 'next/image';

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: max(17vw, 150px);
  height: max(17vw, 150px);
  border-radius: 50%;
  border: 10px solid #5a5a5a;
`;

export const Icon = styled(Image)``;
