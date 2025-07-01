import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const PrivateRoute = ({ children }) => {
  const { accessToken } = useAuth();

  console.log("✅ [PrivateRoute] accessToken:", accessToken);

  if (!accessToken) return <Navigate to="/login" replace />;

  try {
    const decoded = jwt_decode(accessToken);
    const isExpired = dayjs.unix(decoded.exp).isBefore(dayjs());
    if (isExpired) {
      console.warn("🔐 Token expired, redirecting to login");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("❌ Invalid token format", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
