import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LandingLayout from "./Layouts/LandLayout";
import RootLayout from "./Layouts/RootLayout";
import AuthLayout from "./Layouts/AuthLayout";
import './index.css'
import ProtectedRoute from "./components/ProtectRoute";
import ExpensePage from "./components/pages/Expense";
import AddExpense from "./components/pages/AddExpense";

import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Dashboard from "./components/pages/Dashboard"
import ScanReceipt from "./components/pages/ReceiptScanner";

import InsightsPage from "./components/pages/Report";
import ReceiptGallery from "./components/pages/ReceiptGallery";
import Settings from "./components/pages/setting";
import ForgotPassword from "./components/pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",

    element: <LandingLayout />,
    children: [
      { index: true, element: <Landing /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      {path:"/login/forgot-password",element:<ForgotPassword />}

    ],
  },


  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "scanner", element: <ScanReceipt /> },
      { path: "insight", element: <InsightsPage /> },
      { path: "gallery", element: <ReceiptGallery /> },
      { path: "report", element: <InsightsPage /> },
      { path: "settings", element: <Settings /> },
      { path: "expense", element: <ExpensePage /> },
      { path: "add-expense", element: <AddExpense /> },





    ],
  },],
  {
  basename:"/receipt-expense-manager/"
}


);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
