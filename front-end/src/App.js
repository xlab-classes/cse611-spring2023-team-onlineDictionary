import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import AdminPage from './components/Admin/AdminPage';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/admin', element: <AdminPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;