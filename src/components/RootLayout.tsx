import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';

function RootLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-screen-2xl grow flex-col px-3 py-6">
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
