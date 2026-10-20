import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  // 🎁 Coupon States
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.log("Fetch cart failed", err);
    }
  };

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Total with Offer Price
  const itemsPrice =
    cart?.items?.reduce((acc, item) => {
      const finalPrice = item.product?.offer?.isActive
        ? item.product.offer.offerPrice
        : item.product.price;

      return acc + finalPrice * item.quantity;
    }, 0) || 0;

  // ✅ Savings from Product Offers
  const totalSavings =
    cart?.items?.reduce((acc, item) => {
      const originalPrice = item.product.price;

      const finalPrice = item.product?.offer?.isActive
        ? item.product.offer.offerPrice
        : item.product.price;

      return acc + (originalPrice - finalPrice) * item.quantity;
    }, 0) || 0;

  // 🎁 Apply Coupon Preview
  const handleApplyCoupon = () => {
    setCouponMessage("");
    setCouponError("");

    if (!coupon) {
      setCouponError("Enter coupon code");
      return;
    }

    if (coupon === "WELCOME10") {
      const discount = (itemsPrice * 10) / 100;
      setCouponDiscount(discount);
      setCouponMessage("Welcome coupon applied successfully!");
    } else {
      setCouponError("Invalid coupon code");
      setCouponDiscount(0);
    }
  };

  const finalTotal = itemsPrice - couponDiscount;

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/orders", {
        shippingAddress,
        paymentMethod,
        couponCode: coupon || null,
      });

      navigate(`/order-success/${res.data._id}`);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-royalblack text-ivory min-h-screen">
      <Navbar />

      <div className="px-6 md:px-24 py-24 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-gold tracking-wide">
            Secure Checkout
          </h1>
          <div className="w-24 h-[2px] bg-gold mx-auto mt-6"></div>
        </div>

        <div className="border border-gold/30 p-10 md:p-16 bg-black/40">
          <form onSubmit={handleOrder} className="space-y-10">

            {/* SHIPPING */}
            <div>
              <h2 className="text-2xl font-serif text-gold mb-6">
                Shipping Address
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.keys(shippingAddress).map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field}
                    onChange={handleChange}
                    required
                    className="px-6 py-4 bg-transparent 
                               border border-gold/30 
                               focus:border-gold 
                               outline-none transition"
                  />
                ))}
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div>
              <h2 className="text-2xl font-serif text-gold mb-6">
                Payment Method
              </h2>

              <div className="space-y-4">
                {["COD", "Card", "UPI", "Net Banking"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-between 
                                border px-6 py-4 cursor-pointer transition
                                ${
                                  paymentMethod === method
                                    ? "border-gold bg-gold/10"
                                    : "border-gold/30"
                                }`}
                  >
                    <span>{method}</span>

                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-gold"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="border border-gold/20 p-6 bg-black/30">
              <h2 className="text-xl font-serif text-gold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-ivory/70 mb-3">
                <span>Subtotal</span>
                <span>₹ {itemsPrice}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-green-400 font-semibold mb-3">
                  <span>You Saved (Offers)</span>
                  <span>- ₹ {totalSavings}</span>
                </div>
              )}

              {/* COUPON SECTION */}
              <div className="mt-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 px-4 py-3 bg-transparent 
                               border border-gold/30 
                               focus:border-gold outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-6 py-3 border border-gold text-gold 
                               hover:bg-gold hover:text-royalblack transition"
                  >
                    APPLY
                  </button>
                </div>

                {couponMessage && (
                  <p className="text-green-400 mt-3 text-sm">
                    {couponMessage}
                  </p>
                )}

                {couponError && (
                  <p className="text-red-400 mt-3 text-sm">
                    {couponError}
                  </p>
                )}
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-gold font-semibold mt-4">
                  <span>Welcome Discount</span>
                  <span>- ₹ {couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-2xl text-gold font-serif mt-6">
                <span>Total</span>
                <span>₹ {finalTotal}</span>
              </div>
            </div>

            {/* CONFIRM BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-5 
                         bg-gold text-royalblack 
                         hover:bg-burgundy hover:text-ivory 
                         transition duration-500 
                         tracking-widest text-lg"
            >
              {loading ? "Processing..." : "CONFIRM ORDER"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}