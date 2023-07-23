// src/components/LoginForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loginHandlerFunc } from '../../features/login/loginSlice';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [, setCookie] = useCookies(['auth-token']);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const reduxdata =useSelector((state : any) => state.loginData)

  console.log("redux data", reduxdata);
  


  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      // Assuming the API response contains a token after successful login
      const { token } = response.data;
      const {email, role, username} = response.data?.data
      console.log("resp", response);
      dispatch(loginHandlerFunc({email, role, username}))
      localStorage.setItem("email", email)
      localStorage.setItem("role", role)
      // Set the token in the cookie
    setCookie('auth-token', token, { path: '/' });
    if(token){
      navigate('/')
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
