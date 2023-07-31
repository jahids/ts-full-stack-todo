import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutHandlerFunc } from '../../features/login/loginSlice';

const Logout: React.FC = () => {
  const [, , removeCookie] = useCookies(['auth-token']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      // Make a POST request to the logout API endpoint
      await axios.post('http://localhost:5000/logout');
      // Clear any user-related data (e.g., token, email) from local storage or cookies
      localStorage.removeItem('email'); // Remove email from local storage
      // Clear the auth-token cookie or any other cookies related to user authentication
      removeCookie('auth-token', { path: '/' });
      // Redirect to the login page or any other page of your choice after successful logout
      dispatch(logoutHandlerFunc());
      navigate('/login'); // Replace with the login page URL
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold">Logout</h1>
      <p>Click the button below to logout.</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
