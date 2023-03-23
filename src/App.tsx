import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function AppWithRouter() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1 bg-slate-50">
        <App />
      </main>
    </BrowserRouter>
  );
}
