import { createBrowserRouter } from 'react-router'
import { AdminRouteError } from './pages/error-page'
import { AdminLayout } from './pages/layout'

export const router = createBrowserRouter([
  {
    Component: AdminLayout,
    errorElement: <AdminRouteError />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/dashboard/dashboard-page'),
      },
      {
        path: 'products',
        lazy: () => import('./pages/products/products-page'),
      },
      {
        path: 'orders',
        lazy: () => import('./pages/orders/orders-page'),
      },
      {
        path: 'customers',
        lazy: () => import('./pages/customers/customers-page'),
      },
      {
        path: '*',
        lazy: () => import('./pages/not-found-page'),
      },
    ],
  },
])
