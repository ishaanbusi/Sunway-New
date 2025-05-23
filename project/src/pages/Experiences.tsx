import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Heart, Bot as Lotus, Flower } from 'lucide-react';

const Experiences = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: "Balinese Serenity",
      description: "Experience traditional Balinese healing in a tropical paradise setting.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      icon: <Lotus className="h-6 w-6" />,
      duration: "120 minutes",
      price: "₹4,500"
    },
    {
      title: "Moroccan Hammam",
      description: "Luxuriate in our authentic Moroccan bath house experience.",
      image: "https://images.unsplash.com/photo-1532926381892-7a8c15b504c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      icon: <Flower className="h-6 w-6" />,
      duration: "90 minutes",
      price: "₹3,800"
    },
    {
      title: "Ayurvedic Journey",
      description: "Traditional Indian wellness treatments for mind-body balance.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      icon: <Sparkles className="h-6 w-6" />,
      duration: "150 minutes",
      price: "₹5,200"
    },
    {
      title: "Versace Couple's Retreat",
      description: "Ultimate luxury experience in our designer couple's suite.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      icon: <Heart className="h-6 w-6" />,
      duration: "180 minutes",
      price: "₹8,500"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Spa Experiences</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Immerse yourself in our curated collection of luxury wellness journeys
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section ref={ref} className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-serif">{experience.title}</h3>
                    <div className="text-emerald-600">
                      {experience.icon}
                    </div>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {experience.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Duration: {experience.duration}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {experience.price}
                    </span>
                  </div>
                </div>
                <button className="absolute bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experience */}
      <section className="py-20 px-4 bg-white dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Versace Couple's Retreat
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Indulge in the ultimate luxury experience in our exclusive 
                Versace-themed couple's suite. This signature treatment combines 
                premium therapies with opulent surroundings for an unforgettable 
                romantic escape.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>Private steam room and jacuzzi</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>Champagne and gourmet refreshments</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>Signature couple's massage</span>
                </li>
              </ul>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors">
                Reserve Now
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury couple's suite"
                className="rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Experiences;