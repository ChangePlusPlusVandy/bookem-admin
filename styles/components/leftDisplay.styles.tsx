import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100vh;
  padding-bottom: 8%;
  padding-top: 9%;
  overflow-y: auto;
`;

export const ImgContainer = styled.div`
  position: relative;
  width: 85%;
  height: 60vw;
  min-height: 200px;
  min-width: 120px;
  margin: 0 auto 50px auto;
`;

export const HeaderFont = styled.div`
  font-size: ${props => props.theme.fontSizes.MEDIUM};
  margin: 4px;
  margin-left: auto;
  margin-right: auto;
`;
