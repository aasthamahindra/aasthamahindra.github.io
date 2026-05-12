import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import {
  heroVariants,
  textRevealVariants,
  cardVariants,
} from '../utils/animations';

import profile from '../assets/profile.png';
import resume from '../assets/resume.pdf';

/* Questions */
const QA = [
  {
    keywords: ['stack', 'tech', 'language', 'framework', 'tools'],
    answer:
      'Java (Spring Boot), Node.js (Fastify/Express), PostgreSQL, MongoDB, Redis, PostGIS.',
  },
  {
    keywords: ['experience', 'work', 'job', 'company', 'years', 'ambee'],
    answer:
      'Software Engineer @ Ambee Datair Technology since Jul 2023 — building climate intelligence APIs.',
  },
  {
    keywords: ['focus', 'speciali', 'backend', 'architecture'],
    answer:
      'Scalable backend systems, full-stack builds, and high-performance API + data engineering.',
  },
  {
    keywords: ['hobby', 'hobbies', 'interest', 'fun', 'outside', 'book', 'read'],
    answer:
      'Book lover at heart. I lose myself in captivating stories and cherish the wisdom within.',
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
    answer:
      "'You only live once' — so build things that matter and cherish every moment.",
  },
];

const QUESTIONS_LIMIT = 3;

const BOOT_LINES = [
  { text: '> portfolio v2.0 initialised', dim: true, delay: 0 },
  { text: '> loading aastha.json · done ✓', dim: true, delay: 450 },
  { text: '', delay: 700 },
  {
    text: ' Ask me anything — 3 questions allowed.',
    accent: true,
    delay: 900,
  },
  {
    text: ' try: stack · experience · focus · hobbies · resume',
    dim: true,
    delay: 1150,
  },
];

const STATS = [
  { value: '2+', label: 'yrs exp' },
  { value: '10+', label: 'projects' },
  { value: '3', label: 'stacks' },
];

function matchAnswer(input) {
  const q = input.toLowerCase().trim();

  for (const entry of QA) {
    if (entry.keywords.some((k) => q.includes(k))) {
      return entry.answer;
    }
  }

  return 'Not sure about that! Try: stack, experience, focus, hobbies, or resume.';
}

/* Boot line */
const BootLine = ({ text, dim, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: delay / 1000, duration: 0.2 }}
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      lineHeight: 1.9,
      color: accent
        ? 'var(--dusty-rose)'
        : dim
        ? 'var(--text-secondary)'
        : 'var(--text-primary)',
      fontWeight: accent ? '700' : '400',
      minHeight: text ? undefined : '10px',
    }}
  >
    {text}
    {accent && <BlinkCursor />}
  </motion.div>
);

/* Cursor */
const BlinkCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1],
    }}
    style={{
      display: 'inline-block',
      marginLeft: '4px',
      color: 'var(--dusty-rose)',
    }}
  >
    ▋
  </motion.span>
);

/* Chat line */
const ChatLine = ({ role, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18 }}
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      lineHeight: 1.8,
      color:
        role === 'user'
          ? 'var(--text-primary)'
          : 'var(--dusty-rose)',
      wordBreak: 'break-word',
    }}
  >
    {role === 'user' ? '> ' : ' → '}
    {text}
  </motion.div>
);

