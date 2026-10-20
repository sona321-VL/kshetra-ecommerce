export default function AdminTopbar() {
  return (
    <div className="flex justify-between items-center p-6 border-b border-gold/20 bg-black">
      
      <h1 className="text-xl text-gold font-serif">
        Kshetra Administration
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition"
      >
        Logout
      </button>

    </div>
  );
}
