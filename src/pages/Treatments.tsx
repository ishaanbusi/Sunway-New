import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Clock, Star } from 'lucide-react';

const Treatments = () => {
  const [activeTab, setActiveTab] = useState('massage');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const treatments = {
    massage: [
      {
        title: "Swedish Relaxation",
        duration: "60 min",
        price: "₹2,800",
        description: "Classic massage technique for ultimate relaxation."
      },
      {
        title: "Deep Tissue",
        duration: "60 min",
        price: "₹3,200",
        description: "Intensive massage targeting deep muscle tension."
      },
      {
        title: "Hot Stone Therapy",
        duration: "90 min",
        price: "₹3,800",
        description: "Heated stones combined with massage techniques."
      }
    ],
    facial: [
      {
        title: "Luxury Gold Facial",
        duration: "75 min",
        price: "₹4,200",
        description: "24k gold-infused treatment for radiant skin."
      },
      {
        title: "Anti-Aging Treatment",
        duration: "90 min",
        price: "₹4,800",
        description: "Advanced facial for youthful, rejuvenated skin."
      },
      {
        title: "Hydrating Ritual",
        duration: "60 min",
        price: "₹3,500",
        description: "Deep hydration for dry and tired skin."
      }
    ],
    body: [
      {
        title: "Body Polish",
        duration: "45 min",
        price: "₹2,500",
        description: "Exfoliating treatment for smooth, glowing skin."
      },
      {
        title: "Detox Wrap",
        duration: "90 min",
        price: "₹4,200",
        description: "Purifying wrap to eliminate toxins."
      },
      {
        title: "Aromatherapy Ritual",
        duration: "120 min",
        price: "₹5,500",
        description: "Full-body treatment with essential oils."
      }
    ]
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1620733723572-11c53f73d8c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Our Treatments</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Discover our range of luxury spa treatments and therapies
          </p>
        </div>
      </section>

      {/* Treatments Section */}
      <section ref={ref} className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          {/* Treatment Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-white dark:bg-neutral-800 p-2 shadow-lg">
              {['massage', 'facial', 'body'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Treatment Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {treatments[activeTab].map((treatment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-serif">{treatment.title}</h3>
                  <Star className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {treatment.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {treatment.duration}
                  </div>
                  <span className="font-semibold text-emerald-600">
                    {treatment.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Treatment */}
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
                Signature Gold Treatment
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Experience our most luxurious treatment combining traditional 
                techniques with modern luxury. This comprehensive package includes 
                a gold-infused facial, full-body massage, and aromatherapy.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>24k gold-infused products</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>180 minutes of pure luxury</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>Complimentary refreshments</span>
                </li>
              </ul>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors">
                Book Treatment
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Signature treatment"
                className="rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Treatments;