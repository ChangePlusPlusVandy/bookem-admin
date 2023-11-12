import styled from 'styled-components';

export const CreateEventContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  height: 100%;
`;

export const FormHeader = styled.legend`
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  width: 400px;
`;

export const CreateEventForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 30px;
  padding-bottom: 50px;
`;

export const FormLabel = styled.label`
  margin-top: 25px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  margin: 10px 10px 0 0;
  border-radius: 10px;
  height: 25px;
  width: 200px;
  padding: 10px;
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
  padding: 10px;
`;

export const LongFormInput = styled.input`
  margin: 15px 10px 0 0;
  border-radius: 10px;
  height: 25px;
  width: 410px;
  padding: 10px;
`;

export const LargeFormInput = styled.textarea`
  margin-top: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 410px;
  height: 100px;
  max-height: 300px;
  font-family: 'Times New Roman', serif;
  font-size: 1em;
  resize: vertical;
  padding: 10px;
`;

export const FormLogistics = styled.div`
  margin: 17px 10px 0 0;
  font-weight: normal;
`;

export const AboutEvent = styled.div`
  width: 100%;
`;
