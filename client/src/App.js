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
import AddItems from './pages/AddItems';
import Item from './pages/Item';
import Booking from './pages/Booking';
import Appove from './pages/Appove';
import EditItem from './pages/EditItem';

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
          <Route
            path="/items/add"
            element={
              <HomePageLayout>
                <AddItems />
              </HomePageLayout>
            }
          />

          <Route
            path="/items/:id"
            element={
              <HomePageLayout>
                <Item />
              </HomePageLayout>
            }
          />
          <Route
            path="/booking"
            element={
              <HomePageLayout>
                <Booking />
              </HomePageLayout>
            }
          />
          <Route
            path="/approve"
            element={
              <HomePageLayout>
                <Appove />
              </HomePageLayout>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <HomePageLayout>
                <EditItem />
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
