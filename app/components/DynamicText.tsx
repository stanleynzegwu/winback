// components/DynamicText.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicTextProps {
  words: string[];
  className?: string;
}

const DynamicText: React.FC<DynamicTextProps> = ({ words, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <AnimatePresence>
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "linear" }}
        className={`${className}`}
        style={{ display: "inline-block" }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
};

export default DynamicText;
