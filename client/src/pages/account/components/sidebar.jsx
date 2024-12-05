import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="border w-2/12 min-h-screen p-5">
      <nav className="flex flex-col gap-3">
        <Link to="/account">Overview</Link>
        <Link to="/account/profile">Profile</Link>
        <Link to="/account/tasks">Tasks</Link>
        <Link to="/account/create-task">Create Task</Link>
      </nav>
    </div>
  );
}
