import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: FieldValues) => {
    const status = await signIn('credentials', {
      redirect: false,
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
