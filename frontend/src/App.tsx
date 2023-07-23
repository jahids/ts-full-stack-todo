import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';
import Login from './components/authentication/Login';
import NavBar from './components/navbar/Navbar';
import Logout from './components/authentication/Logout';
import SignUp from './components/authentication/Signup';

const App = () => {
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
        </Routes>
      </>
    </Router>
  );
};

export default App;