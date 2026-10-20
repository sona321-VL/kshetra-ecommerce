import authBg from "../assets/auth/auth-bg.jpg";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-royalblack/90 via-burgundy/80 to-royalblack/90"></div>

      <div className="relative z-10 w-full max-w-md 
                      bg-burgundy/60 backdrop-blur-lg 
                      p-10 border border-gold/30 
                      shadow-2xl">

        <h2 className="text-3xl font-serif text-gold text-center tracking-wide">
          {title}
        </h2>

        <div className="w-16 h-[2px] bg-gold mx-auto my-6"></div>

        <p className="text-center text-ivory/70 mb-8">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}
