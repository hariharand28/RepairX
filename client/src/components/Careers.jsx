import React from "react";
import {
  Sparkles,
  Rocket,
  HeartHandshake,
  Coffee,
  ArrowRight,
  Mail,
  Stars,
} from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-blue-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2
              bg-blue-50
              border border-blue-100
              text-blue-700
              px-4 py-2
              rounded-full
              text-sm font-semibold
              mb-6
            "
          >
            <Sparkles size={15} />
            Careers at RepairX
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#0f172a] leading-none">
            Build the future with us.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-500 mt-8 max-w-2xl mx-auto leading-relaxed">
            We may not have open positions right now,
            but we’re always excited to connect with passionate,
            creative, and ambitious people who want to build meaningful experiences.
          </p>

          {/* CTA */}
          <div className="flex justify-center mt-10">
            <a
              href="mailto:hariharand2888@gmail.com"
              className="
                inline-flex items-center gap-2
                bg-[#0f172a]
                hover:bg-black
                text-white
                px-7 py-4
                rounded-2xl
                font-semibold
                transition-all duration-300
                shadow-lg hover:shadow-xl
              "
            >
              Contact Our Team
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="
              bg-white
              border border-gray-100
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
              <Rocket className="text-blue-600" />
            </div>

            <h3 className="text-2xl font-bold text-[#0f172a] mb-3">
              Fast Moving
            </h3>

            <p className="text-gray-500 leading-relaxed">
              We love building quickly, experimenting boldly,
              and constantly improving our platform and user experience.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
              bg-white
              border border-gray-100
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
              <HeartHandshake className="text-orange-500" />
            </div>

            <h3 className="text-2xl font-bold text-[#0f172a] mb-3">
              People First
            </h3>

            <p className="text-gray-500 leading-relaxed">
              We care deeply about our customers,
              service partners, and the people who help us grow every day.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="
              bg-white
              border border-gray-100
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
              <Coffee className="text-purple-600" />
            </div>

            <h3 className="text-2xl font-bold text-[#0f172a] mb-3">
              Creative Culture
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Great ideas can come from anywhere.
              We encourage curiosity, ownership, and creative thinking.
            </p>
          </div>
        </div>
      </section>

      {/* No Openings Section */}
      <section className="px-6 pb-28">
        <div
          className="
            max-w-5xl mx-auto
            bg-gradient-to-br from-blue-50 via-white to-indigo-50
            border border-blue-100
            rounded-[32px]
            p-10 md:p-14
            relative overflow-hidden
          "
        >
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-blue-200/30 blur-3xl rounded-full" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full text-sm font-semibold text-blue-700 mb-6">
              <Stars size={15} />
              No Open Positions Right Now
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0f172a] leading-tight">
              But we’d still love to hear from you.
            </h2>

            <p className="text-lg text-gray-600 mt-6 max-w-2xl leading-relaxed">
              If you believe you can contribute to our mission,
              feel free to send your resume, portfolio,
              or even just say hello.
            </p>

            {/* Email CTA */}
            <a
              href="mailto:careers@repairx.com"
              className="
                inline-flex items-center gap-2
                mt-8
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6 py-4
                rounded-2xl
                font-semibold
                transition-all duration-300
                shadow-lg hover:shadow-xl
              "
            >
              <Mail size={18} />
              careers@repairx.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}