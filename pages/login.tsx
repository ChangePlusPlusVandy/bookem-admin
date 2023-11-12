import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { getSession, GetSessionParams, signIn } from 'next-auth/react';
import Image from 'next/image';
import {
  Container,
  SubmitButton,
  ForgotPassword,
  LoginForm,
  LoginHeader,
  LoginInput,
  LoginOptionsContainer,
  LoginOptionsRow,
  LoginOptionsText,
  PasswordEye,
  PasswordWrapper,
  RightContainer,
} from '@/styles/login.styles';
import LeftDisplay from '@/components/LeftDisplay';
import { BOOKEM_THEME } from '@/utils/constants';

const LoginPage = () => {
  //React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // state for showing password
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //Function to handle login and redirect
  const handleLogin = async (data: FieldValues) => {
    console.log('logging in');

    const res = await signIn('credentials', {
      redirect: true,
      email: data.email,
      password: data.password,
    });

    // if (!status) {
    //   window.location.href = '/';
    // }
    if (res?.status === 401) {
      // If login is unsuccessful, display error message.
      setErrorMessage('Ooops! Incorrect email or password');
    } else if (res?.status === 200) {
      // If login is successful, redirect to home page.
      window.location.href = '/';
    }
  };

  return (
    <>
      <Container>
        <LeftDisplay
          imgSrc="/login/admin1.png"
          bgColor={BOOKEM_THEME.colors.BOOKEM_YELLOW}
          texts={['Welcome to the', "Book'em Admin Portal"]}
        />
        <RightContainer>
          {/* <ContentContainer> */}
          <LoginHeader>Logging you in</LoginHeader>
          <LoginForm
            id="loginForm"
            onSubmit={handleSubmit(data => handleLogin(data))}>
            <LoginInput
              {...register('email', { required: true })}
              value="test_admin@bookem.org"
              placeholder="Email or username"
            />

            <PasswordWrapper>
              <LoginInput
                {...register('password', { required: true })}
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
              />
              <PasswordEye
                onClick={() => {
                  setPasswordShown(!passwordShown);
                }}>
                {passwordShown ? (
                  <Image
                    src="/login/eye.png"
                    width={25}
                    height={25}
                    alt="Eye"
                  />
                ) : (
                  <Image
                    src="/login/eye-slash.png"
                    width={25}
                    height={25}
                    alt="Eye with slash"
                  />
                )}
              </PasswordEye>
            </PasswordWrapper>
          </LoginForm>
          <ForgotPassword>Forgot password?</ForgotPassword>

          {errors.email && <span>Email is required</span>}
          {errors.password && <span>Password is required</span>}
          {errorMessage && <span>{errorMessage}</span>}

          {/* <LoginOptionsContainer>
            <LoginOptionsText>Or log in with</LoginOptionsText>
            <LoginOptionsRow>
              <Image
                src="/login/GoogleLogo.png"
                alt=""
                width={32}
                height={32}
              />
              <Image
                src="/login/FacebookLogo.png"
                alt=""
                width={32}
                height={32}
              />
              <Image
                src="/login/InstagramLogo.png"
                alt=""
                width={32}
                height={32}
              />
              <Image src="/login/AppleLogo.png" alt="" width={32} height={32} />
            </LoginOptionsRow>
          </LoginOptionsContainer> */}

          <SubmitButton form="loginForm" type="submit" value="log in" />
        </RightContainer>
      </Container>
      {/* <div>Admin Log In</div>

      <form onSubmit={handleSubmit(data => handleLogin(data))}>
        <label>Email: </label>
        <input
          {...register('email', { required: true })}
          value="test_admin@bookem.org"
        />
        <label>Password: </label>
        <input {...register('password', { required: true })} type="password" />
        {errors.email && <span>Email is required</span>}
        {errors.password && <span>Password is required</span>}
        <input type="submit" />
      </form> */}
    </>
  );
};

export default LoginPage;

// redirect to home page if user is already logged in
export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  // If the user is already logged in, redirect to the home page.
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  // If the user is not logged in, show the login page.
  return {
    props: {
      session,
    },
  };
}
