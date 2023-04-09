import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 30px 50px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: top;
  overflow-y: auto;
`;

export const Title = styled.p`
  font-weight: bold;
  margin: 0px auto;
  font-size: 20px;
`;
export const Status = styled.p`
  margin: 0px auto;
  font-size: 15px;
`;

export const Question = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0px;
`;

export const Response = styled.p`
  font-size: 15px;
  margin: 0px;
`;

export const ItemContainer = styled.div``;

export const PendingContainer = styled.div`
  width: 50%;
  min-width: 150px;
  margin: 0px auto;
  border: black 1px solid;
  border-radius: 10px;
  height: 50px;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ApproveText = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: auto;
`;
export const ApproveButton = styled.button`
  height: 35px;
  width: 35px;
  border-radius: 100%;
  flex: none;
  border: none;
  margin: auto;
`;
