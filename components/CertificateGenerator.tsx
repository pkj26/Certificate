import React, { useState, useRef, useEffect } from 'react';
import { CertificateData, ElementPosition, ThemeType } from '../types';
import Certificate from './Certificate';
import { generateAuthenticDetails } from '../services/geminiService';

const INITIAL_DATA: CertificateData = {
  studentName: 'STUDENT NAME',
  fathersName: 'FATHER NAME',
  courseName: 'Advance Diploma in Computer Application (ADCA)',
  duration: '12 Months',
  grade: 'A+',
  teacherName: 'S. K. VERMA',
  rollNumber: 'CERT/' + Math.floor(1000 + Math.random() * 9000) + '/' + new Date().getFullYear(),
  issueDate: new Date().toISOString().split('T')[0],
  photoUrl: null,
  institutionName: 'NATIONAL INSTITUTE OF TECHNICAL SKILLS',
  theme: 'navy-gold',
  positions: {
    photo: { x: 0, y: 0 },
    stamp: { x: 0, y: 0 },
    signature1: { x: 0, y: 0 },
    signature2: { x: 0, y: 0 }
  }
};

const COURSE_TEMPLATES = [
  { id: 'adca', name: 'ADCA (12 Months)', course: 'Advance Diploma in Computer Application' },
  { id: 'dca', name: 'DCA (6 Months)', course: 'Diploma in Computer Application' },
  { id: 'typing', name: 'Typing Certificate', course: 'Computer Typing Skills (Hindi & English)' },
  { id: 'tally', name: 'Tally Prime with GST', course: 'Professional Accounting & Tally Prime' },
  { id: 'ccc', name: 'CCC Course', course: 'Course on Computer Concepts (CCC)' },
  { id: 'yoga', name: 'Yoga Training', course: 'Yoga & Wellness Instructor Course' }
];

const THEMES: { id: ThemeType; name: string; color: string }[] = [
  { id: 'navy-gold', name: 'Govt. Style (Navy)', color: '#1e3a8a' },
  { id: 'classic', name: 'Traditional Gold', color: '#b8860b' },
  { id: 'academic-red', name: 'Academic Red', color: '#991b1b' },
  { id: 'tech-green', name: 'Modern Tech', color: '#166534' },
];

