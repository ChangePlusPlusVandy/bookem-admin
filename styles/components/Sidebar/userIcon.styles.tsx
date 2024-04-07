import styled from 'styled-components';

/**
 * Circular header image container
 */
export const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  background-color: white;
  margin: auto;
`;

export const Name = styled.div`
  margin: auto;
  text-align: center;
  color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;

export const UserIconContainer = styled.div`
  @media (min-width: 768px) {
    margin: 20px 0 0 0;
  }

  @media (max-width: 767px) {
    margin: 76px 0 100px 29px;
    width: 100px;
  }
`;
