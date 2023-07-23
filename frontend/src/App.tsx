import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';
import Login from './components/authentication/Login';
import NavBar from './components/navbar/Navbar';
import Logout from './components/authentication/Logout';
import SignUp from './components/authentication/Signup';
import Dashboard from './components/adminDashbord/Dashbord';

const App = () => {

  const role = localStorage.getItem("role")
  console.log("role app", role);
  
  return (
    <Router>
      <>
        {/* Navigation or Header component can be placed here */}
        <NavBar/>
        <Routes>
          {/* Define your routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainApp/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashbord" element={<Dashboard/>} />
        </Routes>
      </>
    </Router>
  );
};

export default App;