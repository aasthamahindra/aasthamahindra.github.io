import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, cardVariants, textRevealVariants } from '../utils/animations';
import SectionContainer from './SectionContainer';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  return (
    <SectionContainer id="contact" variants={sectionVariants}>
      <motion.div
        className="contact-content"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={textRevealVariants}>
          <h2 className="section-title">Contact</h2>
        </motion.div>
        
        <motion.div
          className="contact-grid"
          variants={cardVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--gap-lg)',
            marginTop: 'var(--gap-lg)'
          }}
        >
          <motion.div
            className="contact-info glass-card"
            variants={cardVariants}
            style={{ padding: 'var(--card-padding)' }}
          >
            <h3 
              style={{ 
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: 'var(--gap-md)',
                color: 'var(--dusty-rose)'
              }}
            >
              {data?.contact?.headline || "Let's connect."}
            </h3>
            <p 
              className="text-secondary" 
              style={{ 
                lineHeight: 1.6,
                fontSize: '1.1rem'
              }}
            >
              {data?.contact?.blurb || ''}
            </p>

            <p className="text-secondary" style={{ lineHeight: 1.6, marginBottom: 'var(--gap-md)' }}>
              If you're hiring for backend roles or want to collaborate, send a note — I reply quickly.
            </p>
            
            <div style={{ display: 'grid', gap: 'var(--gap-md)' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Email:</strong>
                <div>
                  <a 
                    href={`mailto:${data?.email || ''}`}
                    style={{
                      color: 'var(--dusty-rose)',
                      textDecoration: 'none',
                      fontSize: '1.1rem'
                    }}
                  >
                    {data?.email || ''}
                  </a>
                </div>
              </div>
              
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Location:</strong>
                <div>
                  <a 
                    href={data?.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--sage-green)',
                      textDecoration: 'none',
                      fontSize: '1.1rem'
                    }}
                  >
                    {data?.location || ''}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default Contact;
