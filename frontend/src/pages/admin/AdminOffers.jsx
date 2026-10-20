import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { applyOffer, removeOffer } from "../../services/offerApi";



const AdminOffers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [offerData, setOfferData] = useState({
    discountType: "PERCENT",
    discountValue: "",
    offerTitle: "",
    expiryDate: ""
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Apply offer
  const handleApplyOffer = async (productId) => {
    try {
      if (!offerData.discountValue || !offerData.offerTitle) {
        alert("Enter Offer Title and Discount Value!");
        return;
      }

      await applyOffer(productId, offerData);
      alert("Offer Applied Successfully!");
      fetchProducts();

      setOfferData({
        discountType: "PERCENT",
        discountValue: "",
        offerTitle: "",
        expiryDate: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to apply offer");
    }
  };

  // Remove offer
  const handleRemoveOffer = async (productId) => {
    try {
      await removeOffer(productId);
      alert("Offer Removed Successfully!");
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to remove offer");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F8F5E9] p-8">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-8">
        Admin Offer Management
      </h1>

      {/* Offer Form */}
      <div className="bg-[#4A0E0E] p-6 rounded-2xl shadow-lg mb-10 border border-[#D4AF37]">
        <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">
          Create Offer
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Offer Title"
            value={offerData.offerTitle}
            onChange={(e) =>
              setOfferData({ ...offerData, offerTitle: e.target.value })
            }
            className="p-3 rounded-lg bg-[#0A0A0A] border border-[#D4AF37] text-[#F8F5E9]"
          />

          <select
            value={offerData.discountType}
            onChange={(e) =>
              setOfferData({ ...offerData, discountType: e.target.value })
            }
            className="p-3 rounded-lg bg-[#0A0A0A] border border-[#D4AF37] text-[#F8F5E9]"
          >
            <option value="PERCENT">Percentage (%)</option>
            <option value="FLAT">Flat (₹)</option>
          </select>

          <input
            type="number"
            placeholder="Discount Value"
            value={offerData.discountValue}
            onChange={(e) =>
              setOfferData({ ...offerData, discountValue: e.target.value })
            }
            className="p-3 rounded-lg bg-[#0A0A0A] border border-[#D4AF37] text-[#F8F5E9]"
          />

          <input
            type="date"
            value={offerData.expiryDate}
            onChange={(e) =>
              setOfferData({ ...offerData, expiryDate: e.target.value })
            }
            className="p-3 rounded-lg bg-[#0A0A0A] border border-[#D4AF37] text-[#F8F5E9]"
          />
        </div>

        <p className="mt-3 text-sm text-[#F8F5E9]/70">
          Fill the details and click Apply Offer on any product.
        </p>
      </div>

      {/* Product List */}
      <div className="bg-[#111] p-6 rounded-2xl shadow-lg border border-[#D4AF37]">
        <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">
          Products List
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-[#D4AF37] rounded-lg">
              <thead>
                <tr className="bg-[#4A0E0E] text-[#D4AF37]">
                  <th className="p-3 border border-[#D4AF37]">Product</th>
                  <th className="p-3 border border-[#D4AF37]">Price</th>
                  <th className="p-3 border border-[#D4AF37]">Offer</th>
                  <th className="p-3 border border-[#D4AF37]">Offer Price</th>
                  <th className="p-3 border border-[#D4AF37]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-3 border border-[#D4AF37]">
                      {product.name}
                    </td>

                    <td className="p-3 border border-[#D4AF37]">
                      ₹{product.price}
                    </td>

                    <td className="p-3 border border-[#D4AF37]">
                      {product.offer?.isActive ? (
                        <span className="text-green-400 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold">
                          No Offer
                        </span>
                      )}
                    </td>

                    <td className="p-3 border border-[#D4AF37]">
                      {product.offer?.isActive ? (
                        <span className="text-[#D4AF37] font-bold">
                          ₹{product.offer.offerPrice}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3 border border-[#D4AF37] space-x-2">
                      <button
                        onClick={() => handleApplyOffer(product._id)}
                        className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold hover:opacity-80"
                      >
                        Apply
                      </button>

                      <button
                        onClick={() => handleRemoveOffer(product._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-80"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <p className="text-center mt-6 text-[#F8F5E9]/70">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOffers;
