import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroVariants, textRevealVariants, cardVariants } from '../utils/animations';
import profile from '../assets/profile.png';

/* Questions */
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

const STATS = [
  { value: '2+', label: 'yrs exp' },
  { value: '10+', label: 'projects' },
  { value: '3', label: 'stacks' },
];

function matchAnswer(input) {
  const q = input.toLowerCase().trim();
  for (const entry of QA) {
    if (entry.keywords.some(k => q.includes(k))) return entry.answer;
  }
  return "Not sure about that! Try: stack, experience, focus, hobbies, or resume.";
}

// ─── Boot line ───
const BootLine = ({ text, dim, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: delay / 1000, duration: 0.2 }}
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      lineHeight: 2,
      color: accent ? 'var(--dusty-rose)' : dim ? 'var(--text-secondary)' : 'var(--text-primary)',
      fontWeight: accent ? '700' : '400',
      minHeight: text ? undefined : '10px',
    }}
  >
    {text}{accent && <BlinkCursor />}
  </motion.div>
);

// ─── Blinking cursor ───
const BlinkCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
    style={{
      display: 'inline-block',
      marginLeft: '3px',
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      color: 'var(--dusty-rose)',
    }}
  >
    ▋
  </motion.span>
);

// ─── Chat bubble ───
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

// ─── Scroll affordance ───
const ScrollHint = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          paddingTop: '2rem',
          paddingBottom: '1rem',
        }}
      >
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
        }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--dusty-rose)', fontSize: '14px', lineHeight: 1 }}
        >
          ↓
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Hero ───
const Hero = ({ data }) => {
  const [input, setInput]           = useState('');
  const [chat, setChat]             = useState([]);
  const [questionsLeft, setLeft]    = useState(QUESTIONS_LIMIT);
  const [booted, setBooted]         = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  const chatScrollRef = useRef(null);
  const bottomRef     = useRef(null);

  useEffect(() => {
    const last = BOOT_LINES[BOOT_LINES.length - 1].delay;
    const t = setTimeout(() => setBooted(true), last + 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setShowScroll(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (chat.length > 0 && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = () => {
    const q = input.trim();
    if (!q || questionsLeft === 0) return;
    const answer    = matchAnswer(q);
    const remaining = questionsLeft - 1;
    setChat(prev => [
      ...prev,
      { role: 'user', text: q },
      { role: 'bot', text: remaining === 0 ? `${answer}  ·  [session closed]` : answer },
    ]);
    setLeft(remaining);
    setInput('');
  };

  const roleLabel  = data?.hero?.roleTop  || data?.title       || '';
  const name       = data?.hero?.headline || data?.name        || '';
  const nameParts  = name.trim().split(' ');
  const firstName  = nameParts[0] || '';
  const lastName   = nameParts.slice(1).join(' ') || '';
  const summary    = data?.about?.summary || '';
  const resumeLink = data?.resumeLink     || '';

  return (
    <section
      className="section hero"
      id="hero"
      style={{
        paddingTop: 'calc(var(--section-padding) + 64px)',
        paddingBottom: 'var(--section-padding)',
      }}
    >
      <div className="container">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            width: '100%',
          }}
        >

          {/* ── HEADER: role label + name ── */}
          <motion.div
            variants={textRevealVariants}
            style={{ textAlign: 'center' }}
          >
            {/* Role + positioning tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.72rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              fontFamily: "'Space Mono', monospace",
            }}>
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                }}
              />
              <span style={{ color: 'var(--dusty-rose)' }}>
                {roleLabel}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
              fontWeight: '900',
              lineHeight: '1',
              letterSpacing: '-0.04em',
              margin: 0,
              paddingBottom: '0.1em',
            }}>
              <span style={{
                  color: 'var(--text-primary)',
                  WebkitTextFillColor: 'var(--text-primary)',
              }}>
                {firstName}
              </span>
              {lastName && (
                <>
                  {' '}
                  <span style={{
                    color: 'var(--text-primary)',
                    WebkitTextFillColor: 'var(--text-primary)',
                  }}>
                    {lastName}
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--gap-lg)',
              alignItems: 'start',
              width: '100%',
            }}
          >

            <motion.div variants={textRevealVariants} style={{ height: '100%' }}>
              <div
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  height: '100%',
                  background: 'rgba(255,255,255,0.72)',
                  boxShadow: '0 2px 24px rgba(196,149,106,0.08)',
                  boxSizing: 'border-box',
                }}
              >
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: '400',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}>
                  {summary}
                </p>
              </div>
            </motion.div>

            {/* COL 2 – IMAGE */}
            <motion.div
              variants={textRevealVariants}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={{
                  width: '100%',
                  maxWidth: '340px',
                  aspectRatio: '1 / 1',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 0 0 4px var(--dusty-rose, rgba(196,149,106,0.8)), 0 8px 40px rgba(196,149,106,0.18)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={profile}
                  alt="Aastha Mahindra"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    display: 'block',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* COL 3 – TERMINAL + STATS */}
            <motion.div
              variants={textRevealVariants}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {/* Terminal card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(196,168,130,0.4)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41' }} />
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    color: 'var(--text-secondary)',
                    marginLeft: 'auto',
                    letterSpacing: '0.06em',
                  }}>
                    aastha.sh
                  </span>
                </div>

                {/* Chat scroll container */}
                <div
                  ref={chatScrollRef}
                  style={{
                    overflowY: 'auto',
                    maxHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                    scrollbarWidth: 'none',
                  }}
                >
                  {BOOT_LINES.map((l, i) => (
                    <BootLine key={i} text={l.text} dim={l.dim} accent={l.accent} delay={l.delay} />
                  ))}
                  <AnimatePresence>
                    {chat.map((c, i) => <ChatLine key={i} role={c.role} text={c.text} />)}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>

                <div style={{ borderTop: '1px solid rgba(196,168,130,0.25)', margin: '12px 0 10px' }} />

                {/* Counter pill */}
                <div
                  aria-live="polite"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    color: questionsLeft > 0 ? 'var(--dusty-rose)' : 'var(--text-secondary)',
                    background: 'rgba(196,149,106,0.1)',
                    borderRadius: '20px',
                    padding: '3px 12px',
                    display: 'inline-block',
                    marginBottom: '10px',
                    letterSpacing: '0.04em',
                    alignSelf: 'flex-start',
                  }}
                >
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
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    color: 'var(--dusty-rose)',
                    flexShrink: 0,
                  }}>{'>'}</span>
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
                    title="Send (Enter)"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px',
                      color: 'var(--dusty-rose)',
                      padding: '0 2px',
                    }}
                  >
                    ↵
                  </button>
                </div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                }}
              >
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    style={{
                      background: 'rgba(255,255,255,0.55)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(196,168,130,0.3)',
                      borderRadius: '12px',
                      padding: '10px 8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'var(--dusty-rose)',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}>
                      {value}
                    </div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '8px',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── SCROLL AFFORDANCE ── */}
          <ScrollHint visible={showScroll} />

        </motion.div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .hero-grid > *:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
