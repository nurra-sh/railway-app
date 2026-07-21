import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./shared/layout/MainLayout";
import { Outlet } from "react-router";
import BuyTicketsPage from "./pages/buy-tickets/BuyTicketsPage";
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/buy-tickets',
        element: <BuyTicketsPage />
      }
    ]
  }
])

export default router;