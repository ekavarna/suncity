import { useMotionValue, motion } from "framer-motion";
import React, { useRef } from "react";
import { IoPlayOutline } from "react-icons/io5";

const AnimatedText = ({ brand, title, smallText }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative  uppercase tracking-wider flex items-center justify-between  py-4 transition-colors duration-500 md:py-8"
    >
      <div className=" mx-auto ">
        <div className=" text-white ">
          <IoPlayOutline className="mx-auto group-hover:animate-pulse text-xl" />
        </div>

        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 }
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25
          }}
          className={`relative z-10 block mt-1 font-semibold   ${smallText?'text-xl':'text-2xl'}`}
        >
          {brand.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 }
              }}
              transition={{ type: "spring" }}
              className="inline-block font-Armavir text-white"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className={`relative z-10 mt-2 block text-sm text-neutral-300 transition-colors  duration-500 group-hover:text-white ${smallText?'text-xs':'text-sm'}`}>
          {title}
        </span>
      </div>
    </motion.div>
  );
};
export default AnimatedText;
