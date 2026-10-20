import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchOrdersCount();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrdersCount = async () => {
    try {
      const res = await api.get("/orders/count");
      setOrdersCount(res.data.count);
    } catch (err) {
      console.log("Failed to fetch order count", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-gold flex flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center text-lg tracking-widest animate-pulse">
          Accessing Private Empire...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-ivory relative overflow-hidden">
      <Navbar />

      {/* Background Glows */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[600px] h-[600px] bg-burgundy/20 blur-[160px] rounded-full"></div>

      <div className="relative z-10 px-6 md:px-24 py-28">

        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-serif tracking-[0.2em] uppercase
                         bg-gradient-to-r from-gold via-yellow-400 to-gold
                         bg-clip-text text-transparent animate-pulse">
            Empire Access
          </h1>
          <p className="text-gold/60 mt-4 tracking-[0.3em] text-sm">
            PRIVATE MEMBER DASHBOARD
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-5xl mx-auto 
                        backdrop-blur-2xl bg-white/5 
                        border border-gold/20 
                        rounded-3xl p-16
                        shadow-[0_0_80px_rgba(212,175,55,0.08)]
                        transition duration-500 hover:shadow-[0_0_120px_rgba(212,175,55,0.18)]">

          <div className="grid md:grid-cols-3 gap-16">

            {/* Profile Section */}
            <div className="flex flex-col items-center text-center space-y-6">

              <div className="w-32 h-32 rounded-full 
                              border-4 border-gold 
                              flex items-center justify-center 
                              text-4xl font-bold text-gold
                              bg-black shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-2xl tracking-wide">{user.name}</h2>

              <span className="px-6 py-2 text-xs tracking-[0.3em] 
                               border border-gold rounded-full text-gold">
                ELITE MEMBER
              </span>
            </div>

            {/* Info Section */}
            <div className="md:col-span-2 space-y-10">

              <div>
                <p className="text-gold/60 text-xs tracking-[0.4em] uppercase">
                  Email Address
                </p>
                <p className="text-2xl mt-3 font-light tracking-wide break-all">
                  {user.email}
                </p>
              </div>

              {/* Empire Stats */}
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="bg-black/40 p-6 rounded-2xl border border-gold/10">
                  <p className="text-gold/50 text-xs tracking-widest">ORDERS</p>
                  <p className="text-3xl mt-3">{ordersCount}</p>
                </div>

                <div className="bg-black/40 p-6 rounded-2xl border border-gold/10">
                  <p className="text-gold/50 text-xs tracking-widest">STATUS</p>
                  <p className="text-3xl mt-3 text-gold">ACTIVE</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-6 pt-10">

                <button
  onClick={() => navigate("/orders")}
  className="px-10 py-4 rounded-full
             border border-gold text-gold
             tracking-[0.25em] text-sm
             transition-all duration-300
             hover:bg-gold hover:text-black
             hover:shadow-[0_0_40px_rgba(212,175,55,0.7)]">
  VIEW ORDERS
</button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/home");
                    window.location.reload();
                  }}
                  className="px-10 py-4 rounded-full
                             border border-burgundy text-burgundy
                             tracking-[0.25em] text-sm
                             transition-all duration-300
                             hover:bg-burgundy hover:text-white
                             hover:shadow-[0_0_40px_rgba(128,0,32,0.6)]">
                  LOGOUT
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}