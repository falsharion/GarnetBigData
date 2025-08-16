import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-red-200 mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/services#data-governance" className="hover:text-white transition-colors duration-200">Data Governance & Quality</a></li>
              <li><a href="/services#training-culture" className="hover:text-white transition-colors duration-200">Training & Culture Building</a></li>
              <li><a href="/services#analytics-automation" className="hover:text-white transition-colors duration-200">Analytics & Automation</a></li>
              <li><a href="/services#data-infrastructure" className="hover:text-white transition-colors duration-200">Data Infrastructure & Centralization</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-red-200 mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/caseStudy" className="hover:text-white transition-colors duration-200">Case Studies</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-red-200 mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a target='_blank' href="https://medium.com/@garnetbigdata" className="hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="/resources#webinars-events" className="hover:text-white transition-colors duration-200">Webinars</a></li>
            </ul>
            
            <div className="mt-4">
              <div className="flex space-x-4">
                <a target='_blank'
                  href="https://twitter.com/garnetbigdata" 
                  className="text-gray-400 hover:text-red-200 transition-colors duration-300"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a target='_blank'
                  href="https://instagram.com/garnetbigdata" 
                  className="text-gray-400 hover:text-red-200 transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a target='_blank'
                  href="https://www.linkedin.com/company/garnet-bigdata" 
                  className="text-gray-400 hover:text-red-200 transition-colors duration-300"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className='pt-2 text-gray-400 hover:text-red-200 transition-colors duration-200'>
                <a href="mailto:Garnetbigdata@outlook.com">GarnetBigData@outlook.com</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 GarnetBigData. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;