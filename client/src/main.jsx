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
import RegisterPage from "./pages/auth/register.jsx";
import { ProviderApp } from "./context/appcontext.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import AccountLayout from "./pages/account/layout.jsx";
import AccountPage from "./pages/account/page.jsx";
import ProfilePage from "./pages/account/profile/page.jsx";
import TasksPage from "./pages/account/tasks/taskpage.jsx";
import CreateTask from "./pages/account/tasks/create-task.jsx";

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
        path="account"
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AccountPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="create-task" element={<CreateTask />} />
      </Route>
      <Route path="register" element={<RegisterPage />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
