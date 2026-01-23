
import React, { useState, useRef, useEffect } from 'react';
import { CertificateData, SalaryData, ExperienceData, ElementPosition, ThemeType } from './types';
import Certificate from './components/Certificate';
import SalarySlipGenerator from './components/SalarySlipGenerator';
import ExperienceCertificate from './components/ExperienceCertificate';
import LandingPage from './components/LandingPage';
import { generateAuthenticDetails } from './services/geminiService';

const INITIAL_DATA: CertificateData = {
  studentName: '',
  fathersName: '',
  courseName: 'Advance Diploma in Computer Application (ADCA)',
  duration: '12 Months',
  grade: 'A',
  teacherName: '',
  rollNumber: 'CERT/' + Math.floor(1000 + Math.random() * 9000) + '/' + new Date().getFullYear(),
  issueDate: new Date().toISOString().split('T')[0],
  photoUrl: null,
  institutionName: 'NATIONAL INSTITUTE OF TECHNICAL SKILLS',
  theme: 'classic',
  positions: {
    photo: { x: 0, y: 0 },
    stamp: { x: 0, y: 0 },
    signature1: { x: 0, y: 0 },
    signature2: { x: 0, y: 0 }
  }
};

const INITIAL_SALARY: SalaryData = {
  companyName: '',
  employeeName: '',
  designation: '',
  monthYear: 'Jan 2026',
  employeeId: '',
  basicSalary: 0,
  hra: 0,
  conveyance: 0,
  medical: 0,
  specialAllowance: 0,
  pf: 0,
  tax: 0,
  otherDeductions: 0
};

const INITIAL_EXP: ExperienceData = {
  companyName: '',
  employeeName: '',
  designation: '',
  joiningDate: '',
  relievingDate: new Date().toISOString().split('T')[0],
  gender: 'Mr.',
  conduct: 'Excellent'
};

const THEMES: { id: ThemeType; name: string; color: string }[] = [
  { id: 'classic', name: 'Classic Gold', color: '#b8860b' },
  { id: 'modern-blue', name: 'Modern Azure', color: '#2563eb' },
  { id: 'academic-red', name: 'Academic Red', color: '#991b1b' },
  { id: 'tech-green', name: 'Tech Green', color: '#166534' },
  { id: 'royal-purple', name: 'Royal Purple', color: '#6b21a8' },
  { id: 'minimal-black', name: 'Minimal Mono', color: '#000000' },
  { id: 'corporate-teal', name: 'Corporate Teal', color: '#0d9488' },
  { id: 'creative-orange', name: 'Creative Orange', color: '#ea580c' },
  { id: 'navy-gold', name: 'Navy Diplomat', color: '#1e3a8a' },
  { id: 'slate-gray', name: 'Slate Official', color: '#475569' },
];

