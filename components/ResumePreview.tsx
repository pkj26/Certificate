import React from 'react';
import { ResumeData, ResumeDesign, WorkExperience, Project, Certification } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  design: ResumeDesign;
  numPages: number;
}

// Fixed A4 dimensions in pixels (96 DPI)
const A4_HEIGHT = 1123;
const A4_WIDTH = 794;

const THEME_STYLES = {
  modern: {
    container: "font-sans bg-white text-slate-900",
    header: "bg-slate-900 text-white p-10 flex flex-col items-center text-center",
    name: "text-4xl font-black tracking-tighter mb-2",
    title: "text-blue-400 font-bold uppercase tracking-widest text-sm",
    sectionTitle: "text-blue-700 font-black uppercase text-xs tracking-[0.2em] border-b-2 border-slate-100 pb-2 mb-4 mt-8",
    itemTitle: "font-bold text-lg text-slate-900",
    itemSubtitle: "font-bold text-slate-500 text-sm",
    description: "text-[13px] leading-relaxed text-slate-600 mt-2 space-y-1 list-disc pl-5",
    skillsBox: "bg-slate-50 p-4 rounded-xl border border-slate-100"
  },
  classic: {
    container: "font-serif bg-white text-gray-900",
    header: "border-b-4 border-gray-900 py-10 px-12 mb-8",
    name: "text-4xl font-bold mb-1",
    title: "text-gray-500 font-bold uppercase text-xs tracking-widest",
    sectionTitle: "text-gray-900 font-bold uppercase text-sm tracking-widest border-b border-gray-300 pb-1 mb-4 mt-8",
    itemTitle: "font-bold text-lg",
    itemSubtitle: "italic text-gray-700",
    description: "text-[14px] leading-normal text-gray-800 mt-2 space-y-2 list-disc pl-8",
    skillsBox: "border-t border-b border-gray-100 py-4"
  },
  creative: {
    container: "font-sans bg-white text-slate-800 flex",
    sidebar: "w-[260px] bg-slate-900 text-slate-300 p-8 h-full",
    main: "flex-1 p-10",
    header: "mb-8",
    name: "text-3xl font-black text-white leading-tight",
    title: "text-blue-400 font-bold uppercase text-[10px] tracking-widest",
    sectionTitle: "text-slate-900 font-black uppercase text-[11px] tracking-widest border-b-2 border-slate-100 pb-2 mb-4 mt-6",
    itemTitle: "font-bold text-base text-slate-900",
    itemSubtitle: "text-blue-600 font-bold text-xs",
    description: "text-[12px] leading-relaxed text-slate-600 mt-2 space-y-1 list-disc pl-4",
    skillsBox: ""
  }
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, design, numPages }) => {
  const theme = THEME_STYLES[design] || THEME_STYLES.modern;

  // Simple content distribution across pages
  const renderContent = (pageIdx: number) => {
    const isFirstPage = pageIdx === 0;
    
    // Logic to split lists if they are too long can be complex in React.
    // Here we use a reliable vertical spacing strategy.
    return (
      <div className="flex flex-col h-full">
        {isFirstPage && (
          <section className="mb-6">
            <h2 className={theme.sectionTitle}>Summary</h2>
            <p className="text-[13px] leading-relaxed text-slate-700">{data.summary}</p>
          </section>
        )}

        {/* Experience Section */}
        <section className="mb-6">
          <h2 className={theme.sectionTitle}>Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className={theme.itemTitle}>{exp.title}</h3>
                  <span className="text-[10px] font-bold text-slate-400">{exp.duration}</span>
                </div>
                <p className={theme.itemSubtitle}>{exp.company}</p>
                <ul className={theme.description}>
                  {exp.description.map((point, j) => point && <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects / Education if space permits */}
        <section>
          <h2 className={theme.sectionTitle}>Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <h3 className={theme.itemTitle}>{edu.degree}</h3>
                  <p className={theme.itemSubtitle}>{edu.institution}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{edu.duration}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 items-center pb-20">
      {Array.from({ length: numPages }).map((_, idx) => (
        <div 
          key={idx} 
          className={`resume-page-preview shadow-2xl overflow-hidden relative ${theme.container}`}
          style={{ width: A4_WIDTH, height: A4_HEIGHT }}
        >
          {/* Layout Choice */}
          {design === 'creative' ? (
            <div className="flex h-full">
              <div className={theme.sidebar}>
                {idx === 0 && (
                  <>
                    <div className={theme.header}>
                      <h1 className={theme.name}>{data.personalDetails.name}</h1>
                      <p className={theme.title}>{data.personalDetails.title}</p>
                    </div>
                    <div className="mt-10 space-y-6 text-[11px]">
                       <div>
                          <p className="font-bold text-blue-400 uppercase mb-1">Contact</p>
                          <p>{data.personalDetails.email}</p>
                          <p>{data.personalDetails.phone}</p>
                          <p>{data.personalDetails.location}</p>
                       </div>
                       <div>
                          <p className="font-bold text-blue-400 uppercase mb-2">Skills</p>
                          <div className="flex flex-wrap gap-2">
                             {data.skills.languages.map(s => <span key={s} className="bg-slate-800 px-2 py-1 rounded">{s}</span>)}
                          </div>
                       </div>
                    </div>
                  </>
                )}
                <div className="absolute bottom-10 left-8 text-[10px] text-slate-500">Page {idx + 1}</div>
              </div>
              <div className={theme.main}>
                {renderContent(idx)}
              </div>
            </div>
          ) : (
            <>
              {idx === 0 && (
                <header className={theme.header}>
                  <h1 className={theme.name}>{data.personalDetails.name}</h1>
                  <p className={theme.title}>{data.personalDetails.title}</p>
                  <div className="flex gap-6 mt-4 text-[11px] font-medium opacity-80">
                    <span>{data.personalDetails.email}</span>
                    <span>{data.personalDetails.phone}</span>
                    <span>{data.personalDetails.location}</span>
                  </div>
                </header>
              )}
              <div className="px-14 py-6">
                {idx === 0 && design !== 'creative' && (
                  <div className={`${theme.skillsBox} mb-6`}>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Technical Proficiency</p>
                    <p className="text-sm font-bold text-slate-700">{data.skills.languages.join(' • ')} • {data.skills.tools.join(' • ')}</p>
                  </div>
                )}
                {renderContent(idx)}
              </div>
              <div className="absolute bottom-8 left-14 right-14 border-t border-slate-100 pt-4 flex justify-between text-[10px] text-slate-300 font-bold">
                 <span>{data.personalDetails.name}</span>
                 <span>Page {idx + 1} of {numPages}</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;