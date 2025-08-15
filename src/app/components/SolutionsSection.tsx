import { useState } from "react";
import { User, TrendingUp, BookOpen, Brain, X } from "lucide-react";

type Service = {
  title: string;
  desc: string;
  location: string;
  icon: React.ElementType;
  color: string;
  buttonColor: string;
  badge?: string;
  benefits: string[];
};


const services: Service[] = [
  {
    title: "Data Culture Transformation",
    desc: "Foster a data-driven mindset across every level of your organization by embedding analytics into daily decision-making and aligning leadership vision with frontline execution.",
    location: "Lagos, NG",
    icon: User,
    color: "bg-red-50 text-red-600",
    buttonColor: "text-red-700 ",
    benefits: [
      "Higher adoption of data tools and dashboards",
      "Cross-department collaboration through shared metrics",
      "Improved decision-making speed and accuracy",
      "Stronger accountability with transparent data access"
    ],
  },
  {
    title: "Revenue-Generating Data Strategy",
    desc: "Turn your organization's data into a growth engine. We help you design and implement strategies that uncover new revenue streams, optimize pricing, and improve sales performance through actionable insights.",
    location: "Lagos, NG",
    icon: TrendingUp,
    color: "bg-blue-50 text-blue-600",
    buttonColor: "text-blue-700 ",
    benefits: [
      "Identify untapped market opportunities",
      "Increase conversion rates with targeted analytics",
      "Optimize customer acquisition and retention strategies",
      "Optimize pricing and promotions based on real-time data",
      "Align sales and marketing around measurable ROI"
    ],
  },
  {
    title: "Expert Training & Skill Development",
    desc: "Equip your teams with the technical and analytical skills needed to thrive in a data-first world. From beginner analytics literacy to advanced data engineering, our programs are tailored to your industry and tools.",
    location: "London, UK",
    icon: BookOpen,
    color: "bg-green-50 text-green-600",
    buttonColor: " text-green-700 ",
    benefits: [
      "Boost employee confidence in using analytics tools",
      "Reduce reliance on external reporting teams",
      "Standardize best practices for data handling",
      "Enable faster, more informed decision-making"
    ],
  },
  {
    title: "AI Integration",
    desc: "Prepare your business for the next wave of innovation with seamless AI adoption. From process automation to predictive modeling, we help you integrate AI responsibly and strategically for lasting impact.",
    location: "London, UK",
    icon: Brain,
    color: "bg-purple-50 text-purple-600",
    buttonColor: "text-purple-700",
    badge: "COMING SOON",
    benefits: [
    "Automate repetitive tasks and free up human capacity",
      "Predict trends and customer needs before they happen",
      "Improve operational efficiency with AI-driven workflows",
      "Ensure ethical, compliant, and secure AI deployment"
    ],
  },
];


const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>;
};


const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const SolutionsSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openModal = (service: Service) => setSelectedService(service);
  const closeModal = () => setSelectedService(null);

  return (
    <>
      <section className="pt-20 pb-10">
        <div className="container mx-auto px-10">
          <AnimatedSection className="text-center mb-16">
       <h2 className="text-2xl  md:text-4xl pb-4 font-light text-gray-800">
            Comprehensive Solutions for
            <span className="font-medium  pl-3 bg-gradient-to-r from-red-600 via-orange-500 to-lime-300 bg-clip-text text-transparent">
              Data Success
            </span>
          </h2>
            <p className="text-gray-600 text-sm sm:text-lg leading-7 max-w-xl mx-auto">
              Our proven methodologies transform organizations from data-poor to data-rich, driving real revenue growth and operational excellence.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <AnimatedSection
                  key={service.title}
                  className="bg-white md:px-4 py-8 rounded-xl  transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 sm:p-4 rounded-lg ${service.color} flex-shrink-0`}>
                      <IconComponent size={32} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-xl md:text-2xl font-semibold ${service.buttonColor} `}>{service.title}</h3>
                        {service.badge && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-[8px] lg:text-xs font-medium rounded-full">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm sm:text-lg mb-4 leading-relaxed">
                        {truncateText(service.desc, 100)}
                      </p>
                      <div className="flex items-end justify-start">
                        <button
                          onClick={() => openModal(service)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium hover:bg-red-900 hover:text-red-100 transition-colors duration-200 border-red-800 text-red-800`}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 overflow-x-hidden bg-black/80 bg-opacity-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="py-5 px-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 sm:p-3 rounded-lg ${selectedService.color}`}>
                    <selectedService.icon size={32} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{selectedService.title}</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X size={28} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{selectedService.desc}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4 text-sm md:text-lg">Benefits:</h4>
                <ul className="text-gray-700 space-y-3">
                  {selectedService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolutionsSection;