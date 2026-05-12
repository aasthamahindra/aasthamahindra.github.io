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
      duration: 0.3,
      ease: easings.smooth,
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth
    }
  }
};

// Section reveal animations
export const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: easings.smooth,
      staggerChildren: 0.05
    }
  }
};

// Card entrance animations
export const cardVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.98,
    y: 15
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth
    }
  }
};

// Text reveal animations
export const textRevealVariants = {
  hidden: { 
    opacity: 0,
    y: 10,
    rotateX: -4
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.15,
      ease: easings.smooth
    }
  }
};

// Hero specific animations
export const heroVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.99
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.15,
      ease: easings.smooth,
      staggerChildren: 0.025,
      delayChildren: 0.025
    }
  }
};

// Project card hover animations
export const projectCardHover = {
  rest: { 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.15,
      ease: easings.smooth
    }
  },
  hover: { 
    scale: 1.01,
    rotateY: 1,
    transition: {
      duration: 0.15,
      ease: easings.smooth
    }
  }
};

// Timeline animations
export const timelineVariants = {
  hidden: { 
    opacity: 0,
    x: -25
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
      staggerChildren: 0.075
    }
  }
};

// Navigation animations
export const navVariants = {
  hidden: { 
    y: -25,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
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
    scale: 1.02
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.slow
    }
  }
};
