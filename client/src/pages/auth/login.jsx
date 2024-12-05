import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/appcontext";

export default function LoginPage() {
  const { user, login, loading, setLoading } = useContext(Appcontext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    if (!res.ok) {
      const dataError = await res.json();
      console.log(dataError);
      setLoading(false);
      return;
    }
    const data = await res.json();
    navigate("/account/profile");

    login(data.user);
    setLoading(false);
    setUserData({
      email: "",
      password: "",
    });
  };

  if (user) return <Navigate to="/account/profile" />;
  return (
    <div className="flex justify-center">
      <form
        className="w-2/5 p-12 border mt-24 shadow-md"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl font-semibold mb-3">Login Form</h1>
        <input
          value={userData.email}
          onChange={handleChange}
          name="email"
          placeholder="Enter Your email"
          className="w-full my-4 p-3 rounded-md border"
        />
        <input
          value={userData.password}
          onChange={handleChange}
          name="password"
          placeholder="Enter Your password"
          className="w-full p-3 rounded-md border"
        />
        <button
          type="submit"
          className="bg-blue-800 text-white px-3 py-2 mt-3 rounded-md"
        >
          {!loading ? "Login" : "Logining"}
        </button>
      </form>
    </div>
  );
}
