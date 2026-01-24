
import { ResumeData } from '../types';

type TemplateLibrary = {
  [category: string]: {
    [role: string]: ResumeData;
  };
};

export const resumeTemplates: TemplateLibrary = {
  "Fresher": {
    "B.Tech Computer Science": {
      personalDetails: {
        name: "Priya Sharma",
        title: "Aspiring Software Developer",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        location: "Bengaluru, India",
        linkedin: "linkedin.com/in/priyasharma",
        github: "github.com/priyacodes"
      },
      summary: "Highly motivated and detail-oriented Computer Science graduate with a strong foundation in object-oriented programming, data structures, and algorithms. Eager to leverage academic knowledge and hands-on project experience to contribute to a dynamic software development team.",
      experience: [], // Freshers have no experience, projects are key
      education: [
        { degree: "Bachelor of Technology in Computer Science", institution: "Indian Institute of Technology, Delhi", duration: "2022 - 2026" }
      ],
      skills: {
        languages: ["Java", "Python", "C++", "JavaScript", "SQL"],
        frameworks: ["React.js", "Node.js", "Spring Boot (Basic)"],
        tools: ["Git", "GitHub", "Docker", "VS Code", "JIRA"]
      },
      projects: [
        { name: "E-commerce Website", description: "Developed a full-stack e-commerce platform with features like product catalog, user authentication, and shopping cart.", techStack: "React.js, Node.js, Express, MongoDB" },
        { name: "Sentiment Analysis Model", description: "Built a machine learning model to classify movie reviews as positive or negative using Python and Scikit-learn.", techStack: "Python, Pandas, Scikit-learn, NLTK" }
      ],
      certifications: [
        { name: "Certified Java Associate", issuer: "Oracle", date: "2025" }
      ]
    },
     "MBA Marketing Fresher": {
      personalDetails: {
        name: "Aarav Singh",
        title: "Marketing & Strategy Enthusiast",
        email: "aarav.singh@email.com",
        phone: "+91 91122 33445",
        location: "Gurugram, India",
        linkedin: "linkedin.com/in/aaravsinghmba",
        github: ""
      },
      summary: "Dynamic and analytical MBA Marketing graduate with a keen understanding of market research, brand management, and digital marketing strategies. Seeking to apply theoretical knowledge and internship experience to drive growth in a challenging marketing role.",
      experience: [],
      education: [
        { degree: "Master of Business Administration (Marketing)", institution: "IIM, Rohtak", duration: "2024 - 2026" },
        { degree: "Bachelor of Commerce", institution: "University of Delhi", duration: "2021 - 2024" }
      ],
      skills: {
        languages: ["Market Research", "SEO/SEM Basics", "Social Media Marketing", "Brand Strategy"],
        frameworks: ["Google Analytics", "Canva", "HubSpot (Certified)"],
        tools: ["MS Excel (Advanced)", "Tableau (Basic)", "Google Ads"]
      },
      projects: [
        { name: "Live Project: Go-to-Market Strategy", description: "Developed a comprehensive GTM strategy for a new D2C wellness brand, including target audience analysis, competitive landscape, and a 6-month marketing plan.", techStack: "Market Research, SWOT Analysis, Financial Projections" }
      ],
      certifications: []
    }
  },
  "IT & Software": {
    "Frontend Developer (2+ Yrs)": {
      personalDetails: {
        name: "Arjun Verma",
        title: "Frontend Developer",
        email: "arjun.verma@email.com",
        phone: "+91 91234 56789",
        location: "Pune, India",
        linkedin: "linkedin.com/in/arjunverma",
        github: "github.com/arjun-dev"
      },
      summary: "Creative Frontend Developer with 2+ years of experience in building and maintaining responsive and user-friendly web applications using React.js and TypeScript. Proficient in state management with Redux and passionate about creating seamless user experiences.",
      experience: [
        { title: "Software Engineer - Frontend", company: "Infosys Ltd, Pune", duration: "Jun 2024 - Present", description: ["Developed and maintained UI components for a large-scale banking application using React.js and TypeScript.", "Collaborated with UX/UI designers to translate wireframes into high-quality, reusable code.", "Improved application performance by 20% by implementing code splitting and lazy loading."] },
        { title: "Associate Developer", company: "Tech Mahindra, Hyderabad", duration: "Jul 2022 - May 2024", description: ["Assisted in the development of a customer-facing portal using HTML, CSS, and JavaScript.", "Participated in code reviews and agile ceremonies."] }
      ],
      education: [
        { degree: "Bachelor of Engineering in Information Technology", institution: "Pune Institute of Computer Technology", duration: "2018 - 2022" }
      ],
      skills: {
        languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3/Sass"],
        frameworks: ["React.js", "Redux", "Next.js (Basic)", "Tailwind CSS"],
        tools: ["Webpack", "Babel", "Git", "JIRA", "Figma"]
      },
      projects: [
        { name: "Personal Portfolio", description: "A responsive personal portfolio website built with Next.js to showcase projects and skills.", techStack: "Next.js, Tailwind CSS, Framer Motion" }
      ],
      certifications: [
        { name: "React - The Complete Guide", issuer: "Udemy", date: "2023"}
      ]
    },
    "Senior Backend Developer (8+ Yrs)": {
      personalDetails: {
        name: "Rohan Mehra",
        title: "Senior Backend Developer",
        email: "rohan.mehra@email.com",
        phone: "+91 99887 76655",
        location: "Hyderabad, India",
        linkedin: "linkedin.com/in/rohanmehra",
        github: "github.com/rohan-backend"
      },
      summary: "Experienced Senior Backend Developer with over 8 years of expertise in designing, developing, and deploying scalable microservices using Java, Spring Boot, and AWS. Proven ability to lead projects, mentor junior developers, and optimize database performance for high-traffic applications.",
       experience: [
        { title: "Senior Software Engineer", company: "Amazon, Hyderabad", duration: "Aug 2021 - Present", description: ["Designed and implemented RESTful APIs for the payment processing service, handling over 1 million transactions per day.", "Led a team of 3 developers in migrating monolithic architecture to microservices, improving system resilience.", "Optimized SQL queries, reducing database latency by 40%."] },
        { title: "Backend Developer", company: "Capgemini, Mumbai", duration: "Jul 2019 - Jul 2021", description: ["Developed core modules for an insurance management system using Java and Spring.", "Wrote unit and integration tests, achieving 90% code coverage."] },
        { title: "Software Engineer", company: "Wipro, Bengaluru", duration: "Jun 2017 - Jun 2019", description: ["Maintained and enhanced existing enterprise applications built on the Java EE stack."] },
        { title: "Associate Engineer", company: "Infosys, Mysuru", duration: "Jan 2016 - May 2017", description: ["Completed intensive training on Java, SQL, and software development lifecycle.", "Worked on bug fixes and maintenance tasks for a legacy banking client project."] }
      ],
      education: [
        { degree: "Master of Computer Applications", institution: "University of Hyderabad", duration: "2013 - 2015" }
      ],
      skills: {
        languages: ["Java", "Python", "SQL", "Go (Basic)"],
        frameworks: ["Spring Boot", "Hibernate", "Spring Cloud", "JUnit"],
        tools: ["AWS (EC2, S3, Lambda)", "Docker", "Kubernetes", "Jenkins", "PostgreSQL", "Kafka"]
      },
      projects: [
        { name: "Real-time Notification Service", description: "Built a WebSocket-based notification service to deliver real-time updates to thousands of concurrent users.", techStack: "Java, Spring WebFlux, Redis Pub/Sub, WebSockets"},
        { name: "API Gateway Implementation", description: "Developed a custom API gateway to handle authentication, rate limiting, and request routing for all backend microservices.", techStack: "Spring Cloud Gateway, JWT, Resilience4j"}
      ],
      certifications: [
        { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "2022" },
        { name: "Oracle Certified Professional, Java SE 8 Programmer", issuer: "Oracle", date: "2020" }
      ]
    }
  },
  "Sales & Marketing": {
    "Sales Manager (4+ Yrs)": {
      personalDetails: {
        name: "Anjali Singh",
        title: "Sales Manager",
        email: "anjali.singh@email.com",
        phone: "+91 98765 12345",
        location: "Mumbai, India",
        linkedin: "linkedin.com/in/anjalisinghsales",
        github: ""
      },
      summary: "Results-driven Sales Manager with 4+ years of experience in the SaaS industry. Proven track record of exceeding sales targets, building high-performing teams, and developing strategic client relationships. Expert in CRM tools and sales funnel optimization.",
      experience: [
        { title: "Sales Manager", company: "Salesforce, Mumbai", duration: "Apr 2022 - Present", description: ["Led a team of 8 sales executives, achieving 120% of the annual sales quota for FY 2023.", "Developed and implemented a new sales strategy that increased lead conversion rate by 15%.", "Managed key accounts, resulting in a 30% increase in customer lifetime value."] },
        { title: "Business Development Executive", company: "Freshworks, Chennai", duration: "Mar 2020 - Mar 2022", description: ["Generated and qualified leads through cold calling and email campaigns.", "Consistently exceeded monthly targets by an average of 25%."] }
      ],
      education: [
        { degree: "Master of Business Administration (Marketing)", institution: "NMIMS, Mumbai", duration: "2018 - 2020" }
      ],
      skills: {
        languages: ["Salesforce CRM", "HubSpot", "MS Office Suite", "Lead Generation"],
        frameworks: ["Strategic Planning", "Team Leadership", "Key Account Management"],
        tools: ["Negotiation", "Sales Forecasting", "Communication"]
      },
      projects: [],
      certifications: []
    }
  },
  "Engineering": {
    "Civil Engineer (3+ Yrs)": {
        personalDetails: {
            name: "Vikram Rathore",
            title: "Civil Engineer",
            email: "vikram.rathore@email.com",
            phone: "+91 95555 12345",
            location: "Noida, India",
            linkedin: "linkedin.com/in/vikramrathore",
            github: ""
        },
        summary: "Licensed Civil Engineer with 3+ years of experience in site management, structural design, and project estimation for commercial and residential projects. Proficient in AutoCAD, STAAD.Pro, and project management principles, ensuring projects are completed on time and within budget.",
        experience: [
            { title: "Site Engineer", company: "Larsen & Toubro, Noida", duration: "May 2023 - Present", description: ["Supervised the construction of a 20-story residential tower, managing a team of 50+ workers.", "Conducted regular quality checks and ensured compliance with safety regulations.", "Coordinated with architects and subcontractors to resolve on-site issues."] },
            { title: "Junior Engineer", company: "DLF Ltd, Gurugram", duration: "Jun 2021 - Apr 2023", description: ["Assisted in preparing project blueprints and cost estimates using AutoCAD.", "Monitored material procurement and inventory."] }
        ],
        education: [
            { degree: "Bachelor of Technology in Civil Engineering", institution: "NIT, Kurukshetra", duration: "2017 - 2021" }
        ],
        skills: {
            languages: ["Structural Analysis", "Project Management", "Cost Estimation"],
            frameworks: ["AutoCAD", "STAAD.Pro", "Primavera P6"],
            tools: ["MS Project", "Quality Control", "Site Supervision"]
        },
        projects: [],
        certifications: []
    }
  },
  "Healthcare": {
    "Registered Nurse (5+ Yrs)": {
        personalDetails: {
            name: "Sneha Reddy",
            title: "Registered Nurse (ICU)",
            email: "sneha.reddy@email.com",
            phone: "+91 96666 77777",
            location: "Hyderabad, India",
            linkedin: "linkedin.com/in/snehareddyrn",
            github: ""
        },
        summary: "Compassionate and highly skilled Registered Nurse with 5+ years of experience providing critical care in fast-paced ICU environments. Adept at patient assessment, medication administration, and operating advanced medical equipment. Certified in Advanced Cardiac Life Support (ACLS).",
        experience: [
            { title: "ICU Registered Nurse", company: "Apollo Hospitals, Hyderabad", duration: "Jan 2021 - Present", description: ["Managed care for up to 3 critically ill patients per shift, monitoring vital signs and responding to life-threatening changes.", "Administered medications, IV therapies, and ventilator support.", "Educated patients and families on critical conditions and care plans."] },
            { title: "Medical-Surgical Nurse", company: "Yashoda Hospitals, Hyderabad", duration: "Dec 2018 - Dec 2020", description: ["Provided post-operative care for a diverse patient population.", "Maintained accurate patient records using the hospital's EMR system."] }
        ],
        education: [
            { degree: "Bachelor of Science in Nursing (B.Sc. Nursing)", institution: "Osmania Medical College", duration: "2014 - 2018" }
        ],
        skills: {
            languages: ["Patient Care", "Critical Care Nursing", "Medication Administration", "ACLS Certified"],
            frameworks: ["Ventilator Management", "EMR/EHR Systems", "Wound Care"],
            tools: ["Patient Assessment", "Team Collaboration", "Empathy"]
        },
        projects: [],
        certifications: []
    }
  }
};
