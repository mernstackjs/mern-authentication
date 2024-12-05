import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";

export default function AccountLayout() {
  return (
    <div className="flex gap-2">
      <Sidebar />
      <main className="flex flex-col flex-1 border py-5 px-12">
        <Outlet />
      </main>
    </div>
  );
}
