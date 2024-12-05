import { useContext } from "react";
import { Link } from "react-router-dom";
import { Appcontext } from "../context/appcontext";

export default function Header() {
  const { user, logout } = useContext(Appcontext);
  return (
    <header className="flex justify-between items-center p-3">
      <h1>Header</h1>
      {user ? (
        <nav className="flex justify-center items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/account">Account</Link>
          <button
            onClick={logout}
            className="py-1 px-3 bg-red-800 text-white rounded-md"
          >
            Logout
          </button>
        </nav>
      ) : (
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
}
