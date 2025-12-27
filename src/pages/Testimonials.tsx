import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, BadgeCheck } from "lucide-react";

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      text: "Recently visited this spa on recommendation from someone and it was totally worth it. Staff was really polite and professional and quick in response. I went for deep tissue massage and the therapist was really an expert in it. It relieved all my stress and body ache and I totally enjoyed it. Visited again after a while and got the same excellent service. Their therapists are really expert and staff is also super friendly.",
      author: "Vibhu Shadwal",
      rating: 5,
    },
    {
      text: "Visited Sunway Wellness for the first time and my experience was too good. Took the signature and potli massage — totally worth the money. Highly recommended.",
      author: "Kiran",
      rating: 5,
    },
    {
      text: "They have a great service. The masseuse was good and the ambience was also great. I would definitely recommend.",
      author: "Madhulika Dolke",
      rating: 5,
    },
    {
      text: "We had a great experience. Wonderful ambience, neat and clean premises, and very humble staff. Must experience their services once.",
      author: "Rajesh Chandak",
      rating: 5,
    },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gold-light max-w-2xl mx-auto">
            Real experiences shared by guests who trusted us with their wellness
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-black-light border border-gold/20 rounded-2xl p-8 hover:border-gold/40 transition-all"
            >
              {/* Decorative Quote */}
              <Quote className="absolute top-6 right-6 h-16 w-16 text-gold/10" />

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gold-light leading-relaxed mb-8">
                “{testimonial.text}”
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-gold/20 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gold">
                    {testimonial.author}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gold-light mt-1">
                    <BadgeCheck className="h-4 w-4 text-gold" />
                    Verified Google Review
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
