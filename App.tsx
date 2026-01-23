
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
  // Determine initial view based on URL. If 'd' param exists, it's a verification link.
  const [view, setView] = useState<'landing' | 'app'>(() => {
    return new URLSearchParams(window.location.search).has('d') ? 'app' : 'landing';
  });
  
  const [mode, setMode] = useState<AppMode>('course');

  // Certificate State
  const [data, setData] = useState<CertificateData>(INITIAL_DATA);
  const [certInfo, setCertInfo] = useState({ id: 'ISO-9001/GEN-100', verificationText: 'Verifying with Digital Signature...' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Salary State
  const [salaryData, setSalaryData] = useState<SalaryData>(INITIAL_SALARY);

  // Experience State
  const [expData, setExpData] = useState<ExperienceData>(INITIAL_EXP);
  const expCertRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Load verified data from URL
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
    if (mode === 'course') {
      const fetchInfo = async () => {
        const info = await generateAuthenticDetails(data.courseName);
        setCertInfo(info);
      };
      if (!new URLSearchParams(window.location.search).has('d')) {
        fetchInfo();
      }
    }
  }, [data.courseName, mode]);

  // Handlers for Course Certificate
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePositionChange = (key: keyof CertificateData['positions'], pos: ElementPosition) => {
    setData(prev => ({
      ...prev,
      positions: { ...prev.positions, [key]: pos }
    }));
  };

  const resetPositions = () => {
    setData(prev => ({ ...prev, positions: INITIAL_DATA.positions }));
  };

  // Handlers for Salary
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handlers for Experience
  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setExpData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Common Download Function for HTML2Canvas (Course & Exp Cert)
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
        const el = clonedDoc.querySelector('[data-certificate-root]') || clonedDoc.querySelector('div[style*="transform: scale"]');
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
      if (!canvas) return;
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
      pdf.save(`Certificate_${data.studentName || 'Student'}.pdf`);
    } catch (error) {
      alert('Failed to generate PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadExp = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      const canvas = await captureImage(expCertRef, true);
      if (!canvas) return;
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save(`Experience_Cert_${expData.employeeName}.pdf`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    setIsEditMode(false);
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      const canvas = await captureImage(certificateRef, false);
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `Certificate_${data.studentName || 'Student'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      alert("Screenshot failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isVerifiedView = new URLSearchParams(window.location.search).has('d');

  if (view === 'landing' && !isVerifiedView) {
    return <LandingPage onStart={(selectedMode) => {
      if (selectedMode) setMode(selectedMode);
      setView('app');
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      {/* Universal Header */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg z-50">
         <div className="flex items-center gap-4">
             <span className="font-black text-xl cursor-pointer" onClick={() => setView('landing')}>Format<span className="text-yellow-500">Hub</span></span>
             {!isPreviewMode && (
               <div className="hidden md:flex space-x-2">
                 <button onClick={() => setMode('course')} className={`px-4 py-1 rounded-full text-sm font-bold transition ${mode === 'course' ? 'bg-yellow-500 text-blue-900' : 'bg-blue-800 text-blue-200'}`}>Course Certificate</button>
                 <button onClick={() => setMode('experience')} className={`px-4 py-1 rounded-full text-sm font-bold transition ${mode === 'experience' ? 'bg-yellow-500 text-blue-900' : 'bg-blue-800 text-blue-200'}`}>Experience Letter</button>
                 <button onClick={() => setMode('salary')} className={`px-4 py-1 rounded-full text-sm font-bold transition ${mode === 'salary' ? 'bg-yellow-500 text-blue-900' : 'bg-blue-800 text-blue-200'}`}>Salary Slip (Excel)</button>
               </div>
             )}
         </div>
         <button onClick={() => setView('landing')} className="text-xs uppercase font-bold border border-white/30 px-3 py-1 rounded hover:bg-white hover:text-blue-900 transition">Exit Editor</button>
      </div>

      {/* Mobile Mode Switcher */}
      {!isPreviewMode && (
        <div className="md:hidden flex overflow-x-auto p-2 bg-blue-800 space-x-2 no-scrollbar">
           <button onClick={() => setMode('course')} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold ${mode === 'course' ? 'bg-white text-blue-900' : 'text-white'}`}>Certificate</button>
           <button onClick={() => setMode('experience')} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold ${mode === 'experience' ? 'bg-white text-blue-900' : 'text-white'}`}>Exp. Letter</button>
           <button onClick={() => setMode('salary')} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold ${mode === 'salary' ? 'bg-white text-blue-900' : 'text-white'}`}>Salary Slip</button>
        </div>
      )}

      {/* MODE: SALARY SLIP */}
      {mode === 'salary' && (
        <SalarySlipGenerator data={salaryData} onChange={handleSalaryChange} />
      )}

      {/* MODE: EXPERIENCE CERTIFICATE */}
      {mode === 'experience' && (
        <ExperienceCertificate 
          data={expData} 
          onChange={handleExpChange} 
          onDownload={handleDownloadExp}
          previewRef={expCertRef}
        />
      )}

      {/* MODE: COURSE CERTIFICATE (Existing Logic) */}
      {mode === 'course' && (
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-[calc(100vh-64px)]">
          {isPreviewMode && (
            <div className="fixed top-0 left-0 w-full z-[100] bg-blue-900 text-white p-3 flex justify-between items-center no-print shadow-2xl border-b-2 border-yellow-500">
              <div className="flex items-center space-x-3">
                <span className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full font-black text-xs">APPROVED</span>
                <span className="font-bold tracking-widest uppercase text-sm">Official Digital Verification View</span>
              </div>
              <button onClick={() => {
                  if (isVerifiedView) window.location.href = window.location.origin + window.location.pathname;
                  else setIsPreviewMode(false);
                }} className="bg-white text-blue-900 px-4 py-1 rounded font-black hover:bg-gray-100 transition-colors text-xs uppercase">
                {isVerifiedView ? 'Generate New' : 'Close Preview'}
              </button>
            </div>
          )}

          {!isPreviewMode && (
            <div className="w-full lg:w-[400px] bg-white shadow-2xl p-6 overflow-y-auto no-print h-full flex flex-col z-20 lg:border-r-4 lg:border-blue-900">
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between p-3 bg-blue-900 text-white rounded-xl shadow-lg">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Interactive Editor</p>
                    <p className="text-xs font-bold">Drag components on cert</p>
                  </div>
                  <button onClick={() => setIsEditMode(!isEditMode)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${isEditMode ? 'bg-yellow-500 text-blue-900' : 'bg-blue-800 text-blue-200'}`}>
                    {isEditMode ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Certificate Theme</label>
                  <select 
                    name="theme" 
                    value={data.theme} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold bg-white"
                  >
                    {THEMES.map(theme => (
                      <option key={theme.id} value={theme.id}>{theme.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Institution Name</label>
                  <input type="text" name="institutionName" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.institutionName} onChange={handleInputChange} />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Student Full Name</label>
                  <input type="text" name="studentName" placeholder="Enter Full Legal Name" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.studentName} onChange={handleInputChange} />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Father's Name</label>
                  <input type="text" name="fathersName" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.fathersName} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Roll Number</label>
                    <input type="text" name="rollNumber" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.rollNumber} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Issue Date</label>
                    <input type="date" name="issueDate" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.issueDate} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Course Title</label>
                  <input type="text" name="courseName" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.courseName} onChange={handleInputChange} />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Course Instructor / Teacher</label>
                  <input type="text" name="teacherName" placeholder="Dr. S. Sharma" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.teacherName} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Duration</label>
                    <input type="text" name="duration" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-bold" value={data.duration} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Final Grade</label>
                    <select name="grade" className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none bg-white text-sm font-bold" value={data.grade} onChange={handleInputChange}>
                      <option value="A+">A+ (Distinction)</option>
                      <option value="A">A (Very Good)</option>
                      <option value="B+">B+ (Good)</option>
                      <option value="B">B (Fair)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Student Portrait (Mandatory)</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
                    <div className="text-center">
                      <p className="text-blue-600 font-bold text-xs uppercase">Click to Upload Photo</p>
                      <p className="text-[9px] text-gray-400 mt-1">PNG, JPG or JPEG supported</p>
                    </div>
                  </div>
                </div>
                
                <button onClick={resetPositions} className="w-full text-[10px] text-red-500 font-black uppercase tracking-widest hover:underline pt-2">
                  Reset Draggable Elements
                </button>
              </div>

              <div className="mt-8 space-y-3 pb-8 lg:pb-0">
                <button onClick={handleDownloadCourse} disabled={isLoading} className={`w-full bg-blue-950 text-white font-black py-4 rounded-xl flex items-center justify-center space-x-3 shadow-2xl hover:bg-black transition-all ${isLoading ? 'opacity-50' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1h16v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>DOWNLOAD OFFICIAL PDF</span>
                </button>
                <button onClick={handleDownloadImage} disabled={isLoading} className="w-full bg-white border-2 border-blue-900 text-blue-900 font-black py-3 rounded-xl flex items-center justify-center space-x-3 hover:bg-blue-50 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>SAVE AS HIGH-RES IMAGE</span>
                </button>
              </div>
            </div>
          )}

          <div className={`flex-1 bg-gray-300 flex items-center justify-center overflow-auto ${isPreviewMode ? 'p-0' : 'p-4 lg:p-12'}`}>
            {/* Improved Scaling for Certificate - Responsive Transform */}
            <div className={`${isPreviewMode ? 'scale-100' : 'scale-[0.28] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.45] xl:scale-[0.7] 2xl:scale-[0.9]'} origin-center transition-all duration-500 shadow-2xl`}>
              <Certificate 
                data={data} 
                certInfo={certInfo} 
                certificateRef={certificateRef} 
                isEditMode={isEditMode}
                onPositionChange={handlePositionChange}
              />
            </div>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="fixed inset-0 bg-blue-950/90 backdrop-blur-md z-[200] flex flex-col items-center justify-center text-white">
           <div className="w-20 h-20 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
           <p className="font-black text-2xl tracking-[0.3em] uppercase">Processing Document...</p>
           <p className="text-blue-300 mt-2 font-bold italic">Generating Authentic Format</p>
        </div>
      )}
    </div>
  );
};

export default App;
