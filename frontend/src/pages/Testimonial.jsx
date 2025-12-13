import { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    role: "CTO, TechCorp Inc.",
    text: "CRM Pro transformed our sales process. Our conversion rates increased by 40% in just 3 months! The AI insights are game-changing.",
    rating: 5,
    avatar: "JS",
    product: "CRM Pro",
  },
  {
    name: "Sarah Johnson",
    role: "Operations Director, Global Enterprises",
    text: "The ERP Suite streamlined our operations across 5 countries. Implementation was smooth and the ROI was realized in under 6 months.",
    rating: 5,
    avatar: "SJ",
    product: "ERP Suite",
  },
  {
    name: "Mike Chen",
    role: "Founder, StartUp XYZ",
    text: "Analytics Dashboard gave us insights we never had before. Data-driven decisions have boosted our growth by 200% year-over-year.",
    rating: 4,
    avatar: "MC",
    product: "Analytics Dashboard",
  },
  {
    name: "Dr. Michael Chen",
    role: "Principal, Green Valley Schools",
    text: "School ERP Suite revolutionized our institution's management. Parent engagement increased by 60% and administrative work reduced by half.",
    rating: 5,
    avatar: "MC",
    product: "School ERP",
  },
];

export default function ContinuousTestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // 4 second mein next testimonial

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600">
            See what our customers have to say about their experience.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.concat(testimonials).map(
                (
                  t,
                  i // duplicate for infinite loop
                ) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-100">
                      <Quote className="w-16 h-16 text-primary-100 mb-6" />

                      <div className="flex mb-6">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-10 italic">
                        "{t.text}"
                      </p>

                      <div className="flex items-center space-x-5">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold mr-4">
                          {t.avatar}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {t.name}
                          </h4>
                          <p className="text-gray-600 font-medium">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/80 backdrop-blur p-3 rounded-full shadow-xl hover:bg-white transition-all"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/80 backdrop-blur p-3 rounded-full shadow-xl hover:bg-white transition-all"
          >
            →
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-primary-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
