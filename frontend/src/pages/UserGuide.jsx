import { Link } from "react-router-dom";

const UserGuide = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-gray-200 py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <h1 className="text-5xl font-serif text-[#d4af37] mb-6">
          👑 Welcome to the World of Kshetra
        </h1>

        <p className="text-lg text-gray-400 mb-16 max-w-3xl leading-relaxed">
          Kshetra is more than a marketplace — it is a journey into India's
          cultural heritage. Every product reflects the dedication of artisans
          and the beauty of traditions passed down through generations.
        </p>

        {/* USER GUIDE SECTION */}
        <section className="mb-20">

          <h2 className="text-3xl text-[#d4af37] mb-6 font-semibold">
            📖 User Guide
          </h2>

          <div className="space-y-6 text-gray-300">

            <p>✨ Browse handcrafted collections from talented artisans.</p>
            <p>🛒 Add products you love to your shopping cart.</p>
            <p>💳 Complete secure checkout using your preferred payment method.</p>
            <p>📦 Track your order and receive handcrafted items at your doorstep.</p>

          </div>

        </section>

        {/* ABOUT */}
        <section className="mb-20">

          <h2 className="text-3xl text-[#d4af37] mb-4 font-semibold">
            🏛 About Kshetra
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Kshetra connects traditional artisans with modern customers.
            Each product represents centuries of craftsmanship, cultural
            identity, and artistic excellence.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Our mission is to preserve heritage crafts while giving artisans
            the recognition they deserve in today's digital world.
          </p>

        </section>

        {/* COLLECTIONS */}
        <section className="mb-20">

          <h2 className="text-3xl text-[#d4af37] mb-8 font-semibold">
            🧵 Our Heritage Collections
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-[#141414] p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl text-[#d4af37] mb-2">🪡 Handloom Wears</h3>
              <p className="text-gray-400 text-sm">
                Traditional sarees and textiles woven using ancient
                techniques that represent India's cultural elegance.
              </p>
            </div>

            <div className="bg-[#141414] p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl text-[#d4af37] mb-2">💎 Jewelry</h3>
              <p className="text-gray-400 text-sm">
                Elegant jewelry inspired by temple architecture,
                royal dynasties, and classical Indian designs.
              </p>
            </div>

            <div className="bg-[#141414] p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl text-[#d4af37] mb-2">🏡 Home Decor</h3>
              <p className="text-gray-400 text-sm">
                Handcrafted decor items that transform homes with
                warmth, culture, and timeless beauty.
              </p>
            </div>

            <div className="bg-[#141414] p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl text-[#d4af37] mb-2">🌏 Regional Specials</h3>
              <p className="text-gray-400 text-sm">
                Unique products representing the craft traditions
                of different regions across India.
              </p>
            </div>

          </div>

        </section>

        {/* ARTISAN STORY */}
        <section className="mb-20">

          <h2 className="text-3xl text-[#d4af37] mb-4 font-semibold">
            🧑‍🎨 The Hands Behind Every Creation
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Every Kshetra product is made by skilled artisans who dedicate
            years to mastering their craft. From weaving fabrics to carving
            decorative pieces, these creators preserve traditions that
            define India's cultural identity.
          </p>

        </section>

        {/* DELIVERY */}
        <section className="mb-20">

          <h2 className="text-3xl text-[#d4af37] mb-4 font-semibold">
            🚚 Delivery & Orders
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Orders are processed within 1–2 business days and delivered
            within 4–7 days depending on location. You will receive
            tracking updates once your order is shipped.
          </p>

        </section>

        {/* CTA */}
        <section className="text-center border-t border-gray-700 pt-12">

          <h2 className="text-3xl text-[#d4af37] mb-4">
            🌟 Become Part of the Kshetra Community
          </h2>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join Kshetra to explore exclusive handcrafted collections,
            track your orders, and celebrate India's timeless cultural
            heritage.
          </p>

          <div className="flex justify-center gap-6">

            <Link to="/signup">
              <button className="bg-[#d4af37] text-black px-8 py-3 rounded-md font-semibold hover:bg-yellow-400 transition">
                ✨ Join Kshetra
              </button>
            </Link>

            <Link to="/">
              <button className="border border-[#d4af37] text-[#d4af37] px-8 py-3 rounded-md hover:bg-[#d4af37] hover:text-black transition">
                ⬅ Back to Home
              </button>
            </Link>

          </div>

        </section>

      </div>

    </div>
  );
};

export default UserGuide;