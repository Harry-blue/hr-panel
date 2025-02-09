"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            {["Features", "Modules", "Stats", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                  className="text-text hover:text-primary transition duration-300"
                >
                  {item}
                </button>
              </motion.div>
            ))}
            <Link href={{ pathname: "/login" }} className="btn-secondary">
              Login
            </Link>
            <Link href={{ pathname: "/login" }} className="btn-primary">
              Sign Up
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="text-primary" />
              ) : (
                <Menu className="text-primary" />
              )}
            </button>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-2"
          >
            {["Features", "Modules", "Stats", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                className="block w-full text-left py-2 text-text hover:text-primary transition duration-300"
              >
                {item}
              </button>
            ))}
            <Link
              href={{ pathname: "/login" }}
              className="block w-full text-center py-2 btn-secondary"
            >
              Login
            </Link>
            <Link
              href={{ pathname: "/login" }}
              className="block w-full text-center py-2 btn-primary"
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
