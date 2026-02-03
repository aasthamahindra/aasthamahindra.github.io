import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionVariants, cardVariants, textRevealVariants, easings } from '../utils/animations';
import SectionContainer from './SectionContainer';

const Experience = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const getCompanyColor = (company) => {
    const colors = {
      'Ambee': 'var(--dusty-rose)',
      'Engineers India Ltd.': 'var(--sage-green)',
      'Indian Space Research Organisation (ISRO)': 'var(--soft-grey)'
    };
    return colors[company] || 'var(--deep-rose)';
  };

  return (
    <SectionContainer id="experience" variants={sectionVariants}>
      <motion.div
        className="experience-content"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={textRevealVariants}>
          <h2 className="section-title">Experience</h2>
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          style={{ marginTop: 'var(--gap-lg)' }}
        >
          {(data?.experience || []).map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              variants={cardVariants}
              style={{
                display: 'flex',
                marginBottom: index === (data?.experience || []).length - 1 ? '0' : 'var(--gap-md)',
                position: 'relative',
                alignItems: 'flex-start',
                flexDirection: 'row'
              }}
            >
              <motion.div
                className="timeline-line"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
                style={{
                  position: 'absolute',
                  left: isMobile ? '20px' : '25px',
                  top: index === 0 ? '30px' : '0',
                  bottom: index === (data?.experience || []).length - 1 ? '30px' : `calc(-1 * var(--gap-md))`,
                  width: '2px',
                  background: 'linear-gradient(180deg, var(--dusty-rose), var(--sage-green))',
                  transformOrigin: 'top'
                }}
              />
              
              <motion.div
                className="timeline-dot"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: index * 0.15 + 0.3,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }
                }}
                style={{
                  width: isMobile ? '40px' : '50px',
                  height: isMobile ? '40px' : '50px',
                  borderRadius: '50%',
                  background: getCompanyColor(exp.company),
                  border: '3px solid white',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                  position: 'relative',
                  zIndex: 2,
                  marginRight: isMobile ? '1rem' : 'var(--gap-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  flexShrink: 0
                }}
              >
                {(exp.company || 'C').charAt(0)}
              </motion.div>
              
              <motion.div
                className="timeline-content glass-card"
                variants={cardVariants}
                whileHover={{ 
                  x: isMobile ? 0 : 15,
                  scale: 1.01,
                  boxShadow: 'var(--hover-shadow)'
                }}
                transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                style={{
                  flex: 1,
                  padding: isMobile ? '1.25rem' : 'var(--card-padding)',
                  position: 'relative',
                  minWidth: 0
                }}
              >
                {!isMobile && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '-12px',
                      top: '25px',
                      width: '0',
                      height: '0',
                      borderTop: '12px solid transparent',
                      borderBottom: '12px solid transparent',
                      borderRight: `12px solid ${getCompanyColor(exp.company)}30`
                    }}
                  />
                )}
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: isMobile ? 'flex-start' : 'flex-start', 
                  marginBottom: 'var(--gap-sm)',
                  flexDirection: isMobile ? 'column' : 'row'
                }}>
                  <div style={{ marginBottom: isMobile ? 'var(--gap-sm)' : '0' }}>
                    <h3 
                      style={{ 
                        fontSize: isMobile ? '1.2rem' : '1.3rem',
                        fontWeight: '600',
                        color: getCompanyColor(exp.company),
                        marginBottom: '0.5rem',
                        lineHeight: 1.2
                      }}
                    >
                      {exp.role}
                    </h3>
                    <h4 
                      style={{ 
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        fontWeight: '500',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {exp.company}
                    </h4>
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2 + 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      background: `${getCompanyColor(exp.company)}15`,
                      borderRadius: '20px',
                      fontSize: isMobile ? '0.85rem' : '0.9rem',
                      color: getCompanyColor(exp.company),
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${getCompanyColor(exp.company)}30`,
                      alignSelf: isMobile ? 'flex-start' : 'center'
                    }}
                  >
                    {exp.period}
                  </motion.div>
                </div>

                <ul style={{ 
                  marginTop: 'var(--gap-sm)', 
                  paddingLeft: '1.1rem', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.6 
                }}>
                  <AnimatePresence>
                    {(expandedIndex === index ? exp.bullets : exp.bullets.slice(0, 2)).map((bullet, bulletIndex) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.3,
                          delay: bulletIndex * 0.05,
                          ease: easings.smooth
                        }}
                        style={{ marginBottom: '0.4rem' }}
                      >
                        {bullet}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                
                {/* Show more/less button */}
                {exp.bullets.length > 2 && (
                  <motion.button
                    onClick={() => toggleExpanded(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      marginTop: 'var(--gap-sm)',
                      padding: '0.4rem 1rem',
                      background: `${getCompanyColor(exp.company)}15`,
                      border: `1px solid ${getCompanyColor(exp.company)}30`,
                      borderRadius: '20px',
                      fontSize: isMobile ? '0.8rem' : '0.85rem',
                      color: getCompanyColor(exp.company),
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {expandedIndex === index ? 'Show less' : `Show more (${exp.bullets.length - 2})`}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default Experience;
