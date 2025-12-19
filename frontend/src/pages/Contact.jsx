import { useState } from "react";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  Calendar,
  Users,
  Globe,
  MessageSquare,
  Briefcase,
  ChevronRight,
  Sparkles,
  Shield,
  Headphones,
  Video,
  Download,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeContact, setActiveContact] = useState(null);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@vetpl.com", "help@vetpl.com"],
      description: "Response within 4-6 hours",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9876543210", "+91 9685743265"],
      description: "24/7 emergency support available",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Tech Street", "Ranchi, Jharkhand 302017"],
      description: "Book a meeting first",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  const teamMembers = [
    {
      name: "Sneha ",
      role: "Sales Manager",
      email: "sneha@vetpl.com",
      imageColor: "bg-gradient-to-br from-blue-400 to-cyan-400",
    },
    {
      name: "Sonu Kumar",
      role: "Technical Lead",
      email: "sonu@vetpl.com",
      imageColor: "bg-gradient-to-br from-green-400 to-emerald-400",
    },
    {
      name: "Sanjay",
      role: "Software Developer",
      email: "sanjay@vetpl.com",
      imageColor: "bg-gradient-to-br from-purple-400 to-pink-400",
    },
  ];

  const contactMethods = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "sales", label: "Sales & Business", icon: Briefcase },
    { value: "support", label: "Technical Support", icon: Headphones },
    { value: "career", label: "Career Opportunities", icon: Users },
    { value: "partnership", label: "Partnership", icon: Globe },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await API.submitContactForm(formData);

    toast.success(
      <div className="flex items-center gap-3">
        <CheckCircle className="text-green-500" size={24} />
        <div>
          <div className="font-bold">Message sent successfully!</div>
          <div className="text-sm">We'll get back to you within 24 hours.</div>
        </div>
      </div>
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  } catch (err) {
    toast.error(
      <div className="flex items-center gap-3">
        <AlertCircle className="text-red-500" size={24} />
        <div>
          <div className="font-bold">Failed to send message</div>
          <div className="text-sm">{err.message}</div>
        </div>
      </div>
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />
      

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-cyan-600">
          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="text-white" size={16} />
                <span className="text-white font-semibold text-sm">
                  Let's Connect
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                <span className="block">Get in Touch</span>
                <span className="text-cyan-200">Let's Build Together</span>
              </h1>

              <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                Have an idea? Let's make it happen. Our team is ready to help
                you transform your vision into reality.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="relative -mt-8 md:-mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  onMouseEnter={() => setActiveContact(index)}
                  onMouseLeave={() => setActiveContact(null)}
                >
                  {/* Gradient Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="p-6 md:p-8">
                    <div
                      className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <info.icon className="text-white" size={28} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {info.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="text-gray-700 font-medium">
                          {detail}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-2" />
                      {info.description}
                    </div>
                  </div>

                  <div
                    className={`h-1 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          Send Your Message
                        </h2>
                        <p className="text-gray-600">
                          Fill out the form and our team will get back to you
                          promptly.
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                        <Shield className="text-primary-600" size={20} />
                        <span className="text-primary-700 font-medium">
                          Secure & Encrypted
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <label className="block">
                            <span className="text-gray-700 font-semibold mb-2 inline-block">
                              Full Name *
                            </span>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                              placeholder="John Doe"
                            />
                          </label>

                          <label className="block">
                            <span className="text-gray-700 font-semibold mb-2 inline-block">
                              Phone Number
                            </span>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                              placeholder="+1 (555) 123-4567"
                            />
                          </label>
                        </div>

                        <div className="space-y-4">
                          <label className="block">
                            <span className="text-gray-700 font-semibold mb-2 inline-block">
                              Email Address *
                            </span>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                              placeholder="john@example.com"
                            />
                          </label>

                          <label className="block">
                            <span className="text-gray-700 font-semibold mb-2 inline-block">
                              Subject *
                            </span>
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition appearance-none bg-white"
                            >
                              <option value="">Select a topic</option>
                              {contactMethods.map((method) => (
                                <option key={method.value} value={method.value}>
                                  {method.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>

                      <label className="block">
                        <span className="text-gray-700 font-semibold mb-2 inline-block">
                          Your Message *
                        </span>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="6"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition resize-none"
                          placeholder="Tell us about your project, timeline, and requirements..."
                        ></textarea>
                      </label>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="newsletter"
                              className="sr-only"
                            />
                            <div className="h-5 w-5 rounded border border-gray-300 flex items-center justify-center">
                              <CheckCircle
                                className="hidden text-primary-600"
                                size={16}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-gray-600">
                            Subscribe to our newsletter
                          </span>
                        </label>

                        <button
                          type="submit"
                          disabled={loading}
                          className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {loading ? (
                            <>
                              <Loader className="animate-spin" size={20} />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send
                                className="group-hover:translate-x-1 transition-transform"
                                size={20}
                              />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Meet the Team */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Meet Your Contact Team
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`h-14 w-14 rounded-xl ${member.imageColor} flex items-center justify-center text-white font-bold`}
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {member.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-2">
                              {member.role}
                            </p>
                            <a
                              href={`mailto:${member.email}`}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                            >
                              <Mail size={14} />
                              {member.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Info & CTA */}
              <div className="space-y-8">
                {/* Quick Contact */}
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Quick Connect
                  </h3>

                  <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                      <button
                        key={index}
                        className="group w-full p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 flex items-center justify-between"
                        onClick={() =>
                          setFormData({ ...formData, subject: method.value })
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                            <method.icon
                              className="text-gray-600 group-hover:text-primary-600"
                              size={20}
                            />
                          </div>
                          <span className="font-semibold text-gray-900">
                            {method.label}
                          </span>
                        </div>
                        <ChevronRight
                          className="text-gray-400 group-hover:text-primary-600"
                          size={20}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Schedule Call */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="text-cyan-200" size={24} />
                    <h3 className="text-2xl font-bold">Schedule a Call</h3>
                  </div>

                  <p className="text-primary-100 mb-6">
                    Book a 30-minute discovery call with our experts.
                  </p>

                  <div className="space-y-4">
                    <button className="w-full py-3.5 bg-white text-primary-700 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                      <Video size={20} />
                      Video Conference
                    </button>
                    <button className="w-full py-3.5 bg-white/10 border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition">
                      In-Person Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
