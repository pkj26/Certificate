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
    header: 'bg-slate-950 text-white px-12 py-14 mb-10',
    name: 'text-5xl font-black tracking-tighter mb-4 leading-[1.1]',
    title: 'text-xl font-bold text-blue-400 uppercase tracking-[0.3em] mb-4 opacity-90',
    contact: 'flex flex-wrap gap-x-10 gap-y-4 text-[13px] mt-8 text-slate-400 font-bold',
    sectionTitle: 'text-[13px] font-black uppercase text-blue-700 tracking-[0.3em] border-b-2 border-slate-100 pb-4 mb-8 mt-14',
    itemTitle: 'font-black text-xl text-slate-900 leading-tight',
    itemSubtitle: 'text-[16px] font-bold text-blue-600 mb-2 mt-1',
    itemDuration: 'text-[11px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-md uppercase tracking-widest',
    itemDescription: 'list-disc pl-6 mt-5 space-y-4 text-[15px] text-slate-700 leading-[1.8] text-justify',
    skillsHeader: 'font-black text-slate-900 mr-3 uppercase text-[12px] tracking-widest',
    sidebar: '',
    main: '',
  },
  classic: {
    page: 'font-serif text-gray-900 bg-white shadow-xl',
    header: 'text-center pt-20 mb-14',
    name: 'text-5xl font-bold tracking-tight border-b-2 border-black pb-8 mb-4 mx-20 leading-[1.2]',
    title: 'text-[15px] font-bold tracking-[0.5em] uppercase text-gray-500 mt-8 italic',
    contact: 'flex justify-center flex-wrap gap-x-8 text-[14px] mt-8 italic text-gray-600 font-medium',
    sectionTitle: 'text-[16px] font-bold uppercase tracking-[0.4em] border-b-2 border-gray-950 pb-3 mb-8 mt-14',
    itemTitle: 'font-bold text-2xl leading-tight text-gray-950',
    itemSubtitle: 'text-[19px] font-medium italic text-gray-800 mt-2',
    itemDuration: 'text-[13px] font-bold text-gray-500 uppercase tracking-tight',
    itemDescription: 'list-disc pl-12 mt-5 space-y-4 text-[16px] text-gray-900 leading-[1.7] text-justify font-normal',
    skillsHeader: 'font-bold uppercase text-[13px] tracking-[0.2em] block mb-2',
    sidebar: '',
    main: '',
  },
  creative: {
    page: 'font-sans text-gray-800 bg-white flex shadow-xl',
    sidebar: 'w-[320px] bg-slate-950 text-slate-300 p-12 flex flex-col',
    main: 'flex-1 p-14 bg-white',
    header: 'mb-12 border-b border-slate-800 pb-10',
    name: 'text-4xl font-black text-white leading-[1.1] mb-4 tracking-tighter',
    title: 'text-[14px] font-black tracking-[0.25em] text-blue-400 uppercase opacity-80',
    contact: 'space-y-8 text-[13px] mt-12 font-bold',
    sectionTitle: 'text-[12px] font-black uppercase tracking-[0.35em] pb-4 mb-8 border-b-2 border-slate-100 text-slate-900',
    itemTitle: 'font-black text-xl text-slate-950 leading-tight',
    itemSubtitle: 'text-[15px] font-black text-blue-700 mb-2 uppercase mt-1 tracking-tight',
    itemDuration: 'text-[11px] font-black uppercase text-slate-400 tracking-widest bg-slate-50 px-2 py-1 rounded inline-block',
    itemDescription: 'list-disc pl-7 mt-5 space-y-4 text-[14px] text-slate-700 leading-[1.8] text-justify',
    skillsHeader: 'text-blue-500 font-black block mb-3 uppercase tracking-[0.25em] text-[11px]'
  }
};

