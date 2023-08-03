import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function RootLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-screen-2xl grow flex-col px-3 py-6">
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
      <ToastContainer autoClose={2000} position="bottom-right" pauseOnHover={false} />
    </>
  );
}
