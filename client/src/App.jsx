// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import CleakerAppBar from './components/AppBar/CleakerAppBar';
import Welcome from './pages/render/Welcome';
import Home from './pages/Home';
import UserProfile from './pages/render/UserProfile';
import UserAttributePage from './pages/UserAttributePage';

function App() {
  const { user, loading } = useAuth(); 
  // Use the base domain from environment variables
  const baseDomain = import.meta.env.VITE_BASE_DOMAIN || 'lvh.me';
  const hostname = window.location.hostname;
  const subdomain = hostname.replace(`.${baseDomain}`, '');
  const isSubdomainView = subdomain && subdomain !== baseDomain;
  // Define `me` and `profile` to identify the viewed profile
  const me = user?.username || 'me';
  const profile = isSubdomainView ? subdomain : me;
  const isViewingOwnProfile = profile === me;
  if (loading) return <div>Loading...</div>;
  console.log("App.js - me:", me, "profile:", profile, "isViewingOwnProfile:", isViewingOwnProfile);

  return (
    <Router>
      <CleakerAppBar />
      <Routes>
        {isSubdomainView ? (
          // Subdomain views for other profiles
          <>
            <Route path="/" element={<UserProfile profile={profile} />} />
            <Route
              path="/*"
              element={<UserAttributePage profile={profile} isViewingOwnProfile={isViewingOwnProfile} />}
            />
          </>
        ) : (
          // Main domain view for the user's profile (.me)
          <>
            <Route path="/" element={user ? <Home /> : <Welcome />} />
            {user && (
              <Route
                path="/*"
                element={<UserAttributePage profile={profile} isViewingOwnProfile={true} />}
              />
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;