import { useScroll, useTransform, motion } from 'framer-motion';

// Custom hook for scroll-based animations
export const useScrollAnimation = () => {
  const { scrollYProgress } = useScroll();
  
  return {
    scrollYProgress,
    // Transform values for different effects
    fadeIn: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
    slideUp: useTransform(scrollYProgress, [0, 0.3], [100, 0]),
    scaleIn: useTransform(scrollYProgress, [0, 0.3], [0.8, 1]),
    parallaxY: useTransform(scrollYProgress, [0, 1], [0, -50]),
    parallaxX: useTransform(scrollYProgress, [0, 1], [0, 30])
  };
};

// Hook for horizontal scroll animations
export const useHorizontalScroll = () => {
  const { scrollYProgress } = useScroll();
  
  return {
    scrollProgress: scrollYProgress,
    horizontalTransform: useTransform(scrollYProgress, [0, 1], [0, -100])
  };
};

// Hook for staggered animations
export const useStaggeredAnimation = (delay = 0.1) => {
  const { scrollYProgress } = useScroll();
  
  return {
    scrollYProgress,
    staggeredOpacity: useTransform(
      scrollYProgress,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, 0.2, 0.4, 0.6, 0.8, 1]
    )
  };
};
