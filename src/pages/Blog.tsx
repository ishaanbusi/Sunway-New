import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blogPosts = [
    {
      title: "The Benefits of Regular Massage Therapy",
      excerpt:
        "Discover how regular massage sessions can improve your physical and mental well-being...",
      image:
        "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg",
      date: "March 15, 2024",
      author: "Dr. Sarah Johnson",
      category: "Wellness",
    },
    {
      title: "Understanding Different Types of Massage",
      excerpt:
        "A comprehensive guide to various massage techniques and their unique benefits...",
      image:
        "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
      date: "March 12, 2024",
      author: "Maria Chen",
      category: "Education",
    },
    {
      title: "Essential Oils in Aromatherapy",
      excerpt:
        "Learn about the healing properties of different essential oils used in aromatherapy...",
      image:
        "https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg",
      date: "March 10, 2024",
      author: "Emma Williams",
      category: "Aromatherapy",
    },
    {
      title: "The Art of Thai Massage",
      excerpt:
        "Explore the ancient healing practice of Thai massage and its modern applications...",
      image:
        "https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg",
      date: "March 8, 2024",
      author: "John Smith",
      category: "Traditional Practices",
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
              "url(https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Wellness Blog
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Insights and articles about wellness, massage, and holistic healing
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={ref} className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-black-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gold/20"
              >
                <div className="relative h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gold-light mb-3">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-serif text-gold mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gold-light mb-4">{post.excerpt}</p>
                  <button className="inline-flex items-center text-gold hover:text-gold-light transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
