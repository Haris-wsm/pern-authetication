import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthenticateLayout from './layouts/AuthenticateLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticateLayout>
              <Login />
            </AuthenticateLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthenticateLayout>
              <Register />
            </AuthenticateLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
