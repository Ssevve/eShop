import AuthRoutes from 'features/auth/AuthRoutes';
import GuestRoutes from 'features/auth/GuestRoutes';
import RootLayout from 'components/RootLayout';
import AccountPage from 'features/auth/AccountPage';
import Cart from 'pages/Cart';
import Home from 'pages/Home';
import LoginPage from 'features/auth/LoginPage';
import NotFound from 'pages/NotFound';
import Error from 'pages/Error';
import SingleProductPage from 'features/products/SingleProductPage';
import ProductsPage from 'features/products/ProductsPage';
import RegisterPage from 'features/auth/RegisterPage';

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:productId',
        element: <SingleProductPage />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        element: <GuestRoutes />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
        ],
      },

      {
        element: <AuthRoutes />,
        children: [
          {
            path: '/account',
            element: <AccountPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
