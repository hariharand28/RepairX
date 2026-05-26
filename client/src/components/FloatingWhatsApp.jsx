import React from "react";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const whatsappNumber = "919600949684";

  const message =
    "Hi RepairX, I need a repair service.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Pulse Ring */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

      {/* Main Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_15px_50px_rgba(37,211,102,0.35)] rounded-full pl-4 pr-5 py-3 transition-all duration-300 hover:scale-105"
      >
        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg">
          <MessageCircle className="text-white w-6 h-6" />
        </div>

        {/* Text */}
        <div className="hidden sm:block">
          <p className="text-xs font-medium text-gray-500">
            Support Online
          </p>

          <p className="text-sm font-bold text-[#06142E]">
            Chat on WhatsApp
          </p>
        </div>

        {/* Online Dot */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;