import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./shared/layout/MainLayout";
import { Outlet } from "react-router";
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  }
])

export default router;