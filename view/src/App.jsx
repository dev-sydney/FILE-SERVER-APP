//NOTE:CORE MODULE/ THIRD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//NOTE:CONTEXT IMPORTS
import { UserContextProvider } from './contexts/UserContext';
import { AlertContextProvider } from './contexts/AlertContext';

//NOTE:PAGE IMPORTS
import Login from './pages/login-signup/Login';
import UserFeed from './pages/UserFeed';
import Admin from './pages/Admin';
import Signup from './pages/login-signup/Signup';
import AccountVerification from './pages/AccountVerification';
import UserFIlesPage from './pages/UserFIlesPage';
import Explore from './pages/Explore';
import ClientsPage from './pages/ClientsPage';
import AccountOverview from './pages/account/AccountOverview';
import AccountSettings from './pages/account/AccountSettings';
import UpdatePassword from './pages/account/UpdatePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AllUsersPage from './pages/AllUsersPage';

import RequireAuthentication from './components/auth/RequireAuthentication';
import RequireAuthorization from './components/auth/RequireAuthorization';
import AlertToast from './components/alert/AlertToast';

import './App.css';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <>
      <UserContextProvider>
        <AlertContextProvider>
          <div className="work_space">
            <BrowserRouter>
              <NavBar />
              {/* NAVBAR SHOULD BE HERE */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/password-reset/:resetToken"
                  element={<ResetPassword />}
                />
                <Route
                  path="/account-verification"
                  element={<AccountVerification />}
                />

                {/* NOTE: The following routes are allowed to all accounts */}
                <Route
                  path="/account/overview"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<AccountOverview />}
                          authorizedRoles={['admin', 'business']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />

                <Route
                  path="/account/profile"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<AccountSettings />}
                          authorizedRoles={['admin', 'business']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />

                <Route
                  path="/account/update-password"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<UpdatePassword />}
                          authorizedRoles={['admin', 'business']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />
                {/* NOTE: The following routes are allowed to only 'admin' accounts */}
                <Route
                  path="/admin"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<Admin />}
                          authorizedRoles={['admin']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<AllUsersPage />}
                          authorizedRoles={['admin']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />

                <Route
                  path="/admin/users/:user_id"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<UserFIlesPage />}
                          authorizedRoles={['admin']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />

                {/* NOTE: The following routes are allowed to 'business' accounts */}
                <Route
                  path="/"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<UserFeed />}
                          authorizedRoles={['business']}
                          route={'/admin'}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="/explore"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<Explore />}
                          authorizedRoles={['business']}
                          route={'/admin'}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="/user-clients"
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={<ClientsPage />}
                          authorizedRoles={['business']}
                          route={'/admin'}
                        />
                      }
                    />
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
          <AlertToast />
        </AlertContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
