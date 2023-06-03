//NOTE:CORE MODULE/ THIRD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//NOTE:CONTEXT IMPORTS
import { UserContextProvider } from './contexts/UserContext';

//NOTE:PAGE IMPORTS
import Login from './pages/Login';
import UserFeed from './pages/UserFeed';
import Admin from './pages/Admin';
import UploadPage from './pages/UploadPage';

import './App.css';

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UserFeed />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/upload" element={<UploadPage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
