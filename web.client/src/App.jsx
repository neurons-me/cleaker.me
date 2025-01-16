//cleaker.me/client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Hook to access AuthContext.
import { useSubdomain } from './utils/useSubdomain'; // Utility to determine subdomain and view type.
import Layout from './components/Layout/Layout'; // Reusable Layout component for authenticated users.
import CleakerAppBar from './components/AppBar/CleakerAppBar'; // AppBar for consistent UI
import LoginPage from './pages/render/LoginPage'; // Landing page for unauthenticated users.
import Home from './pages/Home'; // Home page for authenticated users.
import UserProfile from './pages/render/UserProfile'; // Profile page, accessible via subdomains.
import UserAttributePage from './pages/UserAttributePage'; // Page for user attributes.
import EmojiCursor from './components/EmojiCursor'; // Fun cursor component.
import EditMe from "./components/Me/EditMe"; // This.Me Object.
//import UserWelcome from './pages/UserWelcome'; // Welcome/setup page for new users.
function App() {
  // Access authentication and loading state from AuthContext.
  const { user, isLoggedIn, loading } = useAuth();
  // Determine subdomain and view type (main or subdomain).
  const { subdomain, isMainView } = useSubdomain();
  // Check if the user is viewing their own profile.
  const isViewingOwnProfile = !isMainView && user?.username === subdomain;
  // Show a loading spinner while authentication state is being resolved.
  if (loading) return <div className="loader">Loading...</div>;
  // Separate routes for authenticated and unauthenticated users.
  return (
    <Router>
      {/* AppBar is always rendered */}
      <CleakerAppBar />
      {isLoggedIn ? (
        <Layout>
          <Routes>
            {/* Authenticated routes */}
            {isMainView && ( 
              <>
                <Route path="/" element={<Home />} />
                <Route path="/emoji" element={<EmojiCursor />} />
                <Route path="/editMe" element={<EditMe />} /> 
                <Route
                  path="/*"
                  element={<UserAttributePage profile={user?.username} isViewingOwnProfile />}
                />
              </>
            )}
            {!isMainView && (
              <>
                <Route path="/" element={<UserProfile profile={subdomain} />} />
                <Route
                  path="/*"
                  element={<UserAttributePage profile={subdomain} isViewingOwnProfile />}
                />
              </>
            )}
          </Routes>
        </Layout>
      ) : (
        <Routes>
          {/* Unauthenticated routes */}
          {isMainView ? (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/*"
                element={<UserAttributePage profile={subdomain} isViewingOwnProfile={false} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<UserProfile profile={subdomain} />} />
              <Route
                path="/*"
                element={<UserAttributePage profile={subdomain} isViewingOwnProfile={false} />}
              />
            </>
          )}
        </Routes>
      )}
    </Router>
  );
}

export default App;