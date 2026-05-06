import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroVariants, textRevealVariants, cardVariants } from '../utils/animations';
import profile from '../assets/profile.png';

// ─── Q&A Knowledge Base ───────────────────────────────────────────────────────
const QA = [
  {
    keywords: ['stack', 'tech', 'language', 'framework', 'tools'],
    answer: 'Java (Spring Boot), Node.js (Fastify/Express), PostgreSQL, MongoDB, Redis, PostGIS.',
  },
  {
    keywords: ['experience', 'work', 'job', 'company', 'years', 'ambee'],
    answer: 'Software Engineer @ Ambee Datair Technology since Jul 2023 — building climate intelligence APIs.',
  },
  {
    keywords: ['focus', 'speciali', 'backend', 'architecture'],
    answer: 'Scalable backend systems, full-stack builds, and high-performance API + data engineering.',
  },
  {
    keywords: ['hobby', 'hobbies', 'interest', 'fun', 'outside', 'book', 'read'],
    answer: "Book lover at heart. I lose myself in captivating stories and cherish the wisdom within.",
  },
  {
    keywords: ['resume', 'cv', 'download', 'hire'],
    answer: "Hit the button below to open my resume — it's one click away! ↓",
  },
  {
    keywords: ['contact', 'email', 'reach', 'connect', 'linkedin'],
    answer: 'Best way is through the Contact section on this page.',
  },
  {
    keywords: ['mantra', 'motto', 'philosophy', 'life'],
    answer: "'You only live once' — so build things that matter and cherish every moment.",
  },
];

const QUESTIONS_LIMIT = 3;

const BOOT_LINES = [
  { text: '> portfolio v2.0 initialised', dim: true, delay: 0 },
  { text: '> loading aastha.json  ·  done ✓', dim: true, delay: 450 },
  { text: '', delay: 700 },
  { text: '  Ask me anything — 3 questions allowed.', accent: true, delay: 900 },
  { text: '  try: stack  ·  experience  ·  focus  ·  hobbies  ·  resume', dim: true, delay: 1150 },
];

function matchAnswer(input) {
  const q = input.toLowerCase().trim();
  for (const entry of QA) {
    if (entry.keywords.some(k => q.includes(k))) return entry.answer;
  }
  return "Not sure about that! Try: stack, experience, focus, hobbies, or resume.";
}

// ─── Boot line ────────────────────────────────────────────────────────────────
const BootLine = ({ text, dim, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: delay / 1000, duration: 0.2 }}
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      lineHeight: 2,
      color: accent
        ? 'var(--dusty-rose)'
        : dim
        ? 'var(--text-secondary)'
        : 'var(--text-primary)',
      minHeight: text ? undefined : '10px',
    }}
  >
    {text}
  </motion.div>
);

