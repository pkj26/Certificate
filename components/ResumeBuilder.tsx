import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, ResumeDesign, WorkExperience, Project, Certification } from '../types';
import { resumeTemplates } from '../services/resumeTemplates';
import ResumePreview from './ResumePreview';

const initialCategory = Object.keys(resumeTemplates)[0];
const initialRole = Object.keys(resumeTemplates[initialCategory])[0];
const INITIAL_RESUME_DATA = JSON.parse(JSON.stringify(resumeTemplates[initialCategory][initialRole]));

const DESIGNS: { id: ResumeDesign, name: string, color: string }[] = [
    { id: 'modern', name: 'Professional Modern', color: '#1e3a8a' },
    { id: 'classic', name: 'Harvard Classic', color: '#111827' },
    { id: 'creative', name: 'Creative Sidebar', color: '#4f46e5' },
];

interface ControlsPanelProps {
    category: string;
    setCategory: (c: string) => void;
    role: string;
    setRole: (r: string) => void;
    design: ResumeDesign;
    setDesign: (d: ResumeDesign) => void;
    numPages: number;
    setNumPages: (n: number) => void;
    downloadPDF: () => void;
    isGenerating: boolean;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ category, setCategory, role, setRole, design, setDesign, numPages, setNumPages, downloadPDF, isGenerating }) => (
  <div className="space-y-6">
    <div className="bg-slate-950 text-white p-6 rounded-3xl shadow-2xl space-y-5 border border-slate-800">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Step 1: Auto-Fill Template</h3>
        <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black opacity-40 block uppercase mb-2">Target Industry</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-900 p-4 border border-slate-700 rounded-2xl font-bold text-sm outline-none focus:border-blue-500 transition-all cursor-pointer">
                  {Object.keys(resumeTemplates).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black opacity-40 block uppercase mb-2">Specific Designation</label>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full bg-slate-900 p-4 border border-slate-700 rounded-2xl font-bold text-sm outline-none focus:border-blue-500 transition-all cursor-pointer">
                  {Object.keys(resumeTemplates[category]).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
        </div>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-6">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Step 2: Executive Branding</h3>
        <div className="grid grid-cols-3 gap-3">
            {DESIGNS.map(d => (
                <button key={d.id} onClick={() => setDesign(d.id)} className={`p-4 rounded-2xl border-2 transition-all text-center group ${design === d.id ? 'border-blue-600 bg-blue-50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}>
                    <div className="w-full h-10 rounded-xl mb-3 shadow-inner group-hover:scale-105 transition-transform" style={{ backgroundColor: d.color }}></div>
                    <span className={`text-[10px] font-black uppercase leading-tight block ${design === d.id ? 'text-blue-900' : 'text-slate-400'}`}>{d.name}</span>
                </button>
            ))}
        </div>
        <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block">Resume Length (A4 Pages)</label>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                {[1, 2, 3, 5].map(p => (
                    <button key={p} onClick={() => setNumPages(p)} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${numPages === p ? 'bg-white shadow-lg text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                        {p} PAGE{p > 1 ? 'S' : ''}
                    </button>
                ))}
            </div>
        </div>
    </div>

    <button onClick={downloadPDF} disabled={isGenerating} className="w-full bg-blue-600 text-white font-black py-6 rounded-3xl shadow-2xl hover:bg-black hover:-translate-y-1 transition-all flex items-center justify-center gap-4 active:scale-95 group">
        {isGenerating ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"/> : <span className="text-2xl group-hover:scale-125 transition-transform">📄</span>}
        <span className="text-xl tracking-tight">GENERATE PDF RESUME</span>
    </button>
  </div>
);

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-3xl mb-4 overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-5 bg-white hover:bg-slate-50 transition-colors font-black text-[12px] uppercase tracking-[0.2em] text-slate-700">
                <span>{title}</span>
                <span className={`transition-transform duration-500 text-blue-500 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="p-6 border-t border-slate-100 bg-white animate-fade-in">{children}</div>}
        </div>
    );
};

const EditorPanel: React.FC<{ data: ResumeData, onDataChange: (section: keyof ResumeData, value: any) => void }> = ({ data, onDataChange }) => {
    const handleFieldChange = (section: keyof ResumeData, index: number | null, field: string, value: any) => {
        const sectionData = data[section] as any;
        let updatedSection;
        if (index !== null) {
            updatedSection = [...sectionData];
            updatedSection[index] = { ...updatedSection[index], [field]: value };
        } else {
            updatedSection = { ...sectionData, [field]: value };
        }
        onDataChange(section, updatedSection);
    };

    return (
        <div className="space-y-4 pb-16">
            <Accordion title="Personal Details">
                <div className="space-y-5">
                  {Object.entries(data.personalDetails).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{key}</label>
                        <input className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" value={String(value)} onChange={e => handleFieldChange('personalDetails', null, key, e.target.value)} />
                    </div>
                  ))}
                </div>
            </Accordion>
            <Accordion title="Experience (Jobs)">
                <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 relative">
                            <input className="w-full bg-white p-3 border rounded-xl font-black text-xs uppercase focus:border-blue-500 outline-none" value={exp.title} onChange={e => handleFieldChange('experience', i, 'title', e.target.value)} placeholder="Title / Designation" />
                            <input className="w-full bg-white p-3 border rounded-xl font-bold text-xs focus:border-blue-500 outline-none" value={exp.company} onChange={e => handleFieldChange('experience', i, 'company', e.target.value)} placeholder="Company Name" />
                            <textarea className="w-full bg-white p-4 border rounded-xl text-sm leading-relaxed focus:border-blue-500 outline-none min-h-[150px]" value={exp.description.join('\n')} onChange={e => handleFieldChange('experience', i, 'description', e.target.value.split('\n'))} placeholder="Job description (one per line)" />
                        </div>
                    ))}
                </div>
            </Accordion>
            <Accordion title="Skills & Tools">
                <div className="space-y-6">
                   {['languages', 'frameworks', 'tools'].map(skillType => (
                       <div key={skillType} className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{skillType}</label>
                           <textarea className="w-full p-4 border border-slate-100 rounded-2xl text-sm font-bold bg-slate-50 focus:border-blue-500 outline-none" rows={3} value={data.skills[skillType as keyof typeof data.skills].join(', ')} onChange={e => onDataChange('skills', { ...data.skills, [skillType]: e.target.value.split(',').map(s => s.trim()) })} />
                       </div>
                   ))}
                </div>
            </Accordion>
        </div>
    );
};

