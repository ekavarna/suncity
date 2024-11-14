import { motion } from "framer-motion";
import React from "react";

export default function Who() {
  // Text to display in the h1
  const text1 = "We are";
  const text2 = "Sun City";

  // Define the container variants with staggerChildren for individual letters
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05 // Delay each letter by 0.05s
      }
    }
  };

  // Define the variants for each letter
  const letterVariants = {
    hidden: {
      y: 50, // Start position
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="grid mx-4 px-8 lg:px-16 lg:mx-8 text-theme-yellow py-12 md:py-24 rounded-3xl mb-4 lg:mb-8 md:gap-0 gap-4 lg:gap-8 bg-theme-pink grid-cols-1 md:grid-cols-2">
      <motion.div
        className="uppercase font-Armavir text-5xl md:text-7xl"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        {text1.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}{" "}
        <br />
        {text2.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
      <motion.p
        initial={{
          opacity: 0.5,
          x: 50
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
        transition={{
          duration: 1
        }}
        className="text-left  md:text-justify font-medium   my-auto"
      >
        At Sun City Studios, we thrive on bringing unforgettable tales to life
        and partnering with creative minds who have a knack for a well-timed
        punchline. If you’re enthusiastic about crafting comedy that genuinely
        tickles the funny bone and connects with audiences, we’ve got you
        covered from sunrise to sunset. After all, we are here to collaborate
        with the best creatives, agencies and brands to produce some epic
        advertising.
      </motion.p>
    </div>
  );
}
