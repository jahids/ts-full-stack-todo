import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NavBar: React.FC = () => {
    
    useEffect(() => {
        
    }, [localStorage.getItem("email") ])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                {
                    localStorage.getItem("email")  ?  localStorage.getItem("email") : <Link className="nav-link" to="/login">
                    Login
                  </Link>
                }
              
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dashborad">
                DashBoard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
