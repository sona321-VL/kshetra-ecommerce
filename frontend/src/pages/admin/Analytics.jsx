import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  const [stats, setStats] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const dashboard = await api.get("/admin/analytics/dashboard");
      const revenue = await api.get("/admin/analytics/revenue-monthly");
      const status = await api.get("/admin/analytics/order-status");
      const top = await api.get("/admin/analytics/top-products");

      setStats(dashboard.data);
      setMonthlyRevenue(revenue.data);
      setOrderStatus(status.data);
      setTopProducts(top.data);
    } catch (err) {
      console.log("Analytics fetch failed", err);
    }
  };

  const statusData = [
    { name: "Paid", value: orderStatus.paidOrders || 0 },
    { name: "Unpaid", value: orderStatus.unpaidOrders || 0 },
    { name: "Delivered", value: orderStatus.delivered || 0 },
    { name: "Pending", value: orderStatus.pendingDelivery || 0 },
  ];

  const COLORS = ["#D4AF37", "#4A0E0E", "#008000", "#1E3A8A"];

  return (
    <div>
      <h2 className="text-3xl font-serif text-gold mb-10">
        Analytics Dashboard
      </h2>

      {/* ===== STAT CARDS ===== */}
      <div className="grid md:grid-cols-4 gap-8 mb-16">
        <StatCard
          title="Total Revenue"
          value={`₹ ${stats.totalRevenue || 0}`}
        />
        <StatCard title="Total Orders" value={stats.totalOrders || 0} />
        <StatCard title="Total Users" value={stats.totalUsers || 0} />
        <StatCard title="Total Products" value={stats.totalProducts || 0} />
      </div>

      {/* ===== CHART SECTION ===== */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* Monthly Revenue */}
        <div className="bg-black border border-gold/20 p-6">
          <h3 className="text-gold font-serif mb-6">
            Monthly Revenue
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="_id" stroke="#D4AF37" />
              <YAxis stroke="#D4AF37" />
              <Tooltip />
              <Bar dataKey="total" fill="#D4AF37" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status */}
        <div className="bg-black border border-gold/20 p-6">
          <h3 className="text-gold font-serif mb-6">
            Order Status
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== TOP SELLING PRODUCTS ===== */}
      <div className="bg-black border border-gold/20 p-6 mt-16">
        <h3 className="text-gold font-serif mb-6">
          Top Selling Products
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topProducts}>
            <XAxis dataKey="_id" stroke="#D4AF37" />
            <YAxis stroke="#D4AF37" />
            <Tooltip />
            <Bar dataKey="totalSold" fill="#D4AF37" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ===== STAT CARD COMPONENT ===== */

function StatCard({ title, value }) {
  return (
    <div className="bg-black border border-gold/20 p-8 text-center">
      <h3 className="text-ivory/60 text-sm mb-4">{title}</h3>
      <p className="text-3xl font-serif text-gold">{value}</p>
    </div>
  );
}
