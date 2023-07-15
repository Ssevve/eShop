import AuthRoutes from 'features/auth/AuthRoutes';
import GuestRoutes from 'features/auth/GuestRoutes';
import RootLayout from 'components/RootLayout';
import DashboardPage from 'pages/DashboardPage';
import UserProfile from 'features/users/UserProfile';
import DashboardReviews from 'features/reviews/DashboardReviews';
import CartPage from 'features/cart/CartPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'features/auth/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';
import ErrorPage from 'pages/ErrorPage';
import SingleProductPage from 'features/products/SingleProductPage';
import ProductsPage from 'features/products/ProductsPage/ProductsPage';
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
            path: '/dashboard',
            element: <DashboardPage />,
            children: [
              {
                index: true,
                element: <UserProfile />,
              },
              {
                path: 'reviews',
                element: <DashboardReviews />,
              },
            ],
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
