import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles } from 'lucide-react';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-4">
              Sunway Wellness
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              A place to unwind... the body, mind & soul
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full transition-colors">
              Book Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={ref} className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Welcome to Luxury Urban Tranquility
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Step into a world of serenity at Nagpur's premier luxury day spa. 
                At Sunway Wellness, we blend ancient healing traditions with modern 
                luxury to create an unforgettable wellness experience.
              </p>
              <div className="flex items-center space-x-4 text-emerald-600">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Discover our signature treatments</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury spa treatment"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Established 2009</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  15+ Years of Excellence
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;