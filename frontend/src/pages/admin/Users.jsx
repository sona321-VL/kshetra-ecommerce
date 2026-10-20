import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err.response?.data || err.message);
    }
  };

  /* ================= TOGGLE ROLE ================= */
  const toggleRole = async (user) => {
    try {
      if (user.role === "admin") {
        await api.put(`/users/demote/${user._id}`);
      } else {
        await api.put(`/users/promote/${user._id}`);
      }

      fetchUsers();
    } catch (err) {
      console.error("Role update failed", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-gold mb-10">
        User Management
      </h2>

      {loading ? (
        <p className="text-gold">Loading users...</p>
      ) : (
        <div className="space-y-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-black border border-gold/20 p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-gold font-serif text-lg">
                  {user.name}
                </h3>
                <p className="text-ivory/60 text-sm">
                  {user.email}
                </p>
                <p className="mt-2 text-sm">
                  Role:{" "}
                  <span
                    className={
                      user.role === "admin"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {user.role}
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => toggleRole(user)}
                  className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition"
                >
                  {user.role === "admin"
                    ? "Demote to User"
                    : "Promote to Admin"}
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}