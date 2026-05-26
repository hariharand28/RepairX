import React, { useState } from "react";
import {
  Star,
  Send,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const isFormValid = rating > 0;

  return (
    <section className="relative overflow-hidden pt-40 pb-24 px-6 md:px-12 bg-[#f5f9ff]">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-200/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* TOP BADGE FIXED */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-100 bg-white shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold tracking-wide text-blue-700 uppercase">
              Customer Experience Matters
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#06142E]">
              Share Your
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                Experience.
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Your feedback helps us improve our repair services and continue
              delivering fast, reliable, and premium support to every customer.
            </p>

            {/* TRUST CARDS */}
            <div className="mt-12 grid sm:grid-cols-3 gap-5">
              <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <ShieldCheck className="text-blue-600 w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg text-[#06142E]">
                  Trusted Service
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Certified technicians
                </p>
              </div>

              <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <BadgeCheck className="text-cyan-500 w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg text-[#06142E]">
                  5000+ Repairs
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Happy customers served
                </p>
              </div>

              <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <Star className="text-yellow-400 w-8 h-8 mb-4 fill-yellow-400" />
                <h3 className="font-bold text-lg text-[#06142E]">
                  4.9/5 Rating
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Customer satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-xl border border-white shadow-[0_20px_80px_rgba(0,80,255,0.12)] rounded-[36px] p-8 md:p-10">
              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold text-[#06142E]">
                    Rate Our Service
                  </h2>

                  <p className="text-gray-500 mt-2 text-lg">
                    We’d love to hear your feedback
                  </p>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg">
                  <Star className="text-white fill-white w-8 h-8" />
                </div>
              </div>

              {/* STAR RATING */}
              <div className="flex gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-all duration-300 hover:scale-125"
                  >
                    <Star
                      className={`w-12 h-12 transition-all duration-200 ${
                        star <= (hover || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* FORM */}
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full h-14 px-5 rounded-2xl border border-blue-100 bg-[#f7faff] outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-14 px-5 rounded-2xl border border-blue-100 bg-[#f7faff] outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <textarea
                  rows="5"
                  placeholder="Tell us about your experience..."
                  className="w-full p-5 rounded-2xl border border-blue-100 bg-[#f7faff] outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                ></textarea>

                {/* PROFESSIONAL BUTTON LOGIC */}
                <button
                  disabled={!isFormValid}
                  className={`group w-full h-14 rounded-2xl text-white font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3
                  
                  ${
                    isFormValid
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] hover:shadow-blue-300/50 cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed shadow-none"
                  }
                  `}
                >
                  Submit Review

                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                {/* VALIDATION TEXT */}
                {!isFormValid && (
                  <p className="text-sm text-red-500 mt-2">
                    Please select at least one star to continue.
                  </p>
                )}
              </div>

              {/* BOTTOM STATS */}
              <div className="mt-10 flex items-center justify-between border-t border-blue-100 pt-6">
                <div>
                  <h4 className="text-2xl font-bold text-[#06142E]">4.9/5</h4>
                  <p className="text-gray-500 text-sm">Average Rating</p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-[#06142E]">
                    5000+
                  </h4>
                  <p className="text-gray-500 text-sm">Reviews Submitted</p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-[#06142E]">99%</h4>
                  <p className="text-gray-500 text-sm">Satisfied Clients</p>
                </div>
              </div>
            </div>

            {/* FLOATING CARD FIXED */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 bg-white shadow-2xl border border-blue-100 rounded-2xl px-5 py-4 flex items-center gap-4 z-20">
              <div className="flex -space-x-3">
                <img
                  src="https://i.pravatar.cc/50?img=1"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/50?img=2"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/50?img=3"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>

              <div>
                <h4 className="font-bold text-[#06142E] text-lg">
                  Loved by Customers
                </h4>

                <p className="text-sm text-gray-500">
                  Thousands trust RepairX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RateUs;