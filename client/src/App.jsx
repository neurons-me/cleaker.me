// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Use AuthContext
import CleakerAppBar from './components/AppBar/CleakerAppBar';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import MyProfile from './components/Me';
import UserProfile from './pages/UserProfile';
import UserWelcome from './pages/UserWelcome'; // Import UserWelcome

function App() {
  const { isLoggedIn } = useAuth(); // Access `isLoggedIn` from AuthContext
  const hostname = window.location.hostname;
  const baseDomain = 'lvh.me';
  const subdomain = hostname.replace(`.${baseDomain}`, '');

  return (
    <Router>
      <CleakerAppBar isLoggedIn={isLoggedIn} />
      <Routes>
        {subdomain && subdomain !== baseDomain ? (
          <Route path="*" element={<UserProfile />} />
        ) : (
          <>
            <Route path="/" element={isLoggedIn ? <Home /> : <Welcome />} />
            {isLoggedIn && (
              <>
                <Route path="/me" element={<MyProfile />} />
                <Route path="/user-welcome" element={<UserWelcome />} />
              </>
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;