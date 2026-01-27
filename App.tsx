import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import CertificateGenerator from './components/CertificateGenerator';
import SalarySlipGenerator from './components/SalarySlipGenerator';
import ExperienceCertificate from './components/ExperienceCertificate';
import ResumeBuilder from './components/ResumeBuilder';
import ImageResizer from './components/ImageResizer';
import ImageToPdf from './components/ImageToPdf';
import PosterMaker from './components/PosterMaker';
import { AboutUs, PrivacyPolicy, TermsOfService } from './components/InfoPages';
import SEO from './components/SEO';
import { SalaryData, ExperienceData } from './types';

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
  // Use path-based routing for clean URLs
  const getRouteFromPath = () => window.location.pathname;

  const [route, setRoute] = useState(getRouteFromPath());

  useEffect(() => {
    const handlePopState = () => setRoute(getRouteFromPath());
    // 'popstate' event fires when using the browser's back/forward buttons
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    // Use the History API to change the URL without a page reload
    window.history.pushState({}, '', path);
    setRoute(path); // Update state to trigger a re-render
    window.scrollTo(0, 0); // Scroll to top on page change
  };

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
       if (experiencePreviewRef.current) {
          experiencePreviewRef.current.style.transform = 'scale(0.7)';
       }
    }
  };

  const renderHeader = (title: string) => (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg z-50 sticky top-0 no-print">
      <button onClick={() => navigate('/')} className="font-bold text-sm hover:text-yellow-400 transition-colors">← Back to Home</button>
      <h1 className="font-black text-lg md:text-xl text-center">Format<span className="text-yellow-500">Hub</span> | {title}</h1>
      <div style={{ minWidth: '120px' }} /> {/* Spacer */}
    </header>
  );

  const renderComponent = () => {
    switch (route) {
      case '/certificate-generator':
        return (
          <>
            <SEO 
              title="Free Certificate Generator | Create & Download PDF" 
              description="Easily create professional computer course certificates (DCA, ADCA). Upload student name and photo, choose a design, and download a high-quality PDF for free." 
              keywords="certificate generator, computer course certificate maker, dca certificate format, free certificate maker with photo, online certificate builder"
            />
            <CertificateGenerator onBack={() => navigate('/')} />
          </>
        );
      case '/salary-slip-generator':
        return (
          <div className="min-h-screen bg-gray-100">
            <SEO 
              title="Free Salary Slip Generator | Download PDF & Excel" 
              description="Generate professional salary slips instantly. Automatic calculations for HRA, PF, and Tax. Download in PDF or editable Excel format for free." 
              keywords="salary slip format in excel, online salary slip generator, payslip maker free, download salary slip pdf, simple salary slip format india, employee payslip generator, monthly salary slip calculator"
            />
            {renderHeader('Salary Slip Generator')}
            <SalarySlipGenerator data={salaryData} onChange={handleSalaryChange} />
          </div>
        );
      case '/experience-letter-generator':
        return (
          <div className="min-h-screen bg-gray-100">
            <SEO 
              title="Experience Letter Generator | Free PDF Download" 
              description="Create official experience and relieving letters in a professional format. Fill in the details and download a print-ready PDF instantly." 
              keywords="experience letter format, relieving letter generator, work experience certificate, job experience letter pdf, free hr tools india"
            />
            {renderHeader('Experience Letter Generator')}
            <ExperienceCertificate 
              data={experienceData} 
              onChange={handleExperienceChange} 
              onDownload={handleExperienceDownload} 
              previewRef={experiencePreviewRef}
            />
          </div>
        );
      case '/resume-builder':
        return (
          <div className="min-h-screen bg-gray-100 flex flex-col h-screen">
            <SEO 
              title="AI Resume Builder | 100+ Free ATS Templates (1-5 Pages)" 
              description="India's best AI resume builder. Get pre-filled, ATS-friendly templates for any job role. Create and download a 1, 2, or 5-page professional resume in minutes." 
              keywords="ai resume builder, free resume maker for freshers, ats resume templates, download resume pdf, cv maker india, biodata format for job"
            />
            {renderHeader('AI Resume Builder')}
            <ResumeBuilder />
          </div>
        );
      case '/image-resizer':
        return (
          <div className="min-h-screen bg-gray-50">
             <SEO 
               title="Govt Exam Photo Resizer (20kb - 50kb) | SSC, UPSC, IBPS" 
               description="Resize and compress photos and signatures for SSC, UPSC, IBPS, NEET online forms. Convert image to 20kb, 50kb in cm/mm dimensions instantly." 
               keywords="ssc photo resizer, image compressor 20kb to 50kb, resize photo for upsc, signature resizer for govt exam, photo resizer in cm, passport size photo maker online"
             />
             {renderHeader('Image Resizer Tool')}
             <ImageResizer />
          </div>
        );
      case '/jpg-to-pdf':
        return (
          <div className="min-h-screen bg-gray-50">
             <SEO 
               title="JPG to PDF Converter | Combine Photos to PDF Free" 
               description="Convert multiple images (JPG/PNG) to a single PDF document online. Best for IGNOU assignments, SSC/UPSC documents, and ID proofs. Fast & Secure." 
               keywords="jpg to pdf converter, image to pdf, combine photos to pdf, convert handwritten notes to pdf, ignou assignment pdf maker, free pdf tools"
             />
             {renderHeader('JPG to PDF Converter')}
             <ImageToPdf />
          </div>
        );
      case '/poster-maker':
        return (
          <div className="min-h-screen bg-gray-50">
             <SEO 
               title="Free Online Poster Maker 2026 | Create Ads & Invites" 
               description="Design professional business posters, festival greetings (Diwali/Eid), and event invitations online. Drag and drop, add photos, and download PNG." 
               keywords="online poster maker, free graphic design tool, festival poster maker with photo, diwali poster maker, business flyer design free"
             />
             {renderHeader('Poster Maker Tool')}
             <PosterMaker />
          </div>
        );
      case '/about':
        return <AboutUs onBack={() => navigate('/')} />;
      case '/privacy':
        return <PrivacyPolicy onBack={() => navigate('/')} />;
      case '/terms':
        return <TermsOfService onBack={() => navigate('/')} />;
      default:
        return (
          <>
            <SEO 
              title="FormatHub: Free AI Resume Builder & Document Generators" 
              description="India's #1 free platform to create professional multi-page resumes with AI, generate salary slips, experience letters, and high-quality course certificates." 
              keywords="formathub, free online tools, document generator, resume builder india, certificate maker, salary slip generator, pdf tools"
            />
            <LandingPage navigate={navigate} />
          </>
        );
    }
  };

  return renderComponent();
};

export default App;