import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from './utils/animations';
import Navigation from './components/Navigation';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import Services from './components/Services';
import Experience from './components/Experience';
import Works from './components/Works';
import Contact from './components/Contact';
import { getPortfolioData } from './services/portfolioService';

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Disable scroll during intro
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Add custom styles for loading text
    const style = document.createElement('style');
    style.textContent = `
      .loading-text {
        font-size: 1.5rem;
        color: var(--text-secondary);
        text-align: center;
        font-weight: 500;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioData = await getPortfolioData();
        setData(portfolioData);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      {!showIntro && (
        <AnimatePresence>
          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ minHeight: 'auto' }}
          >
            <Navigation />

            <main>
              <Hero data={data} />
              <Experience data={data} />
              <Works data={data} />
              <Services data={data} />
              <Contact data={data} />
            </main>

            <footer
              style={{
                textAlign: 'center',
                padding: '1.25rem 0',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative'
              }}
            >
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                © 2026 Aastha Mahindra. All rights reserved.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Built with React & Framer Motion
              </p>
            </footer>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Loading state */}
      {isLoading && showIntro && (
        <section className="section">
          <div className="container">
            <div className="loading-text">Loading...</div>
          </div>
        </section>
      )}
    </div>
  );
};

export default App;
