import React from 'react';
//NOTE:CORE MODULE/ THIRD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//NOTE:CONTEXT IMPORTS
import { UserContextProvider } from './contexts/UserContext';
import { AlertContextProvider } from './contexts/AlertContext';

//NOTE:PAGE IMPORTS
const Login = React.lazy(() => import('./pages/login-signup/Login'));
const UserFeed = React.lazy(() => import('./pages/UserFeed'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Signup = React.lazy(() => import('./pages/login-signup/Signup'));
const AccountVerification = React.lazy(() =>
  import('./pages/AccountVerification')
);
const UserFIlesPage = React.lazy(() => import('./pages/UserFIlesPage'));
const Explore = React.lazy(() => import('./pages/Explore'));
const ClientsPage = React.lazy(() => import('./pages/ClientsPage'));
const AccountOverview = React.lazy(() =>
  import('./pages/account/AccountOverview')
);
const AccountSettings = React.lazy(() =>
  import('./pages/account/AccountSettings')
);
const UpdatePassword = React.lazy(() =>
  import('./pages/account/UpdatePassword')
);
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const AllUsersPage = React.lazy(() => import('./pages/AllUsersPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

import RequireAuthentication from './components/auth/RequireAuthentication';
import RequireAuthorization from './components/auth/RequireAuthorization';
import AlertToast from './components/alert/AlertToast';
import LoadingFallBack from './components/loading-fallback/LoadingFallBack';

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
                <Route
                  path="/login"
                  exact
                  element={
                    <React.Suspense fallback={<LoadingFallBack />}>
                      <Login />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/signup"
                  exact
                  element={
                    <React.Suspense fallback={<LoadingFallBack />}>
                      <Signup />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/forgot-password"
                  exact
                  element={
                    <React.Suspense fallback={<LoadingFallBack />}>
                      <ForgotPassword />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/password-reset/:resetToken"
                  element={
                    <React.Suspense fallback={<LoadingFallBack />}>
                      <ResetPassword />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/account-verification"
                  exact
                  element={
                    <React.Suspense fallback={<LoadingFallBack />}>
                      <AccountVerification />
                    </React.Suspense>
                  }
                />

                {/* NOTE: The following routes are allowed to all accounts */}
                <Route
                  path="/account/overview"
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <AccountOverview />
                            </React.Suspense>
                          }
                          authorizedRoles={['admin', 'business']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />

                <Route
                  path="/account/profile"
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <AccountSettings />
                            </React.Suspense>
                          }
                          authorizedRoles={['admin', 'business']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />

                <Route
                  path="/account/update-password"
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <UpdatePassword />
                            </React.Suspense>
                          }
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
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <Admin />
                            </React.Suspense>
                          }
                          authorizedRoles={['admin']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="/admin/users"
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <AllUsersPage />
                            </React.Suspense>
                          }
                          authorizedRoles={['admin']}
                          route={'/'}
                        />
                      }
                    />
                  }
                />

                <Route
                  path="/admin/users/:user_id"
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <UserFIlesPage />
                            </React.Suspense>
                          }
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
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <UserFeed />
                            </React.Suspense>
                          }
                          authorizedRoles={['business']}
                          route={'/admin'}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="/explore"
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <Explore />
                            </React.Suspense>
                          }
                          authorizedRoles={['business']}
                          route={'/admin'}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="/user-clients"
                  exact
                  element={
                    <RequireAuthentication
                      child={
                        <RequireAuthorization
                          child={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <ClientsPage />
                            </React.Suspense>
                          }
                          authorizedRoles={['business']}
                          route={'/admin'}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="*"
                  element={
                    <React.Suspense fallback={<LoadingFallBack />}>
                      <NotFoundPage />
                    </React.Suspense>
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
