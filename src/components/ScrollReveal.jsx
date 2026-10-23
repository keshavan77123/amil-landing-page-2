import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 25,
  className = '',
  viewportMargin = "-50px",
  once = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // smooth cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
