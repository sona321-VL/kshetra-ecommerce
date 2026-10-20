import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateOrder = async (id, updates) => {
    try {
      await api.put(`/admin/orders/${id}`, updates);
      fetchOrders();
    } catch (err) {
      console.log("Update failed", err);
    }
  };

  /* ================= DELETE ORDER ================= */
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await api.delete(`/admin/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-gold mb-10">
        Order Management
      </h2>

      {loading ? (
        <p className="text-gold">Loading orders...</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-black border border-gold/20 p-8"
            >
              {/* ===== HEADER ===== */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-gold font-serif text-lg">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-ivory/60 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteOrder(order._id)}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
                >
                  Delete
                </button>
              </div>

              {/* ===== USER INFO ===== */}
              <div className="mb-6">
                <p className="text-gold">Customer:</p>
                <p className="text-ivory/70">
                  {order.user?.name} ({order.user?.email})
                </p>
              </div>

              {/* ===== SHIPPING ===== */}
              <div className="mb-6">
                <p className="text-gold">Shipping Address:</p>
                <p className="text-ivory/70">
                  {order.shippingAddress?.fullName},{" "}
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state} -{" "}
                  {order.shippingAddress?.pincode}
                </p>
              </div>

              {/* ===== ITEMS ===== */}
              <div className="mb-6">
                <p className="text-gold mb-4">Items:</p>
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-ivory/70 mb-2"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹ {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* ===== TOTAL ===== */}
              <div className="flex justify-between text-xl font-serif text-gold mb-6">
                <span>Total</span>
                <span>₹ {order.totalPrice}</span>
              </div>

              {/* ===== STATUS CONTROLS ===== */}
              <div className="flex gap-6">

                <button
                  onClick={() =>
                    updateOrder(order._id, { isPaid: !order.isPaid })
                  }
                  className={`px-4 py-2 border ${
                    order.isPaid
                      ? "border-green-500 text-green-500"
                      : "border-yellow-500 text-yellow-500"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Mark as Paid"}
                </button>

                <button
                  onClick={() =>
                    updateOrder(order._id, { isDelivered: !order.isDelivered })
                  }
                  className={`px-4 py-2 border ${
                    order.isDelivered
                      ? "border-green-500 text-green-500"
                      : "border-blue-500 text-blue-500"
                  }`}
                >
                  {order.isDelivered
                    ? "Delivered"
                    : "Mark as Delivered"}
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
