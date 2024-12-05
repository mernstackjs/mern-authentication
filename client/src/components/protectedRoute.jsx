import { useContext } from "react";
import { Appcontext } from "../context/appcontext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(Appcontext);

  if (!loading && !user) return <Navigate to="/login" />;
  return children;
}
