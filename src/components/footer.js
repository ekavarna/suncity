import React from "react";
import { motion } from "framer-motion";


export default function Footer() {
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
    <div className="w-full bg-white text-black">
      <div className="grid mx-4 lg:mx-8 py-16 md:py-24  md:gap-0 gap-8 px-4 grid-cols-1 md:grid-cols-2">
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
        <span className="text-justify font-light self-end">
          Odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt <a href="mailto:info@suncityfilms.com" className="font-medium">&nbsp;info@suncityfilms.com</a>
        </span>
      </div>
      <div className="border border-b border-black my-4"></div>
      <div className="grid grid-cols-1 mx-4  lg:mx-8 py-16 px-4 md:grid-cols-4">
        <div className="">
          <h1 className="font-medium text-xl">Write to us</h1>
          <div className="grid grid-cols-1 mt-4 text-lg space-y-1">
            <a href="mailto:info@suncityfilms.com" className="">
              info@suncityfilms.com
            </a>
            <a href="tel:+98765432190" className="">
              +98765432190
            </a>
          </div>
        </div>
        <div className="">
          <h1 className="font-medium text-xl">Meet us</h1>
          <div className="grid grid-cols-1 mt-4 text-lg space-y-1">
            <p className="">ABC Prime Avenpe <br /> 2298767 </p>
         
          </div>
        </div>
      </div>
      <div className="flex justify-between font-light px-4 pb-8 text-sm mx-4 md:mx-8 items-center">
        <h1 className="">2024. Copyright. All rights reserved.</h1>
        <h1 className="">Sun City Films</h1>
      </div>
    </div>
  );
}
