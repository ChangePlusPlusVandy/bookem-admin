import { Table, Typography } from 'antd';
import styled from 'styled-components';

export const SearchContainter = styled.div`
  display: flex;
  margin-left: 50px;
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
