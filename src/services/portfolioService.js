const PORTFOLIO_DATA = {
  name: 'Aastha Mahindra',
  title: 'Software Engineer',
  email: 'aastha.mahindra125@gmail.com',
  location: 'Bangalore, India',
  locationLink: 'https://maps.app.goo.gl/v4SUbvBY23pUKREv9',
  resumeLink: 'https://aasthamahindra.github.io/assets/Aastha_Mahindra_Resume.pdf',

  hero: {
    roleTop: 'Software Engineer',
    headline: 'Aastha Mahindra',
    intro: '',
    avatarText: 'AM'
  },

  about: {
    summary: `Hey there! I am Aastha Mahindra, living by the mantra 'You only live once', embraces my joyful existence. A book lover at heart, I lose myself in captivating stories, cherishing the wisdom within. Tech advancements excites me, igniting a passion for progress and innovation. With a thirst for knowledge, a love for literature, and a fascination for technology, I find joy in the simple pleasures that make life extraordinary.\n\nCommitted to best practices, I ensure the functionality and user-friendliness of applications. My goal is to convey your message and identity through creative solutions for the backend.`,
    cards: [
      { label: 'Focus', value: '‣ Scalable APIs & system design\n‣ Data platforms & SDK development\n‣ Full-stack feature delivery' },
    ]
  },

  services: [
    {
      title: 'API Development',
      description: 'Design and ship reliable REST APIs with clean contracts, validation, and monitoring.'
    },
    {
      title: 'Performance & Reliability',
      description: 'Profile bottlenecks and improve query performance, latency, and overall system reliability.'
    }
  ],

  projects: [
    {
      title: 'Certificate Generator',
      impact: 'Automated certificate generation to reduce manual effort and improve consistency.',
      technologies: ['Python'],
      github: 'https://github.com/aasthamahindra/certificate-generator.git',
      live: ''
    },
    {
      title: 'Boxfit',
      impact: 'A fitness web experience focused on clean UX and simple workflows.',
      technologies: ['JavaScript'],
      github: 'https://github.com/aasthamahindra/boxfit.git',
      live: ''
    }
  ],

  experience: [
    {
      company: 'Ambee',
      role: 'Software Engineer',
      period: 'Jul 2023 — Present',
      bullets: [
        'Built and maintained backend APIs/SDK services with a focus on reliability and developer experience.',
        'Improved data handling and query performance to support large datasets and production usage.'
      ]
    },
    {
      company: 'Ambee',
      role: 'Software Engineer Intern',
      period: 'Jan 2023 — Jul 2023',
      bullets: [
        'Shipped backend features and bug fixes across internal services with ownership and iteration speed.',
        'Collaborated closely with senior engineers to improve API contracts and reduce integration friction.'
      ]
    },
    {
      company: 'Engineers India Ltd.',
      role: 'Trainee',
      period: 'Jul 2022 — Aug 2022',
      bullets: [
        'Delivered training assignments with a focus on fundamentals and structured problem-solving.',
        'Documented outcomes and communicated progress clearly across stakeholders.'
      ]
    },
    {
      company: 'Indian Space Research Organisation (ISRO)',
      role: 'Backend Developer Intern',
      period: 'May 2021 — Oct 2021',
      bullets: [
        'Worked on backend components with attention to correctness, structure, and maintainability.',
        'Supported feature delivery with iterative testing and clear reporting.'
      ]
    }
  ],

  contact: {
    headline: "Let's build something impactful.",
    blurb: 'Reach out for roles, collaborations, or interesting problems.',
    cta: 'Send Message'
  }
};

export const getPortfolioData = () => {
  return Promise.resolve(PORTFOLIO_DATA);
};

export const getSectionData = (section) => {
  return Promise.resolve(PORTFOLIO_DATA[section] || null);
};
