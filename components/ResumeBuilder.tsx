import React, { useState, useRef } from 'react';
import { ResumeData, ResumeDesign } from '../types';
import { resumeTemplates } from '../services/resumeTemplates';
import ResumePreview from './ResumePreview';

const initialCategory = Object.keys(resumeTemplates)[0];
const initialRole = Object.keys(resumeTemplates[initialCategory])[0];
const INITIAL_DATA = JSON.parse(JSON.stringify(resumeTemplates[initialCategory][initialRole]));

const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [design, setDesign] = useState<ResumeDesign>('modern');
  const [numPages, setNumPages] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (section: keyof ResumeData, field: string, value: any, index?: number) => {
    setData(prev => {
      const newData = { ...prev };
      if (index !== undefined) {
        const arr = [...(newData[section] as any)];
        arr[index] = { ...arr[index], [field]: value };
        newData[section] = arr as any;
      } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
        newData[section] = { ...(newData[section] as any), [field]: value };
      } else {
        newData[section] = value as any;
      }
      return newData;
    });
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    
    // Scale reset for clear capture
    const originalStyle = previewRef.current.style.transform;
    previewRef.current.style.transform = 'scale(1)';
    await new Promise(r => setTimeout(r, 500));

    try {
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pages = previewRef.current.querySelectorAll('.resume-page-preview');

      for (let i = 0; i < pages.length; i++) {
        const canvas = await (window as any).html2canvas(pages[i], {
          scale: 3,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }
      pdf.save(`${data.personalDetails.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (e) {
      alert("Error generating PDF");
    } finally {
      previewRef.current.style.transform = originalStyle;
      setIsGenerating(false);
    }
  };

  const downloadWord = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head><meta charset='utf-8'><title>Resume</title></head><body>`;
    const footer = "</body></html>";
    const content = `
      <div style="font-family: Arial, sans-serif;">
        <h1 style="text-align:center; color:#1e3a8a;">${data.personalDetails.name}</h1>
        <p style="text-align:center;">${data.personalDetails.title}</p>
        <p style="text-align:center; font-size:10pt;">${data.personalDetails.email} | ${data.personalDetails.phone} | ${data.personalDetails.location}</p>
        <hr/>
        <h3>PROFESSIONAL SUMMARY</h3>
        <p>${data.summary}</p>
        <h3>WORK EXPERIENCE</h3>
        ${data.experience.map(exp => `
          <div>
            <b>${exp.title}</b> at ${exp.company} (${exp.duration})
            <ul>${exp.description.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
        `).join('')}
        <h3>EDUCATION</h3>
        ${data.education.map(edu => `
          <p><b>${edu.degree}</b> - ${edu.institution} (${edu.duration})</p>
        `).join('')}
      </div>
    `;
    const blob = new Blob(['\ufeff', header + content + footer], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalDetails.name}_Resume.doc`;
    link.click();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-slate-50">
      {/* Sidebar Editor */}
      <div className="w-full lg:w-[450px] bg-white border-r shadow-xl overflow-y-auto p-8 z-20">
        <h2 className="text-2xl font-black text-blue-900 mb-8 border-b pb-4">Resume Editor</h2>
        
        <div className="space-y-6">
          <section>
             <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Personal Details</label>
             <input className="w-full p-3 border rounded-xl mb-2 text-sm" value={data.personalDetails.name} onChange={e => handleDataChange('personalDetails', 'name', e.target.value)} placeholder="Full Name"/>
             <input className="w-full p-3 border rounded-xl mb-2 text-sm" value={data.personalDetails.title} onChange={e => handleDataChange('personalDetails', 'title', e.target.value)} placeholder="Target Role"/>
          </section>

          <section>
             <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Choose Design</label>
             <div className="grid grid-cols-3 gap-2">
                {['modern', 'classic', 'creative'].map(d => (
                  <button key={d} onClick={() => setDesign(d as any)} className={`p-2 border rounded-xl text-[10px] font-bold uppercase transition-all ${design === d ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-400 hover:bg-slate-50'}`}>{d}</button>
                ))}
             </div>
          </section>

          <section>
             <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Experience Control</label>
             {data.experience.map((exp, i) => (
               <div key={i} className="p-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                  <input className="w-full p-2 border rounded-lg mb-2 text-xs font-bold" value={exp.title} onChange={e => handleDataChange('experience', 'title', e.target.value, i)} />
                  <textarea className="w-full p-2 border rounded-lg text-xs min-h-[100px]" value={exp.description.join('\n')} onChange={e => handleDataChange('experience', 'description', e.target.value.split('\n'), i)} />
               </div>
             ))}
          </section>

          <div className="pt-8 space-y-3">
             <button onClick={downloadPDF} disabled={isGenerating} className="w-full bg-blue-900 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95">
               {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : '⬇ DOWNLOAD PDF'}
             </button>
             <button onClick={downloadWord} className="w-full bg-white text-blue-900 border-2 border-blue-900 font-black py-4 rounded-2xl shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3 active:scale-95">
               ⬇ DOWNLOAD WORD (.DOC)
             </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto bg-slate-200 p-12 flex flex-col items-center">
        <div className="mb-8 flex bg-slate-900 text-white px-8 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">
           A4 Pixel-Perfect Engine v2.0
        </div>
        <div ref={previewRef} className="origin-top" style={{ transform: 'scale(0.85)' }}>
          <ResumePreview data={data} design={design} numPages={numPages} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;