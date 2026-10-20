import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-royalblack text-ivory min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-40 px-6 text-center">

        <div className="border border-gold/30 p-16 max-w-2xl w-full bg-black/40 backdrop-blur-sm">

          <h1 className="text-5xl font-serif text-gold mb-8 tracking-wide">
            Order Confirmed 👑
          </h1>

          <div className="w-24 h-[2px] bg-gold mx-auto mb-10"></div>

          <p className="text-ivory/70 mb-6">
            Your order has been placed successfully.
          </p>

          <p className="text-gold text-lg mb-10">
            Order ID: {id}
          </p>

          <p className="text-ivory/50 mb-12">
            Thank you for choosing Kshetra — where every piece carries heritage.
          </p>

          <button
            onClick={() => navigate("/home")}
            className="px-12 py-4 bg-gold text-royalblack 
                       hover:bg-burgundy hover:text-ivory 
                       transition duration-500 tracking-widest"
          >
            CONTINUE SHOPPING
          </button>

        </div>

      </div>

      <Footer />
    </div>
  );
}
