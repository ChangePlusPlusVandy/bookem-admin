import { Table, Typography } from 'antd';
import styled from 'styled-components';

export const SearchContainter = styled.div`
  display: flex;
  margin-left: 50px;
  align-items: center;
  justify-content: space-between;
`;

export const TableContainer = styled.div`
  margin-top: 20px;
`;

export const StyledTypography = styled(Typography)`
  margin-left: 250px;
  margin-right: 100px;
`;

export const StyledTable = styled(Table)`
  .ant-table-thead .ant-table-cell {
    background-color: lightgray !important;
  }
`;

export const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: lightgray;
  height: 30px;
  border-radius: 10px;
`;

export const RoundButton = styled.div`
display: flex;
border-radius: 25px;
align-items: center;
justify-content: center;
border: 1px solid darkgray;
padding: 5px 5px;
width: 50px;
height: 50px;
background-color: darkgray;
cursor: pointer;

&:hover {
  background-color: gray;
  color: white;
}

&:active {
  background-color: gray;
}
`

export const ButtonText = styled.p`
    font-size: 20px;
    color: white

`
