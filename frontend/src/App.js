import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';
import LoginPage from './auth/Login';
import HomePage from './HomePage';
import Calculators from './Calculators'; 


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/calculators" element={<PrivateRoute><Calculators /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
