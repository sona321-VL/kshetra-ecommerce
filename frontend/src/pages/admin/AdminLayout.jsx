import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdmineSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

export default function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Only allow admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-royalblack text-ivory">
      
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <div className="p-10">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
