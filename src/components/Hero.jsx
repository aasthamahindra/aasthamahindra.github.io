import React from 'react';
import { motion } from 'framer-motion';
import { heroVariants, textRevealVariants, magneticHover, cardVariants } from '../utils/animations';
import profile from '../assets/profile.png';

const Hero = ({ data }) => {
  const cards = data?.about?.cards || [];
  const roleLabel = data?.hero?.roleTop || data?.title || '';
  const name = data?.hero?.headline || data?.name || '';
  const valueProp = data?.hero?.intro || '';
  const summary = data?.about?.summary || '';

  return (
    <>
    <section className="section hero" id="hero" style={{
      paddingTop: 'calc(var(--section-padding) + 48px)',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center'
    }}>
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
            width: '100%'
          }}
        >
          {/* Top Row - Name spanning full width, aligned with navbar */}
          <motion.div variants={textRevealVariants} style={{ textAlign: 'center', marginBottom: 'var(--gap-xl)' }}>
            <div className="hero-kicker" style={{
              fontSize: '1rem',
              color: 'var(--dusty-rose)',
              fontWeight: '500',
              marginBottom: 'var(--gap-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {roleLabel}
            </div>
            <h1 className="hero-name" style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              fontWeight: '900',
              lineHeight: '0.8',
              marginBottom: 'var(--gap-md)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.04em'
            }}>
              {name}
            </h1>
          </motion.div>

          {/* Bottom Row - Three Column Grid with equal height */}
          <motion.div
            variants={cardVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 0.8fr 1.2fr',
              gap: 'var(--gap-lg)',
              alignItems: 'stretch',
              width: '100%'
            }}
          >
            {/* First Column - Focus and Interests */}
            <motion.div variants={textRevealVariants} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
              {cards.map((card) => (
                <motion.div
                  key={card.label}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    flex: 1
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ fontSize: '0.85rem', color: 'var(--dusty-rose)', marginBottom: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {card.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Middle Column - Small Image */}
            <motion.div variants={textRevealVariants} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <motion.div
                className="hero-avatar-small"
                style={{
                  width: '400px',
                  height: '400px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                  position: 'relative',
                  alignSelf: 'center'
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={profile}
                  alt="Aastha Mahindra"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Last Column - About Paragraph */}
            <motion.div variants={textRevealVariants} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="glass-card" style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  whiteSpace: 'pre-line'
                }}>
                  {summary}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Hero;
