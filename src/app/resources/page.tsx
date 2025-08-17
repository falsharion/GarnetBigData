"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import ArticleCard from "../components/resource/ArticleCard";
import ArticleSkeleton from "../components/resource/ArticleSkeleton";
import HeroSection from "../components/casestudies/HeroSection";
import NoEvents from "../components/resource/NoEvents";
import SectionHeader from "../components/resource/SectionHeader";
import ScrollAnimationTrigger from "../components/resource/ScrollAnimationTrigger";
import EventsSection from "../components/resource/EventSection";
import { Event } from "../components/resource/EventCard";
import { fetchLatestMediumArticles, FormattedArticle } from "../lib/mediumFetch";

const heroContent = {
  title: "Stay Informed. ",
  highlightedText: "Stay Ahead.",
  subtitle: "Explore our handpicked articles, exclusive sessions, and real-world discussions, all built to help you unlock the full potential of data in your organization.",
  titleClassName:"!text-4xl "
};

// replace with your actual data source
const mockEvents: Event[] = [
  // {
  //   id: "event-1",
  //   title: "Transforming Data into Revenue: Live Case Study Analysis",
  //   description: "Join our experts as they analyze real client transformations and share actionable strategies you can implement immediately.",
  //   date: "January 25, 2025",
  //   time: "2:00 PM EST",
  //   duration: "60 Minutes",
  //   status: "UPCOMING",
  //   registrationLink: "https://example.com/register"
  // },
  // {
  //   id: "event-2",
  //   title: "AI-Powered Analytics: Building Your First Dashboard",
  //   description: "Learn hands-on techniques for creating intelligent dashboards that drive business decisions and ROI.",
  //   date: "February 15, 2025",
  //   time: "3:00 PM EST",
  //   duration: "90 Minutes",
  //   status: "UPCOMING",
  //   registrationLink: "https://example.com/register"
  // }
];

const ResourcesPage: React.FC = () => {
  const [articles, setArticles] = useState<FormattedArticle[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoadingArticles(true);
        setError(null);
        const fetchedArticles = await fetchLatestMediumArticles(2);
        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Error loading articles:", err);
        setError("Failed to load articles. Please try again later.");
        
        // Fallback to static articles if fetch fails
        const fallbackArticles: FormattedArticle[] = [
          {
            title: "The Hidden $15M Cost of Poor Data Governance",
            desc: "Discover how organizations lose millions annually due to inadequate data governance and learn the 5 steps to prevent it.",
            date: "August 2, 2025",
            reads: "4 mins Read",
            img: "/article1.webp",
            link: "https://medium.com/@garnetbigdata/duolingo-knows-when-you-slack-why-dont-nigerian-businesses-559f1d5c458b",
            id: "fallback-1"
          },
          {
            title: "Building a Data-Driven Culture: A CEO's Blueprint",
            desc: "Learn the proven framework that transformed 3 Fortune 500 companies into truly data-driven organizations in under 6 months.",
            date: "August 5, 2025",
            reads: "4 mins Read",
            img: "/article2.webp",
            link: "https://medium.com/@garnetbigdata/same-email-different-customer-399a263745bb",
            id: "fallback-2"
          }
        ];
        setArticles(fallbackArticles);
      } finally {
        setIsLoadingArticles(false);
      }
    };

    const loadEvents = async () => {
      try {
        setIsLoadingEvents(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Replace this with your actual events API call
        // const fetchedEvents = await fetchEvents();
        
        //  randomly show events or empty array
        const showEvents = Math.random() > 0.5; // 50% chance to show events
        setEvents(showEvents ? mockEvents : []);
        
      } catch (err) {
        console.error("Error loading events:", err);
        setEvents([]);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    loadArticles();
    loadEvents();
  }, []);

  const renderArticles = () => {
    if (isLoadingArticles) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          <ArticleSkeleton />
          <ArticleSkeleton />
        </div>
      );
    }

    if (error && articles.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
        {articles.map((article, idx) => (
          <ArticleCard key={article.id} article={article} idx={idx} />
        ))}
      </div>
    );
  };

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
            {renderArticles()}
            
            {/* Read More Button */}
            {!isLoadingArticles && articles.length > 0 && (
              <div className="mt-12 text-center">
                <a 
                  href={`https://medium.com/@${process.env.NEXT_PUBLIC_MEDIUM_USERNAME || 'garnetbigdata'}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-b-2 text-red-900 rounded-md font-medium hover:text-red-500 transition-colors duration-200"
                  >
                    Read More Articles
                  </motion.button>
                </a>
              </div>
            )}
          </ScrollAnimationTrigger>
        </div>
      </section>

      {/* Webinars & Events Section */}
      <section id="webinars-events" className="pb-16 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Webinars & Events"
            subtitle="Join our upcoming sessions or catch up on past events to learn directly from experts and industry leaders, where we dive into what works, what's next, and how to lead with data in any industry."
            vectorPosition="left"
            sectionId="webinars-events"
          />

          <EventsSection events={events} isLoading={isLoadingEvents} />
        </div>
      </section>
    </main>
  );
};

export default ResourcesPage;