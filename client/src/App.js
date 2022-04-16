import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthenticateLayout from './layouts/AuthenticateLayout';
import Home from './pages/Home';
import { LocalStorage } from './contexts/useLocalStorage';
import { useContext } from 'react';

function App() {
  const { token } = useContext(LocalStorage);

  console.log(token);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !!token === false ? (
              <AuthenticateLayout>
                <Login />
              </AuthenticateLayout>
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/login"
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
