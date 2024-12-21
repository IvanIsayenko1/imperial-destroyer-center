import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { StarshipsPage } from './components/pages/starshipsPage/StarshipsPage';
import { Loading } from './components/ui/loading/Loading';
import { VehiclesPage } from './components/pages/vehiclesPage/VehiclesPage';

const Layout = React.lazy(() =>
  import('./components/ui/layout/Layout').then((m) => ({ default: m.Layout })),
);

const PlanetsPage = React.lazy(() =>
  import('./components/pages/planetsPage/PlanetsPage').then((m) => ({
    default: m.PlanetsPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<Loading text="Loading..." />}>
        <Layout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/planets" replace />,
      },
      {
        path: '/planets',
        element: (
          <React.Suspense fallback={<Loading text="Loading..." />}>
            <PlanetsPage />
          </React.Suspense>
        ),
      },
      {
        path: '/starships',
        element: (
          <React.Suspense fallback={<Loading text="Loading..." />}>
            <StarshipsPage />
          </React.Suspense>
        ),
      },
      {
        path: '/vehicles',
        element: (
          <React.Suspense fallback={<Loading text="Loading..." />}>
            <VehiclesPage />
          </React.Suspense>
        ),
      },
    ],
  },
]);
