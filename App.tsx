import React, { useState, useRef } from 'react';
import LandingPage from './components/LandingPage';
import CertificateGenerator from './components/CertificateGenerator';
import SalarySlipGenerator from './components/SalarySlipGenerator';
import ExperienceCertificate from './components/ExperienceCertificate';
import ResumeBuilder from './components/ResumeBuilder';
import { AboutUs, PrivacyPolicy, TermsOfService } from './components/InfoPages';
import { SalaryData, ExperienceData } from './types';

// Define the type for the current view/mode
type AppMode = 'landing' | 'course' | 'salary' | 'experience' | 'resume' | 'about' | 'privacy' | 'terms';

const INITIAL_SALARY_DATA: SalaryData = {
  companyName: '', employeeName: '', designation: '', monthYear: '', employeeId: '',
  basicSalary: '', hra: '', conveyance: '', medical: '', specialAllowance: '',
  pf: '', tax: '', otherDeductions: ''
};

const INITIAL_EXPERIENCE_DATA: ExperienceData = {
  companyName: '', gender: 'Mr.', employeeName: '', designation: '',
  joiningDate: '', relievingDate: ''
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('landing');

  // State for Salary Slip Generator
  const [salaryData, setSalaryData] = useState<SalaryData>(INITIAL_SALARY_DATA);
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // State & logic for Experience Certificate
  const [experienceData, setExperienceData] = useState<ExperienceData>(INITIAL_EXPERIENCE_DATA);
  const experiencePreviewRef = useRef<HTMLDivElement>(null);
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setExperienceData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleExperienceDownload = async () => {
    if (!experiencePreviewRef.current) return;
    try {
      // Temporarily scale up for better quality
      experiencePreviewRef.current.style.transform = 'scale(1)';
      await new Promise(r => setTimeout(r, 100));

      const canvas = await (window as any).html2canvas(experiencePreviewRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Experience_Letter_${experienceData.employeeName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert('Failed to generate PDF.');
    } finally {
        // Restore original scale
       if (experiencePreviewRef.current) {
          experiencePreviewRef.current.style.transform = 'scale(0.7)';
       }
    }
  };

  const handleBack = () => setMode('landing');

  const renderHeader = (title: string) => (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg z-50 sticky top-0 no-print">
      <button onClick={handleBack} className="font-bold text-sm hover:text-yellow-400 transition-colors">← Back to Home</button>
      <h1 className="font-black text-lg md:text-xl text-center">Format<span className="text-yellow-500">Hub</span> | {title}</h1>
      <div style={{ minWidth: '120px' }} /> {/* Spacer */}
    </header>
  );

  switch (mode) {
    case 'course':
      return <CertificateGenerator onBack={handleBack} />;
    
    case 'salary':
      return (
        <div className="min-h-screen bg-gray-100">
          {renderHeader('Salary Slip Generator')}
          <SalarySlipGenerator data={salaryData} onChange={handleSalaryChange} />
        </div>
      );

    case 'experience':
      return (
        <div className="min-h-screen bg-gray-100">
          {renderHeader('Experience Letter Generator')}
          <ExperienceCertificate 
            data={experienceData} 
            onChange={handleExperienceChange} 
            onDownload={handleExperienceDownload} 
            previewRef={experiencePreviewRef}
          />
        </div>
      );
    
    case 'resume':
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col h-screen">
           {renderHeader('AI Resume Builder')}
          <ResumeBuilder />
        </div>
      );

    case 'about': return <AboutUs onBack={handleBack} />;
    case 'privacy': return <PrivacyPolicy onBack={handleBack} />;
    case 'terms': return <TermsOfService onBack={handleBack} />;
    
    default:
      return <LandingPage onStart={(selectedMode) => setMode(selectedMode || 'resume')} onNavigate={setMode} />;
  }
};

export default App;
