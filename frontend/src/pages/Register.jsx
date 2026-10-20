import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <AuthLayout
      title="Join Kshetra"
      subtitle="Become part of timeless heritage."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-5 py-3 bg-royalblack/60 border border-gold/30 
                     text-ivory outline-none focus:border-gold transition"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-5 py-3 bg-royalblack/60 border border-gold/30 
                     text-ivory outline-none focus:border-gold transition"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-5 py-3 bg-royalblack/60 border border-gold/30 
                     text-ivory outline-none focus:border-gold transition"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-gold text-royalblack tracking-widest
                     hover:bg-burgundy hover:text-ivory transition"
        >
          REGISTER
        </button>

        <p className="text-center text-ivory/60 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-gold">
            Login
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}
