import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Reports from '../../pages/Reports/Reports';
import FinancialYear from '../../pages/FinancialYear/FinancialYear';
import TabSectionCreation from '../../pages/TabSectionCreation/TabSectionCreation';
import Login from '../../pages/Login/Login';
import LayoutContainter from '../layouts/LayoutContainter';

// This component needs to be inside a component that has Redux context
// Better approach: Move this logic to a separate component
const ProtectedLayout = () => {
  // Can't use useSelector here directly in router config
  // We'll handle this differently
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
]);

export default router;