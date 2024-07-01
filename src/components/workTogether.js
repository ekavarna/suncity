import React from "react";
import { motion } from "framer-motion";

export default function WorkTogether() {
  // Text to display in the h1
  const text1 = "Let's Work";
  const text2 = "Together";

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
    <div>
      <motion.div
        className="uppercase  font-Armavir text-5xl md:text-7xl"
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
      <div className="grid mx-4 lg:mx-8 py-16 md:py-24  md:gap-0 gap-8 px-4 grid-cols-1 md:grid-cols-2">
        <span className="text-justify font-light self-end">
          Odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt{" "}
          <a href="mailto:info@suncityfilms.com" className="font-medium">
            &nbsp;info@suncityfilms.com
          </a>
        </span>
      </div>
      <div className="border border-b border-black my-4"></div>
    </div>
  );
}
