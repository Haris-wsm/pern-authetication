import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthenticateLayout from './layouts/AuthenticateLayout';
import Home from './pages/Home';
import HomePageLayout from './layouts/HomePageLayout';
import RequireAuth from './components/auth/RequireAuth ';
import Profile from './pages/Profile';
import SendEmail from './pages/SendEmail';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route
            path="/"
            element={
              <HomePageLayout>
                <Home />
              </HomePageLayout>
            }
          />
          <Route
            path="/users/:id"
            element={
              <HomePageLayout>
                <Profile />
              </HomePageLayout>
            }
          />
        </Route>

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
        <Route
          path="/register/sendmail"
          element={
            <AuthenticateLayout>
              <SendEmail />
            </AuthenticateLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
