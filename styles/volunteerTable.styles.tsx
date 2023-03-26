import { Table, Typography } from 'antd';
import styled from 'styled-components';

export const Header = styled.h2`
  text-size: 40px;
  text-font: Inter;
  margin-top: 30px;
  margin-left: 50px;
`;

export const SearchContainter = styled.div`
  margin-left: 50px;
`;

export const TableContainer = styled.div`
  width: 1180px;
  height: 300px;
  margin-left: 30px;
  padding: 20px;
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
