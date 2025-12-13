import { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  Rocket,
  Zap,
  Target,
  GraduationCap,
  Package,
  Truck,
  Cpu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Transforming Businesses with",
      highlight: "Digital Excellence",
      description:
        "We create cutting-edge software solutions that drive growth, enhance efficiency, and deliver exceptional user experiences.",
      stats: { projects: "120+", clients: "150+", satisfaction: "99%" },
      color: "from-primary-600 to-cyan-600",
      icon: Rocket,
      badge: "Innovation Leader",
    },
    {
      id: 2,
      title: "AI-Powered Solutions for",
      highlight: "Smart Growth",
      description:
        "Leverage artificial intelligence and machine learning to automate processes and gain competitive advantage.",
      stats: { projects: "100+", clients: "80+", satisfaction: "99%" },
      color: "from-purple-600 to-pink-600",
      icon: Zap,
      badge: "AI First",
    },
    {
      id: 3,
      title: "Enterprise-Grade",
      highlight: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and managed services for businesses of all sizes.",
      stats: { projects: "150+", clients: "90+", satisfaction: "99.9%" },
      color: "from-blue-600 to-indigo-600",
      icon: Target,
      badge: "Cloud Experts",
    },
    {
      id: 4,
      title: "Advanced",
      highlight: "School ERP",
      description:
        "End-to-end education management system for schools, colleges, and universities with integrated academic, administrative, and financial modules.",
      stats: { projects: "85+", clients: "150+", satisfaction: "98.5%" },
      color: "from-indigo-600 to-purple-600",
      icon: GraduationCap,
      badge: "Education Excellence",
    },

    {
      id: 5,
      title: "Smart",
      highlight: "Fleet Management",
      description:
        "GPS-based fleet tracking, maintenance scheduling, and logistics optimization for transportation and delivery businesses.",
      stats: { projects: "75+", clients: "120+", satisfaction: "97.8%" },
      color: "from-yellow-600 to-gray-600",
      icon: Truck,
      badge: "Logistics Expert",
    },
    {
      id: 6,
      title: "Intelligent",
      highlight: "AI Automation",
      description:
        "Process automation, predictive analytics, and intelligent workflows powered by artificial intelligence and machine learning.",
      stats: { projects: "50+", clients: "75+", satisfaction: "99.5%" },
      color: "from-violet-600 to-pink-600",
      icon: Cpu,
      badge: "Automation Leader",
    },
    {
      id: 7,
      title: "Advanced",
      highlight: "Inventory & Production",
      description:
        "Integrated inventory management and production planning solutions for manufacturing, retail, and supply chain optimization.",
      stats: { projects: "120+", clients: "95+", satisfaction: "99.2%" },
      color: "from-green-600 to-emerald-600",
      icon: Package,
      badge: "Supply Chain Pro",
    },
  ];

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-20 pb-16 md:pt-3 md:pb-0">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} transition-all duration-1000 ease-in-out`}
      ></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 25}%`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="text-white" size={16} />
              <span className="text-white font-semibold text-sm">
                {currentSlideData.badge}
              </span>
            </div>

            {/* Slide Content */}
            <div className="h-[400px] md:h-[500px] flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4">
                  {currentSlideData.title}
                  <br />
                  <span className="text-cyan-200">
                    {currentSlideData.highlight}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-primary-100 max-w-2xl leading-relaxed mb-8">
                  {currentSlideData.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => navigate("/contact")}
                  className="group relative px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Start Free Consultation
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </button>

                <button
                  onClick={() => navigate("/about")}
                  className="group px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play className="text-white" size={16} />
                  </div>
                  Watch Success Story
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {currentSlideData.stats.projects}
                  </div>
                  <div className="text-primary-100">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {currentSlideData.stats.clients}
                  </div>
                  <div className="text-primary-100">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {currentSlideData.stats.satisfaction}
                  </div>
                  <div className="text-primary-100">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="flex items-center justify-between">
                {/* Dots */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-0 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="text-white" size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="text-white" size={20} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? (
                      <div className="flex items-center">
                        <div className="h-1 w-1 bg-white rounded-full mx-[1px]" />
                        <div className="h-1 w-1 bg-white rounded-full mx-[1px]" />
                      </div>
                    ) : (
                      <Play className="text-white" size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
