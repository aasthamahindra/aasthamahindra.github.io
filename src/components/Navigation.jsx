import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        padding: isMobile ? '0.6rem 0.9rem' : '0.6rem 0.9rem',
        boxShadow: 'none',
        transition: 'all 0.3s ease',
        maxWidth: isMobile ? 'calc(100% - 32px)' : 'fit-content'
      }}
    >
      {/* Desktop Navigation */}
      {!isMobile && (
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
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {activeSection === 'hero' && 'About'}
            {activeSection === 'experience' && 'Experience'}
            {activeSection === 'works' && 'Works'}
            {activeSection === 'services' && 'Services'}
            {activeSection === 'contact' && 'Contact'}
          </div>
          
          <motion.button
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            <motion.div
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0
              }}
              style={{
                width: '20px',
                height: '2px',
                background: 'var(--text-primary)',
                marginBottom: '4px',
                transition: 'all 0.3s ease'
              }}
            />
            <motion.div
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
                x: isMobileMenuOpen ? -20 : 0
              }}
              style={{
                width: '20px',
                height: '2px',
                background: 'var(--text-primary)',
                marginBottom: '4px',
                transition: 'all 0.3s ease'
              }}
            />
            <motion.div
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0
              }}
              style={{
                width: '20px',
                height: '2px',
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease'
              }}
            />
          </motion.button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: activeSection === section.id
                    ? 'rgba(212, 165, 165, 0.12)'
                    : 'transparent',
                  border: activeSection === section.id
                    ? '1px solid rgba(212, 165, 165, 0.55)'
                    : '1px solid transparent',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: activeSection === section.id ? 'var(--dusty-rose)' : 'var(--text-primary)',
                  textAlign: 'left',
                  marginBottom: '0.5rem',
                  transition: 'all 0.25s ease'
                }}
              >
                {section.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
