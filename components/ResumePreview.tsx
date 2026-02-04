import React from 'react';
import { ResumeData, ResumeDesign, WorkExperience, Project, Certification } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  design: ResumeDesign;
  numPages: number;
}

const designStyles = {
  modern: {
    page: 'font-sans text-slate-800 bg-white shadow-xl',
    header: 'bg-slate-950 text-white p-12 mb-10',
    name: 'text-5xl font-black tracking-tight mb-3 leading-none',
    title: 'text-lg font-semibold text-blue-400 uppercase tracking-[0.25em] mb-4',
    contact: 'flex flex-wrap gap-x-8 gap-y-3 text-[13px] mt-8 text-slate-400 font-medium',
    sectionTitle: 'text-sm font-black uppercase text-blue-700 tracking-[0.25em] border-b-2 border-slate-100 pb-3 mb-6 mt-12',
    itemTitle: 'font-bold text-xl text-slate-900 leading-tight',
    itemSubtitle: 'text-base font-bold text-blue-600 mb-2',
    itemDuration: 'text-xs font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full',
    itemDescription: 'list-disc pl-5 mt-4 space-y-3 text-[14px] text-slate-600 leading-[1.6]',
    skillsHeader: 'font-black text-slate-900 mr-2 uppercase text-[11px]',
    sidebar: '',
    main: '',
  },
  classic: {
    page: 'font-serif text-gray-900 bg-white shadow-xl',
    header: 'text-center pt-16 mb-12',
    name: 'text-4xl font-bold tracking-tight border-b-2 border-black pb-6 mb-3 mx-16 leading-tight',
    title: 'text-sm font-bold tracking-[0.4em] uppercase text-gray-500 mt-6',
    contact: 'flex justify-center flex-wrap gap-x-6 text-[13px] mt-6 italic text-gray-600',
    sectionTitle: 'text-[15px] font-bold uppercase tracking-widest border-b-2 border-gray-800 pb-2 mb-6 mt-12',
    itemTitle: 'font-bold text-xl leading-snug',
    itemSubtitle: 'text-[17px] font-medium italic text-gray-700 mt-1',
    itemDuration: 'text-sm font-bold text-gray-500 uppercase tracking-tighter',
    itemDescription: 'list-disc pl-10 mt-4 space-y-3 text-[16px] text-gray-800 leading-[1.5] text-justify',
    skillsHeader: 'font-bold uppercase text-[12px] tracking-widest',
    sidebar: '',
    main: '',
  },
  creative: {
    page: 'font-sans text-gray-800 bg-white flex shadow-xl',
    sidebar: 'w-[300px] bg-slate-900 text-slate-300 p-10 flex flex-col',
    main: 'flex-1 p-12 bg-white',
    header: 'mb-10 border-b border-slate-800 pb-8',
    name: 'text-4xl font-black text-white leading-[1.1] mb-3',
    title: 'text-[13px] font-black tracking-[0.2em] text-blue-400 uppercase',
    contact: 'space-y-6 text-[12px] mt-10 font-medium',
    sectionTitle: 'text-[11px] font-black uppercase tracking-[0.3em] pb-3 mb-6 border-b-2 border-slate-100 text-slate-900',
    itemTitle: 'font-black text-lg text-slate-950 leading-tight',
    itemSubtitle: 'text-sm font-black text-blue-700 mb-2 uppercase',
    itemDuration: 'text-[10px] font-black uppercase text-slate-400 tracking-widest',
    itemDescription: 'list-disc pl-6 mt-3 space-y-2.5 text-[13.5px] text-slate-600 leading-[1.6]',
    skillsHeader: 'text-blue-500 font-black block mb-2 uppercase tracking-widest text-[10px]'
  }
};

