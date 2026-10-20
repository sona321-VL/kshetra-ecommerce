import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: "",
    stock: ""        // ⭐ added stock
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const productPayload = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      images: [form.images]
    };

    if (editingId) {

      await api.put(`/admin/products/${editingId}`, productPayload);

      await api.put(`/admin/products/${editingId}/stock`, {
        stock: Number(form.stock)
      });

    } else {

      await api.post("/admin/products", {
        ...productPayload,
        stock: Number(form.stock)
      });

    }

    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      images: "",
      stock: ""
    });

    setEditingId(null);
    fetchProducts();

  } catch (err) {
    console.log("Save failed");
  }
};

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log("Delete failed");
    }
  };

  // Edit Product
  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      images: product.images?.[0] || "",
      stock: product.stock || 0      // ⭐ load stock
    });
  };

  return (
    <div>

      <h2 className="text-3xl font-serif text-gold mb-10">
        Product Management
      </h2>

      {/* ===== ADD / EDIT FORM ===== */}

      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 border border-gold/20 mb-16 space-y-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-gold/30 text-ivory"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-gold/30 text-ivory"
          required
        />

        {/* ⭐ STOCK INPUT */}
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-gold/30 text-ivory"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-gold/30 text-ivory"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-gold/30 text-ivory"
        />

        <input
          type="text"
          name="images"
          placeholder="Image URL"
          value={form.images}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-gold/30 text-ivory"
        />

        <button
          type="submit"
          className="px-8 py-3 bg-gold text-black hover:bg-burgundy hover:text-ivory transition"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>

      {/* ===== PRODUCT LIST ===== */}

      <div className="grid grid-cols-3 gap-10">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-black border border-gold/20 p-6"
          >

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-48 w-full object-cover mb-4"
            />

            <h3 className="text-gold font-serif text-lg">
              {product.name}
            </h3>

            <p className="text-ivory/60 mt-2">
              ₹ {product.price}
            </p>

            {/* ⭐ STOCK DISPLAY */}
            <p className="text-sm mt-2 text-ivory/70">
              Stock: 
              <span className={`ml-2 font-bold ${product.stock === 0 ? "text-red-500" : "text-green-400"}`}>
                {product.stock}
              </span>
            </p>

            <div className="flex gap-4 mt-6">

              <button
                onClick={() => handleEdit(product)}
                className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}