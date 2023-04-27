import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import AdminPage from './components/Admin/AdminPage';
import LoginPage from './components/Login/LoginPage';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {path : '/login', element : <LoginPage />},
  { path: '/admin', element: <AdminPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;