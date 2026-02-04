import { ResumeData } from '../types';

type TemplateLibrary = {
  [category: string]: {
    [role: string]: ResumeData;
  };
};

export const resumeTemplates: TemplateLibrary = {
  "Professional & Executive": {
    "Senior Software Architect": {
      personalDetails: {
        name: "VIKRAM ADITYA SINGH",
        title: "Senior Solutions Architect | Cloud Infrastructure Expert",
        email: "vikram.architect@formathub.in",
        phone: "+91 98765 43210",
        location: "Bengaluru, KA",
        linkedin: "linkedin.com/in/vikram-tech-lead",
        github: "github.com/vikram-architect"
      },
      summary: "Accomplished Software Architect with 12+ years of experience in designing highly scalable distributed systems. Expert in AWS/Azure ecosystem, Microservices architecture, and leading cross-functional teams to deliver enterprise-grade software solutions. Proven track record of reducing infrastructure costs by 40% while increasing system uptime to 99.99%.",
      experience: [
        { 
          title: "Principal Architect", 
          company: "Adobe India", 
          duration: "Jan 2021 - Present", 
          description: [
            "Leading the architectural design for a global document processing engine serving 50M+ users daily.",
            "Spearheaded the migration of legacy services to Kubernetes, resulting in a 30% reduction in deployment time.",
            "Optimized data retrieval workflows using Redis and ElasticSearch, improving response times by 250ms.",
            "Directing a team of 15 senior developers and conducting weekly architectural review boards.",
            "Implemented a zero-trust security framework across all cloud-native applications."
          ] 
        },
        { 
          title: "Senior Technical Lead", 
          company: "Infosys Limited", 
          duration: "May 2015 - Dec 2020", 
          description: [
            "Designed and developed a real-time banking transaction monitoring system for a Tier-1 European bank.",
            "Introduced automated CI/CD pipelines using Jenkins and Terraform, achieving 100% automated testing coverage.",
            "Collaborated with product owners to define long-term technology roadmaps and scalability strategies.",
            "Mentored over 30 junior and mid-level developers, fostering a culture of technical excellence and innovation."
          ] 
        }
      ],
      education: [
        { degree: "M.Tech in Computer Science", institution: "IIT Bombay", duration: "2013 - 2015" },
        { degree: "B.E. in Information Technology", institution: "BITS Pilani", duration: "2009 - 2013" }
      ],
      skills: {
        languages: ["Java", "Go", "Python", "SQL", "C++", "TypeScript"],
        frameworks: ["Spring Boot", "React.js", "Node.js", "Django", "gRPC"],
        tools: ["AWS (EC2, S3, RDS)", "Docker", "Kubernetes", "Kafka", "Terraform", "Prometheus"]
      },
      projects: [
        { name: "Global Scale Auth Service", description: "Built a centralized authentication system handling 100k requests per second using OAuth2 and JWT.", techStack: "Go, Redis, MongoDB" },
        { name: "FinTech Data Pipeline", description: "Real-time analytics engine for processing millions of financial events per hour with sub-second latency.", techStack: "Apache Spark, Kafka, Scala" }
      ],
      certifications: [
        { name: "AWS Certified Solutions Architect – Professional", issuer: "Amazon Web Services", date: "2024" },
        { name: "Google Cloud Professional Cloud Architect", issuer: "Google", date: "2023" }
      ]
    },
    "Marketing & Strategy Manager": {
      personalDetails: {
        name: "ANANYA KAPOOR",
        title: "Growth Marketing Manager | Brand Strategist",
        email: "ananya.growth@email.com",
        phone: "+91 88002 99110",
        location: "Mumbai, MH",
        linkedin: "linkedin.com/in/ananya-marketing",
        github: ""
      },
      summary: "Dynamic Marketing Professional with 8 years of experience in driving brand growth through data-driven strategies. Expert in performance marketing, ROI optimization, and omnichannel campaign management for FMCG and E-commerce sectors.",
      experience: [
        { 
          title: "Brand Manager", 
          company: "Unilever India", 
          duration: "Aug 2019 - Present", 
          description: [
            "Increased market share of the wellness category by 12% within the first 18 months through targeted digital campaigns.",
            "Managing an annual marketing budget of ₹15 Crores with a focus on high-conversion social media strategies.",
            "Launched 5 new product lines using a 360-degree marketing approach, achieving ₹50 Cr revenue in year one.",
            "Analyzing consumer behavior data to refine product positioning and target high-value customer segments."
          ] 
        },
        { 
          title: "Assistant Marketing Manager", 
          company: "Nykaa", 
          duration: "Jun 2016 - July 2019", 
          description: [
            "Developed and executed the 'Pink Friday' sale campaign, resulting in a 4x increase in typical daily traffic.",
            "Optimized email marketing automation, improving open rates by 25% and click-through rates by 15%.",
            "Coordinated with celebrity influencers for brand endorsements, reaching over 20M+ cumulative followers."
          ] 
        }
      ],
      education: [
        { degree: "MBA in Marketing", institution: "IIM Ahmedabad", duration: "2014 - 2016" }
      ],
      skills: {
        languages: ["English", "Hindi", "French"],
        frameworks: ["Growth Hacking", "Market Research", "Financial Modeling"],
        tools: ["Google Ads", "Meta Ads Manager", "Tableau", "Salesforce", "HubSpot"]
      },
      projects: [],
      certifications: [
        { name: "Advanced Google Analytics Certification", issuer: "Google", date: "2025" }
      ]
    }
  },
  "Entry Level & Graduate": {
    "Business Analyst (Fresher)": {
      personalDetails: {
        name: "ISHAN VERMA",
        title: "Aspiring Business Analyst",
        email: "ishan.analyst@email.com",
        phone: "+91 77665 44332",
        location: "Pune, India",
        linkedin: "linkedin.com/in/ishan-v",
        github: ""
      },
      summary: "Highly analytical and detail-oriented graduate with a strong foundation in statistics and data visualization. Eager to leverage skills in SQL and Power BI to help organizations make data-driven decisions.",
      experience: [
        { 
          title: "Data Analyst Intern", 
          company: "Deloitte India", 
          duration: "Jan 2025 - Mar 2025", 
          description: [
            "Assisted senior analysts in cleaning and preparing large datasets for quarterly financial reporting.",
            "Developed 10+ interactive dashboards in Power BI to track key performance indicators (KPIs) for client projects.",
            "Identified data inconsistencies that led to a 5% improvement in reporting accuracy."
          ] 
        }
      ],
      education: [
        { degree: "Bachelor of Statistics (Honors)", institution: "ISI Kolkata", duration: "2021 - 2025" }
      ],
      skills: {
        languages: ["Python (Pandas, Numpy)", "R", "SQL"],
        frameworks: ["Statistical Modeling", "Data Wrangling"],
        tools: ["Power BI", "Tableau", "Advanced MS Excel", "Jira"]
      },
      projects: [
        { name: "Consumer Sentiment Analysis", description: "Used Python and NLP to analyze 10,000+ Twitter reviews for a leading smartphone brand.", techStack: "Python, Scikit-learn" }
      ],
      certifications: [
        { name: "Microsoft Certified: Power BI Data Analyst Associate", issuer: "Microsoft", date: "2025" }
      ]
    }
  }
};