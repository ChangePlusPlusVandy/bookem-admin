import styled from 'styled-components';

export const TagEventContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: start; */
  justify-content: center;
  align-items: center;
  padding: 30px 20px 50px 20px;
`;

export const TagEventHeader = styled.h2`
  font-size: ${props => props.theme.fontSizes.MEDIUM};
`;

export const TagBodyContainer = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  /* justify-content: start; */
  justify-content: center;
  height: 100%;
  width: 100%;
  /* background-color: aliceblue; */
`;

export const TagInfoContainer = styled.div`
  display: flex;
  width: 20%;
  max-height: 90%;
  padding: 0 10px;
  position: absolute;
  left: 5%;
  overflow-y: hidden;
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 5% 5% 0;
  width: 90%;
  height: 100%;
  border: 1px black solid;
  border-radius: 15px;
`;
export const InfoHeader = styled.p`
  font-size: ${props => props.theme.fontSizes.SMALL};
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

export const InfoSubheader = styled.p`
  font-size: ${props => props.theme.fontSizes.EXTRA_SMALL};
  font-weight: 400;
  text-decoration: underline;
  text-align: center;
`;
export const InfoList = styled.ul`
  height: 100%;
`;

export const InfoListItem = styled.li`
  margin-bottom: 5px;
  line-height: 1.5em;
`;

export const BoldText = styled.b`
  font-weight: 800;
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 90%;
  width: 50%;
`;

export const TagDisplayContainer = styled.div`
  width: 100%;
  height: 500px;
  /* height: 90%; */
  /* max-height: 90%; */
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

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = styled.input<SearchInputProps>`
  border-radius: 15px;
  border: 0;
  height: 45px;
  width: 100%;
  padding: 5px 15px;
  margin: 10px;
  background-color: ${props => props.theme.colors.BOOKEM_LIGHT_GRAY};
`;

export const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyContent = styled.div`
  height: 60%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.p`
  font-size: ${props => props.theme.fontSizes.SMALL};
  font-weight: 400;
  line-height: 1em;
`;

export const SingleTagDelete = styled.div`
  height: 100%;
  display: none;
  cursor: pointer;
`;

export const SingleTag = styled.div`
  height: 50px;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.BOOKEM_BLACK};
  overflow: hidden;
  &:hover ${SingleTagDelete} {
    display: block;
  }
  position: relative;
`;

export const DeleteConfirmContainer = styled.div`
  width: 250px;
  height: 150px;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DeleteConfirmTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.EXTRA_SMALL};
`;

export const DeleteConfirmText = styled.p`
  font-size: ${props => props.theme.fontSizes.EXTRA_SMALL};
`;

export const DeleteConfirmButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  /* margin: 10px; */
`;

export const DeleteConfirmButton = styled.button``;

export const EditingTagForm = styled.form`
  width: 100%;
`;

export const EditingTagInput = styled.input`
  border: 0;
  padding: 5px 7px;
  width: 100%;
`;
