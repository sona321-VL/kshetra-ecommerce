import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const res = await api.get("/cart");
      setCart(res.data);

    } catch (err) {
      console.log("Fetch cart failed", err);
    } finally {
      setLoading(false);
    }

  };



  /* ================= UPDATE QUANTITY ================= */

  const updateQuantity = async (productId, selectedSize, selectedColor, newQuantity) => {

    if (newQuantity < 1) return;

    try {

      const res = await api.put("/cart/update", {
        productId,
        quantity: newQuantity,
        selectedSize,
        selectedColor
      });

      setCart(res.data);

    } catch (err) {
      console.log("Update failed", err.response?.data);
    }

  };



  /* ================= REMOVE ITEM ================= */

  const removeItem = async (productId, selectedSize, selectedColor) => {

    try {

      await api.delete("/cart/remove", {
        data: {
          productId,
          selectedSize,
          selectedColor
        }
      });

      fetchCart();

    } catch (err) {
      console.log("Remove failed", err.response?.data);
    }

  };



  const totalPrice =
    cart?.items?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;



  if (loading) {
    return (
      <div className="bg-royalblack text-gold min-h-screen">
        <Navbar />
        <div className="text-center py-40 text-xl">Loading Cart...</div>
      </div>
    );
  }



  return (
    <div className="bg-royalblack text-ivory min-h-screen">

      <Navbar />

      <div className="px-10 md:px-24 py-20">

        <h1 className="text-4xl font-serif text-gold mb-16 text-center tracking-wide">
          Your Cart
        </h1>


        {cart?.items?.length === 0 ? (

          <p className="text-center text-ivory/60 text-lg">
            Your cart is empty.
          </p>

        ) : (

          <div className="grid md:grid-cols-3 gap-16">


            {/* ================= ITEMS ================= */}

            <div className="md:col-span-2 space-y-12">

              {cart.items.map((item) => (

                <div
                  key={item._id}
                  className="flex gap-8 border-b border-gold/20 pb-10"
                >


                  {/* IMAGE */}

                  <img
                    src={
                      item.product.images?.[0]
                        ? item.product.images[0]
                        : "/placeholder.jpg"
                    }
                    alt={item.product.name}
                    className="w-44 h-52 object-cover rounded-md border border-gold/20"
                  />


                  {/* DETAILS */}

                  <div className="flex-1">

                    <h3 className="text-2xl font-serif text-gold">
                      {item.product.name}
                    </h3>

                    <p className="text-ivory/60 mt-3">
                      ₹ {item.product.price}
                    </p>


                    {/* SIZE */}

                    {item.selectedSize && (
                      <p className="mt-2 text-ivory/60">
                        Size: {item.selectedSize}
                      </p>
                    )}


                    {/* COLOR */}

                    {item.selectedColor && (
                      <div className="flex items-center gap-2 mt-2">

                        <span className="text-ivory/60">
                          Color:
                        </span>

                        <span className="text-ivory/60">
                          {item.selectedColor}
                        </span>

                      </div>
                    )}


                    {/* QUANTITY */}

                    <div className="flex items-center gap-5 mt-8">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="px-4 py-2 border border-gold text-gold"
                      >
                        -
                      </button>

                      <span className="text-lg font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="px-4 py-2 border border-gold text-gold"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeItem(
                            item.product._id,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="ml-6 text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>

                    </div>

                  </div>


                  {/* ITEM TOTAL */}

                  <div className="text-gold font-serif text-xl">

                    ₹ {item.product.price * item.quantity}

                  </div>

                </div>

              ))}

            </div>



            {/* ================= SUMMARY ================= */}

            <div className="border border-gold/20 p-10 h-fit bg-black/40">

              <h2 className="text-2xl font-serif text-gold mb-8">
                Order Summary
              </h2>

              <div className="flex justify-between mb-5 text-ivory/70">
                <span>Subtotal</span>
                <span>₹ {totalPrice}</span>
              </div>

              <div className="flex justify-between mb-8 text-ivory/70">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between text-2xl font-serif text-gold mb-10">
                <span>Total</span>
                <span>₹ {totalPrice}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-gold text-royalblack"
              >
                PROCEED TO CHECKOUT
              </button>

            </div>

          </div>

        )}

      </div>

      <Footer />

    </div>
  );
}