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
        username : data?.username,
        password : data?.password,
        role : "user",
        email : data?.email
    }

      const response = await axios.post('http://localhost:5000/signup', payload);
      console.log('Signup success', response);
      const { token } = response.data;
      const {email, role} = response.data?.data
      console.log("resp", response);
      localStorage.setItem("email", email)
      localStorage.setItem("role", role)
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
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
