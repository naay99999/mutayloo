import { createBrowserRouter } from 'react-router'
import { StorefrontRouteError } from './pages/error-page'
import { StorefrontLayout } from './pages/layout'

export const router = createBrowserRouter([
  {
    Component: StorefrontLayout,
    errorElement: <StorefrontRouteError />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/home/home-page'),
      },
      {
        path: 'products',
        lazy: () => import('./pages/products/product-list-page'),
      },
      {
        path: 'products/:slug',
        lazy: () => import('./pages/products/product-detail-page'),
      },
      {
        path: 'categories/:slug',
        lazy: () => import('./pages/categories/category-page'),
      },
      {
        path: '*',
        lazy: () => import('./pages/not-found-page'),
      },
    ],
  },
])
