import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-royalblack text-gold min-h-screen">
        <Navbar />
        <div className="text-center py-40">Loading your royal orders...</div>
      </div>
    );
  }

  return (
    <div className="bg-royalblack text-ivory min-h-screen">
      <Navbar />

      <div className="px-6 md:px-24 py-24">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-gold tracking-wide">
            My Orders
          </h1>
          <div className="w-24 h-[2px] bg-gold mx-auto mt-6"></div>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-ivory/60">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-12">

            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gold/30 p-10 bg-black/40"
              >

                <div className="flex justify-between mb-8">
                  <div>
                    <p className="text-gold font-serif text-lg">
                      Order ID:
                    </p>
                    <p className="text-ivory/60 text-sm">
                      {order._id}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gold">
                      ₹ {order.totalPrice}
                    </p>
                    <p className="text-ivory/60 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="space-y-6">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-6 border-b border-gold/20 pb-6"
                    >
                      <img
  src={item.image}
  alt={item.name}
  className="w-24 h-24 object-cover"
/>

                      <div className="flex-1">
                        <h3 className="text-gold font-serif">
                          {item.name}
                        </h3>

                        <p className="text-ivory/60 text-sm">
                          Qty: {item.quantity}
                        </p>

                        {item.selectedSize && (
                          <p className="text-ivory/60 text-sm">
                            Size: {item.selectedSize}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
  {item.originalPrice && item.originalPrice > item.price ? (
    <>
      <p className="text-ivory/40 line-through text-sm">
        ₹ {item.originalPrice * item.quantity}
      </p>
      <p className="text-green-400 font-semibold">
        ₹ {item.price * item.quantity}
      </p>
    </>
  ) : (
    <p className="text-gold">
      ₹ {item.price * item.quantity}
    </p>
  )}
</div>

                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
