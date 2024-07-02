import React, { useState, useEffect } from "react";

interface DynamicTextProps {
  words: string[];
  interval: number;
  classname: string;
}

const DynamicText = ({ words, interval, classname }: DynamicTextProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true);
      }, 500); // Duration of the fade-out effect
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <span
      className={`${classname} transition-opacity duration-700 ease-in-out transform ${
        fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {words[currentWordIndex]}
    </span>
  );
};

export default DynamicText;
