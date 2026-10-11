export const portfolio = {
  name: 'Souvik Dhar',
  initials: 'SD',
  headline: 'Software Engineer',
  subheadline: 'Java Backend Developer',
  location: 'West Bengal, India',
  email: 'souvikdhar213@gmail.com',
  introduction:
    'Aspiring software developer with strong foundations in computer science and a curiosity for how dependable software is designed, built, and improved.',
  summary:
    'I work across Java and JavaScript, building full-stack applications and exploring the systems behind them. My interests span backend engineering, REST API development, and database systems.',
  interests: ['Full-Stack Development', 'Backend Engineering', 'REST API Development', 'Database Systems'],
  links: {
    github: 'https://github.com/2002Souvik',
    linkedin: 'https://www.linkedin.com/in/souvik-dhar-562258272/',
    leetcode: 'https://leetcode.com/u/2002Souvik/',
    resume: 'https://drive.google.com/file/d/1RTTCCWinkAsO8B9rUlSPfCXSMwG_PxD6/view?usp=sharing',
    resumeDownload: 'https://drive.google.com/uc?export=download&id=1RTTCCWinkAsO8B9rUlSPfCXSMwG_PxD6',
  },
  projects: [
    {
      id: 'abash',
      number: '01',
      title: 'Room Booking and Listing App',
      shortName: 'Abash',
      date: 'JAN — JUN 2025',
      description: 'A full-stack room discovery and booking application, built around clear APIs and practical backend fundamentals.',
      details: [
        'Built REST APIs for listings, bookings, authentication, and advanced filtering.',
        'Added JWT authentication and database indexing.',
        'Containerised the application using Docker and Docker Compose.',
      ],
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Docker'],
      repo: null,
      linkNote: 'Repository and live demo not linked: no matching public project link was verified.',
    },
    {
      id: 'cold-email',
      number: '02',
      title: 'LLM-Based Cold Email Generator',
      shortName: 'Cold Email Generator',
      date: 'AUG — NOV 2025',
      description: 'A focused LLM application that turns role, company, and context into tailored outreach drafts.',
      details: [
        'Used LLaMA 3 and LangChain with structured prompt templates.',
        'Personalised generated emails around role, company, and supplied context.',
        'Built a Streamlit interface for real-time generation.',
      ],
      stack: ['Python', 'LLaMA 3', 'LangChain', 'Streamlit'],
      repo: null,
      linkNote: 'Repository and live demo not linked: no matching public project link was verified.',
    },
    {
      id: 'movie-booking',
      number: '03',
      title: 'Movie Ticket Booking System',
      shortName: 'Movie Ticket Booking',
      date: 'MAR — APR 2025',
      description: 'A console-based Java application exploring object-oriented design and a clean separation of responsibilities.',
      details: [
        'Organised the code into controller, service, and model layers.',
        'Applied object-oriented programming concepts to booking workflows.',
        'Persisted application data in CSV files.',
      ],
      stack: ['Java', 'OOP', 'Layered Architecture', 'CSV'],
      repo: 'https://github.com/2002Souvik/movie-ticket-booking-system',
      linkNote: 'View the verified source repository.',
    },
  ],
  experience: {
    intro:
      'The resume provided focuses on project work rather than formal employment. These verified projects and learning milestones show how I am building practical experience.',
    items: [
      {
        title: 'Building through projects',
        period: '2025',
        description:
          'Developed three projects spanning a room-booking platform, an LLM-based cold email generator, and a Java movie-ticket booking system.',
      },
      {
        title: 'GDSC Study Jams',
        period: '2024',
        description:
          'Completed the Generative AI certification through GDSC Study Jams.',
      },
      {
        title: 'Problem-solving practice',
        period: 'Resume-reported',
        description:
          'Solved 150+ problems across LeetCode and GeeksforGeeks, strengthening data structures and algorithmic problem-solving.',
      },
    ],
  },
  skills: [
    { category: 'Languages', items: 'C · C++ · Java · JavaScript . Python' },
    { category: 'Frontend', items: 'HTML · CSS · React.js · Tailwind CSS · Bootstrap' },
    { category: 'Backend', items: 'Node.js · Express.js · Firebase' },
    { category: 'Databases', items: 'MySQL · MongoDB' },
    { category: 'Tools', items: 'Git · GitHub · Postman' },
    { category: 'Foundations', items: 'OOP · Data Structures & Algorithms · Operating Systems · Computer Networks · DBMS' },
  ],
  education: [
    {
      degree: 'B.E. Computer Science Engineering',
      institution: 'Chitkara University, Punjab',
      period: 'OCT 2022 — JUN 2026',
      result: 'CGPA 7.4 / 10',
    },
    {
      degree: 'Class XII · PCMB',
      institution: 'Dasagram S.S Sikshasadan, West Bengal',
      period: 'JAN 2021 — FEB 2022',
      result: '77%',
    },
  ],
  achievements: {
    problemSolving: '150+',
    problemSolvingLabel: 'problems solved',
    problemSolvingNote: 'Across LeetCode and GeeksforGeeks.',
    certification: 'GDSC Study Jams 2024',
    certificationNote: 'Completed the Generative AI certification.',
  },
  codingProfiles: [
    {
      name: 'GitHub',
      handle: '@2002Souvik',
      url: 'https://github.com/2002Souvik',
      description: 'Public repositories and coding projects.',
    },
    {
      name: 'LeetCode',
      handle: '2002Souvik',
      url: 'https://leetcode.com/u/2002Souvik/',
      description:
        'Resume-reported 150+ problems solved across LeetCode and GeeksforGeeks.',
    },
  ],
};
