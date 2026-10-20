import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      // ❗ Only allow admin
      if (res.data.role !== "admin") {
        alert("Access Denied. Not an admin.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/admin/dashboard");

    } catch (err) {
      alert("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-royalblack min-h-screen flex items-center justify-center text-ivory">

      <form
        onSubmit={handleSubmit}
        className="bg-black border border-gold/20 p-10 w-[400px]"
      >
        <h2 className="text-3xl text-gold font-serif mb-8 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
          className="w-full mb-6 p-3 bg-black border border-gold/30 text-ivory"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-3 bg-black border border-gold/30 text-ivory"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-gold text-black hover:bg-burgundy hover:text-ivory transition"
        >
          {loading ? "Signing in..." : "LOGIN AS ADMIN"}
        </button>
      </form>

    </div>
  );
}
