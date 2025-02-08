"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Users, Clock, Bell, LucideIcon } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Schedule interviews with just a few clicks",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    icon: Users,
    title: "Candidate Management",
    description: "Maintain a comprehensive database of candidates",
    image:
      "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    icon: Clock,
    title: "Interview Tracking",
    description: "Track interview stages and statuses effortlessly",
    image:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    icon: Bell,
    title: "Automated Notifications",
    description: "Send timely reminders to candidates and interviewers",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
];

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  image,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}) => {
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
      className="bg-white p-6 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-primary mr-3" />
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
      </div>
      <p className="text-text mb-4">{description}</p>
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={400}
        height={300}
        className="rounded-md w-full object-cover h-48"
      />
    </motion.div>
  );
};

const Features = () => {
  return (
    <section
      id="features"
      className="py-16 bg-gradient-to-br from-secondary/10 to-accent/10"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-center mb-12 text-primary">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
