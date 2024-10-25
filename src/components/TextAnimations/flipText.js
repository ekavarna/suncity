import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  const text = Array.isArray(children) ? children.join('') : children;

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative uppercase block overflow-hidden whitespace-nowrap "
    >
      <div>
        {text.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block "
          >
            {l === " " ? "\u00A0" : l} {/* Handle spaces */}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {text.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l === " " ? "\u00A0" : l} {/* Handle spaces */}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default FlipLink;
