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
    summary: "Hey, I'm Aastha — a software engineer building scalable, data-driven products in climate tech. I have a love for books, learning, and building meaningful tech. I enjoy crafting reliable APIs and SDKs using JavaScript and Python, and working on climate-tech solutions involving spatial indexing and large-scale data processing.\n\nI've worked with MongoDB, MQTT, and cloud services, and I care deeply about clean architecture, best practices, and building systems that are both robust and user-friendly. My goal is to create backend solutions that clearly support real-world impact.",
    cards: [
      { label: 'Focus', value: '- Scalable APIs & system design\n- Data platforms & SDK development\n- Full-stack feature delivery' },
      { label: 'Interests', value: '- Sustainability & climate tech\n- Distributed systems & reliability\n- Product engineering & developer experience' }
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
