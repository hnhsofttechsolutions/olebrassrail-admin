import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Gallery from './pages/Gallery/Gallery';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';

import CreatePackage from './pages/Package/CreatePackage';
import ViewPackage from './pages/Package/ViewPackage';
import Edit from './pages/Package/Edit';
import ViewUpcoming from './pages/ViewUpcoming/ViewUpcoming';
import BreakfastMenu from './pages/BreakfastMenu/BreakfastMenu';
import DinnerMenu from './pages/DinnerMenu/DinnerMenu';
import DailySpecials from './pages/DailySpecials/DailySpecials';
import Video from './pages/Video/Video';
import Contact from './pages/Contact/Contact';

// ----------------------------------------------------------------------
export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'gallery', element: <Gallery /> },
        { path: 'upcoming_events', element: <ViewUpcoming /> },
        { path: 'breakfast_menu', element: <BreakfastMenu /> },
        { path: 'dinner_menu', element: <DinnerMenu /> },
        { path: 'daily_specials', element: <DailySpecials /> },
        { path: 'video', element: <Video /> },
        { path: 'contact', element: <Contact /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'createpackage', element: <CreatePackage /> },
        { path: 'viewpackage', element: <ViewPackage /> },
        { path: 'edit/:id', element: <Edit /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
