import styled from 'styled-components';
import { RatioProp } from '@/types/types';

export const Container = styled.div<RatioProp>`
  background-color: white;
  max-width: ${props => props.ratio * 328}px;
  height: ${props => props.ratio * 350}px;
  border-radius: 10px;
  padding: ${props => props.ratio * 17}px;
  margin: ${props => props.ratio * 17}px;
  border: 1px solid black;
`;

export const EventImage = styled.div<RatioProp>`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.ratio * 17}px;
`;

export const Name = styled.div<RatioProp>`
  background-color: white;
  margin-top: ${props => props.ratio * 29}px;
  height: ${props => props.ratio * 40.45}px;
  font-style: normal;
  font-weight: 700;
  font-size: ${props => props.ratio * 18}px;
  line-height: ${props => props.ratio * 22}px;
`;

export const AddressContainer = styled.div<RatioProp>`
  height: fit-content;
  margin-top: ${props => props.ratio * 13}px;
  background-color: white;
  font-style: normal;
  font-weight: 400;
  font-size: ${props => props.ratio * 18}px;
  line-height: ${props => props.ratio * 22}px;
`;

export const AddressIcon = styled.div`
  float: left;
  margin-right: 8px;
`;

export const InfoContainer = styled.div<RatioProp>`
  height: fit-content;
  margin-top: ${props => props.ratio * 13}px;
  background-color: white;
`;

export const ClockIcon = styled.div`
  float: left;
  margin-right: 8px;
`;

export const InfoFlex = styled.div`
  height: fit-content;
  background-color: white;
  display: flex;
  gap: 5px;
  justify-content: space-between;
`;

export const InfoFlexChild = styled.div<RatioProp>`
  background-color: white;
  flex: 0 1 auto;
  text-align: center;
  vertical-align: middle;
  font-style: normal;
  font-weight: 400;
  font-size: ${props => props.ratio * 18}px;
  line-height: ${props => props.ratio * 22}px;
`;
