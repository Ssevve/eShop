import { DashboardLayout, RootLayout } from '@/components/Layout';
import { LoginPage, RegisterPage } from '@/features/auth';
import { CartPage } from '@/features/carts';
import { DashboardReviews, UserProfile } from '@/features/dashboard';
import { ProductsPage, SingleProductPage } from '@/features/products';
import { AuthRoutes, ErrorPage, GuestRoutes, HomePage, NotFoundPage } from '@/routes';

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
            element: <DashboardLayout />,
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