// ─── Chat bubble ──────────────────────────────────────────────────────────────
const ChatLine = ({ role, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18 }}
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      lineHeight: 1.9,
      color: role === 'user' ? 'var(--text-primary)' : 'var(--dusty-rose)',
      wordBreak: 'break-word',
    }}
  >
    {role === 'user' ? '> ' : '  → '}{text}
  </motion.div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ data }) => {
  const [isMobile, setIsMobile]     = useState(false);
  const [isTablet, setIsTablet]     = useState(false);
  const [input, setInput]           = useState('');
  const [chat, setChat]             = useState([]);
  const [questionsLeft, setLeft]    = useState(QUESTIONS_LIMIT);
  const [booted, setBooted]         = useState(false);
  const bottomRef                   = useRef(null);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const last = BOOT_LINES[BOOT_LINES.length - 1].delay;
    const t = setTimeout(() => setBooted(true), last + 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (chat.length > 0 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const handleSubmit = () => {
    const q = input.trim();
    if (!q || questionsLeft === 0) return;
    const answer  = matchAnswer(q);
    const remaining = questionsLeft - 1;
    setChat(prev => [
      ...prev,
      { role: 'user', text: q },
      {
        role: 'bot',
        text: remaining === 0 ? `${answer}  ·  [session closed]` : answer,
      },
    ]);
    setLeft(remaining);
    setInput('');
  };

  const focusItems  = data?.focusItems || data?.about?.cards || [];
  const roleLabel   = data?.hero?.roleTop || data?.title || '';
  const name        = data?.hero?.headline || data?.name || '';
  const summary     = data?.about?.summary || '';
  const resumeLink  = data?.resumeLink || '';

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
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div className="container">
        <motion.div variants={heroVariants} initial="hidden" animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xl)', width: '100%' }}
        >
          {/* ── HEADER ── */}
          <motion.div variants={textRevealVariants} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1rem', color: 'var(--dusty-rose)', fontWeight: '500', marginBottom: 'var(--gap-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {roleLabel}
            </div>
            <h1 style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', fontWeight: '900', lineHeight: '0.9', marginBottom: 'var(--gap-md)', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
              {name}
            </h1>
          </motion.div>

          {/* ── GRID ── */}
          <motion.div
            variants={cardVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
              gap: isMobile ? 'var(--gap-md)' : 'var(--gap-lg)',
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            {/* COL 1 – BIO */}
            <motion.div variants={textRevealVariants}
              style={{ gridColumn: isMobile ? '1' : isTablet ? '1 / -1' : '1', order: isMobile ? 2 : 1 }}
            >
              <div className="glass-card" style={{ padding: isMobile ? '1.25rem' : '1.5rem', borderRadius: '16px' }}>
                <p style={{ fontSize: isMobile ? '0.95rem' : '1rem', fontWeight: '400', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {summary}
                </p>
              </div>
            </motion.div>

            {/* COL 2 – IMAGE */}
            <motion.div variants={textRevealVariants}
              style={{ display: 'flex', justifyContent: 'center', order: isMobile ? 1 : 2, gridColumn: isMobile ? '1' : isTablet ? '1 / -1' : '2' }}
            >
              <motion.div
                style={{ width: isMobile ? '260px' : isTablet ? '300px' : '340px', height: isMobile ? '260px' : isTablet ? '300px' : '340px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                whileHover={{ scale: 1.03 }}
              >
                <img src={profile} alt="Aastha Mahindra" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            </motion.div>

            {/* COL 3 – INTERACTIVE TERMINAL */}
            <motion.div variants={textRevealVariants}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px', order: 3, gridColumn: isMobile ? '1' : isTablet ? '1 / -1' : '3' }}
            >
              {/* ── Terminal card (cream-tinted, matches site palette) ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(196, 168, 130, 0.4)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41' }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--text-secondary)', marginLeft: 'auto', letterSpacing: '0.06em' }}>
                    aastha.sh
                  </span>
                </div>

                {/* Scrollable content */}
                <div style={{ overflowY: 'auto', maxHeight: '200px', display: 'flex', flexDirection: 'column', gap: '1px', scrollbarWidth: 'none' }}>
                  {BOOT_LINES.map((l, i) => (
                    <BootLine key={i} text={l.text} dim={l.dim} accent={l.accent} delay={l.delay} />
                  ))}
                  <AnimatePresence>
                    {chat.map((c, i) => <ChatLine key={i} role={c.role} text={c.text} />)}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid rgba(196,168,130,0.25)', margin: '12px 0 10px' }} />

                {/* Counter pill */}
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  color: questionsLeft > 0 ? 'var(--dusty-rose)' : 'var(--text-secondary)',
                  background: 'rgba(196, 149, 106, 0.1)',
                  borderRadius: '20px',
                  padding: '3px 12px',
                  display: 'inline-block',
                  marginBottom: '10px',
                  letterSpacing: '0.04em',
                  alignSelf: 'flex-start',
                }}>
                  {questionsLeft > 0
                    ? `${questionsLeft} question${questionsLeft === 1 ? '' : 's'} remaining`
                    : 'session closed — explore the sections above!'}
                </div>

                {/* Input row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: questionsLeft === 0 ? 0.35 : 1,
                  pointerEvents: questionsLeft === 0 ? 'none' : 'auto',
                  transition: 'opacity 0.3s',
                }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'var(--dusty-rose)', flexShrink: 0 }}>{'>'}</span>
                  <input
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '11px',
                      color: 'var(--text-primary)',
                      caretColor: 'var(--dusty-rose)',
                    }}
                    value={input}
                    placeholder={booted ? 'type a question...' : ''}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    disabled={questionsLeft === 0}
                    aria-label="Ask a question about Aastha"
                  />
                  <button
                    onClick={handleSubmit}
                    aria-label="Send"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--dusty-rose)', padding: '0 2px' }}
                  >
                    ↵
                  </button>
                </div>
              </motion.div>

              {/* ── Resume button ── */}
              <motion.button
                style={{
                  padding: isMobile ? '0.85rem 1.5rem' : '1rem 2rem',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(196, 168, 130, 0.5)',
                  color: 'var(--text-primary)',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  fontWeight: '700',
                  fontFamily: "'Space Mono', monospace",
                  cursor: 'pointer',
                  textAlign: 'center',
                  letterSpacing: '0.05em',
                }}
                whileHover={{ scale: 1.02, background: 'rgba(196,168,130,0.18)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open(resumeLink, '_blank')}
              >
                $ ./view_resume.sh ↗
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
