import boxfit from '../assets/boxfit.png';
import certificate from '../assets/certificate.png';
import mongodb from '../assets/mongodb.png';
import techjourney from '../assets/techjourney.png';
import graphql from '../assets/graphql.png';
import resume from '../assets/resume.pdf';

const PORTFOLIO_DATA = {
  name: 'Aastha Mahindra',
  title: 'Software Engineer',
  email: 'aastha.mahindra125@gmail.com',
  location: 'Bangalore, India',
  locationLink: 'https://maps.app.goo.gl/v4SUbvBY23pUKREv9',
  github: 'https://github.com/aasthamahindra',
  linkedin: 'https://www.linkedin.com/in/aastha-mahindra',
  resumeLink: resume,

  hero: {
    roleTop: 'Software Engineer',
    headline: 'Aastha Mahindra',
    intro: '',
    avatarText: 'AM'
  },

  about: {
    summary: "Hey there! I am Aastha Mahindra, living by the mantra 'You only live once', embraces my joyful existence. A book lover at heart, I lose myself in captivating stories, cherishing the wisdom within.\n\nI design scalable and reliable backend systems with a focus on clean architecture and performance.\n\nBeyond writing code, I enjoy breaking down complex problems and building structured solutions. My goal is to deliver thoughtful engineering that solves real-world challenges."
  },

  focusItems: [
    "Scalable Backend Architecture",
    "Full-Stack Systems",
    "APIs, Data & Performance Engineering"
  ],

  projects: [
    {
      title: 'Boxfit',
      impact: 'A fitness web experience focused on clean UX and simple workflows.',
      technologies: ['JavaScript'],
      github: 'https://github.com/aasthamahindra/boxfit.git',
      live: '',
      image: boxfit
    },
    {
      title: 'Certificate Generator',
      impact: 'Automated certificate generation to reduce manual effort and improve consistency.',
      technologies: ['Python'],
      github: 'https://github.com/aasthamahindra/certificate-generator.git',
      live: '',
      image: certificate
    }
  ],

  blogs: [
    {
      title: 'Optimizing MongoDB for Real-Time Climate APIs',
      link: 'https://www.getambee.com/blogs/optimizing-mongodb-for-real-time-climate-apis',
      image: mongodb,
    },
    {
      title: "Inspiring growth: Aastha's tech journey at Ambee",
      link: 'https://www.getambee.com/blogs/aastha-tech-journey',
      image: techjourney,
    },
    {
      title: "Introduction to GraphQL",
      link: 'https://aasthamahindra.hashnode.dev/introduction-to-graphql',
      image: graphql,
    },
    {
      title: "Mastering GraphQL: Best Practices and Advanced Features",
      link: 'https://aasthamahindra.hashnode.dev/graphql-best-practices',
      image: graphql,
    }
  ],

  experience: [
    {
      company: 'Ambee Datair Technology Pvt. Ltd.',
      role: 'Software Engineer',
      period: 'Jul 2023 — Present',
      bullets: [
        'Designed and built REST and GraphQL APIs using Java (Spring Boot, Spring MVC, Spring Data JPA) and Node.js (Fastify/Express) for climate intelligence platforms.',
        'Implemented Redis-based caching and geo-lookup strategies to improve API performance and scalability.',
        'Developed geospatial API services using PostGIS with PostgreSQL and Hibernate ORM.',
        'Refactored Node.js services to an asynchronous, non-blocking architecture to improve concurrency and system efficiency.',
        'Optimized PostgreSQL and MongoDB queries using indexing and aggregation pipelines.',
        'Built real-time webhook pipelines and MQTT-based data streams for environmental data delivery.',
        'Implemented cross-cutting concerns using Spring AOP and secured APIs with Spring Security.',
        'Maintained code quality through unit and integration testing (JUnit, Jest) and active participation in code reviews.'
      ]
    },
    {
      company: 'Ambee Datair Technology Pvt. Ltd.',
      role: 'Software Engineer Intern',
      period: 'Jan 2023 — Jun 2023',
      bullets: [
        'Developed core modules for a Node.js SDK integrating multiple climate APIs.',
        'Implemented MQTT-based real-time data pipelines for IoT device communication.',
        'Contributed to Agile development cycles, CI/CD improvements, and technical documentation.'
      ]
    },
    {
      company: 'Engineers India Ltd.',
      role: 'Trainee',
      period: 'Jul 2022 — Aug 2022',
      bullets: [
        'Built a full-stack project management web application using React.js and Spring Boot with Hibernate ORM and MySQL.',
        'Designed and tested REST APIs with structured validation using Postman.'
      ]
    },
    {
      company: 'Indian Space Research Organisation (ISRO)',
      role: 'Backend Developer Intern',
      period: 'May 2021 — Oct 2021',
      bullets: [
        'Developed a GeoDjango and PostGIS-based analytics platform for geospatial crop intelligence.',
        'Worked on backend systems for processing and analyzing geospatial datasets.'
      ]
    }
  ],

  contact: {
    headline: "Let's build something impactful.",
    blurb: 'Reach out for roles, collaborations, or interesting problems.',
    cta: 'Send Message'
  }
};

export const getPortfolioData = () => Promise.resolve(PORTFOLIO_DATA);
export const getSectionData = (section) => Promise.resolve(PORTFOLIO_DATA[section] || null);
