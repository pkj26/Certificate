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

const emptyExperience: WorkExperience = { title: "", company: "", duration: "", description: [""] };
const emptyProject: Project = { name: "", description: "", techStack: "" };
const emptyCertification: Certification = { name: "", issuer: "", date: "" };

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
    <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Step 1: Auto-Fill Template</h3>
        <div className="space-y-2">
            <label className="text-[10px] font-bold opacity-50 block uppercase">Industry</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-800 p-3 border border-slate-700 rounded-xl font-bold text-sm outline-none focus:border-blue-500 transition">
                {Object.keys(resumeTemplates).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <label className="text-[10px] font-bold opacity-50 block uppercase pt-2">Job Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full bg-slate-800 p-3 border border-slate-700 rounded-xl font-bold text-sm outline-none focus:border-blue-500 transition">
                {Object.keys(resumeTemplates[category]).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
        </div>
    </div>

    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Step 2: Document Layout</h3>
        <div className="grid grid-cols-3 gap-2">
            {DESIGNS.map(d => (
                <button key={d.id} onClick={() => setDesign(d.id)} className={`p-3 rounded-xl border-2 transition text-center ${design === d.id ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'}`}>
                    <div className="w-full h-8 rounded-lg mb-2 shadow-inner" style={{ backgroundColor: d.color }}></div>
                    <span className="text-[10px] font-black uppercase leading-tight">{d.name}</span>
                </button>
            ))}
        </div>
        <div className="pt-2">
            <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Resume Length (Pages)</label>
            <div className="flex bg-slate-50 p-1 rounded-xl border">
                {[1, 2, 3, 5].map(p => (
                    <button key={p} onClick={() => setNumPages(p)} className={`flex-1 py-2 text-xs font-black rounded-lg transition ${numPages === p ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}>
                        {p} P
                    </button>
                ))}
            </div>
        </div>
    </div>

    <button onClick={downloadPDF} disabled={isGenerating} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95">
        {isGenerating ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"/> : <span className="text-xl">⬇️</span>}
        <span className="text-lg">DOWNLOAD PDF RESUME</span>
    </button>
  </div>
);

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-2xl mb-3 overflow-hidden bg-white shadow-sm">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition font-black text-xs uppercase tracking-widest text-slate-700">
                <span>{title}</span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="p-5 border-t border-slate-100 bg-white animate-fade-in">{children}</div>}
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
        <div className="space-y-4 pb-10">
            <Accordion title="Personal Details">
                <div className="space-y-4">
                  {Object.entries(data.personalDetails).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-1">{key}</label>
                        <input className="p-3 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={String(value)} onChange={e => handleFieldChange('personalDetails', null, key, e.target.value)} />
                    </div>
                  ))}
                </div>
            </Accordion>
            <Accordion title="Experience (Jobs)">
                <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border space-y-3 relative">
                            <input className="w-full bg-white p-2 border rounded font-black text-xs uppercase" value={exp.title} onChange={e => handleFieldChange('experience', i, 'title', e.target.value)} placeholder="Title" />
                            <input className="w-full bg-white p-2 border rounded font-bold text-xs" value={exp.company} onChange={e => handleFieldChange('experience', i, 'company', e.target.value)} placeholder="Company" />
                            <textarea className="w-full bg-white p-2 border rounded text-xs" rows={4} value={exp.description.join('\n')} onChange={e => handleFieldChange('experience', i, 'description', e.target.value.split('\n'))} placeholder="Job description (one per line)" />
                        </div>
                    ))}
                </div>
            </Accordion>
            <Accordion title="Skills & Tools">
                <div className="space-y-4">
                   {['languages', 'frameworks', 'tools'].map(skillType => (
                       <div key={skillType} className="space-y-1">
                           <label className="text-[10px] font-black uppercase text-slate-400">{skillType}</label>
                           <textarea className="w-full p-3 border rounded-xl text-xs font-bold bg-slate-50" rows={2} value={data.skills[skillType as keyof typeof data.skills].join(', ')} onChange={e => onDataChange('skills', { ...data.skills, [skillType]: e.target.value.split(',').map(s => s.trim()) })} />
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
    await new Promise(r => setTimeout(r, 500));
    try {
        const { jsPDF } = (window as any).jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pages = previewRef.current.querySelectorAll('.resume-page-preview');

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            const canvas = await (window as any).html2canvas(page, {
                scale: 3,
                useCORS: true,
                logging: false,
                windowWidth: 794,
                windowHeight: 1123
            });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        }
        pdf.save(`${data.personalDetails.name}_Resume.pdf`);
    } catch (e) {
        alert("Failed to export. Check image sizes.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-slate-50">
      {/* Sidebar Editor */}
      <div className="w-full lg:w-[420px] bg-white shadow-2xl z-20 flex flex-col h-auto lg:h-[calc(100vh-64px)] border-r">
        <div className="flex p-2 bg-slate-100 m-4 rounded-2xl">
            <button onClick={() => setActiveTab('controls')} className={`flex-1 py-3 font-black text-xs uppercase tracking-widest rounded-xl transition ${activeTab === 'controls' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}>Template</button>
            <button onClick={() => setActiveTab('editor')} className={`flex-1 py-3 font-black text-xs uppercase tracking-widest rounded-xl transition ${activeTab === 'editor' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}>Edit Content</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
            {activeTab === 'controls' ? (
              <ControlsPanel category={category} setCategory={setCategory} role={role} setRole={setRole} design={design} setDesign={setDesign} numPages={numPages} setNumPages={setNumPages} downloadPDF={downloadPDF} isGenerating={isGenerating} />
            ) : (
              <EditorPanel data={data} onDataChange={(s, v) => setData(prev => ({ ...prev, [s]: v }))} />
            )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-y-auto bg-slate-200/50 p-6 lg:p-12 flex flex-col items-center">
        <div className="mb-8 flex items-center gap-4 bg-blue-900 text-white px-6 py-2 rounded-full shadow-lg">
           <span className="animate-pulse text-yellow-400 font-black">●</span>
           <span className="text-[10px] font-black uppercase tracking-widest">A4 Live Preview - {numPages} Page(s)</span>
        </div>
        
        <div ref={previewRef} className="origin-top transition-transform duration-500" style={{ transform: 'scale(0.85)' }}>
          <ResumePreview data={data} design={design} numPages={numPages} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;