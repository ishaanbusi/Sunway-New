import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Clock, Leaf } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Excellence Since 2009",
      description: "Pioneering luxury wellness in Nagpur for over a decade."
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Expert Therapists",
      description: "Internationally certified professionals with years of experience."
    },
    {
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      title: "Personalized Care",
      description: "Tailored treatments to meet your unique wellness needs."
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-600" />,
      title: "Natural Products",
      description: "Premium organic and natural spa products for optimal results."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Our Story</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Discover the journey that made us Nagpur's premier luxury wellness destination
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={ref} className="py-20 px-4 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                A Decade of Wellness Excellence
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Founded in 2009, Sunway Wellness emerged from a vision to create an 
                urban sanctuary where ancient healing traditions meet modern luxury. 
                Our journey began with a simple yet profound mission: to provide a 
                haven of tranquility in the heart of Nagpur.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300">
                Today, we stand as the city's most prestigious wellness destination, 
                offering an unparalleled range of therapeutic treatments and luxury 
                spa experiences. Our success is built on our commitment to excellence, 
                authenticity, and the continuous pursuit of innovation in wellness.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Spa interior"
                className="rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif mb-2">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Our Expert Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={`https://images.unsplash.com/photo-${[
                    '1559599076-f576eb31c426',
                    '1494790108377-be9c29b29330',
                    '1438761681033-6461ffad8d80'
                  ][index]}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                  alt={`Team member ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">
                    {[
                      'Sarah Johnson',
                      'Maria Chen',
                      'Emma Williams'
                    ][index]}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {[
                      'Senior Therapist',
                      'Wellness Director',
                      'Ayurvedic Specialist'
                    ][index]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;