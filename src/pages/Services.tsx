import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "Swedish Massage",
      description:
        "A relaxing full-body massage using gentle to medium pressure to ease muscle tension and improve circulation. Perfect for reducing stress, promoting relaxation, and restoring overall balance to the body and mind.",
      image: "/images/swedish.jpeg",
    },
    {
      title: "Balinese Massage",
      description:
        "A deeply relaxing therapy that blends gentle stretches, acupressure, and soothing massage strokes. It helps relieve muscle tension, improve circulation, and restore harmony to the body and mind.",
      image: "/images/balinese.jpeg",
    },
    {
      title: "Deep Tissue Massage",
      description:
        "A therapeutic massage that uses firm pressure to target deeper layers of muscles and connective tissues. Ideal for relieving chronic pain, stiffness, and muscle tension while improving mobility and recovery.",
      image: "/images/deep.jpeg",
    },
    {
      title: "Facial Treatment",
      description:
        "A rejuvenating skincare treatment designed to cleanse, exfoliate, and nourish the skin. Helps improve skin texture, boost hydration, and leave your face refreshed, glowing, and healthy.",
      image: "/images/facial.jpeg",
    },
    {
      title: "Aromatherapy",
      description:
        "A relaxing therapy that uses natural essential oils to calm the mind and balance the body. Helps reduce stress, improve mood, and promote deep relaxation and overall well-being.",
      image: "/images/aromatherapy.jpeg",
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
              "url(https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Our Services</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Experience the art of relaxation with our premium spa treatments
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-black-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gold/20"
              >
                <div className="relative h-64">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif text-gold">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gold-light mb-4">{service.description}</p>
                  <div className="flex justify-between items-center text-sm"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
