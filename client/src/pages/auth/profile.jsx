import { useContext } from "react";
import { Appcontext } from "../../context/appcontext";

export default function ProfilePage() {
  const { user, logout } = useContext(Appcontext);
  return (
    <div>
      <div>
        <h1>FullName: {user.fullName}</h1>
        <h1>Email: {user.email}</h1>
      </div>
    </div>
  );
}
