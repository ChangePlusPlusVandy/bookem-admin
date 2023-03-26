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
  font-size: 2em;
  text-align: center;
  width: 400px;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
`;

export const FormLabel = styled.label`
  margin-top: 25px;
  font-weight: bold;
`;

export const FormLogistics = styled.div`
  margin: 17px 10px 0 0;
  font-weight: normal;
`;

export const FormInput = styled.input`
  margin: 10px 10px 0 0;
  border-radius: 10px;
  height: 25px;
  width: 200px;
  padding: 5px;
`;

export const InputFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ShortFormInput = styled.input`
  margin: 15px 10px 0 0;
  border-radius: 10px;
  height: 25px;
  width: 35px;
  text-align: center;
`;

export const MediumFormInput = styled.input`
  margin: 15px 20px 0 20px;
  border-radius: 10px;
  height: 25px;
  width: 70px;
`;

export const LongFormInput = styled.input`
  margin: 15px 10px 0 0;
  border-radius: 10px;
  height: 25px;
  width: 410px;
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
