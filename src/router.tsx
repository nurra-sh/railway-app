import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./shared/layout/MainLayout";
import { Outlet } from "react-router";
import BuyTicketsPage from "./pages/buy-tickets/BuyTicketsPage";
import PaymentPage from "./pages/payment/PaymentPage";
import SuccessPage from "./pages/success/SuccessPage";
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
      },
      {
        path: '/payment',
        element: <PaymentPage />
      },
      {
        path: '/success',
        element: <SuccessPage />
      }
    ]
  }
])

export default router;