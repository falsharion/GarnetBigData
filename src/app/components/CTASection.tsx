"use client";

import { CalendarDays, ClipboardList } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#730909] to-[#cc4f3b] text-white">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Ready to Turn Your Data Into Revenue?
          </h2>
          <p className="max-w-2xl text-white/70 mx-auto text-base md:text-lg">
            Don't let another quarter pass with untapped data potential. Start building your data-driven organization today and discover the revenue opportunities hiding in plain sight.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Assessment Card */}
          <div className="bg-white text-gray-900 rounded-xl shadow-md p-5 sm:p-8 flex flex-col items-center">
            <div className="bg-[#e8d5d1] rounded-full p-3 mb-4">
              <ClipboardList className="text-[#822d1b]" size={28} />
            </div>
            <h3 className="text-xl font-semibold">
              Start your Data Revenue Assessment
            </h3>
            <p className="text-sm mt-3 mb-6">
              Gain a clear understanding of your business's data landscape and uncover untapped revenue opportunities worth millions.
            </p>
            <ul className="text-xs space-y-2 text-left text-green-700 mb-6">
              <li>✔ 60-minute, business and data review</li>
              <li>✔ Opportunity blueprint</li>
              <li>✔ Tailored, quick-win recommendations</li>
            </ul>
            <Link 
              href="/contact" 
              className="bg-[#4c201c] hover:bg-[#3d1a17] text-white text-sm font-medium px-6 py-3 rounded-md transition"
            >
              Get your Free Assessment
            </Link>
          </div>

          {/* Strategy Call Card */}
          <div className="bg-white/30 text-white rounded-xl shadow-md p-8 flex flex-col items-center">
            <div className="bg-[#e8d5d1] rounded-full p-3 mb-4">
              <CalendarDays className="text-[#822d1b]" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-center">
              Book a Free Strategy Call
            </h3>
            <p className="text-sm text-center mt-3 mb-6">
              Speak directly with our data strategy experts to pinpoint your most pressing challenges and opportunities.
            </p>
            <ul className="text-sm space-y-2 text-left text-white mb-6">
              <li>✔ 20-minute consultation</li>
              <li>✔ Immediate insights</li>
              <li>✔ Clear next-step roadmap</li>
            </ul>
            <a
              href="https://calendly.com/garnetbigdata/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-200 text-[#a13325] text-sm font-medium px-6 py-3 rounded-md transition"
            >
              Schedule Your Call
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;