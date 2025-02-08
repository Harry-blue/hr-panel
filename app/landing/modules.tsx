"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, UserCheck, User } from "lucide-react";
import Image from "next/image";

const modules = [
  {
    icon: Shield,
    title: "Admin",
    features: [
      "Dashboard",
      "Candidate Management",
      "Interview Scheduling",
      "Reports",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    icon: UserCheck,
    title: "Interviewer",
    features: [
      "View Schedules",
      "Access Candidate Profiles",
      "Provide Feedback",
      "Receive Notifications",
    ],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    icon: User,
    title: "Candidate",
    features: [
      "Registration",
      "View Interview Schedule",
      "Receive Notifications",
      "Update Profile",
    ],
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
];

interface ModuleCardProps {
  icon: React.ElementType;
  title: string;
  features: string[];
  image: string;
}

const ModuleCard = ({
  icon: Icon,
  title,
  features,
  image,
}: ModuleCardProps) => {
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
      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
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

const Modules = () => {
  return (
    <section
      id="modules"
      className="py-16 bg-gradient-to-br from-primary/10 to-accent/10"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-center mb-12 text-primary">System Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
