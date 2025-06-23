import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const { accessToken } = useAuth();

  console.log("✅ [PrivateRoute] accessToken:", accessToken); // Add this

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