const distributeContent = (data: ResumeData, numPages: number) => {
  const pages = Array.from({ length: numPages }, () => ({
    experience: [] as WorkExperience[],
    projects: [] as Project[],
    certifications: [] as Certification[]
  }));

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
    <div className="flex flex-col gap-16 pb-24 items-center">
      {Array.from({ length: numPages }).map((_, pageIdx) => {
        const { experience, projects, certifications } = pagedContent[pageIdx];
        const isFirstPage = pageIdx === 0;

        if (design === 'creative') {
          return (
            <div key={pageIdx} className="resume-page-preview w-[794px] h-[1123px] flex overflow-hidden bg-white shadow-2xl relative border border-slate-100">
              <div className={styles.sidebar}>
                {isFirstPage ? (
                  <>
                    <div className={styles.header}>
                      <h1 className={styles.name}>{data.personalDetails.name}</h1>
                      <p className={styles.title}>{data.personalDetails.title}</p>
                    </div>
                    <div className={styles.contact}>
                      <div className="flex flex-col gap-6">
                        <p className="flex items-start gap-4">
                          <span className="text-blue-400 font-bold">EM:</span>
                          <span className="break-all leading-tight">{data.personalDetails.email}</span>
                        </p>
                        <p className="flex items-start gap-4">
                          <span className="text-blue-400 font-bold">PH:</span>
                          <span>{data.personalDetails.phone}</span>
                        </p>
                        <p className="flex items-start gap-4">
                          <span className="text-blue-400 font-bold">LO:</span>
                          <span>{data.personalDetails.location}</span>
                        </p>
                        {data.personalDetails.linkedin && (
                          <p className="flex items-start gap-4">
                            <span className="text-blue-400 font-bold">LI:</span>
                            <span className="break-all leading-tight">{data.personalDetails.linkedin}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-20">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Technical Arsenal</h3>
                      <div className="space-y-8">
                        <div>
                          <span className={styles.skillsHeader}>Software & Stack</span>
                          <p className="text-[13px] text-slate-400 leading-[1.8] font-semibold">{data.skills.languages.join(' • ')}</p>
                        </div>
                        <div>
                          <span className={styles.skillsHeader}>Architecture</span>
                          <p className="text-[13px] text-slate-400 leading-[1.8] font-semibold">{data.skills.frameworks.join(' • ')}</p>
                        </div>
                        <div>
                          <span className={styles.skillsHeader}>Infrastructure</span>
                          <p className="text-[13px] text-slate-400 leading-[1.8] font-semibold">{data.skills.tools.join(' • ')}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-auto pb-12">
                    <div className="h-[3px] w-14 bg-blue-500 mb-6"></div>
                    <p className="text-[11px] uppercase font-black tracking-[0.3em] text-slate-500">
                      {data.personalDetails.name} | Page {pageIdx + 1}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.main}>
                {isFirstPage && (
                  <section className="mb-14 overflow-hidden">
                    <h2 className={styles.sectionTitle}>Strategic Summary</h2>
                    <p className="text-[16px] leading-[1.9] text-slate-700 font-medium">{data.summary}</p>
                  </section>
                )}
                
                {renderCommonSections(styles, experience, projects, certifications, isFirstPage, data)}
              </div>
            </div>
          );
        }

        // Standard Layouts (Modern / Classic)
        return (
          <div key={pageIdx} className={`resume-page-preview w-[794px] h-[1123px] overflow-hidden relative border border-slate-50 ${styles.page}`}>
            {isFirstPage ? (
              <header className={styles.header}>
                <h1 className={styles.name}>{data.personalDetails.name}</h1>
                <p className={styles.title}>{data.personalDetails.title}</p>
                <div className={styles.contact}>
                  <span className="flex items-center gap-3">EMAIL: <b className="text-white">{data.personalDetails.email}</b></span>
                  <span className="flex items-center gap-3">PHONE: <b className="text-white">{data.personalDetails.phone}</b></span>
                  <span className="flex items-center gap-3">LOCATION: <b className="text-white">{data.personalDetails.location}</b></span>
                  {data.personalDetails.linkedin && <span className="flex items-center gap-3">LINKEDIN: <b className="text-white">{data.personalDetails.linkedin}</b></span>}
                </div>
              </header>
            ) : (
              <div className="pt-16 px-20 flex justify-between items-center text-[12px] text-slate-400 font-black uppercase tracking-[0.3em] border-b border-slate-100 pb-6 mb-4">
                 <span>{data.personalDetails.name}</span>
                 <span>Document Page {pageIdx + 1}</span>
              </div>
            )}

            <div className="px-20 py-10">
              {isFirstPage && (
                <>
                  <section className="mb-14 overflow-hidden">
                    <h2 className={styles.sectionTitle}>Executive Career Overview</h2>
                    <p className="text-[16px] leading-[1.9] text-slate-700 font-medium">{data.summary}</p>
                  </section>
                  <section className="mb-14 overflow-hidden">
                    <h2 className={styles.sectionTitle}>Core Expertise & Tech Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 text-[15px]">
                      <p className="leading-[1.7]"><span className={styles.skillsHeader}>Programming:</span> {data.skills.languages.join(', ')}</p>
                      <p className="leading-[1.7]"><span className={styles.skillsHeader}>Frameworks:</span> {data.skills.frameworks.join(', ')}</p>
                      <p className="col-span-2 leading-[1.7] border-t border-slate-100 pt-6 mt-2">
                        <span className={styles.skillsHeader}>Cloud & Infrastructure:</span> {data.skills.tools.join(', ')}
                      </p>
                    </div>
                  </section>
                </>
              )}

              {renderCommonSections(styles, experience, projects, certifications, isFirstPage, data)}
            </div>
            
            <div className="absolute bottom-12 left-20 right-20 flex justify-between items-center text-[10px] text-slate-300 font-black uppercase tracking-[0.4em] border-t border-slate-50 pt-6">
                <span>FORMAT HUB OFFICIAL PDF</span>
                <span>Page {pageIdx + 1} / {numPages}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderCommonSections = (styles: any, experience: WorkExperience[], projects: Project[], certifications: Certification[], isFirstPage: boolean, data: ResumeData) => (
  <div className="space-y-14">
    {experience.length > 0 && (
      <section className="overflow-hidden">
        <h2 className={styles.sectionTitle}>Professional Experience</h2>
        <div className="space-y-12">
          {experience.map((exp, i) => (
            <div key={i} className="relative">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-10">
                  <h3 className={styles.itemTitle}>{exp.title}</h3>
                  <p className={styles.itemSubtitle}>{exp.company}</p>
                </div>
                <span className={styles.itemDuration}>{exp.duration}</span>
              </div>
              <ul className={styles.itemDescription}>
                {exp.description.map((point, j) => point && <li key={j} className="relative">{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )}

    {projects.length > 0 && (
      <section className="overflow-hidden">
        <h2 className={styles.sectionTitle}>Major Key Projects</h2>
        <div className="space-y-10">
          {projects.map((proj, i) => (
            <div key={i} className="p-8 bg-slate-50/70 rounded-3xl border border-slate-100">
              <h3 className={styles.itemTitle}>{proj.name}</h3>
              <p className="text-[15px] text-slate-700 my-4 leading-[1.8] font-medium">{proj.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <span className="text-[11px] font-black text-blue-800 uppercase tracking-[0.2em] bg-blue-100 px-4 py-2 rounded-lg">Tech Architecture: {proj.techStack}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {certifications.length > 0 && (
      <section className="overflow-hidden">
        <h2 className={styles.sectionTitle}>Professional Certifications</h2>
        <div className="grid grid-cols-2 gap-8">
          {certifications.map((cert, i) => (
            <div key={i} className="border-l-4 border-blue-600 pl-6 py-3 bg-slate-50/50 rounded-r-2xl">
              <h3 className="font-black text-[15px] text-slate-900 leading-tight mb-1">{cert.name}</h3>
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">{cert.issuer} • {cert.date}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {isFirstPage && (
      <section className="overflow-hidden">
        <h2 className={styles.sectionTitle}>Academic Credentials</h2>
        <div className="space-y-8">
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