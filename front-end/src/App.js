import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/admin', element: <h1> Welcome Admin</h1> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;