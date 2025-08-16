import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  notification: string;
  type: "siloed" | "quality";
}

interface AnimationProps {
  delay?: number;
}

interface AnimatedSectionProps extends AnimationProps {
  children: React.ReactNode;
  className?: string;
}

interface CustomAnimationProps extends AnimationProps {
  slideIndex: number;
  className?: string;
}

interface LottieAnimationProps {
  lottieUrl: string;
  fallbackContent?: React.ReactNode;
  className?: string;
}

const SLIDES_DATA: Slide[] = [
  {
    title: "Siloed Data",
    subtitle: "An animation of data streams blocked by walls between departments",
    description: "Valuable sets of data remain blocked by siloed internal departments, preventing your organization from unlocking its full potential and discovering hidden revenue opportunities.",
    notification: "Data blocked!",
    type: "siloed",
  },
  {
    title: "Poor Data Quality",
    subtitle: "Glitchy/damaged data files, frustrated teams making wrong decisions based on incomplete information",
    description: "When data quality is compromised, teams become frustrated and make poor decisions based on incomplete or corrupted information, leading to significant business losses.",
    notification: "Data corrupted!",
    type: "quality",
  },
  {
    title: "Limited Training",
    subtitle: "Untrained teams struggle. Adoption stalls. Mistakes multiply. Without the right skills, without continuous, targeted training, productivity sinks and competitors pull ahead.",
    description: "Untrained teams struggle. Adoption stalls. Mistakes multiply. Without the right skills, without continuous, targeted training, productivity sinks and competitors pull ahead.",
    notification: "Training needed!",
    type: "siloed",
  },
  {
    title: "AI Unreadiness",
    subtitle: "Clock ticking while robots or AI move ahead, organization lags behind",
    description: "Without the right strategy, data foundation, and skills to leverage artificial intelligence, you watch competitors automate faster, personalize better, and uncover insights -— while you watch from behind.",
    notification: "Falling behind!",
    type: "quality",
  },
];

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Generic Lottie Animation Component
const LottieAnimation: React.FC<LottieAnimationProps> = ({ 
  lottieUrl, 
  fallbackContent,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadLottie = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Clear previous animation
        if (animationRef.current) {
          animationRef.current.destroy();
        }

        // Try to load Lottie dynamically
        const lottie = await import('lottie-web');

        // Load new animation
        animationRef.current = lottie.default.loadAnimation({
          container: containerRef.current!,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: lottieUrl,
        });

        animationRef.current.addEventListener('complete', () => {
          setIsLoading(false);
        });

        animationRef.current.addEventListener('DOMLoaded', () => {
          setIsLoading(false);
        });

        // Set a timeout to show animation even if events don't fire
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);

      } catch (error) {
        console.error('Failed to load Lottie animation:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadLottie();

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [lottieUrl]);

  if (hasError) {
    return (
      <div className={`w-full h-64 ${className}`}>
        {fallbackContent || (
          <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Animation could not be loaded</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-64 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Loading animation...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-64 rounded-lg"
        style={{ minHeight: '256px' }}
      />
    </div>
  );
};

// Siloed Data Animation - Data streams blocked by walls
const SiloedDataAnimation: React.FC = () => (
  <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden">
    {/* Department walls */}
    <div className="absolute inset-0 flex justify-between items-center px-8">
      <div className="w-1 h-40 bg-gray-400 rounded animate-pulse"></div>
      <div className="w-1 h-40 bg-gray-400 rounded animate-pulse delay-300"></div>
      <div className="w-1 h-40 bg-gray-400 rounded animate-pulse delay-700"></div>
    </div>
    
    {/* Data streams trying to flow but being blocked */}
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="relative mx-2">
          <div 
            className={`w-12 h-2 bg-blue-500 rounded-full opacity-70 animate-bounce`}
            style={{ 
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          ></div>
          {/* Blocked indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        </div>
      ))}
    </div>
    
    {/* Department labels */}
    <div className="absolute bottom-4 left-4 text-xs text-gray-600 font-medium">Sales</div>
    <div className="absolute bottom-4 center text-xs text-gray-600 font-medium" style={{left: '45%'}}>Marketing</div>
    <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-medium">IT</div>
  </div>
);

// Poor Data Quality Animation - Using Lottie
const PoorDataQualityAnimation: React.FC = () => {
  // Replace this URL with your actual Lottie animation for poor data quality
  const lottieUrl = "https://lottie.host/15f172c6-e9fa-43c3-9eab-377f70c374b2/CETZBhMaKs.json";
  
  const fallbackContent = (
    <div className="relative w-full h-64 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Corrupted data files */}
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="relative">
            <div 
              className={`w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-md transform transition-all duration-500 ${
                i % 2 === 0 ? 'animate-pulse opacity-50' : 'animate-bounce'
              }`}
              style={{ 
                animationDelay: `${i * 0.3}s`,
                transform: i % 3 === 1 ? 'rotate(5deg)' : i % 3 === 2 ? 'rotate(-5deg)' : 'rotate(0deg)'
              }}
            >
              {/* File icon */}
              <div className="p-2">
                <div className="w-full h-2 bg-white rounded mb-1 opacity-80"></div>
                <div className="w-3/4 h-2 bg-white rounded mb-1 opacity-60"></div>
                <div className="w-1/2 h-2 bg-white rounded opacity-40"></div>
              </div>
              
              {/* Glitch effects */}
              {i % 2 === 0 && (
                <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping rounded-lg"></div>
              )}
              {i % 3 === 1 && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              )}
            </div>
            
            {/* Error indicators */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Frustrated team member */}
      <div className="absolute bottom-4 right-4">
        <div className="w-8 h-8 bg-orange-400 rounded-full animate-bounce">
          <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-4 h-1 bg-white rounded-full transform rotate-180"></div>
        </div>
      </div>
    </div>
  );

  return (
    <LottieAnimation 
      lottieUrl={lottieUrl}
      fallbackContent={fallbackContent}
      className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg"
    />
  );
};

// Limited Training Animation - Using Lottie
const LimitedTrainingAnimation: React.FC = () => {
  // Replace this URL with your actual Lottie animation for limited training
  const lottieUrl = "https://lottie.host/5ca7ca7d-056f-431e-a2bf-9bd1fa46027c/fhRMpxogX0.json";
  
  const [isConfident, setIsConfident] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConfident(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const fallbackContent = (
    <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Employee */}
      <div className={`relative transition-all duration-1000 ${isConfident ? 'scale-110' : 'scale-100'}`}>
        <div className={`w-16 h-16 rounded-full transition-all duration-1000 ${
          isConfident ? 'bg-green-400' : 'bg-yellow-400'
        }`}>
          {/* Face */}
          <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></div>
          <div className={`absolute bottom-4 left-4 w-8 h-1 bg-white rounded-full transition-all duration-1000 transform ${
            isConfident ? 'rotate-0' : 'rotate-180'
          }`}></div>
          
          {/* Confusion indicators */}
          {!isConfident && (
            <>
              <div className="absolute -top-2 -left-2 text-2xl animate-bounce">?</div>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce delay-300">?</div>
            </>
          )}
          
          {/* Confidence indicators */}
          {isConfident && (
            <>
              <div className="absolute -top-4 -left-4 text-2xl animate-bounce text-green-600">✓</div>
              <div className="absolute -top-4 -right-4 text-2xl animate-bounce delay-300 text-green-600">💡</div>
            </>
          )}
        </div>
      </div>
      
      {/* Data charts */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-end space-x-1">
              {[...Array(3)].map((_, j) => (
                <div 
                  key={j}
                  className={`w-3 bg-blue-400 rounded-t transition-all duration-1000 ${
                    isConfident ? 'opacity-100' : 'opacity-50'
                  }`}
                  style={{ height: `${(j + 1) * 8}px` }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Learning progress */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-green-500 rounded-full transition-all duration-3000 ${
              isConfident ? 'w-full' : 'w-1/4'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <LottieAnimation 
      lottieUrl={lottieUrl}
      fallbackContent={fallbackContent}
      className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg"
    />
  );
};

// AI Unreadiness Animation - Using Lottie
const AIUnreadinessAnimation: React.FC = () => {
  const lottieUrl = "https://lottie.host/14c383da-df63-412b-96fe-614657a4dc9e/6hoaP1uR0e.json";
  
  const fallbackContent = (
    <div className="w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p className="text-purple-600 font-semibold">AI Readiness Animation</p>
      </div>
    </div>
  );

  return (
    <LottieAnimation 
      lottieUrl={lottieUrl}
      fallbackContent={fallbackContent}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg"
    />
  );
};

const CustomAnimation: React.FC<CustomAnimationProps> = React.memo(
  ({ slideIndex, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [delay]);

    const renderAnimation = () => {
      switch (slideIndex) {
        case 0:
          return <SiloedDataAnimation />;
        case 1:
          return <PoorDataQualityAnimation />;
        case 2:
          return <LimitedTrainingAnimation />;
        case 3:
          return <AIUnreadinessAnimation />;
        default:
          return <SiloedDataAnimation />;
      }
    };

    return (
      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        } bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden ${className}`}
      >
        {renderAnimation()}
      </div>
    );
  }
);

const GoldmineSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const slides = useMemo(() => SLIDES_DATA, []);

  const nextSlide = useCallback(() => {
    if (mountedRef.current) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    if (mountedRef.current) {
      setCurrentSlide(index);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval
    intervalRef.current = setInterval(nextSlide, 8000);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide]);

  return (
    <section className="py-20 relative bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-light max-w-lg md:max-w-4xl text-gray-800">
              Your Data is Your Goldmine —
              <span className="font-medium pl-3 bg-gradient-to-r from-red-600 via-orange-500 to-lime-300 bg-clip-text text-transparent">
                But Are You Mining It?
              </span>
            </h2>
          </div>
          <p className="mt-4 text-xs md:text-base px-5 text-gray-500 max-w-2xl md:max-w-4xl mx-auto">
            Most organizations are sitting on treasure troves of untapped data
            potential. Siloed departments, inconsistent storage, and limited
            employee data literacy are costing you more than inefficiency —
            they're costing you revenue opportunities you never knew existed.
          </p>
        </AnimatedSection>

        <div className="flex-col justify-center md:px-6 flex  md:flex-row items-center gap-12 mt-24 md:mt-28 mx-6">
          <div className="w-full  md:w-2/3 relative">
            <AnimatedSection delay={300}>
              <CustomAnimation 
                slideIndex={currentSlide} 
                delay={500}
                key={currentSlide} // Force re-render when slide changes
              />
            </AnimatedSection>

            {/* <AnimatedSection delay={800} className="absolute -top-4 -right-4">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce">
                {slides[currentSlide].notification}
              </div>
            </AnimatedSection> */}
          </div>

          <div className="text-left">
            <AnimatedSection delay={600}>
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                {slides[currentSlide].title.split(" ")[0]}{" "}
                <span className="text-red-500">
                  {slides[currentSlide].title.split(" ")[1]}
                </span>
              </h3>
              <p className="text-gray-500 text-base md:max-w-xl leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <AnimatedSection
        delay={900}
        className="flex justify-center items-center space-x-2 mt-12"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              index === currentSlide 
                ? "w-8 bg-blue-500" 
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </AnimatedSection>
    </section>
  );
};

export default GoldmineSection;