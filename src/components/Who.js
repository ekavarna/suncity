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
    <div className="grid px-8 lg:px-12 text-theme-yellow py-16 md:py-24 md:gap-0 gap-8 bg-theme-pink grid-cols-1 md:grid-cols-2">
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
          x:50
        }}
        animate={{
          opacity: 1,
          x:0
        }}
        transition={{
          duration: 1
        }}
        className="text-justify font-light   my-auto"
      >
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt.
      </motion.p>
    </div>
  );
}
