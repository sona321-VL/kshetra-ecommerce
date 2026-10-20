import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LuxuryChatbot() {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👑 Welcome to Kshetra Royal Heritage Assistant."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim() || loading) return;

    const userText = input;

    setMessages(prev => [
      ...prev,
      { from: "user", text: userText }
    ]);

    setInput("");
    setLoading(true);

    try {

      // ===== GET USER FROM LOCAL STORAGE =====
      const storedUser = JSON.parse(
        localStorage.getItem("userInfo")
      );

      console.log("Stored User:", storedUser);

      // ===== GET USER ID SAFELY =====
      const userId =
        storedUser?.user?._id || storedUser?._id;

      console.log("User ID:", userId);

      // ===== SEND MESSAGE TO CHATBOT =====
      const { data } = await axios.post(
        "http://localhost:5000/api/chatbot",
        {
          message: userText,
          userId
        }
      );

      // ===== ADD BOT RESPONSE =====
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: data.reply,
          products: data.products || [],
          orderDetails: data.orderDetails || null
        }
      ]);

    } catch (error) {

      console.error("Chatbot Error:", error);

      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: "⚠ Royal system temporarily unavailable."
        }
      ]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-ivory text-royalGold p-4 rounded-full shadow-xl border border-royalGold z-50"
      >
        <FaCrown size={20} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[560px] bg-black border border-royalGold rounded-xl flex flex-col overflow-hidden z-50">

          {/* Header */}
          <div className="bg-burgundy text-white text-center py-3 font-semibold">
            KSHETRA HERITAGE ASSISTANT 👑
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.from === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-xs px-4 py-3 rounded-lg text-sm ${
                    msg.from === "user"
                      ? "bg-burgundy text-white"
                      : "bg-gray-900 border border-royalGold text-white"
                  }`}
                >

                  {msg.text}

                  {/* ===== ORDER DETAILS ===== */}
                  {msg.orderDetails && (
                    <div className="mt-3 border border-royalGold rounded p-3">

                      <p className="text-xs">
                        Order ID: {msg.orderDetails._id}
                      </p>

                      <p className="text-xs">
                        Total: ₹{msg.orderDetails.totalPrice}
                      </p>

                      <p className="text-xs">
                        Status: {
                          msg.orderDetails.isDelivered
                            ? "Delivered ✅"
                            : msg.orderDetails.isPaid
                            ? "Processing 📦"
                            : "Pending 💳"
                        }
                      </p>

                    </div>
                  )}

                  {/* ===== PRODUCT CARDS ===== */}
                  {msg.products?.length > 0 &&
                    msg.products.map(product => {

                      const imageUrl = product?.images?.[0]
                        ? product.images[0].startsWith("http")
                          ? product.images[0]
                          : `http://localhost:5000${product.images[0]}`
                        : "/no-image.png";

                      return (
                        <div
                          key={product._id}
                          onClick={() =>
                            navigate(`/products/${product._id}`)
                          }
                          className="mt-3 border border-royalGold rounded overflow-hidden cursor-pointer hover:scale-[1.02] transition"
                        >

                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-28 object-cover"
                            onError={(e) => {
                              e.target.src = "/no-image.png";
                            }}
                          />

                          <div className="p-2">

                            <h4 className="text-sm font-semibold text-royalGold">
                              {product.name}
                            </h4>

                            <p className="text-xs">
                              ₹{product.price}
                            </p>

                          </div>

                        </div>
                      );

                    })}

                </div>

              </div>

            ))}

            {/* Loading */}
            {loading && (
              <div className="text-royalGold text-sm animate-pulse">
                Assistant is typing...
              </div>
            )}

            <div ref={chatRef}></div>

          </div>

          {/* Input */}
          <div className="flex border-t border-royalGold">

            <input
              type="text"
              placeholder="Ask about products, collections, orders..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              className="flex-1 bg-black text-white p-3 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-burgundy text-white px-4"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}