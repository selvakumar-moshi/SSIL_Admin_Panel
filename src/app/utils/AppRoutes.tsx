import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Reports from '../../pages/Reports/Reports';
import FinancialYear from '../../pages/FinancialYear/FinancialYear';
import TabNameCreation from '../../pages/TabNameCreation/TabNameCreation';
import Login from '../../pages/Login/Login';
import LayoutContainter from '../layouts/LayoutContainter';
import Users from '../../pages/Users/Users';

const ProtectedLayout = () => {
  return <LayoutContainter />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/financial",
        element: <FinancialYear />,
      },
      {
        path: "/tabNameCreation",
        element: <TabNameCreation />,
      },
    ],
  },
]);

export default router;