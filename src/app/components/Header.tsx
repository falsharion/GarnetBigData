"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
];

const servicesDropdown = [
  { href: "/services#data-governance", label: "Data Governance & Quality" },
  { href: "/services#training-culture", label: "Training & Culture Building" },
  { href: "/services#data-infrastructure", label: "Data Infrastructure & Centralization" },
  { href: "/services#data-consulting", label: "Data Consulting & Process Optimization" },
  { href: "/services#analytics-automation", label: "Advanced Analytics & Automation" },
];

const caseStudyDropdown = [
  { href: "/caseStudy#Revenue-Tracker", label: "Revenue Tracker" },
  { href: "/caseStudy#DataQualityOverhaul", label: "Data Quality Overhaul" },
  { href: "/caseStudy#BuildingaData-drivenCulture", label: "Building a Data-driven Culture" },
];

const resourcesDropdown = [
  { href: "/resources#blog", label: "Blog" },
  { href: "/resources#webinars-events", label: "Webinars & Events" },
];

const isHashLink = (href: string) => href.startsWith("#");
 
const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveringServicesDropdown, setHoveringServicesDropdown] = useState(false);
  const [hoveringCaseDropdown, setHoveringCaseDropdown] = useState(false);
  const [hoveringResourcesDropdown, setHoveringResourcesDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCaseOpen, setMobileCaseOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleServiceClick = (href: string) => {
    if (href.includes('#')) {
      setMobileOpen(false);
      setMobileServicesOpen(false);
      setHoveringServicesDropdown(false);
      
      const sectionId = href.split('#')[1];
      
      if (pathname === '/services') {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            element.classList.add('highlight-section');
            setTimeout(() => {
              element.classList.remove('highlight-section');
            }, 2000);
          }
        }, 100);
      }
    } else {
      setMobileOpen(false);
      setMobileServicesOpen(false);
    }
  };

  const handleCaseStudyClick = (href: string) => {
    if (href.includes('#')) {
      setMobileOpen(false);
      setMobileCaseOpen(false);
      setHoveringCaseDropdown(false);
      
      const sectionId = href.split('#')[1];
      
      if (pathname === '/caseStudy') {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            element.classList.add('highlight-section');
            setTimeout(() => {
              element.classList.remove('highlight-section');
            }, 2000);
          }
        }, 100);
      }
    } else {
      setMobileOpen(false);
      setMobileCaseOpen(false);
    }
  };

  const handleResourcesClick = (href: string) => {
    if (href.includes('#')) {
      setMobileOpen(false);
      setMobileResourcesOpen(false);
      setHoveringResourcesDropdown(false);
      
      const sectionId = href.split('#')[1];
      
      if (pathname === '/resources') {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            element.classList.add('highlight-section');
            setTimeout(() => {
              element.classList.remove('highlight-section');
            }, 2000);
          }
        }, 100);
      }
    } else {
      setMobileOpen(false);
      setMobileResourcesOpen(false);
    }
  };

  if (!mounted) {
    return (
      <header className="sticky w-full top-0 z-50 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0 w-28 sm:w-32 font-bold text-red-800">
            <img src="/GARNET5.png" alt="Garnet Logo" className="w-full h-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-800">Home</Link>
            <Link href="/services" className="text-gray-700 hover:text-red-800">Services</Link>
            <Link href="/caseStudy" className="text-gray-700 hover:text-red-800">Case Studies</Link>
            <Link href="/resources" className="text-gray-700 hover:text-red-800">Resources</Link>
          </nav>
          <Link href="/contact" className="hidden md:inline-block bg-red-800 text-white px-4 lg:px-5 py-2 rounded-lg hover:bg-red-600 transition">
            Contact Us
          </Link>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky w-full top-0 z-50 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 w-28 sm:w-32 font-bold text-red-800">
          <img src="/GARNET5.png" alt="Garnet Logo" className="w-full h-auto" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 relative">
          {navLinks.map(({ href, label }) =>
            isHashLink(href) ? (
              <a
                key={href}
                href={href}
                className="text-gray-700 hover:text-red-800 relative whitespace-nowrap"
              >
                <span className="hover-underline">{label}</span>
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={`relative whitespace-nowrap ${
                  pathname === href
                    ? "text-red-800 font-semibold"
                    : "text-gray-700 hover:text-red-800"
                }`}
              >
                <span className="hover-underline">{label}</span>
              </Link>
            )
          )}

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveringServicesDropdown(true)}
            onMouseLeave={() => setHoveringServicesDropdown(false)}
          >
            <Link
              href="/services"
              className={`flex items-center relative whitespace-nowrap ${
                pathname === '/services'
                  ? "text-red-800 font-semibold"
                  : "text-gray-700 hover:text-red-800"
              }`}
            >
              <span className="hover-underline">Services</span>
              <ChevronDown size={16} className="ml-1" />
            </Link>
            <AnimatePresence>
              {hoveringServicesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute grid grid-cols-1 lg:grid-cols-2 top-10 left-0 w-80 lg:w-96 bg-white shadow-lg border border-gray-100 rounded-md py-2 z-50"
                >
                  {servicesDropdown.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:text-red-800 transition-colors"
                      onClick={() => handleServiceClick(href)}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Case Study Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveringCaseDropdown(true)}
            onMouseLeave={() => setHoveringCaseDropdown(false)}
          >
            <Link
              href="/caseStudy"
              className={`flex items-center relative whitespace-nowrap ${
                pathname === '/caseStudy'
                  ? "text-red-800 font-semibold"
                  : "text-gray-700 hover:text-red-800"
              }`}
            >
              <span className="hover-underline">Case Studies</span>
              <ChevronDown size={16} className="ml-1" />
            </Link>
            <AnimatePresence>
              {hoveringCaseDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-10 left-0 w-56 bg-white shadow-lg border border-gray-100 rounded-md py-2 z-50"
                >
                  {caseStudyDropdown.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-800"
                      onClick={() => handleCaseStudyClick(href)}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveringResourcesDropdown(true)}
            onMouseLeave={() => setHoveringResourcesDropdown(false)}
          >
            <Link
              href="/resources"
              className={`flex items-center relative whitespace-nowrap ${
                pathname === '/resources'
                  ? "text-red-800 font-semibold"
                  : "text-gray-700 hover:text-red-800"
              }`}
            >
              <span className="hover-underline">Resources</span>
              <ChevronDown size={16} className="ml-1" />
            </Link>
            <AnimatePresence>
              {hoveringResourcesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-10 left-0 w-48 bg-white shadow-lg border border-gray-100 rounded-md py-2 z-50"
                >
                  {resourcesDropdown.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-800"
                      onClick={() => handleResourcesClick(href)}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-block bg-red-800 text-white px-4 lg:px-5 py-2 rounded-lg hover:bg-red-600 transition whitespace-nowrap text-sm lg:text-base"
        >
          Contact Us
        </Link>

        <button
          className="md:hidden flex-shrink-0"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-4 bg-white overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ href, label }) =>
                isHashLink(href) ? (
                  <a
                    key={href}
                    href={href}
                    className="text-gray-700 hover:text-red-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={`${
                      pathname === href
                        ? "text-red-800 font-semibold"
                        : "text-gray-700 hover:text-red-800"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                )
              )}

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between text-gray-700 hover:text-red-800 w-full"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                >
                  <Link
                    href="/services"
                    className={`${
                      pathname === '/services'
                        ? "text-red-800 font-semibold"
                        : "text-gray-700 hover:text-red-800"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileOpen(false);
                    }}
                  >
                    Services
                  </Link>
                  {mobileServicesOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col pl-4 space-y-2 mt-2"
                    >
                      {servicesDropdown.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className="text-sm text-gray-700 hover:text-red-800 py-1"
                          onClick={() => handleServiceClick(href)}
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Case Study Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between text-gray-700 hover:text-red-800 w-full"
                  onClick={() => setMobileCaseOpen((prev) => !prev)}
                >
                  <Link
                    href="/caseStudy"
                    className={`${
                      pathname === '/caseStudy'
                        ? "text-red-800 font-semibold"
                        : "text-gray-700 hover:text-red-800"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileOpen(false);
                    }}
                  >
                    Case Study
                  </Link>
                  {mobileCaseOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {mobileCaseOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col pl-4 space-y-2 mt-2"
                    >
                      {caseStudyDropdown.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className="text-sm text-gray-700 hover:text-red-800 py-1"
                          onClick={() => handleCaseStudyClick(href)}
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Resources Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between text-gray-700 hover:text-red-800 w-full"
                  onClick={() => setMobileResourcesOpen((prev) => !prev)}
                >
                  <Link
                    href="/resources"
                    className={`${
                      pathname === '/resources'
                        ? "text-red-800 font-semibold"
                        : "text-gray-700 hover:text-red-800"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileOpen(false);
                    }}
                  >
                    Resources
                  </Link>
                  {mobileResourcesOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col pl-4 space-y-2 mt-2"
                    >
                      {resourcesDropdown.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className="text-sm text-gray-700 hover:text-red-800 py-1"
                          onClick={() => handleResourcesClick(href)}
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                className="mt-4 inline-block bg-red-800 text-white px-4 py-2 rounded-md text-center"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;