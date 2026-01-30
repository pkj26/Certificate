import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import LandingPage from './components/LandingPage';
import SEO from './components/SEO';
import { SalaryData, ExperienceData } from './types';

// Lazy load heavy components for better performance (Lighthouse 100)
const CertificateGenerator = lazy(() => import('./components/CertificateGenerator'));
const SalarySlipGenerator = lazy(() => import('./components/SalarySlipGenerator'));
const ExperienceCertificate = lazy(() => import('./components/ExperienceCertificate'));
const ResumeBuilder = lazy(() => import('./components/ResumeBuilder'));
const ImageResizer = lazy(() => import('./components/ImageResizer'));
const ImageToPdf = lazy(() => import('./components/ImageToPdf'));
const PosterMaker = lazy(() => import('./components/PosterMaker'));
const AboutUs = lazy(() => import('./components/InfoPages').then(m => ({ default: m.AboutUs })));
const PrivacyPolicy = lazy(() => import('./components/InfoPages').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/InfoPages').then(m => ({ default: m.TermsOfService })));

const INITIAL_SALARY_DATA: SalaryData = {
  companyName: '', employeeName: '', designation: '', monthYear: '', employeeId: '',
  basicSalary: '', hra: '', conveyance: '', medical: '', specialAllowance: '',
  pf: '', tax: '', otherDeductions: ''
};

const INITIAL_EXPERIENCE_DATA: ExperienceData = {
  companyName: '', gender: 'Mr.', employeeName: '', designation: '',
  joiningDate: '', relievingDate: ''
};

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  };

  const [salaryData, setSalaryData] = useState<SalaryData>(INITIAL_SALARY_DATA);
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [experienceData, setExperienceData] = useState<ExperienceData>(INITIAL_EXPERIENCE_DATA);
  const experiencePreviewRef = useRef<HTMLDivElement>(null);
  
  const handleExperienceDownload = async () => {
    if (!experiencePreviewRef.current) return;
    try {
      const canvas = await (window as any).html2canvas(experiencePreviewRef.current, { scale: 3 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new (window as any).jspdf.jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save(`Experience_Letter.pdf`);
    } catch (e) { alert('Download failed'); }
  };

  const renderHeader = (title: string) => (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <button onClick={() => navigate('/')} className="font-bold text-sm hover:text-yellow-400">← Back</button>
      <h1 className="font-black text-lg">FormatHub | {title}</h1>
      <div className="w-12"></div>
    </header>
  );

  return (
    <Suspense fallback={<PageLoader />}>
      {route === '/certificate-generator' ? (
        <CertificateGenerator onBack={() => navigate('/')} />
      ) : route === '/salary-slip-generator' ? (
        <div className="min-h-screen bg-gray-100">
          {renderHeader('Salary Slip')}
          <SalarySlipGenerator data={salaryData} onChange={handleSalaryChange} />
        </div>
      ) : route === '/experience-letter-generator' ? (
        <div className="min-h-screen bg-gray-100">
          {renderHeader('Experience Letter')}
          <ExperienceCertificate data={experienceData} onChange={(e) => setExperienceData(prev => ({ ...prev, [e.target.name]: e.target.value }))} onDownload={handleExperienceDownload} previewRef={experiencePreviewRef} />
        </div>
      ) : route === '/resume-builder' ? (
        <div className="min-h-screen bg-gray-100 flex flex-col h-screen">
          {renderHeader('Resume Builder')}
          <ResumeBuilder />
        </div>
      ) : route === '/image-resizer' ? (
        <div className="min-h-screen bg-gray-50">
          {renderHeader('Image Resizer')}
          <ImageResizer />
        </div>
      ) : route === '/jpg-to-pdf' ? (
        <div className="min-h-screen bg-gray-50">
          {renderHeader('Image to PDF')}
          <ImageToPdf />
        </div>
      ) : route === '/poster-maker' ? (
        <div className="min-h-screen bg-gray-50">
          {renderHeader('Poster Maker')}
          <PosterMaker />
        </div>
      ) : route === '/about' ? (
        <AboutUs onBack={() => navigate('/')} />
      ) : route === '/privacy' ? (
        <PrivacyPolicy onBack={() => navigate('/')} />
      ) : route === '/terms' ? (
        <TermsOfService onBack={() => navigate('/')} />
      ) : (
        <>
          <SEO title="FormatHub: Free Resume Builder & Document Tool" description="India's best free tool for SSC photo resizer, UP Scholarship status and DCA certificates." />
          <LandingPage navigate={navigate} />
        </>
      )}
    </Suspense>
  );
};

export default App;