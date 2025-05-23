import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      text: "The Swedish massage was absolutely incredible. The therapist's attention to detail and expertise made it a truly relaxing experience.",
      author: "Sarah M.",
      location: "Nagpur",
      rating: 5,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
    },
    {
      text: "I've tried many spas, but Sunway Wellness stands out. Their Balinese massage is the perfect blend of relaxation and therapeutic techniques.",
      author: "Raj & Priya",
      location: "Mumbai",
      rating: 5,
      image: "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg"
    },
    {
      text: "The aromatherapy session was transformative. The essential oils and massage techniques created a deeply relaxing experience.",
      author: "Emma W.",
      location: "Delhi",
      rating: 5,
      image: "https://images.pexels.com/photos/1181688/pexels-photo-1181688.jpeg"
    },
    {
      text: "Their Thai therapy session was exactly what I needed. The stretching and pressure point work helped relieve my chronic back pain.",
      author: "John D.",
      location: "Pune",
      rating: 5,
      image: "https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg"
    },
    {
      text: "The facial treatment left my skin glowing. The products used were premium and the therapist's knowledge was impressive.",
      author: "Lisa K.",
      location: "Bangalore",
      rating: 5,
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
    },
    {
      text: "Deep tissue massage here is exceptional. The therapist really understood how to address my muscle tension issues.",
      author: "Michael R.",
      location: "Hyderabad",
      rating: 5,
      image: "https://images.pexels.com/photos/1181691/pexels-photo-1181691.jpeg"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Client Testimonials</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Read what our valued guests have to say about their experiences
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section ref={ref} className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gold/20"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-gold fill-current"
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gold/20 mb-4" />
                <p className="text-gold-light mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gold">{testimonial.author}</p>
                    <p className="text-sm text-gold-light">{testimonial.location}</p>
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

export default Testimonials;