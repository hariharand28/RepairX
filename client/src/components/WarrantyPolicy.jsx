import React from "react";
import {
  ShieldCheck,
  Clock3,
  Wrench,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

const warrantyData = [
  {
    icon: Clock3,
    title: "Warranty Duration",
    description:
      "Most repairs include a 30-day limited warranty covering service-related issues.",
  },

  {
    icon: Wrench,
    title: "Covered Repairs",
    description:
      "Warranty applies to screen replacement, battery replacement, charging ports, and selected hardware repairs.",
  },

  {
    icon: BadgeCheck,
    title: "Genuine Parts",
    description:
      "We use premium-quality compatible and genuine replacement parts whenever available.",
  },

  {
    icon: AlertTriangle,
    title: "Warranty Exclusions",
    description:
      "Physical damage, water damage, accidental drops, and unauthorized repairs are not covered.",
  },
];

const WarrantyPolicy = () => {
  return (
    <section className="min-h-screen bg-[#f5f9ff] py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* HERO */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-blue-600" />

            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Repair Protection
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-[#06142E] leading-tight">
            Warranty
            <br />

            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We stand behind the quality of our repairs with transparent
            warranty coverage designed to ensure peace of mind and
            customer satisfaction.
          </p>
        </div>

        {/* POLICY GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {warrantyData.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white border border-blue-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg mb-6">
                  <Icon className="text-white w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-[#06142E] mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* IMPORTANT NOTES */}
        <div className="bg-white border border-blue-100 rounded-[36px] p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-[#06142E] mb-8">
            Important Warranty Information
          </h2>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              • Warranty claims must be accompanied by the original invoice
              or booking confirmation.
            </p>

            <p>
              • Warranty applies only to the repaired component and does
              not cover unrelated hardware or software issues.
            </p>

            <p>
              • Devices showing signs of physical damage, liquid damage,
              or tampering after repair may void warranty eligibility.
            </p>

            <p>
              • RepairX reserves the right to inspect the device before
              approving any warranty claim.
            </p>

            <p>
              • For warranty support, customers can contact us through
              WhatsApp, support center, or by visiting our FAQ section.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantyPolicy;