import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';
import Login from './components/authentication/Login';
import Logout from './components/authentication/Logout';
import './index.css';
import Dashboard from './components/adminDashbord/Dashbord';
import { useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import { PrivateRoute } from './PrivateRoute';
import SignUp from './components/authentication/Signup';
import UserDashboard from './components/userDashboard/UserDashboard';
import ChatMain from './components/chat/ChatMain';
const App = () => {
  const role = localStorage.getItem('role');
  console.log('role app', role);
  let h;
  const reduxdata = useSelector((state: any) => state.loginData);
  if (reduxdata.role !== '') {
    h = reduxdata?.role;
  } else {
    h = role;
  }

  console.log('main data local storage', h);
  console.log('main data storage', role);

  const allRoute = [
    {
      path: '/dashbord',
      component: Dashboard,
      roles: ['user', 'admin'],
    },
    {
      path: '/admin/users',
      component: Dashboard,
      roles: ['admin'],
    },
    {
      path: '/admin/settings',
      component: Dashboard,
      roles: ['admin'],
    },
    {
      path: '/user/dashboard',
      component: UserDashboard,
      roles: ['user'],
    },
    // Add more admin routes as needed
  ];

  return (
    <Router>
      {/* Navigation or Header component can be placed here */}

      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Layout />}>
          {/* pass all route as a children */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainApp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<p>not found this page</p>} />
          <Route path="/chat" element={<ChatMain />} />
          {/* admin route */}
          {allRoute.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<PrivateRoute roles={route.roles} component={route.component} />}
            />
          ))}
          {/* close admi route */}
          {/* <PrivateRoute path="/user/dashboard" element={<UserDashboard />} allowedRoles={['user']} /> */}
        </Route>

        {/* <privateroute path="/dashbord" exact={true} component={<Dashboard />}/> */}
      </Routes>
    </Router>
  );
};

export default App;
