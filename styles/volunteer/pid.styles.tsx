import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  padding: 60px;
  height: 9vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1vh;
  align-items: center;
`;

export const HeaderText = styled.p`
  font-size: 30px;
`;

export const Export = styled.button`
  border: none;
  height: 40px;
  width: 150px;
  border-radius: 10px;
  &:hover {
    background-color: gray;
  }
`;
export const GeneralSection = styled.div`
  margin-left: 20px;
`;

export const GeneralSectionHeader = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

export const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  top: 0px;
  position: sticky;
  background-color: #e3e3e3;
  height: 40px;
  font-size: 18px;
  border-radius: 10px;
  z-index: 1;
`;

export const SectionFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: none;
  margin-top: auto;
  bottom: 0px;
  position: sticky;
  background-color: #e3e3e3;
  height: 25px;
  font-size: 15px;
  padding: 0px 15px;
  border-radius: 0px 0px 10px;
  z-index: 1;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Body = styled.div`
  display: flex;
  height: 80vh;
  width: 100%;
  gap: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Info = styled.p`
  margin: 0 auto;
  font-size: 18px;
`;

export const RightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: hidden;
  border-radius: 10px;
  width: 38%;
`;

export const ApplicationContainer = styled.div`
  height: 58%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  border: solid #e3e3e3 1px;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`;

export const NotesContainer = styled.div`
  height: 38%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  border: solid #e3e3e3 1px;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
`;
export const Section = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: solid #e3e3e3 1px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
  width: 24%;
  border-top: none;
`;

export const IndividualHours = styled.div`
  border-bottom: solid #e3e3e3 1px;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 18px;
  gap: 10px;
  padding: 20px 40px;
`;

export const EventTitle = styled.p`
  margin: 0px;
  font-size: 18px;
  font-weight: bold;
`;

export const ClickableHeader = styled.button`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  top: 0px;
  position: sticky;
  justify-self: flex-start;
  background-color: #e3e3e3;
  height: 40px;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  &:hover {
    background-color: lightgray;
  }
`;

export const ForwardButton = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  position: absolute;
  left: 3px;
  border: none;
  bottom: 3px;
`;
export const BackButton = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  position: absolute;
  right: 3px;
  border: none;
  bottom: 3px;
`;
