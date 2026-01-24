
export interface ElementPosition {
  x: number;
  y: number;
}

export type ThemeType = 
  | 'classic' 
  | 'modern-blue' 
  | 'academic-red' 
  | 'tech-green' 
  | 'royal-purple' 
  | 'minimal-black' 
  | 'corporate-teal' 
  | 'creative-orange' 
  | 'navy-gold' 
  | 'slate-gray';

export interface CertificateData {
  studentName: string;
  fathersName: string;
  courseName: string;
  duration: string;
  grade: string;
  teacherName: string; 
  rollNumber: string;
  issueDate: string;
  photoUrl: string | null;
  institutionName: string;
  theme: ThemeType;
  positions: {
    photo: ElementPosition;
    stamp: ElementPosition;
    signature1: ElementPosition;
    signature2: ElementPosition;
  };
}

export interface SalaryData {
  companyName: string;
  employeeName: string;
  designation: string;
  monthYear: string;
  employeeId: string;
  basicSalary: number;
  hra: number;
  conveyance: number;

  medical: number;
  specialAllowance: number;
  pf: number;
  tax: number;
  otherDeductions: number;
}

export interface ExperienceData {
  employeeName: string;
  designation: string;
  companyName: string;
  joiningDate: string;
  relievingDate: string;
  gender: 'Mr.' | 'Ms.';
  conduct: string;
}

export interface ApiResponse {
  text: string;
}

// --- NEW RESUME TYPES ---

export type ResumeDesign = 'modern' | 'classic' | 'creative';

export interface PersonalDetails {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
}

export interface Project {
  name: string;
  description: string;
  techStack: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
  projects: Project[];
  certifications?: Certification[];
}
