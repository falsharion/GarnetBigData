"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import ArticleCard from "../components/resource/ArticleCard";
import HeroSection from "../components/casestudies/HeroSection";
import NoEvents from "../components/resource/NoEvents";
import SectionHeader from "../components/resource/SectionHeader";
import ScrollAnimationTrigger from "../components/resource/ScrollAnimationTrigger";


interface Article {
  title: string;
  desc: string;
  date: string;
  reads: string;
  img: string;
  link: string;
}

const articles: Article[] = [
  {
    title: "The Hidden $15M Cost of Poor Data Governance",
    desc: "Discover how organizations lose millions annually due to inadequate data governance and learn the 5 steps to prevent it.",
    date: "August 2, 2025",
    reads: "4 mins Read",
    img: "/article1.webp",
    link: "https://medium.com/@garnetbigdata/duolingo-knows-when-you-slack-why-dont-nigerian-businesses-559f1d5c458b" 
  },
  {
    title: "Building a Data-Driven Culture: A CEO's Blueprint",
    desc: "Learn the proven framework that transformed 3 Fortune 500 companies into truly data-driven organizations in under 6 months.",
    date: "August 5, 2025",
    reads: "4 mins Read",
    img: "/article2.webp",
    link: "https://medium.com/@garnetbigdata/same-email-different-customer-399a263745bb"
  }
];

const heroContent = {
  title: "Stay Informed. ",
  highlightedText: "Stay Ahead.",
  subtitle: "Explore our handpicked articles, exclusive sessions, and real-world discussions, all built to help you unlock the full potential of data in your organization.",
  titleClassName:"!text-4xl "

};

const ResourcesPage: React.FC = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <main className="relative h-full overflow-hidden text-[#2d2d2d]">
      <HeroSection {...heroContent}  />

      {/* Latest Insights Section */}
      <section id="blog" className="relative py-20 px-6 max-w-6xl mx-auto scroll-mt-28">
        <div className="relative z-10">
          <SectionHeader 
            title="Latest"
            highlight="Insights"
            subtitle="Explore the latest insights, guides, and thought leadership on data strategy, business intelligence, and more."
            sectionId="blog"
          />
         
          <ScrollAnimationTrigger id="blog-articles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
              {articles.map((article, idx) => (
                <ArticleCard key={idx} article={article} idx={idx} />
              ))}
            </div>
            
            {/* Read More Button */}
            <div className="mt-12 text-center">
              <a href="https://medium.com/@garnetbigdata" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-b-2 text-red-900 rounded-md font-medium hover:text-red-500 transition-colors duration-200"
                >
                  Read More Articles
                </motion.button>
              </a>
            </div>
          </ScrollAnimationTrigger>
        </div>
      </section>

      {/* Webinars & Events Section */}
      <section id="webinars-events" className="pb-16   px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Webinars & Events"
            subtitle="Join our upcoming sessions or catch up on past events to learn directly from experts and industry leaders, where we dive into what works, what's next, and how to lead with data in any industry."
            vectorPosition="left"
            sectionId="webinars-events"
          />

          <ScrollAnimationTrigger id="no-events">
            <NoEvents />
          </ScrollAnimationTrigger>
        </div>
      </section>
    </main>
  );
};

export default ResourcesPage;
