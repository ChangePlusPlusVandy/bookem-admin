import styled from 'styled-components';

export const EditEventForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 20px;
`;

export const FormBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormHeader = styled.legend`
  font-weight: bold;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
`;

export const FormLabel = styled.label`
  margin-top: 20px;
`;

export const FormInput = styled.input`
  margin-top: 20px;
  border-radius: 10px;
  height: 25px;
`;

export const LargeFormInput = styled.textarea`
  margin-top: 20px;
  border-radius: 10px;
  width: 400px;
  height: 100px;
  font-family: 'Times New Roman', serif;
  font-size: 1em;
`;

export const SubmitButton = styled.input`
  margin-left: 150px;
  margin-top: 40px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
`;
