import AuthRoutes from 'features/auth/AuthRoutes';
import GuestRoutes from 'features/auth/GuestRoutes';
import RootLayout from 'components/RootLayout';
import Account from 'pages/Account';
import Cart from 'pages/Cart';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Error from 'pages/Error';
import SingleProductPage from 'features/products/SingleProductPage';
import ProductsPage from 'features/products/ProductsPage';
import Register from 'pages/Register';

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
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      },

      {
        element: <AuthRoutes />,
        children: [
          {
            path: '/account',
            element: <Account />,
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
