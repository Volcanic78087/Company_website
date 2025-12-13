import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Products", path: "/products" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  const services = [
    "Software Development",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Cloud Solutions",
    "IT Consulting",
    "ERP Software",
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Linkedin, label: "LinkedIn", url: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img
                src={logo}
                alt="VETPL Logo"
                className="
                      h-14 w-14 
                      sm:h-15 sm:w-25 
                      object-contain 
                      drop-shadow-2xl 
                      transition-all duration-500 ease-out
                      group-hover:scale-110 
                      group-hover:drop-shadow-3xl
                      select-none
                    "
                draggable="false"
                loading="eager"
              />
              <span className="text-2xl font-bold">VETPL</span>
            </div>
            <p className="text-gray-400 mb-6">
              We provide innovative software solutions that help businesses grow
              and succeed in the digital world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-primary-500 mt-1" size={20} />
                <span className="text-gray-400">
                  123 Tech Street, Ranchi
                  <br />
                  Jharkhand, India 302017
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary-500" size={20} />
                <span className="text-gray-400">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-500" size={20} />
                <span className="text-gray-400">support@vetpl.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
