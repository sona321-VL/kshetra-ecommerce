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
  LineChart,
  Line,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
      console.log("Dashboard fetch failed", err);
    }
  };

  const statusData = [
    { name: "Paid", value: orderStatus.paidOrders || 0 },
    { name: "Unpaid", value: orderStatus.unpaidOrders || 0 },
    { name: "Delivered", value: orderStatus.delivered || 0 },
    { name: "Pending", value: orderStatus.pendingDelivery || 0 },
  ];

  const COLORS = ["#D4AF37", "#800000", "#006400", "#1E3A8A"];

  return (
    <div>
      <h2 className="text-4xl font-serif text-gold mb-12">
        Admin Control Center 👑
      </h2>

      {/* ===== STAT CARDS ===== */}
      <div className="grid md:grid-cols-4 gap-8 mb-16">

        <StatCard title="Total Revenue" value={`₹ ${stats.totalRevenue || 0}`} />
        <StatCard title="Total Orders" value={stats.totalOrders || 0} />
        <StatCard title="Total Users" value={stats.totalUsers || 0} />
        <StatCard title="Total Products" value={stats.totalProducts || 0} />

      </div>

      {/* ===== CHART SECTION 1 ===== */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">

        {/* Revenue Line Chart */}
        <LuxuryCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <XAxis dataKey="_id" stroke="#D4AF37" />
              <YAxis stroke="#D4AF37" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#D4AF37"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </LuxuryCard>

        {/* Order Status Pie */}
        <LuxuryCard title="Order Status Distribution">
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
        </LuxuryCard>

      </div>

      {/* ===== CHART SECTION 2 ===== */}
      <LuxuryCard title="Top Selling Products">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topProducts}>
            <XAxis dataKey="_id" stroke="#D4AF37" />
            <YAxis stroke="#D4AF37" />
            <Tooltip />
            <Bar dataKey="totalSold" fill="#D4AF37" />
          </BarChart>
        </ResponsiveContainer>
      </LuxuryCard>

    </div>
  );
}

/* ===== STAT CARD ===== */

function StatCard({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-black to-[#111] 
                    border border-gold/30 
                    p-8 text-center 
                    hover:scale-105 transition duration-300">

      <h3 className="text-ivory/60 text-sm mb-4 tracking-widest">
        {title}
      </h3>

      <p className="text-3xl font-serif text-gold">
        {value}
      </p>
    </div>
  );
}

/* ===== LUXURY CHART CARD ===== */

function LuxuryCard({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-black to-[#111]
                    border border-gold/30 
                    p-8 shadow-xl">

      <h3 className="text-gold font-serif text-xl mb-8">
        {title}
      </h3>

      {children}
    </div>
  );
}
