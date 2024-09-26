import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Rate } from './components/Rate/Rate.tsx';
import { Home } from './components/Home/Home.tsx';

/**
 * Main component, router options:
 * - Home.tsx "/"
 * - Rate.tsx "/rates"
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "rates",
    element: (<Rate/>),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)