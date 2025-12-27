import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      content:
        "Plot Number 169, Opp Police Training School, RPTS Rd, Laxminagar, Malhotras, Maharashtra 440022",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+91 9370253809",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "sunwaywellness@gmail.com",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      content: "10:00 AM - 9:00 PM Daily",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Contact Us</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Get in touch to begin your wellness journey
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={ref}
        className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-serif mb-6">Book Your Experience</h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    placeholder="Your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    placeholder="Your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Treatment
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-emerald-500 dark:text-white">
                    <option value="">Select a treatment</option>
                    <option value="massage">Massage Therapy</option>
                    <option value="facial">Luxury Facial</option>
                    <option value="couple">Couple's Retreat</option>
                    <option value="ayurvedic">Ayurvedic Treatment</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    rows={4}
                    placeholder="Additional details or special requests"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg"
                  >
                    <div className="text-emerald-600 mb-3">{info.icon}</div>
                    <h3 className="font-serif text-lg mb-2">{info.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {info.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg">
                <h3 className="font-serif text-xl mb-4">Find Us</h3>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1577985087897!2d79.08904931493583!3d21.146631985934147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a3a6e3ebad%3A0x5b5f3f2a690ce0c3!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1645518694408!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
