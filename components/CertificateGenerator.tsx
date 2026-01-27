
import React, { useState, useRef, useEffect } from 'react';
import { CertificateData, ElementPosition, ThemeType } from '../types';
import Certificate from './Certificate';
import { generateAuthenticDetails } from '../services/geminiService';

const INITIAL_DATA: CertificateData = {
  studentName: 'STUDENT NAME',
  fathersName: 'FATHER NAME',
  courseName: 'Advance Diploma in Computer Application',
  duration: '12 Months',
  grade: 'A+',
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

interface CertificateGeneratorProps {
    onBack: () => void;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ onBack }) => {
  useEffect(() => {
    console.log("Component Loaded: CertificateGenerator.tsx");
  }, []);

  const [data, setData] = useState<CertificateData>(INITIAL_DATA);
  const [certInfo, setCertInfo] = useState({ id: 'ISO-9001/GEN-100', verificationText: 'Verifying with Digital Signature...' });
  const [isEditMode, setIsEditMode] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Parse verification data from URL search params (e.g., ?d=...)
    const params = new URLSearchParams(window.location.search);
    const verificationData = params.get('d');
    if (verificationData) {
      try {
        const decodedData = JSON.parse(atob(verificationData));
        setData(prev => ({ ...prev, ...decodedData }));
      } catch (e) {
        console.error("Failed to parse verification data:", e);
      }
    }
  }, []);

  useEffect(() => {
    generateAuthenticDetails(data.courseName).then(setCertInfo);
  }, [data.courseName]);

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

  const handleDownloadPDF = async () => {
    setIsEditMode(false);
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      if (!certificateRef.current) return;
      const canvas = await (window as any).html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc: Document) => {
          const el = clonedDoc.querySelector('[data-certificate-root]');
          if (el) {
            (el as HTMLElement).style.transform = 'none';
          }
        }
      });
      if (canvas) {
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const { jsPDF } = (window as any).jspdf;
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
        pdf.save(`Certificate_${data.studentName || 'Student'}.pdf`);
      }
    } catch (error) { 
        console.error("PDF generation failed:", error);
        alert('Failed to generate PDF.'); 
    } finally { 
        setIsLoading(false); 
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg z-50 sticky top-0 no-print">
         <button onClick={onBack} className="font-bold text-sm hover:text-yellow-400 transition-colors">← Back to Home</button>
         <h1 className="font-black text-lg md:text-xl text-center">Format<span className="text-yellow-500">Hub</span> | Certificate Generator</h1>
         <div style={{ minWidth: '120px' }} /> {/* Spacer */}
      </header>

      <div className="flex-1 flex flex-col lg:flex-row h-full">
        <aside className="w-full lg:w-[350px] xl:w-[400px] bg-white shadow-2xl p-6 overflow-y-auto h-auto lg:h-[calc(100vh-64px)] z-20 border-r border-gray-200 no-print">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-800">Editor Mode</p>
                  <p className="text-xs font-bold text-blue-600">Drag &amp; Drop Elements</p>
                </div>
                <button onClick={() => setIsEditMode(!isEditMode)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${isEditMode ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 border'}`}>
                  {isEditMode ? 'ACTIVE' : 'LOCKED'}
                </button>
              </div>
              
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
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Student Photo</label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-3 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer text-center">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
                  <span className="text-blue-600 font-bold text-xs uppercase">{data.photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={resetPositions} className="w-full text-[10px] text-red-400 font-bold uppercase hover:text-red-600 transition-all">Reset Positions</button>
                <button onClick={handleDownloadPDF} disabled={isLoading} className="w-full bg-blue-900 text-white font-black py-3 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2">
                 {isLoading ? <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"/> : '🖨️'} DOWNLOAD PDF
                </button>
              </div>
            </div>
        </aside>

        <main className="flex-1 bg-gray-100 p-4 lg:p-12 overflow-y-auto h-auto lg:h-[calc(100vh-64px)] z-10 flex items-center justify-center">
            <div className="print-area" style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
                <Certificate 
                  data={data}
                  certInfo={certInfo}
                  certificateRef={certificateRef}
                  isEditMode={isEditMode}
                  onPositionChange={handlePositionChange}
                />
            </div>
        </main>
      </div>
       <style>{`
          @media print {
            .no-print { display: none; }
            main { padding: 0 !important; }
            .print-area { transform: scale(1) !important; }
          }
      `}</style>
    </div>
  );
};

export default CertificateGenerator;
