import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { heroVariants, textRevealVariants, cardVariants } from '../utils/animations';
import profile from '../assets/profile.png';

const Hero = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cards = data?.about?.cards || [];
  const focusItems = data?.focusItems || cards;
  const roleLabel = data?.hero?.roleTop || data?.title || '';
  const name = data?.hero?.headline || data?.name || '';
  const summary = data?.about?.summary || '';
  const resumeLink = data?.resumeLink || '';

  return (
    <section
      className="section hero"
      id="hero"
      style={{
        paddingTop: 'calc(var(--section-padding) + 48px)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container">
        <motion.div
          className="hero-grid"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gap-xl)',
            width: '100%',
          }}
        >
          {/* HEADER */}
          <motion.div
            variants={textRevealVariants}
            style={{ textAlign: 'center', marginBottom: 'var(--gap-xl)' }}
          >
            <div
              style={{
                fontSize: '1rem',
                color: 'var(--dusty-rose)',
                fontWeight: '500',
                marginBottom: 'var(--gap-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {roleLabel}
            </div>

            <h1
              style={{
                fontSize: 'clamp(4rem, 12vw, 8rem)',
                fontWeight: '900',
                lineHeight: '0.8',
                marginBottom: 'var(--gap-md)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.04em',
              }}
            >
              {name}
            </h1>
          </motion.div>

          {/* MAIN RESPONSIVE GRID */}
          <motion.div
            variants={cardVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile 
                ? '1fr' 
                : isTablet 
                  ? '1fr 1fr' 
                  : '1fr 1fr 1fr',
              gap: isMobile ? 'var(--gap-md)' : 'var(--gap-lg)',
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            {/* COLUMN 1 – ABOUT TEXT */}
            <motion.div variants={textRevealVariants} style={{
              gridColumn: isMobile ? '1' : isTablet ? '1 / -1' : '1',
              order: isMobile ? 2 : 1
            }}>
              <div
                className="glass-card"
                style={{
                  padding: isMobile ? '1.25rem' : '1.5rem',
                  borderRadius: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    fontWeight: '400',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {summary}
                </p>
              </div>
            </motion.div>

            {/* COLUMN 2 – IMAGE */}
            <motion.div
              variants={textRevealVariants}
              style={{ 
                display: 'flex', 
                justifyContent: 'center',
                order: isMobile ? 1 : 2,
                gridColumn: isMobile ? '1' : isTablet ? '1 / -1' : '2'
              }}
            >
              <motion.div
                style={{
                  width: isMobile ? '280px' : isTablet ? '350px' : '400px',
                  height: isMobile ? '280px' : isTablet ? '350px' : '400px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={profile}
                  alt="Aastha Mahindra"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* COLUMN 3 – FOCUS */}
            <motion.div
              variants={textRevealVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                order: isMobile ? 3 : 3,
                gridColumn: isMobile ? '1' : isTablet ? '1 / -1' : '3'
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? '1.3rem' : '1.6rem',
                  color: 'var(--dusty-rose)',
                  marginBottom: '0.3rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                FOCUS
              </h2>

              {focusItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card"
                  style={{
                    padding: isMobile ? '0.8rem 1rem' : '1rem 1.2rem',
                    marginBottom: '0.1rem',
                    lineHeight: 1.4,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.03,
                    background:
                      'linear-gradient(135deg, var(--warm-beige) 0%, var(--soft-white) 50%, var(--dusty-rose) 100%)',
                  }}
                >
                  {item.startsWith('‣') ? item : `‣ ${item}`}
                </motion.div>
              ))}

              {/* RESUME BUTTON */}
              <motion.button
                className="glass-card"
                style={{
                  padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                  borderRadius: '16px',
                  backdropFilter: 'blur(20px)',
                  color: '#1f2d3d',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  borderColor: 'var(--dusty-rose)',
                  backgroundImage:
                    'linear-gradient(135deg, var(--dusty-rose) 0%, var(--soft-white) 50%, var(--warm-beige) 100%)',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundImage:
                    'linear-gradient(135deg, var(--warm-beige) 0%, var(--soft-white) 50%, var(--dusty-rose) 100%)',
                  color: '#1f2d3d',
                }}
                onClick={() => window.open(resumeLink, '_blank')}
              >
                VIEW RESUME
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
