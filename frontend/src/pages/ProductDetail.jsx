import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [id]);


  const handleAddToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (product.sizes?.length && !selectedSize) {
      alert("Please select a size");
      return;
    }

    if (product.colors?.length && !selectedColor) {
      alert("Please select a color");
      return;
    }

    try {

      setAdding(true);

      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
        selectedSize,
        selectedColor
      });

      navigate("/cart");

    } catch (err) {
      console.log(err);
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };


  if (loading) {
    return <div className="text-center py-40 text-gold">Loading...</div>;
  }

  const imageUrl =
    product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : `http://localhost:5000${product.images?.[0]}`;


  return (
    <div className="bg-royalblack text-ivory min-h-screen">

      <Navbar />

      <div className="px-10 md:px-24 py-24 grid md:grid-cols-2 gap-20">

        {/* IMAGE */}
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-[600px] object-cover"
        />

        {/* DETAILS */}
        <div>

          <h1 className="text-5xl text-gold mb-6 font-serif">
            {product.name}
          </h1>

          <p className="text-3xl mb-8 text-gold">
            ₹ {product.offer?.isActive
              ? product.offer.offerPrice
              : product.price}
          </p>

          <p className="text-ivory/70 mb-10">
            {product.description}
          </p>


          {/* SIZE */}
          {product.sizes?.length > 0 && (

            <div className="mb-8">

              <h3 className="text-gold mb-3">SELECT SIZE</h3>

              <div className="flex gap-3">

                {product.sizes.map((size) => (

                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border
                    ${selectedSize === size
                      ? "bg-gold text-black"
                      : "border-gold text-gold"}`}
                  >
                    {size}
                  </button>

                ))}

              </div>

            </div>
          )}


          {/* COLOR */}
          {product.colors?.length > 0 && (

            <div className="mb-8">

              <h3 className="text-gold mb-3">SELECT COLOR</h3>

              <div className="flex gap-4">

                {product.colors.map((color) => (

                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-10 h-10 rounded-full border-2
                    ${selectedColor === color.name
                      ? "border-gold scale-110"
                      : "border-gray-400"}`}
                  />

                ))}

              </div>

            </div>

          )}


          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="mt-6 px-10 py-4 bg-gold text-black"
          >
            {adding ? "Adding..." : "ADD TO CART"}
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}