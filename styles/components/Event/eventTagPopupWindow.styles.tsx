import styled from 'styled-components';

export const TagEventContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 30px 20px 50px 20px;
`;

export const TagEventHeader = styled.h2`
  font-size: ${props => props.theme.fontSizes.MEDIUM};
`;

export const TagBodyContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  height: 100%;
  width: 100%;
  padding: 1
`;

export const TagInfoContainer = styled.div`
  /* flex-direction: column; */
  display: flex;
  width: 25%;
  height: 100%;
  /* background-color: lightsalmon; */
  padding: 0 10px;
  /* margin-top: 20px; */
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  width: 100%;
  height: 100%;
  border: 1px black solid;
  border-radius: 15px;
`
export const InfoHeader = styled.p`
  font-size: ${props => props.theme.fontSizes.SMALL};
  font-weight: 700;
  text-align: center;
  margin: 0;
`

export const InfoSubheader = styled.p`
  font-size: ${props => props.theme.fontSizes.EXTRA_SMALL};
  font-weight: 400;
  text-decoration: underline;
  text-align: center;
`

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  /* background-color: aquamarine; */
  height: 100%;
  width: 50%;
`;

export const TagDisplayContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: bisque; */
  border: 1px solid black;
  border-radius: 15px;
  overflow-y: scroll;
`;

export const SearchContainer = styled.div`
  display: flex;
  height: 20%;
  align-items: center;
  width: 100%;
`;

export const SearchInput = styled.input`
  border-radius: 15px;
  border: 0;
  height: 45px;
  width: 100%;
  padding: 5px 15px;
  margin: 10px;
  background-color: ${props => props.theme.colors.BOOKEM_LIGHT_GRAY};
`;
