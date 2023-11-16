import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  /* font-family: ${props => props.theme.fonts.PRIMARY}; */
`;

export const RightContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  height: 100vh;
  padding: 0% 7%;
  background-color: ${props => props.theme.colors.WHITE};
  overflow: auto;
`;

export const LoginHeader = styled.div`
  font-size: ${props => props.theme.fontSizes.LARGE};
  color: ${props => props.theme.colors.BOOKEM_BLACK};
  font-weight: bold;
  margin-bottom: 50px;
`;

export const PasswordWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const PasswordEye = styled.i`
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  right: 15px;
  top: 10px;
`;

export const LoginInput = styled.input`
  border: 1px solid ${props => props.theme.colors.BOOKEM_BLACK};
  padding: 10px 18px;
  height: 45px;
  width: 100%;
  border-radius: 15px;
  color: ${props => props.theme.colors.BOOKEM_BLACK};
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.BOOKEM_RED};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ForgotPassword = styled.p`
  font-size: ${props => props.theme.fontSizes.EXTRA_SMALL};
  align-self: flex-end;
  top: 5px;
  color: ${props => props.theme.colors.BOOKEM_BLACK};
`;

export const LoginOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* background-color: aliceblue; */
  padding: 0 20%;
`;

export const LoginOptionsText = styled.p`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.EXTRA_SMALL};
  color: ${props => props.theme.colors.BOOKEM_BLACK};
  position: relative;
  width: 100%;

  &:after {
    content: '';
    width: 78px;
    border-bottom: solid 1px ${props => props.theme.colors.BOOKEM_BLACK};
    position: absolute;
    left: 70%;
    top: 50%;
  }
  &:before {
    content: '';
    width: 78px;
    border-bottom: solid 1px ${props => props.theme.colors.BOOKEM_BLACK};
    position: absolute;
    right: 70%;
    top: 50%;
  }
`;

export const LoginOptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

export const SubmitButton = styled.input`
  font-size: ${props => props.theme.fontSizes.SMALL};
  background: ${props => props.theme.colors.WHITE};
  border: solid 1px ${props => props.theme.colors.BOOKEM_BLACK};
  padding: 12px 35px;
  border-radius: 14px;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: ${props => props.theme.colors.BOOKEM_BLACK};
    color: ${props => props.theme.colors.WHITE};
    cursor: pointer;
  }
  width: 40%;
  margin: 10% auto;
`;
