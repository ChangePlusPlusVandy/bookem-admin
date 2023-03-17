import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  background: rgba(0, 0, 0, 0.6);
`;

export const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 85%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  overflow: hidden;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 100%;
  border: none;
  height: 30px;
  width: 30px;
  background-color: white;
  &:hover {
    color: gray;
  }
  color: #dbdbdb;
  font-size: 30px;
`;
