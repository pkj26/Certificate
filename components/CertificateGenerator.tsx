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
      pdf.save(`${data.courseName.replace(/\s+/g, '_')}_${data.studentName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) { 
        alert('PDF Download Failed'); 
    } finally { 
        setIsLoading(false); 
    }
  };

  const handleDownloadWord = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head><meta charset='utf-8'><title>Certificate</title></head><body>`;
    const footer = "</body></html>";
    const content = `
      <div style="font-family: Arial, sans-serif; text-align: center; border: 10px solid #1e3a8a; padding: 50px;">
        <h1 style="color: #1e3a8a; font-size: 32pt; margin-bottom: 0;">${data.institutionName}</h1>
        <p style="font-size: 14pt; color: #666;">Ministry of MSME Govt. of India Registered</p>
        <hr style="border: 2px solid #1e3a8a; margin: 30px 0;">
        <h2 style="font-size: 40pt; margin-top: 20px;">CERTIFICATE OF EXCELLENCE</h2>
        <p style="font-size: 18pt;">This is to certify that</p>
        <h3 style="font-size: 36pt; color: #1e3a8a; border-bottom: 2px dashed #000; display: inline-block;">${data.studentName}</h3>
        <p style="font-size: 18pt;">Son/Daughter of <b>${data.fathersName}</b></p>
        <p style="font-size: 18pt;">has successfully completed the course in</p>
        <h4 style="font-size: 24pt; color: #1e3a8a; text-transform: uppercase;">${data.courseName}</h4>
        <p style="font-size: 18pt;">of duration <b>${data.duration}</b> with Grade <b>"${data.grade}"</b>.</p>
        <div style="margin-top: 50px; text-align: left;">
          <p>Roll Number: ${data.rollNumber}</p>
          <p>Issue Date: ${data.issueDate}</p>
          <p>Certificate ID: ${certInfo.id}</p>
        </div>
      </div>
    `;
    const source = header + content + footer;
    const blob = new Blob(['\ufeff', source], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.studentName}_Certificate.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-[100]">
         <button onClick={onBack} className="font-bold text-sm bg-blue-800 px-4 py-2 rounded-lg hover:bg-black transition-all">← Back to Dashboard</button>
         <h1 className="font-black text-base md:text-xl uppercase tracking-widest hidden md:block">ISO 9001:2015 Certificate Engine</h1>
         <div className="flex gap-2">
            <button onClick={handleDownloadWord} className="bg-white text-blue-900 px-4 py-2 rounded-lg text-xs font-black uppercase shadow-md hover:bg-gray-100">Word File</button>
         </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        <aside className="w-full lg:w-[420px] bg-white shadow-2xl p-6 overflow-y-auto lg:h-[calc(100vh-64px)] border-r border-gray-100 z-20">
            
            <div className="mb-10">
               <label className="text-[11px] font-black text-blue-900 uppercase mb-4 block tracking-widest opacity-60">1. Template Selector</label>
               <div className="grid grid-cols-2 gap-3">
                 {COURSE_TEMPLATES.map(t => (
                   <button 
                    key={t.id} 
                    onClick={() => applyTemplate(t.course)}
                    className={`text-[10px] font-black p-3 border-2 rounded-xl transition-all ${data.courseName === t.course ? 'bg-blue-950 text-white border-blue-950 shadow-lg' : 'bg-gray-50 hover:bg-blue-50 text-gray-700 border-gray-100'}`}
                   >
                     {t.name}
                   </button>
                 ))}
               </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl mb-6 shadow-inner">
                <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase text-blue-900">Drag & Place Engine</span>
                    <span className="text-[9px] font-bold text-blue-500 uppercase">Adjust positions manually</span>
                </div>
                <button onClick={() => setIsEditMode(!isEditMode)} className={`px-6 py-2 rounded-full text-[10px] font-black transition-all shadow-md ${isEditMode ? 'bg-green-600 text-white animate-pulse' : 'bg-gray-200 text-gray-500'}`}>
                  {isEditMode ? 'ACTIVE' : 'OFF'}
                </button>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Student Information</label>
                <div className="grid grid-cols-1 gap-4">
                    <input name="studentName" placeholder="Full Student Name" value={data.studentName} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-black focus:border-blue-500 outline-none transition-all" />
                    <input name="fathersName" placeholder="Father's / Guardian Name" value={data.fathersName} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-black focus:border-blue-500 outline-none transition-all" />
                    <input name="rollNumber" placeholder="Serial / Roll Number" value={data.rollNumber} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-black focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Academic Records</label>
                <input name="courseName" placeholder="Exact Course Title" value={data.courseName} onChange={handleInputChange} className="w-full p-4 bg-blue-50 border-2 border-blue-100 rounded-xl text-sm font-black focus:border-blue-900 outline-none transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="duration" placeholder="e.g. 6 Months" value={data.duration} onChange={handleInputChange} className="p-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-black" />
                  <input name="grade" placeholder="e.g. A+" value={data.grade} onChange={handleInputChange} className="p-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-black text-blue-600" />
                </div>
              </div>

              <div className="pt-6">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Official Photograph</label>
                 <div className="relative border-4 border-dashed border-gray-100 rounded-2xl p-8 text-center hover:bg-gray-50 cursor-pointer transition-all group">
                   <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
                   <div className="flex flex-col items-center gap-3">
                        <span className="text-3xl group-hover:scale-125 transition-transform">{data.photoUrl ? '📸' : '👤'}</span>
                        <span className="text-[11px] font-black text-gray-500 uppercase">{data.photoUrl ? 'Photo Loaded Successfully' : 'Select Student Photo'}</span>
                   </div>
                 </div>
              </div>

              <div className="pt-8 flex flex-col gap-3">
                 <button onClick={handleDownloadPDF} disabled={isLoading} className="w-full bg-blue-950 text-white font-black py-5 rounded-2xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 active:scale-95">
                   {isLoading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"/> : <span className="text-2xl">📄</span>}
                   <span className="tracking-tight text-lg">GENERATE PDF CERTIFICATE</span>
                 </button>
                 <button onClick={handleDownloadWord} className="w-full bg-white text-blue-950 border-2 border-blue-950 font-black py-4 rounded-2xl shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3">
                    <span className="text-xl">📊</span> DOWNLOAD EDITABLE WORD FILE
                 </button>
              </div>
            </div>
            <div className="mt-10 text-center">
                <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em]">Official Tool • FormatHub.in</p>
            </div>
        </aside>

        <main className="flex-1 bg-gray-200 p-12 flex flex-col items-center justify-center overflow-auto min-h-screen">
            <div className="mb-6 bg-slate-900 text-white px-8 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">
                A4 Live Preview Engine (300 DPI)
            </div>
            <div className="origin-center transition-transform duration-500" style={{ transform: 'scale(0.8)' }}>
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

      <section className="bg-white py-24 px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto prose prose-blue lg:prose-xl">
          <h2 className="text-5xl font-black text-blue-950 mb-12 border-l-[15px] border-yellow-500 pl-8 tracking-tighter">Professional Computer Education Certification</h2>
          
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div className="bg-gray-50 p-10 rounded-[2rem] border-2 border-gray-100 shadow-sm">
              <h3 className="text-2xl font-black text-red-700 uppercase mb-6">#1 Digital DCA Marksheet & Certificate</h3>
              <p className="text-gray-700 leading-relaxed text-lg">Running a private computer coaching center requires official-looking documentation. Our <strong>DCA Certificate Generator</strong> provides ISO-compliant formats. Now with <strong>Multi-Page Logic</strong>, if your course description is long, the certificate automatically scales to fit perfectly without any text overlapping.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2rem] border-2 border-gray-100 shadow-sm">
              <h3 className="text-2xl font-black text-red-700 uppercase mb-6">#2 Typing & Tally Professional Export</h3>
              <p className="text-gray-700 leading-relaxed text-lg">For students applying to <strong>UP Police, SSC, or Railway Clerk</strong> positions, a verified typing speed certificate is mandatory. Our new <strong>Word File (.doc)</strong> export feature allows you to open your certificate in Microsoft Word and make even more granular edits if needed.</p>
            </div>
          </div>

          <div className="bg-blue-950 text-white p-16 rounded-[3rem] shadow-2xl mb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 text-[200px] font-black -rotate-12 pointer-events-none">DOCX</div>
            <h3 className="text-4xl font-black mb-10 tracking-tight">Advanced Features of FormatHub Engine</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <ul className="space-y-6">
                <li className="flex gap-5">
                  <span className="text-yellow-400 text-3xl font-black">✔</span>
                  <p className="text-xl"><strong>Smart Overlap Prevention:</strong> Automatically pushes footer elements down if the student name or course name is too long.</p>
                </li>
                <li className="flex gap-5">
                  <span className="text-yellow-400 text-3xl font-black">✔</span>
                  <p className="text-xl"><strong>Editable Word Output:</strong> The only online tool that provides an editable Word (.doc) file for your certificates.</p>
                </li>
              </ul>
              <ul className="space-y-6">
                <li className="flex gap-5">
                  <span className="text-yellow-400 text-3xl font-black">✔</span>
                  <p className="text-xl"><strong>QR Security:</strong> Real-time QR generation that encodes student data for instant mobile verification.</p>
                </li>
                <li className="flex gap-5">
                  <span className="text-yellow-400 text-3xl font-black">✔</span>
                  <p className="text-xl"><strong>High Resolution:</strong> 3x Canvas scaling for crystal clear text even on small font sizes.</p>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-4xl font-black text-center mb-12 tracking-tight">Common Certificate Formats Supported:</h3>
          <div className="flex flex-wrap justify-center gap-4">
             {['ADCA Certificate Maker', 'DCA Full Marksheet Format', 'Typing Certificate Hindi English', 'Tally Prime ISO Certificate', 'CCC Official Layout', 'Yoga Instructor Certification', 'Beauty Parlour Certificate with Photo'].map(q => (
               <span key={q} className="bg-gray-100 px-8 py-3 rounded-2xl text-[12px] font-black text-gray-500 border-2 border-gray-200 hover:border-blue-900 transition-all cursor-default">{q}</span>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificateGenerator;