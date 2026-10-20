import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, title, price, image }) {
  const navigate = useNavigate();

  const productImage = product?.images?.[0]
  ? product.images[0].startsWith("http")
    ? product.images[0]
    : `http://localhost:5000${product.images[0].startsWith("/") ? "" : "/"}${product.images[0]}`
  : image;

  const productTitle = product?.name || title;
  const productId = product?._id;

  // ✅ Offer Logic
  const isOfferActive = product?.offer?.isActive === true;


  const originalPrice = product?.price || price;
  const offerPrice = product?.offer?.offerPrice;
  console.log("CARD PRODUCT:", product);


  return (
    <div
      onClick={() => productId && navigate(`/products/${productId}`)}
      className="group cursor-pointer"
    >
      <div className="relative">
        <img
          src={productImage}
          alt={productTitle}
          className="h-[350px] w-full object-cover 
                   transform group-hover:scale-105 
                   transition duration-700"
        />

        {/* ✅ Offer Badge */}
        {isOfferActive && (
          <span className="absolute top-4 left-4 bg-gold text-black px-3 py-1 rounded-lg text-sm font-semibold">
            {product.offer.offerTitle || "Offer"}
          </span>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-gold font-serif text-xl">
          {productTitle}
        </h3>

        {/* ✅ Price Display */}
        {isOfferActive ? (
          <div className="mt-2">
            <p className="text-ivory/40 line-through">
              ₹ {originalPrice}
            </p>

            <p className="text-ivory/80 font-bold text-lg">
              ₹ {offerPrice}
            </p>
          </div>
        ) : (
          <p className="text-ivory/60 mt-2">
            ₹ {originalPrice}
          </p>
        )}
      </div>
    </div>
  );
}