const Hero = ({ data }) => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [questionsLeft, setQuestionsLeft] =
    useState(QUESTIONS_LIMIT);

  const [booted, setBooted] = useState(false);

  const chatScrollRef = useRef(null);

  useEffect(() => {
    const last = BOOT_LINES[BOOT_LINES.length - 1].delay;

    const t = setTimeout(() => {
      setBooted(true);
    }, last + 350);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop =
        chatScrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = () => {
    const q = input.trim();

    if (!q || questionsLeft === 0) return;

    const answer = matchAnswer(q);
    const remaining = questionsLeft - 1;

    setChat((prev) => [
      ...prev,
      { role: 'user', text: q },
      {
        role: 'bot',
        text:
          remaining === 0
            ? `${answer} · [session closed]`
            : answer,
      },
    ]);

    setQuestionsLeft(remaining);
    setInput('');
  };

  const roleLabel =
    data?.hero?.roleTop || data?.title || '';

  const name =
    data?.hero?.headline || data?.name || '';

  const summary =
    data?.about?.summary || '';

  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  return (
    <section
      className="section hero"
      id="hero"
      style={{
        paddingTop: '120px',
        paddingBottom: '40px',
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
            gap: '2rem',
          }}
        >
          {/* HEADER */}
          <motion.div
            variants={textRevealVariants}
            style={{
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1rem',
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >

              <span
                style={{
                  color: 'var(--dusty-rose)',
                  fontWeight: 600,
                }}
              >
                {roleLabel}
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              {firstName} {lastName}
            </h1>
          </motion.div>

          {/* GRID */}
          <motion.div
            variants={cardVariants}
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            {/* BIO */}
            <motion.div variants={textRevealVariants}>
              <div
                className="glass-card"
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  boxShadow:
                    '0 2px 24px rgba(196,149,106,0.08)',
                  height: '100%',
                }}
              >
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {summary}
                </p>
              </div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              variants={textRevealVariants}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  borderRadius: '18px',
                  margin: '0 auto',
                  boxShadow:
                    '0 0 0 3px rgba(212,165,165,0.5), 0 8px 32px rgba(196,149,106,0.2)',
                }}
              >
                <img
                  src={profile}
                  alt="Aastha Mahindra"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              variants={textRevealVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* TERMINAL */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '18px',
                  border:
                    '1px solid rgba(196,168,130,0.3)',
                  padding: '14px',
                  height: '260px',
                  minHeight: '260px',
                  maxHeight: '260px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* HEADER */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: '#ff5f57',
                    }}
                  />

                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: '#ffbd2e',
                    }}
                  />

                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: '#28ca41',
                    }}
                  />

                  <span
                    style={{
                      marginLeft: 'auto',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '9px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    aastha.sh
                  </span>
                </div>

                {/* CHAT */}
                <div
                  ref={chatScrollRef}
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {BOOT_LINES.map((line, i) => (
                    <BootLine
                      key={i}
                      text={line.text}
                      dim={line.dim}
                      accent={line.accent}
                      delay={line.delay}
                    />
                  ))}

                  <AnimatePresence>
                    {chat.map((c, i) => (
                      <ChatLine
                        key={i}
                        role={c.role}
                        text={c.text}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                <div
                  style={{
                    borderTop:
                      '1px solid rgba(196,168,130,0.25)',
                    margin: '10px 0',
                  }}
                />

                {/* COUNTER */}
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    color:
                      questionsLeft > 0
                        ? 'var(--dusty-rose)'
                        : 'var(--text-secondary)',
                    marginBottom: '8px',
                  }}
                >
                  {questionsLeft > 0
                    ? `${questionsLeft} question${
                        questionsLeft === 1 ? '' : 's'
                      } remaining`
                    : 'session closed'}
                </div>

                {/* INPUT */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--dusty-rose)',
                      fontFamily:
                        "'Space Mono', monospace",
                    }}
                  >
                    {'>'}
                  </span>

                  <input
                    value={input}
                    placeholder={
                      booted ? 'type a question...' : ''
                    }
                    onChange={(e) =>
                      setInput(e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleSubmit()
                    }
                    disabled={questionsLeft === 0}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontFamily:
                        "'Space Mono', monospace",
                      fontSize: '11px',
                      color: 'var(--text-primary)',
                    }}
                  />

                  <button
                    onClick={handleSubmit}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--dusty-rose)',
                    }}
                  >
                    ↵
                  </button>
                </div>
              </motion.div>

              {/* RESUME BUTTON */}
              <motion.a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  gap: '10px',

                  textDecoration: 'none',

                  padding: '15px 18px',

                  borderRadius: '14px',

                  background:
                    'linear-gradient(135deg, rgba(212,165,165,0.95), rgba(201,146,146,0.92))',

                  border: '1px solid rgba(255,255,255,0.25)',

                  color: '#fff',

                  fontWeight: 600,
                  fontSize: '0.95rem',

                  letterSpacing: '-0.01em',

                  boxShadow:
                    '0 10px 24px rgba(212,165,165,0.22)',

                  backdropFilter: 'blur(12px)',

                  transition:
                    'background 0.35s ease, box-shadow 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, rgba(195,140,140,1), rgba(176,120,120,1))';

                  e.currentTarget.style.transform =
                    'translateY(-2px)';

                  e.currentTarget.style.boxShadow =
                    '0 14px 30px rgba(195,140,140,0.34)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, rgba(212,165,165,0.95), rgba(201,146,146,0.92))';

                  e.currentTarget.style.transform =
                    'translateY(0px)';

                  e.currentTarget.style.boxShadow =
                    '0 10px 24px rgba(212,165,165,0.22)';
                }}
              >
                <span>View Resume</span>
                <FiArrowUpRight size={16} />

                {/* <span
                  style={{
                    opacity: 0.9,
                  }}
                >
                  <FiArrowUpRight size={16} />
                </span> */}
              </motion.a>

              {/* STATS */}
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
                      background:
                        'rgba(255,255,255,0.55)',
                      border:
                        '1px solid rgba(196,168,130,0.3)',
                      borderRadius: '12px',
                      padding: '10px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontFamily:
                          "'Space Mono', monospace",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--dusty-rose)',
                        marginBottom: '4px',
                      }}
                    >
                      {value}
                    </div>

                    <div
                      style={{
                        fontFamily:
                          "'Space Mono', monospace",
                        fontSize: '8px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* RESPONSIVE */}
      <style>{`
        html {
          scroll-padding-top: 100px;
        }

        section {
          scroll-margin-top: 100px;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.25rem !important;
          }

          .hero-grid > *:first-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }

          .hero {
            padding-top: 100px !important;
            padding-bottom: 32px !important;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding-top: 80px !important;
            padding-bottom: 24px !important;
          }

          .hero-grid {
            gap: 0.75rem !important;
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .hero {
            padding-top: 60px !important;
            padding-bottom: 16px !important;
          }

          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;