// src/components/LoginForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { json, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginHandlerFunc } from '../../features/login/loginSlice';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [, setCookie] = useCookies(['auth-token']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxdata = useSelector((state: any) => state.loginData);

  console.log('redux data', reduxdata);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      // Assuming the API response contains a token after successful login
      const { token } = response.data;
      const { email, role, username } = response.data?.data;
      console.log('resp', response);
      dispatch(loginHandlerFunc({ email, role, username }));
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
      localStorage.setItem('data', JSON.stringify(response.data?.data));
      // Set the token in the cookie
      setCookie('auth-token', token, { path: '/' });
      if (token) {
        navigate('/');
      }

      // Redirect to a protected route after successful login (e.g., dashboard)
      //  window.location.href = '/'; // Replace with your protected route URL
    } catch (error) {
      console.error('Login failed', error);
    }

    console.log('Cookie Data:', document.cookie);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold">Login</h1>
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
          {/* {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )} */}
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
          {/* {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )} */}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
