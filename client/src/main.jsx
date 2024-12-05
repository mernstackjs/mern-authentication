import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/auth/login.jsx";
import ProfilePage from "./pages/auth/profile.jsx";
import RegisterPage from "./pages/auth/register.jsx";
import { ProviderApp } from "./context/appcontext.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <ProviderApp>
          {" "}
          <App />
        </ProviderApp>
      }
    >
      <Route index element={<div>Home Page</div>} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
