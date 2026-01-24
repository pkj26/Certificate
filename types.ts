
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

export interface ApiResponse {
  text: string;
}

// FIX: Added missing type definitions for Salary, Experience, and Resume modules.
export interface SalaryData {
  companyName: string;
  employeeName: string;
  designation: string;
  monthYear: string;
  employeeId: string;
  basicSalary: string;
  hra: string;
  conveyance: string;
  medical: string;
  specialAllowance: string;
  pf: string;
  tax: string;
  otherDeductions: string;
}

export interface ExperienceData {
  companyName: string;
  gender: 'Mr.' | 'Ms.';
  employeeName: string;
  designation: string;
  joiningDate: string;
  relievingDate: string;
}

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

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
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
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
}
