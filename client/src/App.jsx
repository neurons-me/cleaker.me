// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import CleakerAppBar from './components/AppBar/CleakerAppBar';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import MyProfile from './components/Me';
import UserProfile from './pages/UserProfile';
import UserWelcome from './pages/UserWelcome';
import CreateWallet from './components/Wallet/CreateWallet';
import Wallets from './pages/Wallets'; // Import WalletPage component
import UserAttributePage from './pages/UserAttributePage'; // Single dynamic page

function App() {
  const { isLoggedIn, user } = useAuth();
  const hostname = window.location.hostname;
  const baseDomain = 'lvh.me';
  const subdomain = hostname.replace(`.${baseDomain}`, '');
  const isSubdomainUserSameAsLocal = subdomain === user?.username;

  return (
    <Router>
      <CleakerAppBar isLoggedIn={isLoggedIn} />
      <Routes>
        {subdomain && subdomain !== baseDomain ? (
          // Render routes for subdomain views (username.lvh.me)
          <>
            <Route path="/" element={<UserProfile username={subdomain} />} />
            <Route
              path="/:attributeType" // Dynamic route for be, have, do
              element={<UserAttributePage username={subdomain} isLocalUser={isSubdomainUserSameAsLocal} />}
            />
          </>
        ) : (
          // Render routes for main domain (lvh.me)
          <>
            <Route path="/" element={isLoggedIn ? <Home /> : <Welcome />} />
            {isLoggedIn && (
              <>
                <Route path="/me" element={<MyProfile />} />
                <Route path="/user-welcome" element={<UserWelcome />} />
                <Route path="/create-wallet" element={<CreateWallet />} />
                <Route path="/wallets" element={<Wallets />} /> {/* New route for WalletPage */}
                <Route
                  path="/:attributeType" // Dynamic route for be, have, do
                  element={<UserAttributePage isLocalUser={true} />}
                />
              </>
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;