import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

import heroBg from "../assets/hero/hero-burgundy.jpg";
import handloomImg from "../assets/art/hw.jpg";
import jewelryImg from "../assets/art/jewe.jpg";
import craftImg from "../assets/art/hc.jpg";
import regionalImg from "../assets/art/region.jpg";

export default function Home() {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ✅ Fetch Featured Products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoadingFeatured(true);

        const res = await api.get("/products");

        setFeaturedProducts(res.data.slice(0, 3));
      } catch (error) {
        console.log("Failed to fetch featured products", error);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // ✅ Fetch User Profile (for Welcome Coupon)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoadingUser(true);

        const token = localStorage.getItem("token");
        if (!token) {
          setLoadingUser(false);
          return;
        }

        const res = await api.get("/users/profile");
        setUser(res.data);
      } catch (error) {
        console.log("User not logged in or profile fetch failed");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserProfile();
  }, []);

  const coupon = user?.welcomeCoupon;
  const showCoupon = coupon?.code && coupon?.isUsed === false;

  return (
    <div className="bg-royalblack text-ivory min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        className="h-[85vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-7xl font-serif text-gold mb-6 tracking-wide">
            KSHETRA
          </h1>

          <div className="w-24 h-[2px] bg-gold mx-auto my-8"></div>

          <p className="text-ivory/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Where heritage meets modern royalty. Discover timeless Indian
            craftsmanship curated with elegance.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-10 px-10 py-3 border border-gold text-gold 
                       hover:bg-gold hover:text-royalblack 
                       transition duration-500 tracking-widest"
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* ================= WELCOME COUPON ================= */}
      {!loadingUser && showCoupon && (
        <section className="px-10 md:px-24 py-12 bg-black/70 border-y border-gold/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-serif text-gold">
                🎉 Welcome Offer for You, {user.name}!
              </h2>

              <p className="text-ivory/70 mt-2 text-lg">
                Use Coupon Code:{" "}
                <span className="text-green-400 font-bold tracking-widest">
                  {coupon.code}
                </span>{" "}
                and get{" "}
                <span className="text-gold font-semibold">
                  {coupon.discountValue}% OFF
                </span>{" "}
                on your first order.
              </p>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="px-10 py-3 bg-gold text-royalblack font-semibold 
                         hover:bg-burgundy hover:text-ivory transition duration-500 tracking-widest"
            >
              USE COUPON
            </button>
          </div>
        </section>
      )}

      {/* ================= CURATED COLLECTIONS ================= */}
      <section className="px-10 md:px-24 py-32 bg-royalblack">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-serif text-gold tracking-wide">
            Curated Collections
          </h2>

          <div className="w-24 h-[2px] bg-gold mx-auto my-8"></div>

          <p className="text-ivory/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A celebration of India’s living heritage — crafted by artisans,
            preserved through generations, and curated with elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <CategoryCard
            title="Handloom Wears"
            image={handloomImg}
            onClick={() =>
              navigate(`/products?category=${encodeURIComponent("Handloom Wears")}`)
            }
          />

          <CategoryCard
            title="Jewelry"
            image={jewelryImg}
            onClick={() =>
              navigate(`/products?category=${encodeURIComponent("Jewelry")}`)
            }
          />

          <CategoryCard
            title="Home-decors"
            image={craftImg}
            onClick={() =>
              navigate(`/products?category=${encodeURIComponent("Home-decors")}`)
            }
          />

          <CategoryCard
            title="Regional Specials"
            image={regionalImg}
            onClick={() =>
              navigate(
                `/products?category=${encodeURIComponent("Regional Specials")}`
              )
            }
          />
        </div>
      </section>

      {/* ================= FEATURED PIECES ================= */}
      <section className="px-10 md:px-24 py-32 bg-royalblack">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-serif text-gold tracking-wide">
            Featured Pieces
          </h2>

          <div className="w-24 h-[2px] bg-gold mx-auto my-8"></div>

          <p className="text-ivory/70 max-w-2xl mx-auto text-lg">
            Timeless silhouettes crafted for modern royalty.
          </p>
        </div>

        {loadingFeatured ? (
          <p className="text-center text-ivory/60">
            Loading featured products...
          </p>
        ) : featuredProducts.length === 0 ? (
          <p className="text-center text-ivory/60">No products available.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          <button
            onClick={() => navigate("/products")}
            className="px-10 py-3 border border-gold text-gold 
                       hover:bg-gold hover:text-royalblack 
                       transition duration-500 tracking-widest"
          >
            View All Products
          </button>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </div>
  );
}
