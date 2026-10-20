import { useNavigate } from "react-router-dom";

import heritageImg from "../assets/welcome/heritage.jpg";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-ivory to-[#efe8d8] flex items-center px-6 md:px-20 relative overflow-hidden">

      {/* Decorative Gold Blur Accent */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>

      <div className="grid md:grid-cols-2 gap-16 items-center w-full relative z-10">

        {/* STORY CONTENT */}
        <div>

          <h1 className="text-5xl md:text-6xl font-serif text-burgundy leading-tight tracking-wide">
            Welcome to{" "}
            <span className="text-gold drop-shadow-sm">
              Kshetra
            </span>
          </h1>

          {/* Elegant Divider */}
          <div className="w-28 h-[2px] bg-gold my-8"></div>

          <p className="text-royalblack text-lg leading-relaxed font-medium">
            Kshetra was born from the soul of India — a land where tradition
            is not history, but living art.
          </p>

          <p className="mt-6 text-royalblack/80 leading-relaxed">
            From handwoven textiles and heritage crafts to timeless
            traditional wear, we bring the essence of Indian culture to
            the global stage — connecting artisans to the world, and
            stories to the future.
          </p>

          <p className="mt-6 italic text-burgundy font-medium">
            Crafted by hands. Curated with heart. Shared with the world.
          </p>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap gap-6">

            <button
              onClick={() => navigate("/guide")}
              className="px-10 py-3 bg-burgundy text-ivory
                         shadow-lg hover:shadow-gold/30
                         hover:bg-gold hover:text-royalblack
                         transition-all duration-500 tracking-widest"
            >
              Explore
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-10 py-3 border border-burgundy text-burgundy
                         hover:bg-burgundy hover:text-ivory
                         transition-all duration-500 tracking-widest"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-3 border border-gold text-gold
                         hover:bg-gold hover:text-royalblack
                         transition-all duration-500 tracking-widest"
            >
              Join Us
            </button>

          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative group">

          <img
            src={heritageImg}
            alt="Indian Heritage"
            className="rounded-sm shadow-2xl transform group-hover:scale-[1.02] transition duration-700"
          />

          {/* Gold Frame Effect */}
          <div className="absolute inset-0 border border-gold/40 pointer-events-none"></div>

          {/* Subtle Overlay Depth */}
          <div className="absolute inset-0 bg-burgundy/10"></div>

        </div>

      </div>
    </div>
  );
}
