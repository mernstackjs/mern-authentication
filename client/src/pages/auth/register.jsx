import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/appcontext";

export default function RegisterPage() {
  const { user, loading, setLoading } = useContext(Appcontext);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: userData.fullName,
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
    await res.json();
    setLoading(false);
    navigate("/login");
    // console.log(data);
    setUserData({
      fullName: "",
      email: "",
      password: "",
    });
  };
  if (user) return <Navigate to="/profile" />;
  return (
    <div className="flex justify-center">
      <form
        className="w-2/5 p-12 border mt-24 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold mb-3">Register Form</h1>
        <input
          value={userData.fullName}
          onChange={handleChange}
          name="fullName"
          placeholder="Enter Your fullName"
          className="w-full p-3 rounded-md border"
        />
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
          {!loading ? "  Register" : "Loaging"}
        </button>
      </form>
    </div>
  );
}
