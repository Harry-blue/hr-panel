"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: "95%", label: "Time Saved" },
  { value: "10x", label: "Efficiency Increase" },
  { value: "1000+", label: "Happy Users" },
  { value: "24/7", label: "Support" },
];

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-text text-opacity-80">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section
      id="stats"
      className="py-16 bg-gradient-to-br from-accent/10 to-secondary/10"
    >
      <div className="container mx-auto px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