interface CertificateGeneratorProps {
    onBack: () => void;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ onBack }) => {
  const [data, setData] = useState<CertificateData>(INITIAL_DATA);
  const [certInfo, setCertInfo] = useState({ id: 'ISO-9001/GEN-100', verificationText: 'Digital QR Verification Enabled' });
  const [isEditMode, setIsEditMode] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateAuthenticDetails(data.courseName).then(setCertInfo);
  }, [data.courseName]);

  const applyTemplate = (course: string) => {
    setData(prev => ({ ...prev, courseName: course }));
  };

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

  const handleDownloadPDF = async () => {
    setIsEditMode(false);
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 500));
    try {
      if (!certificateRef.current) return;
      const canvas = await (window as any).html2canvas(certificateRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
      pdf.save(`${data.courseName}_${data.studentName}.pdf`);
    } catch (error) { 
        alert('PDF Download Failed'); 
    } finally { 
        setIsLoading(false); 
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-[100]">
         <button onClick={onBack} className="font-bold text-sm bg-blue-800 px-4 py-2 rounded-lg">← Back</button>
         <h1 className="font-black text-base md:text-xl uppercase tracking-widest">DCA / ADCA Certificate Maker</h1>
         <div className="w-10"></div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Editor Sidebar */}
        <aside className="w-full lg:w-[400px] bg-white shadow-xl p-6 overflow-y-auto lg:h-[calc(100vh-64px)] border-r">
            
            {/* Quick Templates Section */}
            <div className="mb-8">
               <label className="text-[10px] font-black text-blue-900 uppercase mb-3 block">1. Select Certificate Type</label>
               <div className="grid grid-cols-2 gap-2">
                 {COURSE_TEMPLATES.map(t => (
                   <button 
                    key={t.id} 
                    onClick={() => applyTemplate(t.course)}
                    className={`text-[10px] font-bold p-2 border rounded-lg transition ${data.courseName === t.course ? 'bg-blue-900 text-white border-blue-900' : 'bg-gray-50 hover:bg-blue-50 text-gray-700'}`}
                   >
                     {t.name}
                   </button>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-xl mb-4">
                <span className="text-[10px] font-black uppercase text-yellow-800">Drag Elements Mode</span>
                <button onClick={() => setIsEditMode(!isEditMode)} className={`px-4 py-1 rounded-full text-[10px] font-black ${isEditMode ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {isEditMode ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase">Student Details</label>
                <input name="studentName" placeholder="Student Name" value={data.studentName} onChange={handleInputChange} className="w-full p-2 border rounded text-sm font-bold" />
                <input name="fathersName" placeholder="Father's Name" value={data.fathersName} onChange={handleInputChange} className="w-full p-2 border rounded text-sm font-bold" />
                <input name="rollNumber" placeholder="Roll No / Reg No" value={data.rollNumber} onChange={handleInputChange} className="w-full p-2 border rounded text-sm font-bold" />
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-[10px] font-black text-gray-400 uppercase">Course Details</label>
                <input name="courseName" placeholder="Course Name" value={data.courseName} onChange={handleInputChange} className="w-full p-2 border rounded text-sm font-bold bg-blue-50" />
                <div className="grid grid-cols-2 gap-2">
                  <input name="duration" placeholder="Duration" value={data.duration} onChange={handleInputChange} className="p-2 border rounded text-sm font-bold" />
                  <input name="grade" placeholder="Grade" value={data.grade} onChange={handleInputChange} className="p-2 border rounded text-sm font-bold" />
                </div>
              </div>

              <div className="pt-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Student Photo (DCA Format Required)</label>
                 <div className="mt-1 relative border-2 border-dashed border-blue-100 rounded-xl p-4 text-center hover:bg-blue-50 cursor-pointer">
                   <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
                   <span className="text-xs font-bold text-blue-800">{data.photoUrl ? '✅ Photo Uploaded' : '📤 Upload Passport Size Photo'}</span>
                 </div>
              </div>

              <div className="pt-6">
                 <button onClick={handleDownloadPDF} disabled={isLoading} className="w-full bg-blue-900 text-white font-black py-4 rounded-xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3">
                   {isLoading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"/> : '⬇️ DOWNLOAD PDF CERTIFICATE'}
                 </button>
              </div>
            </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 bg-gray-200 p-8 flex items-center justify-center overflow-auto">
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}>
                <Certificate 
                  data={data}
                  certInfo={certInfo}
                  certificateRef={certificateRef}
                  isEditMode={isEditMode}
                  onPositionChange={(key, pos) => setData(prev => ({ ...prev, positions: { ...prev.positions, [key]: pos } }))}
                />
            </div>
        </main>
      </div>

      {/* 🚀 SEO CONTENT FOR GOOGLE 1st PAGE RANKING */}
      <section className="bg-white py-20 px-6 border-t">
        <div className="max-w-5xl mx-auto prose prose-blue lg:prose-xl">
          <h2 className="text-4xl font-black text-blue-900 mb-8 border-l-8 border-yellow-500 pl-4">How to Create Professional DCA & Typing Certificates Online</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-red-700">#1 DCA & ADCA Certificate Format</h3>
              <p className="text-gray-700 leading-relaxed">If you run a computer institute, providing a professional <strong>DCA (Diploma in Computer Application) certificate</strong> is crucial. Our tool provides the official ISO 9001:2015 format used by national skill development centers. You can upload the student's photo and generate a unique serial number for verification.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-700">#2 Typing Speed Certificate Online</h3>
              <p className="text-gray-700 leading-relaxed">Applying for a clerk or data entry job? You need a <strong>Typing Certificate</strong> that shows your WPM (Words Per Minute) in Hindi or English. Our templates allow you to specify the speed and accuracy with a digital QR code for employers to verify.</p>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-10 rounded-3xl shadow-2xl mb-16">
            <h3 className="text-3xl font-black mb-6">Why Use FormatHub QR Verified Certificates?</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-yellow-400 text-2xl">✔</span>
                <p><strong>Anti-Forgery:</strong> Each certificate contains a QR code that encodes the student's roll number and course data.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-yellow-400 text-2xl">✔</span>
                <p><strong>ISO Standards:</strong> Designed using official government fonts and layouts for maximum trust.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-yellow-400 text-2xl">✔</span>
                <p><strong>No Watermark:</strong> Completely free to use for small computer centers and personal use.</p>
              </li>
            </ul>
          </div>

          <h3 className="text-3xl font-black text-center mb-10">Popular Search Queries We Cover:</h3>
          <div className="flex flex-wrap justify-center gap-3">
             {['Computer Course Certificate Format PDF', 'Typing Certificate Maker with Photo', 'ADCA Certificate Design', 'ISO Certified Certificate Online', 'Free Certificate Maker for Institutes', 'DCA Marksheet Maker'].map(q => (
               <span key={q} className="bg-gray-100 px-4 py-2 rounded-full text-xs font-bold text-gray-600 border border-gray-200">#{q}</span>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificateGenerator;