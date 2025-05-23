import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Star } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "Swedish Massage",
      description: "A gentle, relaxing massage that uses long strokes, kneading, and circular movements to ease tension and promote relaxation.",
      image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg",
      duration: "60 min",
      price: "₹2,800"
    },
    {
      title: "Balinese Massage",
      description: "Traditional deep tissue massage combined with acupressure, gentle stretches, and aromatherapy to promote healing and relaxation.",
      image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
      duration: "90 min",
      price: "₹3,500"
    },
    {
      title: "Deep Tissue Massage",
      description: "Targets deep layers of muscle and connective tissue to release chronic muscle tension and stress.",
      image: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg",
      duration: "60 min",
      price: "₹3,200"
    },
    {
      title: "Luxury Facial",
      description: "Advanced skincare treatment using premium products to rejuvenate and nourish your skin.",
      image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg",
      duration: "75 min",
      price: "₹4,200"
    },
    {
      title: "Aromatherapy Massage",
      description: "Combines the power of essential oils with therapeutic massage techniques for complete relaxation.",
      image: "https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg",
      duration: "90 min",
      price: "₹3,800"
    },
    {
      title: "Thai Therapy",
      description: "Ancient healing system combining acupressure, Indian Ayurvedic principles, and assisted yoga postures.",
      image: "https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg",
      duration: "120 min",
      price: "₹4,500"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                    <h3 className="text-xl font-serif text-gold">{service.title}</h3>
                    <Star className="h-5 w-5 text-gold" />
                  </div>
                  <p className="text-gold-light mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gold-light">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration}
                    </div>
                    <span className="font-semibold text-gold">
                      {service.price}
                    </span>
                  </div>
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