import { RootLayout } from '@/components/RootLayout';
import AuthRoutes from '@/features/auth/AuthRoutes';
import GuestRoutes from '@/features/auth/GuestRoutes';
import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import { CartPage } from '@/features/cart';
import DashboardPage from '@/features/dashboard/DashboardPage';
import UserProfile from '@/features/dashboard/DashboardPage/UserProfile';
import ProductsPage from '@/features/products/ProductsPage/ProductsPage';
import DashboardReviews from '@/features/reviews/DashboardReviews';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import SingleProductPage from '@/pages/SingleProductPage';

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:productId',
        element: <SingleProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        element: <GuestRoutes />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },

      {
        element: <AuthRoutes />,
        children: [
          {
            path: 'dashboard',
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
