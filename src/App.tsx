import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Home from 'pages/Home';
import Products from 'pages/Products';
import Product from 'pages/Product';
import Cart from 'pages/Cart';
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
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
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
      <main className="flex grow flex-col p-6">
        <App />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
