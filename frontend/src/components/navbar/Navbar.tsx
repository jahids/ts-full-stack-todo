import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const NavBar: React.FC = () => {
  const [userLogged, setUserLogged] = useState<string | null>('');

  let h;

  const loggedEmail = localStorage.getItem('email');
  console.log(loggedEmail);
  useEffect(() => {
    setUserLogged(loggedEmail);
  }, [loggedEmail]);

  const reduxdata = useSelector((state: any) => state.loginData);
  if (reduxdata.email !== '') {
    h = reduxdata?.email;
  } else {
    h = loggedEmail;
  }

  console.log('redux data', reduxdata);
  return (
    <nav className="bg-light ">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between ">
        <Link className="text-xl font-bold" to="/">
          <span className="text-3xl font-bold underline"> My App</span>
        </Link>
        <button
          className="text-xl font-bold md:hidden"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="hidden md:flex md:items-center md:justify-end w-full md:w-auto">
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li className="nav-item">
              {h ? (
                <span className="text-xl font-bold">{h}</span>
              ) : (
                <Link className="text-xl font-bold" to="/login">
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="text-xl font-bold" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-xl font-bold" to="/logout">
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-xl font-bold" to="/dashbord">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
