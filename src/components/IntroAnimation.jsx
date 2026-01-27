import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const letterVariants = {
    hidden: { y: 50, opacity: 0, rotate: 180 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const name = "Aastha";
  const letters = name.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-animation"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, var(--warm-beige) 0%, var(--soft-white) 50%, var(--dusty-rose) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Animated background circles */}
          <motion.div
            variants={circleVariants}
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--dusty-rose), transparent)',
              top: '10%',
              left: '10%'
            }}
          />
          <motion.div
            variants={circleVariants}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--sage-green), transparent)',
              bottom: '20%',
              right: '15%'
            }}
          />
          <motion.div
            variants={circleVariants}
            style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--soft-grey), transparent)',
              top: '50%',
              right: '30%'
            }}
          />

          {/* Main content */}
          <motion.div
            variants={textVariants}
            style={{
              textAlign: 'center',
              zIndex: 1
            }}
          >
            <div style={{ marginBottom: '2rem' }}>
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{
                    display: 'inline-block',
                    fontSize: '4rem',
                    fontWeight: '700',
                    background: `linear-gradient(135deg, 
                      ${index % 2 === 0 ? 'var(--dusty-rose)' : 'var(--sage-green)'}, 
                      ${index % 2 === 0 ? 'var(--deep-rose)' : 'var(--light-sage)'})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: '0 0.1rem'
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                height: '3px',
                background: 'linear-gradient(90deg, var(--dusty-rose), var(--sage-green))',
                margin: '0 auto 2rem',
                borderRadius: '2px'
              }}
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}
            >
              Software Engineer
            </motion.p>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: Math.random() * 100 - 50,
                x: Math.random() * 100 - 50,
                opacity: 0
              }}
              animate={{
                y: [Math.random() * 100 - 50, Math.random() * 200 - 100],
                x: [Math.random() * 100 - 50, Math.random() * 200 - 100],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: i % 2 === 0 ? 'var(--dusty-rose)' : 'var(--sage-green)',
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
