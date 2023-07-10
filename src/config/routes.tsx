import AuthRoutes from 'features/auth/AuthRoutes';
import GuestRoutes from 'features/auth/GuestRoutes';
import RootLayout from 'components/RootLayout';
import AccountPage from 'features/auth/AccountPage';
import CartPage from 'features/cart/CartPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'features/auth/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';
import ErrorPage from 'pages/ErrorPage';
import SingleProductPage from 'features/products/SingleProductPage';
import ProductsPage from 'features/products/ProductsPage';
import RegisterPage from 'features/auth/RegisterPage';

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
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
        element: <CartPage />,
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
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
