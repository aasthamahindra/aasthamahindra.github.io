import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, cardVariants, textRevealVariants } from '../utils/animations';
import SectionContainer from './SectionContainer';

const Services = ({ data }) => {
  const tags = {
    api: ['Spring Boot', 'Fastify', 'GraphQL', 'REST', 'SDK Development', 'PostgreSQL', 'MongoDB', 'Redis', 'PostGIS', 'Geo Queries'],
    realtime: ['Webhooks', 'MQTT', 'Socket.IO', 'Async Processing'],
    fullstack: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'API Integration'],
    architecture: ['Microservices', 'Caching', 'Scalable Systems', 'API Design']
  };
  
  const cards = [
    {
      title: 'API, Data & Geospatial Systems',
      description:
        'Developing scalable APIs and data systems across Java and Node.js, with PostgreSQL, MongoDB, Redis, and geospatial processing via PostGIS.',
      stack: tags.api
    },
    {
      title: 'Full-Stack Development',
      description:
        'Building end-to-end applications with React frontends and Java/Node.js backends, focusing on clean integrations, real-time features, and production-ready systems.',
      stack: tags.fullstack
    },
    {
      title: 'Real-Time & Event Systems',
      description:
        'Building real-time data pipelines using webhooks and MQTT, enabling event-driven systems and near real-time data delivery.',
      stack: tags.realtime
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
