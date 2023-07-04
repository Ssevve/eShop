import AuthRoutes from 'routes/AuthRoutes';
import GuestRoutes from 'routes/GuestRoutes';
import RootLayout from 'layouts/RootLayout';
import Account from 'pages/Account';
import Cart from 'pages/Cart';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Error from 'pages/Error';
import Product from 'pages/Product';
import Products from 'pages/Products';
import Register from 'pages/Register';

const routesConfig = [
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
        element: <Products />,
      },
      {
        path: '/products/:productId',
        element: <Product />,
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

export default routesConfig;
