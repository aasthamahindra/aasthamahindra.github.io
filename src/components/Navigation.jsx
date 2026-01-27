import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'works', label: 'Works' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sectionElements.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.nav
      className={`floating-nav ${isScrolled ? 'scrolled' : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        margin: '0 auto',
        zIndex: 1000,
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: isScrolled ? 'blur(25px)' : 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '100px',
        padding: '0.6rem 0.9rem',
        boxShadow: 'none', //  no shadow
        transition: 'all 0.3s ease',
        maxWidth: 'fit-content'
      }}
    >
      <div
        className="desktop-nav"
        style={{
          display: 'flex',
          gap: '0.25rem',
          alignItems: 'center'
        }}
      >
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.45rem 0.9rem',
              background: activeSection === section.id
                ? 'rgba(212, 165, 165, 0.12)'
                : 'transparent',
              border: activeSection === section.id
                ? '1px solid rgba(212, 165, 165, 0.55)'
                : '1px solid transparent',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '600',

              //  gradient text on active
              backgroundImage: activeSection === section.id
                ? 'linear-gradient(135deg, var(--dusty-rose), var(--sage-green))'
                : 'none',
              WebkitBackgroundClip: activeSection === section.id ? 'text' : 'initial',
              WebkitTextFillColor: activeSection === section.id ? 'transparent' : 'var(--text-secondary)',
              backgroundClip: activeSection === section.id ? 'text' : 'initial',

              transition: 'all 0.25s ease',
              minWidth: '86px',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {section.label}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
