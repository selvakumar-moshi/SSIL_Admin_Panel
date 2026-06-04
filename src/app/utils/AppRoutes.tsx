import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Reports from '../../pages/Reports/Reports';
import FinancialYear from '../../pages/FinancialYear/FinancialYear';
import TabSectionCreation from '../../pages/TabSectionCreation/TabSectionCreation';
import Login from '../../pages/Login/Login';
import LayoutContainter from '../layouts/LayoutContainter';

const ProtectedLayout = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
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
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/financial",
        element: <FinancialYear />,
      },
      {
        path: "/tabSectionCreation",
        element: <TabSectionCreation />,
      },
    ],
  },
],
{
  basename: "/supersales/",
}
);

export default router;