const distributeContent = (data: ResumeData, numPages: number) => {
  const pages = Array.from({ length: numPages }, () => ({
    experience: [] as WorkExperience[],
    projects: [] as Project[],
    certifications: [] as Certification[]
  }));

  // Distribute items roughly across pages to prevent overflow
  const expPer = Math.ceil(data.experience.length / numPages) || 1;
  const projPer = Math.ceil(data.projects.length / numPages) || 1;
  const certPer = Math.ceil((data.certifications?.length || 0) / numPages) || 1;

  data.experience.forEach((item, i) => {
    const pageIndex = Math.min(Math.floor(i / expPer), numPages - 1);
    pages[pageIndex].experience.push(item);
  });
  
  data.projects.forEach((item, i) => {
    const pageIndex = Math.min(Math.floor(i / projPer), numPages - 1);
    pages[pageIndex].projects.push(item);
  });
  
  data.certifications?.forEach((item, i) => {
    const pageIndex = Math.min(Math.floor(i / certPer), numPages - 1);
    pages[pageIndex].certifications.push(item);
  });

  return pages;
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, design, numPages }) => {
  const styles = designStyles[design] || designStyles.modern;
  const pagedContent = distributeContent(data, numPages);

  return (
    <div className="flex flex-col gap-12 pb-20">
      {Array.from({ length: numPages }).map((_, pageIdx) => {
        const { experience, projects, certifications } = pagedContent[pageIdx];
        const isFirstPage = pageIdx === 0;

        if (design === 'creative') {
          return (
            <div key={pageIdx} className="resume-page-preview w-[794px] h-[1123px] flex overflow-hidden bg-white shadow-2xl relative">
              <div className={styles.sidebar}>
                {isFirstPage ? (
                  <>
                    <div className={styles.header}>
                      <h1 className={styles.name}>{data.personalDetails.name}</h1>
                      <p className={styles.title}>{data.personalDetails.title}</p>
                    </div>
                    <div className={styles.contact}>
                      <p className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">📧</span>
                        <span className="truncate">{data.personalDetails.email}</span>
                      </p>
                      <p className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">📞</span>
                        {data.personalDetails.phone}
                      </p>
                      <p className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">📍</span>
                        {data.personalDetails.location}
                      </p>
                      {data.personalDetails.linkedin && (
                        <p className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">🔗</span>
                          <span className="truncate">{data.personalDetails.linkedin}</span>
                        </p>
                      )}
                    </div>
                    <div className="mt-16">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Expertise</h3>
                      <div className="space-y-6">
                        <div>
                          <span className={styles.skillsHeader}>Stack</span>
                          <p className="text-[12px] text-slate-400 leading-relaxed font-medium">{data.skills.languages.join(' • ')}</p>
                        </div>
                        <div>
                          <span className={styles.skillsHeader}>Frameworks</span>
                          <p className="text-[12px] text-slate-400 leading-relaxed font-medium">{data.skills.frameworks.join(' • ')}</p>
                        </div>
                        <div>
                          <span className={styles.skillsHeader}>Ecosystem</span>
                          <p className="text-[12px] text-slate-400 leading-relaxed font-medium">{data.skills.tools.join(' • ')}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-auto pb-10">
                    <div className="h-[2px] w-12 bg-slate-800 mb-4"></div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-600">
                      {data.personalDetails.name} | Page {pageIdx + 1}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.main}>
                {isFirstPage && (
                  <section className="mb-12">
                    <h2 className={styles.sectionTitle}>Executive Summary</h2>
                    <p className="text-[15px] leading-[1.7] text-slate-600 font-medium">{data.summary}</p>
                  </section>
                )}
                
                {renderCommonSections(styles, experience, projects, certifications, isFirstPage, data)}
              </div>
            </div>
          );
        }

        // Standard Layouts
        return (
          <div key={pageIdx} className={`resume-page-preview w-[794px] h-[1123px] overflow-hidden relative ${styles.page}`}>
            {isFirstPage ? (
              <header className={styles.header}>
                <h1 className={styles.name}>{data.personalDetails.name}</h1>
                <p className={styles.title}>{data.personalDetails.title}</p>
                <div className={styles.contact}>
                  <span className="flex items-center gap-2"><b>E:</b> {data.personalDetails.email}</span>
                  <span className="flex items-center gap-2"><b>M:</b> {data.personalDetails.phone}</span>
                  <span className="flex items-center gap-2"><b>L:</b> {data.personalDetails.location}</span>
                  {data.personalDetails.linkedin && <span className="flex items-center gap-2"><b>LN:</b> {data.personalDetails.linkedin}</span>}
                </div>
              </header>
            ) : (
              <div className="pt-12 px-16 flex justify-between items-center text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] border-b border-slate-50 pb-4">
                 <span>{data.personalDetails.name}</span>
                 <span>Document Page {pageIdx + 1}</span>
              </div>
            )}

            <div className="px-16 py-8">
              {isFirstPage && (
                <>
                  <section className="mb-12">
                    <h2 className={styles.sectionTitle}>Professional Profile</h2>
                    <p className="text-[15px] leading-[1.8] text-slate-700">{data.summary}</p>
                  </section>
                  <section className="mb-12">
                    <h2 className={styles.sectionTitle}>Technical Proficiency</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 text-[14px]">
                      <p className="leading-relaxed"><span className={styles.skillsHeader}>Core Stack:</span> {data.skills.languages.join(', ')}</p>
                      <p className="leading-relaxed"><span className={styles.skillsHeader}>Technologies:</span> {data.skills.frameworks.join(', ')}</p>
                      <p className="col-span-2 leading-relaxed border-t border-slate-50 pt-4 mt-2">
                        <span className={styles.skillsHeader}>Developer Tools:</span> {data.skills.tools.join(', ')}
                      </p>
                    </div>
                  </section>
                </>
              )}

              {renderCommonSections(styles, experience, projects, certifications, isFirstPage, data)}
            </div>
            
            <div className="absolute bottom-8 left-16 right-16 flex justify-between items-center text-[9px] text-slate-300 font-bold uppercase tracking-widest border-t border-slate-50 pt-4">
                <span>Created with FormatHub.in</span>
                <span>Page {pageIdx + 1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderCommonSections = (styles: any, experience: WorkExperience[], projects: Project[], certifications: Certification[], isFirstPage: boolean, data: ResumeData) => (
  <div className="space-y-12">
    {experience.length > 0 && (
      <section>
        <h2 className={styles.sectionTitle}>Career Trajectory</h2>
        <div className="space-y-10">
          {experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className={styles.itemTitle}>{exp.title}</h3>
                <span className={styles.itemDuration}>{exp.duration}</span>
              </div>
              <p className={styles.itemSubtitle}>{exp.company}</p>
              <ul className={styles.itemDescription}>
                {exp.description.map((point, j) => point && <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )}

    {projects.length > 0 && (
      <section>
        <h2 className={styles.sectionTitle}>Significant Projects</h2>
        <div className="space-y-8">
          {projects.map((proj, i) => (
            <div key={i} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
              <h3 className={styles.itemTitle}>{proj.name}</h3>
              <p className="text-[14px] text-slate-600 my-3 leading-relaxed">{proj.description}</p>
              <p className="text-[11px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 inline-block px-3 py-1 rounded">Tech Architecture: {proj.techStack}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {certifications.length > 0 && (
      <section>
        <h2 className={styles.sectionTitle}>Global Certifications</h2>
        <div className="grid grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <div key={i} className="border-l-4 border-blue-600 pl-4 py-2 bg-slate-50 rounded-r-xl">
              <h3 className="font-black text-[14px] text-slate-900 leading-tight">{cert.name}</h3>
              <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">{cert.issuer} • Issued {cert.date}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {isFirstPage && (
      <section>
        <h2 className={styles.sectionTitle}>Educational Credentials</h2>
        <div className="space-y-6">
          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start">
              <div>
                <h3 className={styles.itemTitle}>{edu.degree}</h3>
                <p className={styles.itemSubtitle}>{edu.institution}</p>
              </div>
              <span className={styles.itemDuration}>{edu.duration}</span>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
);

export default ResumePreview;