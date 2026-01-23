
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
