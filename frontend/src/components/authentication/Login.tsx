// src/components/LoginForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [, setCookie] = useCookies(['auth-token']);
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      // Assuming the API response contains a token after successful login
      const { token } = response.data;
      const {email, role} = response.data?.data
      console.log("resp", response);
      localStorage.setItem("email", email)
      localStorage.setItem("role", role)
      // Set the token in the cookie
    setCookie('auth-token', token, { path: '/' });
   
      // Redirect to a protected route after successful login (e.g., dashboard)
   window.location.href = '/'; // Replace with your protected route URL
   
    } catch (error) {
      console.error('Login failed', error);
    }

    console.log('Cookie Data:', document.cookie);
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', { required: 'Username is required' })}
          />
          {/* {errors.username && <div className="invalid-feedback">{errors.username.message}</div>} */}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
          {/* {errors.password && <div className="invalid-feedback">{errors.password.message}</div>} */}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
