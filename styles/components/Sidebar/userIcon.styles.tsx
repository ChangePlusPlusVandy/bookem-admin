import styled from 'styled-components';

/**
 * Circular header image container
 */
export const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  margin: auto;
`;

export const Name = styled.div`
  margin: auto;
  text-align: center;
  color: ${props => props.theme.colors.BOOKEM_BLACK};
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;
