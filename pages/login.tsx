import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { getSession, GetSessionParams, signIn } from 'next-auth/react';

const LoginPage = () => {
  //React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Function to handle login and redirect
  const handleLogin = async (data: FieldValues) => {
    const status = await signIn('credentials', {
      redirect: true,
      email: data.email,
      password: data.password,
    });

    if (!status) {
      window.location.href = '/';
    }
  };

  return (
    <>
      <div>Admin Log In</div>

      <form onSubmit={handleSubmit(data => handleLogin(data))}>
        <label>Email: </label>
        <input
          {...register('email', { required: true })}
          value="test_admin@bookem.org"
        />
        <label>Password: </label>
        <input
          {...register('password', { required: true })}
          type="password"
          value="123456"
        />
        {errors.email && <span>Email is required</span>}
        {errors.password && <span>Password is required</span>}
        <input type="submit" />
      </form>
    </>
  );
};

export default LoginPage;
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
