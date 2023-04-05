import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/common/Header/Header';
import Home from 'pages/Home';
import AuthRoutes from 'components/AuthRoutes';
import Account from 'pages/Account';
import GuestRoutes from 'components/GuestRoutes';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import Footer from 'components/Footer';
import useAuth from 'features/auth/useAuth';

export function App() {
  useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthRoutes />}>
        <Route path="/account" element={<Account />} />
      </Route>
      <Route element={<GuestRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function AppWithRouter() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex grow flex-col bg-slate-50">
        <App />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
