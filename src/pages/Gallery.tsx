import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const images = [
    {
      url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      caption: "Luxury Reception"
    },
    {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      caption: "Treatment Room"
    },
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      caption: "Couple's Suite"
    },
    {
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      caption: "Relaxation Area"
    },
    {
      url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      caption: "Massage Suite"
    },
    {
      url: "https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      caption: "Private Pool"
    }
  ];

  const testimonials = [
    {
      text: "An absolutely incredible experience. The attention to detail and level of service is unmatched.",
      author: "Sarah M.",
      rating: 5
    },
    {
      text: "The Versace couple's suite exceeded all our expectations. A truly magical experience.",
      author: "Raj & Priya",
      rating: 5
    },
    {
      text: "The best spa in Nagpur, hands down. The therapists are highly skilled and professional.",
      author: "Amit K.",
      rating: 5
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Our Gallery</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Take a visual journey through our luxury wellness sanctuary
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={ref} className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-lg font-serif">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Guest Experiences
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-emerald-600 fill-current"
                    />
                  ))}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  "{testimonial.text}"
                </p>
                <p className="text-sm font-medium text-emerald-600">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;