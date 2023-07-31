import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';

type SignUpFormData = {
  username: string;
  password: string;
  email: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const [, setCookie] = useCookies(['auth-token']);
  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Add the static role value directly to the form data
      //   data.role  = 'user';

      const payload = {
        username: data?.username,
        password: data?.password,
        role: 'user',
        email: data?.email,
      };

      const response = await axios.post(
        'http://localhost:5000/signup',
        payload
      );
      console.log('Signup success', response);
      const { token } = response.data;
      const { email, role } = response.data?.data;
      console.log('resp', response);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
      // Set the token in the cookie
      setCookie('auth-token', token, { path: '/' });

      // Redirect to a protected route after successful login (e.g., dashboard)
      window.location.href = '/'; // Replace with your protected route URL
      // You can handle the successful signup response and redirect the user to the login page or any other page.
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`mt-1 p-2 border rounded-md ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 p-2 border rounded-md ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`mt-1 p-2 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
