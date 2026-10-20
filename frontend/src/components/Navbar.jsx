import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Load token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Fetch cart count
  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCartCount(res.data.items.length);
      } catch (err) {
        console.log("Cart fetch failed");
      }
    };

    fetchCart();
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/products?keyword=${searchQuery}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/home");
  };

  return (
    <nav className="bg-royalblack text-ivory px-10 py-5 flex justify-between items-center border-b border-gold/20">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/home")}
        className="text-2xl font-serif text-gold cursor-pointer tracking-wide"
      >
        KSHETRA
      </h1>

      {/* CENTER NAV LINKS */}
      <div className="hidden md:flex items-center gap-8 text-sm tracking-widest">

        <Link to="/home" className="hover:text-gold transition">
          HOME
        </Link>

        <Link to="/products" className="hover:text-gold transition">
          PRODUCTS
        </Link>

        {token && (
  <Link to="/account">ACCOUNT</Link>
)}

      </div>

      {/* SEARCH */}
      <form onSubmit={handleSearch} className="hidden md:block w-1/4">
        <input
          type="text"
          placeholder="Search heritage collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-gold/30 
                     text-ivory outline-none focus:border-gold transition"
        />
      </form>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-8">

        {/* CART */}
        <Link to="/cart" className="relative hover:text-gold transition">
          CART
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-gold text-royalblack text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* LOGIN / LOGOUT */}
        {!token ? (
          <Link to="/login" className="hover:text-gold transition">
            LOGIN
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-gold transition"
          >
            LOGOUT
          </button>
        )}

      </div>
    </nav>
  );
}

