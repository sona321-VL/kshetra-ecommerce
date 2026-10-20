import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashImage from "../assets/splash/splash-bg.jpg";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 8000); // 8 seconds ultra luxury delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Background with Cinematic Zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-zoomSlow"
        style={{ backgroundImage: `url(${splashImage})` }}
      ></div>

      {/* Royal Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#4A0E0E]/60 to-black/95 backdrop-blur-sm"></div>

      {/* Golden Light Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_60%)] animate-glowPulse"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

        {/* Brand Name */}
        <h1 className="text-6xl md:text-8xl font-serif tracking-[0.5em] text-[#D4AF37] drop-shadow-2xl animate-titleReveal">
          KSHETRA
        </h1>

        {/* Tagline */}
        <p className="mt-10 text-[#F8F5E9] text-lg md:text-xl tracking-[0.6em] uppercase opacity-90 animate-fadeInSlow">
          A Realm of Timeless Indian Luxury
        </p>

        {/* Luxury Divider */}
        <div className="mt-14 w-52 h-[2px] bg-[#4A0E0E] overflow-hidden">
          <div className="h-full bg-[#D4AF37] animate-loadingUltra"></div>
        </div>

      </div>
    </div>
  );
}