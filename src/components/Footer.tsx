import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gold-light py-12 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gold" />
                <p>123 Serenity Lane, Nagpur, India</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold" />
                <p>+91 (712) 555-0123</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold" />
                <p>info@sunwaywellness.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-gold transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gold">Opening Hours</h4>
              <p className="text-gold-light">
                Monday - Sunday: 10:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/20 text-center">
          <p className="text-gold-light">&copy; {new Date().getFullYear()} Sunway Wellness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;