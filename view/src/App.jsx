//NOTE:CORE MODULE/ THIRD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//NOTE:CONTEXT IMPORTS
import { UserContextProvider } from './contexts/UserContext';

//NOTE:PAGE IMPORTS
import Login from './pages/Login';
import UserFeed from './pages/UserFeed';
import Admin from './pages/Admin';
import UploadPage from './pages/UploadPage';
import Signup from './pages/Signup';
import AccountVerification from './pages/AccountVerification';
import UserFIlesPage from './pages/UserFIlesPage';
import Explore from './pages/Explore';
import ClientsPage from './pages/ClientsPage';
import AccountOverview from './pages/account/AccountOverview';
import AccountSettings from './pages/account/AccountSettings';
import UpdatePassword from './pages/account/UpdatePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import RequireAuthentication from './components/auth/RequireAuthentication';
import RequireAuthorization from './components/auth/RequireAuthorization';

import './App.css';

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
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

            {/* NOTE: The following routes are restricted to the 'admin' account */}
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
              path="/admin/upload"
              element={
                <RequireAuthentication
                  child={
                    <RequireAuthorization
                      child={<UploadPage />}
                      authorizedRoles={['admin']}
                      route={'/'}
                    />
                  }
                />
              }
            />
            <Route
              path="/users/:user_id"
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
            {/* NOTE: The following routes are restricted to 'business' accounts */}
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
      </UserContextProvider>
    </>
  );
}

export default App;