type AppMode = 'course' | 'salary' | 'experience';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>(() => {
    return new URLSearchParams(window.location.search).has('d') ? 'app' : 'landing';
  });
  
  const [mode, setMode] = useState<AppMode>('course');
  const [data, setData] = useState<CertificateData>(INITIAL_DATA);
  const [certInfo, setCertInfo] = useState({ id: 'ISO-9001/GEN-100', verificationText: 'Verifying with Digital Signature...' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [salaryData, setSalaryData] = useState<SalaryData>(INITIAL_SALARY);
  const [expData, setExpData] = useState<ExperienceData>(INITIAL_EXP);
  const expCertRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('d');
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        setData(decodedData);
        setIsPreviewMode(true);
        setView('app'); 
        setMode('course');
      } catch (e) {
        console.error("Failed to decode verified certificate data");
      }
    }
  }, []);

  useEffect(() => {
    if (mode === 'course' && !new URLSearchParams(window.location.search).has('d')) {
      generateAuthenticDetails(data.courseName).then(setCertInfo);
    }
  }, [data.courseName, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setData(prev => ({ ...prev, photoUrl: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handlePositionChange = (key: keyof CertificateData['positions'], pos: ElementPosition) => {
    setData(prev => ({ ...prev, positions: { ...prev.positions, [key]: pos } }));
  };

  const resetPositions = () => setData(prev => ({ ...prev, positions: INITIAL_DATA.positions }));
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSalaryData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setExpData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const captureImage = async (ref: React.RefObject<HTMLDivElement>, isPortrait = false) => {
    if (!ref.current) return null;
    return await (window as any).html2canvas(ref.current, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: isPortrait ? 794 : 1123,
      height: isPortrait ? 1123 : 794,
      onclone: (clonedDoc: Document) => {
        const el = clonedDoc.querySelector('[data-certificate-root]');
        if (el) {
          (el as HTMLElement).style.transform = 'none';
          (el as HTMLElement).style.margin = '0';
        }
      }
    });
  };

  const handleDownloadCourse = async () => {
    setIsEditMode(false);
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      const canvas = await captureImage(certificateRef, false);
      if (canvas) {
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const { jsPDF } = (window as any).jspdf;
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
        pdf.save(`Certificate_${data.studentName || 'Student'}.pdf`);
      }
    } catch (error) { alert('Failed to generate PDF.'); } finally { setIsLoading(false); }
  };

  const handleDownloadExp = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      const canvas = await captureImage(expCertRef, true);
      if (canvas) {
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const { jsPDF } = (window as any).jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        pdf.save(`Experience_Cert_${expData.employeeName}.pdf`);
      }
    } catch (error) { alert('Failed to generate PDF.'); } finally { setIsLoading(false); }
  };

  const handleDownloadImage = async () => {
    setIsEditMode(false);
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      const canvas = await captureImage(certificateRef, false);
      if (canvas) {
        const link = document.createElement('a');
        link.download = `Certificate_${data.studentName || 'Student'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (e) { alert("Screenshot failed"); } finally { setIsLoading(false); }
  };

  const isVerifiedView = new URLSearchParams(window.location.search).has('d');
  if (view === 'landing' && !isVerifiedView) return <LandingPage onStart={(m) => { if (m) setMode(m); setView('app'); }} />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative font-sans text-gray-900">
      {/* Universal Header */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg z-50 sticky top-0">
         <div className="flex items-center gap-4">
             <span className="font-black text-xl cursor-pointer" onClick={() => setView('landing')}>Format<span className="text-yellow-500">Hub</span></span>
             {!isPreviewMode && (
               <div className="hidden md:flex space-x-1">
                 {['course', 'experience', 'salary'].map(m => (
                   <button key={m} onClick={() => setMode(m as AppMode)} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${mode === m ? 'bg-yellow-500 text-blue-900 shadow-md' : 'hover:bg-blue-800 text-blue-200'}`}>
                     {m === 'course' ? 'Certificate' : m === 'salary' ? 'Salary Slip' : 'Exp Letter'}
                   </button>
                 ))}
               </div>
             )}
         </div>
         <button onClick={() => setView('landing')} className="text-xs uppercase font-bold border border-white/30 px-3 py-1 rounded hover:bg-white hover:text-blue-900 transition">Exit Editor</button>
      </div>

      {/* Mobile Mode Switcher */}
      {!isPreviewMode && (
        <div className="md:hidden flex overflow-x-auto p-2 bg-blue-800 space-x-2 no-scrollbar shadow-inner">
           {['course', 'experience', 'salary'].map(m => (
             <button key={m} onClick={() => setMode(m as AppMode)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold shadow-sm ${mode === m ? 'bg-white text-blue-900' : 'text-white/80 bg-blue-900/50'}`}>
                {m === 'course' ? 'Certificate' : m === 'salary' ? 'Salary Slip' : 'Exp Letter'}
             </button>
           ))}
        </div>
      )}

      <div className="flex-1 overflow-x-hidden">
        {mode === 'salary' && <SalarySlipGenerator data={salaryData} onChange={handleSalaryChange} />}
        {mode === 'experience' && <ExperienceCertificate data={expData} onChange={handleExpChange} onDownload={handleDownloadExp} previewRef={expCertRef} />}
        
        {mode === 'course' && (
          <div className="flex flex-col lg:flex-row h-full">
            {isPreviewMode && (
              <div className="fixed top-0 left-0 w-full z-[100] bg-blue-900 text-white p-3 flex justify-between items-center no-print shadow-2xl border-b-2 border-yellow-500">
                <div className="flex items-center space-x-3">
                  <span className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full font-black text-xs">APPROVED</span>
                  <span className="font-bold tracking-widest uppercase text-sm">Official Digital Verification View</span>
                </div>
                <button onClick={() => { isVerifiedView ? window.location.href = window.location.origin + window.location.pathname : setIsPreviewMode(false); }} className="bg-white text-blue-900 px-4 py-1 rounded font-black hover:bg-gray-100 transition-colors text-xs uppercase">
                  {isVerifiedView ? 'Generate New' : 'Close Preview'}
                </button>
              </div>
            )}

            {!isPreviewMode && (
              <div className="w-full lg:w-[350px] xl:w-[400px] bg-white shadow-2xl p-6 overflow-y-auto no-print h-auto lg:h-[calc(100vh-64px)] z-20 border-r border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-800">Editor Mode</p>
                      <p className="text-xs font-bold text-blue-600">Drag & Drop Enabled</p>
                    </div>
                    <button onClick={() => setIsEditMode(!isEditMode)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${isEditMode ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 border'}`}>
                      {isEditMode ? 'ACTIVE' : 'LOCKED'}
                    </button>
                  </div>
                  
                  {/* Common inputs */}
                  {[
                    { label: 'Theme Style', name: 'theme', type: 'select', options: THEMES },
                    { label: 'Institute Name', name: 'institutionName' },
                    { label: 'Student Name', name: 'studentName' },
                    { label: 'Father Name', name: 'fathersName' },
                    { label: 'Roll Number', name: 'rollNumber' },
                    { label: 'Course Name', name: 'courseName' },
                    { label: 'Duration', name: 'duration' },
                  ].map((field: any) => (
                    <div key={field.name} className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                      {field.type === 'select' ? (
                        <select name={field.name} value={(data as any)[field.name]} onChange={handleInputChange} className="w-full px-3 py-2 border-2 border-gray-100 rounded-lg text-sm font-bold bg-white focus:border-blue-500 outline-none">{field.options.map((o: any) => <option key={o.id} value={o.id}>{o.name}</option>)}</select>
                      ) : (
                        <input type="text" name={field.name} value={(data as any)[field.name]} onChange={handleInputChange} className="w-full px-3 py-2 border-2 border-gray-100 rounded-lg text-sm font-bold focus:border-blue-500 outline-none transition-colors" />
                      )}
                    </div>
                  ))}
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Photo</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-3 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer text-center">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
                      <span className="text-blue-600 font-bold text-xs uppercase">Upload Photo</span>
                    </div>
                  </div>

                  <button onClick={resetPositions} className="w-full text-[10px] text-red-400 font-bold uppercase hover:text-red-600 pt-2">Reset Positions</button>
                </div>

                <div className="mt-8 space-y-3 pb-8">
                  <button onClick={handleDownloadCourse} disabled={isLoading} className="w-full bg-blue-900 text-white font-black py-4 rounded-xl shadow-lg hover:bg-blue-950 transition-all flex items-center justify-center gap-2">
                    {isLoading ? <span className="animate-spin">⌛</span> : <span>📄</span>} DOWNLOAD PDF
                  </button>
                </div>
              </div>
            )}

            <div className={`flex-1 bg-gray-200/50 flex items-center justify-center overflow-auto relative ${isPreviewMode ? 'p-0' : 'p-4 lg:p-12'}`}>
              <div className={`${isPreviewMode ? 'scale-100' : 'scale-[0.35] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.6] xl:scale-[0.75] 2xl:scale-[0.9]'} origin-center transition-all duration-300 shadow-2xl`}>
                <Certificate data={data} certInfo={certInfo} certificateRef={certificateRef} isEditMode={isEditMode} onPositionChange={handlePositionChange} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex flex-col items-center justify-center text-white">
           <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-6"></div>
           <p className="font-black text-xl tracking-widest uppercase">Generating...</p>
        </div>
      )}
    </div>
  );
};

export default App;
