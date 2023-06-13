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

import './App.css';

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/account-verification"
              element={<AccountVerification />}
            />
            <Route path="/" element={<UserFeed />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/admin/upload" element={<UploadPage />} />
            <Route path="/users/:user_id" element={<UserFIlesPage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
