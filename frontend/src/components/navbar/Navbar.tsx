import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const NavBar: React.FC = () => {
  const [userLogged,setUserLogged]=useState<string | null>("")

let h;

    const loggedEmail =localStorage.getItem("email")
    console.log(loggedEmail)
    useEffect(() => {
        setUserLogged(loggedEmail)
    }, [loggedEmail ])

    const reduxdata =useSelector((state : any) => state.loginData)
 if(reduxdata.email !== ""){
 h =reduxdata?.email
 }else{
  h = loggedEmail
 }
    

  console.log("redux data", reduxdata);
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
                    h   ?  h : <Link className="nav-link" to="/login">
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
              <Link className="nav-link" to="/dashbord">
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
