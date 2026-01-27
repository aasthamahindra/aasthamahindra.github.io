import React from 'react';
import { motion } from 'framer-motion';

const SectionContainer = ({ 
  children, 
  id, 
  className = '', 
  variants, 
  initial = 'hidden', 
  whileInView = 'visible',
  viewport = { once: true, amount: 0.3 }
}) => {
  return (
    <section 
      id={id} 
      className={`section ${className}`}
    >
      <motion.div
        variants={variants}
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        className="container"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionContainer;
