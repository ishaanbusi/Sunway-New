import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bot as Lotus, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "/services",
      label: "Services",
      dropdown: [
        { href: "/services#swedish", label: "Swedish Massage" },
        { href: "/services#balinese", label: "Balinese Massage" },
        { href: "/services#deep-tissue", label: "Deep Tissue" },
        { href: "/services#facial", label: "Facial Treatment" },
        { href: "/services#aromatherapy", label: "Aromatherapy" },
        { href: "/services#thai", label: "Thai Therapy" },
      ],
    },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
    // { href: '/blog', label: 'Blog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <Lotus className="h-8 w-8 text-gold transition-transform group-hover:scale-110" />
            <span className="text-xl font-serif text-gold group-hover:text-gold-light transition-colors">
              Sunway Wellness
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown && setShowServicesDropdown(true)
                }
                onMouseLeave={() =>
                  link.dropdown && setShowServicesDropdown(false)
                }
              >
                <Link
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-gold flex items-center ${
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-gold-light"
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform" />
                  )}
                </Link>

                {/* Services Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {showServicesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 rounded-lg bg-black border border-gold/20 shadow-lg overflow-hidden"
                      >
                        <div className="py-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="block px-4 py-2 text-sm text-gold-light hover:bg-gold/10 hover:text-gold transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gold hover:text-gold-light transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-black border-t border-gold/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <div key={link.href}>
                  <Link
                    to={link.href}
                    className={`block w-full text-left py-2 text-base font-medium transition-colors hover:text-gold ${
                      location.pathname === link.href
                        ? "text-gold"
                        : "text-gold-light"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 space-y-2 mt-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block w-full text-left py-1 text-sm text-gold-light hover:text-gold transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
