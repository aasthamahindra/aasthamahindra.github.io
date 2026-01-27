import { motion } from 'framer-motion';

// Custom easing functions for premium feel
export const easings = {
  smooth: [0.6, -0.05, 0.01, 0.99],
  cinematic: [0.25, 0.46, 0.45, 0.94],
  bouncy: [0.68, -0.55, 0.265, 1.55],
  slow: [0.4, 0, 0.2, 1]
};

// Page-level staggered entrance animations
export const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easings.smooth,
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth
    }
  }
};

// Section reveal animations
export const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 80
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easings.smooth,
      staggerChildren: 0.2
    }
  }
};

// Card entrance animations
export const cardVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
    y: 60
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth
    }
  }
};

// Text reveal animations
export const textRevealVariants = {
  hidden: { 
    opacity: 0,
    y: 40,
    rotateX: -15
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: easings.smooth
    }
  }
};

// Hero specific animations
export const heroVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: easings.smooth,
      staggerChildren: 0.3,
      delayChildren: 0.4
    }
  }
};

// Project card hover animations
export const projectCardHover = {
  rest: { 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth
    }
  },
  hover: { 
    scale: 1.03,
    rotateY: 5,
    transition: {
      duration: 0.6,
      ease: easings.smooth
    }
  }
};

// Timeline animations
export const timelineVariants = {
  hidden: { 
    opacity: 0,
    x: -100
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
      staggerChildren: 0.3
    }
  }
};

// Navigation animations
export const navVariants = {
  hidden: { 
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.smooth
    }
  }
};

// Magnetic hover effect for buttons
export const magneticHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
};

// Parallax scroll values
export const parallaxValues = {
  slow: [0, -100],
  medium: [0, -200],
  fast: [0, -300]
};

// Background animation variants
export const backgroundVariants = {
  hidden: { 
    opacity: 0,
    scale: 1.1
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: easings.slow
    }
  }
};
