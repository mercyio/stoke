import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import MainDashboard from './pages/MainDashboard';
import Leaderboard from './pages/Leaderboard';
import History from './pages/History';
import Vault from './pages/Vault';
import Tournaments from './pages/Tournaments';
import Duel from './pages/Duel';
import Profile from './pages/Profile';
import TestnetMode from './pages/TestnetMode';
import Onboarding from './pages/Onboarding';
import { UserProvider, useUser } from './contexts/UserContext';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, hasCompletedOnboarding } = useUser();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const location = useLocation();
  const { isConnected, hasCompletedOnboarding } = useUser();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={
          isConnected && !hasCompletedOnboarding ? <Onboarding /> : <Navigate to="/" replace />
        } />
        <Route path="/app" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<MainDashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="history" element={<History />} />
          <Route path="vault" element={<Vault />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="duel" element={<Duel />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/testnet" element={<TestnetMode />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;