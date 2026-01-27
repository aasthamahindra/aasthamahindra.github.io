import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, cardVariants, textRevealVariants } from '../utils/animations';
import SectionContainer from './SectionContainer';

const Services = ({ data }) => {
  const tags = {
    api: [
      ...(data?.skills?.backend || []).map((s) => s?.name).filter(Boolean),
      'NodeJS',
      'Redis',
      'MongoDB',
      'PostgreSQL'
    ].slice(0, 5),
    data: [
      ...(data?.skills?.databases || []).map((s) => s?.name).filter(Boolean),
      ...(data?.skills?.toolsCloud || []).map((s) => s?.name).filter(Boolean)
    ].slice(0, 5),
    perf: [
      'Profiling',
      'Query optimization',
      'Caching',
      'Monitoring'
    ],
    backend: [
      'Design reviews',
      'API contracts',
      'Reliability',
      'DX'
    ]
  };

  const cards = [
    {
      title: 'API Development',
      description: 'Clean REST interfaces, validation, versioning, and reliability-minded delivery.',
      stack: tags.api
    },
    {
      title: 'Performance Optimization',
      description: 'Reduce latency with profiling, query tuning, caching strategy, and observability.',
      stack: tags.perf
    },
    {
      title: 'Backend Systems',
      description: 'Maintainable services with clear ownership, guardrails, and production discipline.',
      stack: tags.backend
    }
  ];

  return (
    <SectionContainer id="services" variants={sectionVariants}>
      <motion.div
        className="services-content"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={textRevealVariants}>
          <h2 className="section-title">Services</h2>
        </motion.div>
        
        <motion.div
          className="services-grid"
          variants={cardVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--gap-md)',
            marginTop: 'var(--gap-lg)'
          }}
        >
          {cards.map((service) => (
            <motion.div
              key={service.title}
              className="service-card glass-card"
              variants={cardVariants}
              whileHover={{ 
                y: -4,
                boxShadow: 'var(--hover-shadow)'
              }}
              transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
              style={{
                padding: 'var(--card-padding)',
                borderRadius: '18px'
              }}
            >
              <h3 
                style={{ 
                  color: 'var(--text-primary)', 
                  marginBottom: '0.4rem',
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  lineHeight: 1.2
                }}
              >
                {service.title}
              </h3>
              
              <p 
                className="text-secondary" 
                style={{ 
                  lineHeight: 1.6,
                  fontSize: '1rem',
                  marginBottom: 'var(--gap-sm)'
                }}
              >
                {service.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {(service.stack || []).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default Services;
