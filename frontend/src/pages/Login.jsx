import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      // 🚨 Prevent admin login from user page
      if (res.data.role === "admin") {
        alert("Please login from the Admin Panel.");
        setLoading(false);
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save full user object
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to explore heritage luxury."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-ivory/80 mb-2 text-sm tracking-widest">
            EMAIL
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-royalblack/60 border border-gold/30 
                       text-ivory outline-none focus:border-gold transition"
            required
          />
        </div>

        <div>
          <label className="block text-ivory/80 mb-2 text-sm tracking-widest">
            PASSWORD
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-royalblack/60 border border-gold/30 
                       text-ivory outline-none focus:border-gold transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold text-royalblack tracking-widest
                     hover:bg-burgundy hover:text-ivory transition duration-300"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <p className="text-center text-ivory/60 mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-gold hover:underline">
            Join Us
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}
