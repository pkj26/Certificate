import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, ResumeDesign, WorkExperience, Project, Certification } from '../types';
import { resumeTemplates } from '../services/resumeTemplates';
import ResumePreview from './ResumePreview';

const initialCategory = Object.keys(resumeTemplates)[0];
const initialRole = Object.keys(resumeTemplates[initialCategory])[0];
const INITIAL_RESUME_DATA = JSON.parse(JSON.stringify(resumeTemplates[initialCategory][initialRole]));

const DESIGNS: { id: ResumeDesign, name: string, color: string }[] = [
    { id: 'modern', name: 'Modern', color: '#2563eb' },
    { id: 'classic', name: 'Classic', color: '#1e3a8a' },
    { id: 'creative', name: 'Creative', color: '#ca8a04' },
];

const emptyExperience: WorkExperience = { title: "", company: "", duration: "", description: [""] };
const emptyProject: Project = { name: "", description: "", techStack: "" };
const emptyCertification: Certification = { name: "", issuer: "", date: "" };

// --- Sub-components for Sidebar ---

// FIX: Converted sub-components to explicitly typed React.FC arrow functions to resolve complex type inference issues that were causing incorrect errors about 'key' and 'children' props.
interface ControlsPanelProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
    design: ResumeDesign;
    setDesign: React.Dispatch<React.SetStateAction<ResumeDesign>>;
    numPages: number;
    setNumPages: React.Dispatch<React.SetStateAction<number>>;
    downloadPDF: () => void;
    isGenerating: boolean;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ category, setCategory, role, setRole, design, setDesign, numPages, setNumPages, downloadPDF, isGenerating }) => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl space-y-3">
        <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest">1. Auto-Fill Template</h3>
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded font-semibold">{Object.keys(resumeTemplates).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select>
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 border rounded font-semibold">{Object.keys(resumeTemplates[category]).map(r => <option key={r} value={r}>{r}</option>)}</select>
    </div>
    <div className="bg-green-50 border border-green-200 p-4 rounded-xl space-y-3">
        <h3 className="text-sm font-black text-green-800 uppercase tracking-widest">2. Choose Design</h3>
        <div className="grid grid-cols-3 gap-2">{DESIGNS.map(d => <button key={d.id} onClick={() => setDesign(d.id)} className={`p-2 rounded-lg border-2 text-center transition ${design === d.id ? 'border-blue-500 bg-blue-100' : 'border-transparent bg-gray-100 hover:bg-gray-200'}`}><div className="w-full h-8 rounded mb-1" style={{ backgroundColor: d.color }}></div><span className="text-xs font-bold">{d.name}</span></button>)}</div>
    </div>
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl space-y-3">
        <h3 className="text-sm font-black text-yellow-800 uppercase tracking-widest">3. Select Resume Length</h3>
        <div className="flex justify-between items-center bg-white p-1 rounded-lg border">{[1, 2, 3, 4, 5].map(p => <button key={p} onClick={() => setNumPages(p)} className={`flex-1 py-2 text-sm font-bold rounded ${numPages === p ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}>{p} Page{p > 1 ? 's' : ''}</button>)}</div>
    </div>
    <button onClick={downloadPDF} disabled={isGenerating} className="w-full bg-blue-900 text-white font-black py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-3">
        {isGenerating ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"/> : '📄'} DOWNLOAD MULTI-PAGE PDF
    </button>
  </div>
);

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="border rounded-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 bg-gray-50 font-bold text-sm text-gray-700">
                <span>{title}</span>
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

const Input: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, value, onChange }) => {
    return (
    <div className="flex flex-col mb-2">
        <label className="text-[10px] uppercase font-bold text-gray-400">{label}</label>
        <input className="w-full p-2 border rounded text-sm" value={value} onChange={onChange} />
    </div>
    );
};

const EditableListSection: React.FC<{
    title: string;
    items: any[];
    onAdd: () => void;
    onDelete: (index: number) => void;
    onChange: (index: number, field: string, value: any) => void;
    fields: string[];
}> = ({ title, items, onAdd, onDelete, onChange, fields }) => {
    return (
    <div className="space-y-4">
        {items.map((item: any, index: number) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border relative">
                <button onClick={() => onDelete(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold">✕</button>
                {fields.map((field: string) => field === 'description' ? 
                    <textarea key={field} placeholder={field} className="w-full p-1 border rounded text-xs mt-1" rows={3} value={Array.isArray(item[field]) ? item[field].join('\n') : item[field]} onChange={e => onChange(index, field, e.target.value.split('\n'))} />
                    : <Input key={field} label={field} value={String(item[field])} onChange={e => onChange(index, field, e.target.value)} />
                )}
            </div>
        ))}
        <button onClick={onAdd} className="w-full bg-blue-100 text-blue-700 font-bold text-xs py-2 rounded hover:bg-blue-200">Add {title}</button>
    </div>
    );
};

const EditorPanel: React.FC<{ data: ResumeData, onDataChange: (section: keyof ResumeData, value: any) => void }> = ({ data, onDataChange }) => {
    const handleFieldChange = (section: keyof ResumeData, index: number | null, field: string, value: any) => {
        const sectionData = data[section] as any;
        let updatedSection;
        if (index !== null) { // Array update
            updatedSection = [...sectionData];
            updatedSection[index] = { ...updatedSection[index], [field]: value };
        } else { // Object update
            updatedSection = { ...sectionData, [field]: value };
        }
        onDataChange(section, updatedSection);
    };
    
    const handleAddItem = (section: 'experience' | 'projects' | 'certifications') => {
        const emptyItem = section === 'experience' ? emptyExperience : section === 'projects' ? emptyProject : emptyCertification;
        const updatedSection = [...(data[section] || []), emptyItem];
        onDataChange(section, updatedSection);
    };

    const handleDeleteItem = (section: 'experience' | 'projects' | 'certifications', index: number) => {
        const updatedSection = (data[section] as any[]).filter((_, i) => i !== index);
        onDataChange(section, updatedSection);
    };

    return (
        <div className="space-y-4">
            <Accordion title="Personal Details">
                {Object.entries(data.personalDetails).map(([key, value]) => <Input key={key} label={key} value={String(value)} onChange={e => handleFieldChange('personalDetails', null, key, e.target.value)} />)}
            </Accordion>
            <Accordion title="Summary">
                <textarea className="w-full p-2 border rounded text-xs" rows={5} value={data.summary} onChange={e => onDataChange('summary', e.target.value)} />
            </Accordion>
            <Accordion title="Experience">
                <EditableListSection title="Experience" items={data.experience} onAdd={() => handleAddItem('experience')} onDelete={(i) => handleDeleteItem('experience', i)} onChange={(i, f, v) => handleFieldChange('experience', i, f, v)} fields={['title', 'company', 'duration', 'description']} />
            </Accordion>
            <Accordion title="Projects">
                <EditableListSection title="Projects" items={data.projects} onAdd={() => handleAddItem('projects')} onDelete={(i) => handleDeleteItem('projects', i)} onChange={(i, f, v) => handleFieldChange('projects', i, f, v)} fields={['name', 'description', 'techStack']} />
            </Accordion>
            <Accordion title="Certifications">
                <EditableListSection title="Certifications" items={data.certifications || []} onAdd={() => handleAddItem('certifications')} onDelete={(i) => handleDeleteItem('certifications', i)} onChange={(i, f, v) => handleFieldChange('certifications', i, f, v)} fields={['name', 'issuer', 'date']} />
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
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'editor'>('controls');
  const [showEditorHint, setShowEditorHint] = useState(true);

  useEffect(() => {
    // Hide the flashing hint after 5 seconds
    const timer = setTimeout(() => setShowEditorHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const availableRoles = Object.keys(resumeTemplates[category]);
    const newRole = availableRoles[0];
    setRole(newRole);
    setData(JSON.parse(JSON.stringify(resumeTemplates[category][newRole])));
  }, [category]);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(resumeTemplates[category][role])));
  }, [role]);

  const handleDataChange = <T extends keyof ResumeData>(section: T, value: ResumeData[T]) => {
    setData(prev => ({ ...prev, [section]: value }));
  };

  const downloadPDF = async () => {
    if (!previewContainerRef.current) return;
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 200)); // Allow UI to update
    try {
        const { jsPDF } = (window as any).jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const pageElements = previewContainerRef.current.querySelectorAll('.resume-page-preview');

        for (let i = 0; i < pageElements.length; i++) {
            const page = pageElements[i] as HTMLElement;
            const canvas = await (window as any).html2canvas(page, {
                scale: 3,
                useCORS: true,
                logging: false,
            });
            
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = 297; // A4 height in mm

            if (i > 0) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }

        pdf.save(`${data.personalDetails.name.replace(' ', '_')}_Resume.pdf`);
    } catch (e) {
        console.error("PDF Generation Error", e);
        alert("Failed to generate PDF.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-[450px] bg-white shadow-2xl overflow-y-auto no-print h-auto lg:h-[calc(100vh-64px)] z-20 border-r border-gray-200">
        <div className="flex border-b">
            <button onClick={() => setActiveTab('controls')} className={`flex-1 p-4 font-bold text-sm ${activeTab === 'controls' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'bg-gray-50 text-gray-500'}`}>Controls</button>
            <button 
              onClick={() => setActiveTab('editor')} 
              className={`flex-1 p-4 font-bold text-sm relative transition-colors duration-300 ${activeTab === 'editor' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'bg-gray-50 text-gray-500'} ${showEditorHint ? 'animate-subtle-flash' : ''}`}
            >
              Editor
              {showEditorHint && <span className="absolute top-1 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
        </div>

        <div className="p-6">
            {activeTab === 'controls' ? (
              <ControlsPanel category={category} setCategory={setCategory} role={role} setRole={setRole} design={design} setDesign={setDesign} numPages={numPages} setNumPages={setNumPages} downloadPDF={downloadPDF} isGenerating={isGenerating} />
            ) : (
              <EditorPanel data={data} onDataChange={handleDataChange} />
            )}
        </div>
      </div>

      <div className="flex-1 bg-gray-200/50 flex items-center justify-center overflow-auto p-4 lg:p-12">
        <div ref={previewContainerRef} className="space-y-4" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
          <ResumePreview data={data} design={design} numPages={numPages} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
