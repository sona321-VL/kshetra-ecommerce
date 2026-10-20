import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-black border-r border-gold/20 p-6">
      
      <h2 className="text-2xl font-serif text-gold mb-10">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-6">

        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/analytics">Analytics</NavLink>
        <NavLink to="/admin/offers">Offers</NavLink>
      

      </nav>

    </div>
  );
}
