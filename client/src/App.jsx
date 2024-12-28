import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import CleakerAppBar from './components/AppBar/CleakerAppBar';
import Welcome from './pages/render/Welcome';
import Home from './pages/Home';
import UserProfile from './pages/render/UserProfile';
import UserAttributePage from './pages/UserAttributePage';
import EmojiCursor from './components/EmojiCursor';

const useSubdomain = () => {
  const baseDomain = import.meta.env.VITE_BASE_DOMAIN || (window.location.hostname.includes('localhost') ? 'localhost' : 'cleaker.me');
  const hostname = window.location.hostname;
  const subdomain = hostname.replace(`.${baseDomain}`, '');
  const isMainView = !subdomain || subdomain === 'www';
  return { subdomain, isMainView };
};

function App() {
  const { user, loading } = useAuth();
  const { subdomain, isMainView } = useSubdomain();
  const isViewingOwnProfile = !isMainView && user?.username === subdomain;

  if (loading) return <div className="loader">Loading...</div>;

  const routes = {
    main: [
      { path: "/", element: user ? <Home /> : <Welcome /> },
      { path: "/emoji", element: <EmojiCursor /> },
      { path: "/*", element: <UserAttributePage profile={user?.username} isViewingOwnProfile={true} /> },
    ],
    subdomain: [
      { path: "/", element: <UserProfile profile={subdomain} /> },
      { path: "/*", element: <UserAttributePage profile={subdomain} isViewingOwnProfile={isViewingOwnProfile} /> },
    ],
  };

  return (
    <Router>
      <CleakerAppBar />
      <Routes>
        {(isMainView ? routes.main : routes.subdomain).map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;