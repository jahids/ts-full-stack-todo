import { Navigate } from 'react-router-dom';
import AccessDenied from './components/AccessDenied';

interface Props {
  component: React.ComponentType;
  // path?: string;
  roles: Array<any>;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  roles,
}) => {
  const user = localStorage.getItem('role');
  const isAuthenticated = localStorage.getItem('email');
  const userHasRequiredRole = user && roles.includes(user) ? true : false;

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <Navigate to="/" />;
};
