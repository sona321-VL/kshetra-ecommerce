import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword");
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let url = "/products";

        if (keyword) {
          url += `?keyword=${keyword}`;
        } else if (category) {
          url += `?category=${category}`;
        }

        const res = await api.get(url);

        console.log("PRODUCT LIST API RESPONSE:", res.data);

        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category]);

  return (
    <div className="bg-royalblack text-ivory min-h-screen">
      <Navbar />

      <div className="px-10 md:px-24 py-20">
        <h1 className="text-4xl font-serif text-gold mb-12 text-center">
          {keyword
            ? `Search Results for "${keyword}"`
            : category
            ? category
            : "Our Collection"}
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-ivory/60">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
