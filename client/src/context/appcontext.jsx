import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appcontext = createContext();

const ProviderApp = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/auth/current-user", {
          credentials: "include",
        });
        if (!res.ok) {
          const dataError = await res.json();
          console.log(dataError);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    currentUser();
  }, []);
  function login(userData) {
    setUser(userData);
  }
  async function logout() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        credentials: "include",
        method: "post",
      });
      if (!res.ok) {
        const dataError = await res.json();
        console.log(dataError);
        setLoading(false);
        return;
      }
      await res.json();

      setUser(null);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  const value = { user, login, loading, setLoading, logout };

  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

export { Appcontext, ProviderApp };