const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [category, setCategory] = useState(initialCategory);
  const [role, setRole] = useState(initialRole);
  const [numPages, setNumPages] = useState(1);
  const [design, setDesign] = useState<ResumeDesign>('modern');
  const [activeTab, setActiveTab] = useState<'controls' | 'editor'>('controls');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.85);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const availableRoles = Object.keys(resumeTemplates[category]);
    setRole(availableRoles[0]);
    setData(JSON.parse(JSON.stringify(resumeTemplates[category][availableRoles[0]])));
  }, [category]);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(resumeTemplates[category][role])));
  }, [role]);

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    
    // Save current scale and reset it to 1 for perfect capture
    const originalScale = previewScale;
    setPreviewScale(1);

    // Wait for DOM to re-render without scale
    await new Promise(r => setTimeout(r, 600));

    try {
        const { jsPDF } = (window as any).jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pages = previewRef.current.querySelectorAll('.resume-page-preview');

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            const canvas = await (window as any).html2canvas(page, {
                scale: 3, // High DPI
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 794,
                windowHeight: 1123,
                scrollX: 0,
                scrollY: 0
            });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        }
        pdf.save(`${data.personalDetails.name.replace(/\s+/g, '_')}_Professional_Resume.pdf`);
    } catch (e) {
        alert("PDF Generation Failed. Please ensure all images are loaded.");
        console.error(e);
    } finally {
        setPreviewScale(originalScale); // Restore UI scale
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-slate-50">
      {/* Sidebar Editor */}
      <div className="w-full lg:w-[450px] bg-white shadow-2xl z-30 flex flex-col h-auto lg:h-[calc(100vh-64px)] border-r border-slate-100">
        <div className="flex p-2 bg-slate-100 m-6 rounded-2xl border border-slate-200">
            <button onClick={() => setActiveTab('controls')} className={`flex-1 py-3 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all ${activeTab === 'controls' ? 'bg-white shadow-lg text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>Template</button>
            <button onClick={() => setActiveTab('editor')} className={`flex-1 py-3 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all ${activeTab === 'editor' ? 'bg-white shadow-lg text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>Edit Content</button>
        </div>

        <div className="flex-1 overflow-y-auto px-8">
            {activeTab === 'controls' ? (
              <ControlsPanel category={category} setCategory={setCategory} role={role} setRole={setRole} design={design} setDesign={setDesign} numPages={numPages} setNumPages={setNumPages} downloadPDF={downloadPDF} isGenerating={isGenerating} />
            ) : (
              <EditorPanel data={data} onDataChange={(s, v) => setData(prev => ({ ...prev, [s]: v }))} />
            )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-y-auto bg-slate-100 p-8 lg:p-16 flex flex-col items-center">
        <div className="mb-10 flex items-center gap-6 bg-slate-900 text-white px-8 py-3 rounded-full shadow-2xl border border-slate-700">
           <div className="flex items-center gap-2">
             <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-70">A4 Live Engine</span>
           </div>
           <div className="h-4 w-px bg-slate-700"></div>
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">{numPages} Page Document</span>
           <div className="flex items-center gap-3 ml-4">
             <button onClick={() => setPreviewScale(s => Math.max(s - 0.05, 0.4))} className="text-slate-400 hover:text-white font-bold">-</button>
             <span className="text-[10px] opacity-40">{(previewScale * 100).toFixed(0)}%</span>
             <button onClick={() => setPreviewScale(s => Math.min(s + 0.05, 1.2))} className="text-slate-400 hover:text-white font-bold">+</button>
           </div>
        </div>
        
        <div ref={previewRef} className="origin-top transition-all duration-300" style={{ transform: `scale(${previewScale})` }}>
          <ResumePreview data={data} design={design} numPages={numPages} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;