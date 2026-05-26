import React, { useState } from "react";
import {
  ChevronDown,
  ShieldCheck,
  Clock3,
  Wrench,
  CreditCard,
} from "lucide-react";

const faqData = [
  {
    category: "General",
    icon: ShieldCheck,
    questions: [
      {
        q: "How do I book a repair service?",
        a: "Simply select your repair service, choose a time slot, and confirm your booking online.",
      },
      {
        q: "Do you provide doorstep repair service?",
        a: "Yes, our technicians can visit your home or office for most repairs.",
      },
    ],
  },

  {
    category: "Warranty",
    icon: Wrench,
    questions: [
      {
        q: "Do repairs include warranty?",
        a: "Yes, we provide up to 30 days warranty depending on the repair type.",
      },
      {
        q: "Are spare parts genuine?",
        a: "We use high-quality and genuine compatible parts for all repairs.",
      },
    ],
  },

  {
    category: "Timing",
    icon: Clock3,
    questions: [
      {
        q: "How long does a repair take?",
        a: "Most repairs are completed within 30–90 minutes.",
      },
      {
        q: "Can I schedule repairs for weekends?",
        a: "Yes, weekend and evening bookings are available.",
      },
    ],
  },

  {
    category: "Payments",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI, debit cards, credit cards, net banking, and cash.",
      },
      {
        q: "Can I cancel my booking?",
        a: "Yes, bookings can be cancelled before technician dispatch.",
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="min-h-screen bg-[#f5f9ff] py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6">
            <span className="text-sm font-semibold text-blue-700 uppercase">
              Support Center
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-[#06142E] leading-tight">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our repair services,
            warranty, pricing, and support.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqData.map((section, sectionIndex) => {
            const Icon = section.icon;

            return (
              <div
                key={sectionIndex}
                className="bg-white rounded-[32px] border border-blue-100 shadow-sm p-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg">
                    <Icon className="text-white w-7 h-7" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-[#06142E]">
                      {section.category}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Common questions about {section.category.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {section.questions.map((item, questionIndex) => {
                    const uniqueIndex = `${sectionIndex}-${questionIndex}`;

                    return (
                      <div
                        key={uniqueIndex}
                        className="border border-blue-100 rounded-2xl overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenIndex(
                              openIndex === uniqueIndex
                                ? null
                                : uniqueIndex
                            )
                          }
                          className="w-full flex items-center justify-between p-6 bg-white hover:bg-blue-50 transition-all duration-300"
                        >
                          <span className="text-left text-lg font-semibold text-[#06142E]">
                            {item.q}
                          </span>

                          <ChevronDown
                            className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                              openIndex === uniqueIndex
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-300 ${
                            openIndex === uniqueIndex
                              ? "grid-rows-[1fr]"
                              : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                              {item.a}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;