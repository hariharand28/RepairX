import React from "react";
import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  Globe,
  Mail,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    icon: <Database size={22} />,
    title: "Information We Collect",
    content:
      "We collect information you provide directly when creating an account, booking services, contacting support, or interacting with our platform. This may include your name, email address, phone number, location details, and payment-related information.",
  },
  {
    icon: <Eye size={22} />,
    title: "How We Use Your Data",
    content:
      "Your information helps us provide seamless service experiences, process bookings, improve platform performance, personalize recommendations, and communicate important updates related to your account and services.",
  },
  {
    icon: <Lock size={22} />,
    title: "Data Protection & Security",
    content:
      "We implement industry-standard security practices designed to protect your personal information from unauthorized access, disclosure, misuse, or alteration. Your trust and privacy are extremely important to us.",
  },
  {
    icon: <Globe size={22} />,
    title: "Third-Party Services",
    content:
      "Some services may rely on trusted third-party providers for payments, analytics, customer support, or infrastructure. These providers are required to maintain appropriate data protection standards.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Your Privacy Rights",
    content:
      "You have the right to request access, updates, or deletion of your personal information, subject to applicable legal and operational requirements.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto">
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
            <ShieldCheck size={15} />
            Privacy & Data Protection
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#0f172a] leading-none max-w-4xl">
            Your privacy matters to us.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-500 mt-8 max-w-2xl leading-relaxed">
            We are committed to protecting your personal information
            and maintaining transparency about how your data is collected,
            used, and secured across the RepairX platform.
          </p>

          {/* Last Updated */}
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            Last updated: May 2026
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                border border-gray-100
                rounded-3xl
                p-8 md:p-10
                shadow-sm
                hover:shadow-xl
                hover:border-blue-100
                transition-all duration-300
              "
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className="
                    w-14 h-14
                    rounded-2xl
                    bg-blue-50
                    text-blue-600
                    flex items-center justify-center
                    flex-shrink-0
                  "
                >
                  {section.icon}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-[#0f172a]">
                      {section.title}
                    </h2>

                    <ChevronRight
                      size={18}
                      className="
                        text-gray-300
                        group-hover:text-blue-500
                        transition-colors
                      "
                    />
                  </div>

                  <p className="text-gray-600 leading-relaxed text-[15px] md:text-base">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Contact Card */}
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
          {/* Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full text-sm font-semibold text-blue-700 mb-6">
              <Mail size={15} />
              Contact & Support
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0f172a] leading-tight max-w-3xl">
              Questions about your privacy or data?
            </h2>

            <p className="text-lg text-gray-600 mt-6 max-w-2xl leading-relaxed">
              If you have questions regarding this Privacy Policy,
              data handling practices, or account security,
              feel free to contact our support team anytime.
            </p>

            <a
              href="mailto:privacy@repairx.com"
              className="
                inline-flex items-center gap-2
                mt-8
                bg-[#0f172a]
                hover:bg-black
                text-white
                px-6 py-4
                rounded-2xl
                font-semibold
                transition-all duration-300
                shadow-lg hover:shadow-xl
              "
            >
              <Mail size={18} />
              privacy@repairx.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}