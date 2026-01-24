
import React from 'react';
import { ResumeData, ResumeDesign, WorkExperience, Project, Certification } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  design: ResumeDesign;
  numPages: number;
}

// --- DESIGN STYLES CONFIGURATION ---
const designStyles = {
  modern: {
    page: 'font-sans text-gray-800',
    header: 'text-center border-b-2 border-gray-200 pb-4 mb-6',
    name: 'text-4xl font-bold tracking-tight text-blue-900',
    title: 'text-lg font-semibold text-blue-700',
    contact: 'flex justify-center gap-x-4 text-xs mt-2 text-gray-600',
    sectionTitle: 'text-sm font-black uppercase text-blue-900 tracking-widest border-b-2 border-blue-200 pb-1 mb-3',
    itemTitle: 'font-bold text-base text-gray-900',
    itemSubtitle: 'text-sm font-semibold italic text-gray-700',
    itemDuration: 'text-xs font-bold text-gray-500',
    itemDescription: 'list-disc pl-5 mt-1 space-y-1 text-sm text-gray-600',
    skillsHeader: 'font-bold'
  },
  classic: {
    page: 'font-serif text-gray-900',
    header: 'text-center mb-6',
    name: 'text-5xl font-bold tracking-normal',
    title: 'text-xl font-normal tracking-widest uppercase text-gray-600 mt-1',
    contact: 'flex justify-center gap-x-2 text-sm mt-3 border-y border-gray-300 py-2',
    sectionTitle: 'text-lg font-bold uppercase tracking-widest text-center border-y-2 border-black py-1 my-4',
    itemTitle: 'font-bold text-lg',
    itemSubtitle: 'text-base italic text-gray-700',
    itemDuration: 'text-sm font-normal text-gray-600',
    itemDescription: 'list-disc pl-6 mt-2 space-y-1.5 text-base text-gray-800',
    skillsHeader: 'font-bold text-sm uppercase'
  },
  creative: {
    page: 'font-sans text-gray-800 flex',
    sidebar: 'w-1/3 bg-yellow-600 text-white p-8',
    main: 'w-2/3 p-8',
    header: 'text-left mb-8',
    name: 'text-4xl font-black leading-tight',
    title: 'text-lg font-light tracking-wider',
    contact: 'flex flex-col gap-y-2 text-sm mt-8',
    sectionTitle: 'text-base font-black uppercase tracking-widest pb-1 mb-3 border-b-2 border-yellow-700',
    itemTitle: 'font-bold text-base text-yellow-900',
    itemSubtitle: 'text-sm font-semibold text-gray-700',
    itemDuration: 'text-xs font-bold text-gray-500',
    itemDescription: 'list-disc pl-5 mt-1 space-y-1 text-sm text-gray-600',
    skillsHeader: 'font-bold'
  }
};

// --- CONTENT DISTRIBUTION LOGIC ---
const distributeContent = (data: ResumeData, numPages: number) => {
  const pagesContent: { experience: WorkExperience[]; projects: Project[]; certifications: Certification[] }[] = Array.from({ length: numPages }, () => ({
    experience: [],
    projects: [],
    certifications: []
  }));

  const allItems = [
    ...data.experience.map(item => ({ ...item, type: 'experience' })),
    ...data.projects.map(item => ({ ...item, type: 'project' })),
    ...(data.certifications || []).map(item => ({ ...item, type: 'certification' })),
  ];

  const itemsPerFirstPage = 3;
  const itemsPerSubsequentPage = 5;
  let currentItemIndex = 0;

  for (let i = 0; i < numPages; i++) {
    const itemsForThisPage = i === 0 ? itemsPerFirstPage : itemsPerSubsequentPage;
    const pageItems = allItems.slice(currentItemIndex, currentItemIndex + itemsForThisPage);
    
    pageItems.forEach(item => {
      if (item.type === 'experience') pagesContent[i].experience.push(item as WorkExperience);
      else if (item.type === 'project') pagesContent[i].projects.push(item as Project);
      else if (item.type === 'certification') pagesContent[i].certifications.push(item as Certification);
    });
    currentItemIndex += itemsForThisPage;
  }

  return pagesContent;
};


const ResumePreview: React.FC<ResumePreviewProps> = ({ data, design, numPages }) => {
  const styles = designStyles[design] || designStyles.modern;
  const pagedContent = distributeContent(data, numPages);

  const renderPage = (pageIndex: number) => {
    const { experience, projects, certifications } = pagedContent[pageIndex];
    const isFirstPage = pageIndex === 0;

    const MainContent = () => (
        <>
            {isFirstPage && ( <div className="mb-6"><h2 className={styles.sectionTitle}>Professional Summary</h2><p className="text-sm leading-relaxed">{data.summary}</p></div> )}
            
            {experience.length > 0 && (
                <div className="mb-6">
                    <h2 className={styles.sectionTitle}>Work Experience</h2>
                    <div className="space-y-4">
                    {experience.map((exp, i) => (
                        <div key={i}>
                        <div className="flex justify-between items-baseline">
                            <h3 className={styles.itemTitle}>{exp.title}</h3>
                            <p className={styles.itemDuration}>{exp.duration}</p>
                        </div>
                        <p className={styles.itemSubtitle}>{exp.company}</p>
                        <ul className={styles.itemDescription}>
                            {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((d, j) => d && <li key={j}>{d}</li>)}
                        </ul>
                        </div>
                    ))}
                    </div>
                </div>
            )}
            {projects.length > 0 && (
                <div className="mb-6">
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    <div className="space-y-4">
                    {projects.map((proj, i) => (
                        <div key={i}>
                        <h3 className={styles.itemTitle}>{proj.name}</h3>
                        <p className="text-sm text-gray-600">{proj.description}</p>
                        <p className="text-xs font-mono mt-1 text-blue-700"><strong>Tech Stack:</strong> {proj.techStack}</p>
                        </div>
                    ))}
                    </div>
                </div>
            )}
            {certifications.length > 0 && (
                 <div className="mb-6">
                    <h2 className={styles.sectionTitle}>Certifications</h2>
                    <div className="space-y-3">
                        {certifications.map((cert, i) => (
                            <div key={i}>
                                <h3 className={styles.itemTitle}>{cert.name}</h3>
                                <p className={styles.itemSubtitle}>{cert.issuer} - <span className="font-normal">{cert.date}</span></p>
                            </div>
                        ))}
                    </div>
                 </div>
            )}
            {isFirstPage && data.education.length > 0 && (
                <div className="mb-6">
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-baseline">
                        <div>
                        <h3 className={styles.itemTitle}>{edu.degree}</h3>
                        <p className={styles.itemSubtitle}>{edu.institution}</p>
                        </div>
                        <p className={styles.itemDuration}>{edu.duration}</p>
                    </div>
                    ))}
                </div>
            )}
        </>
    );

    return (
      <div key={pageIndex} className={`resume-page-preview w-[794px] h-[1123px] bg-white shadow-2xl ${styles.page}`}>
        {design === 'creative' ? (
            <>
                <div className={styles.sidebar}> {isFirstPage && <SidebarContent styles={styles} data={data} />} </div>
                <div className={styles.main}> <MainContent /> </div>
            </>
        ) : (
            <div className="p-10">
                {isFirstPage && <Header styles={styles} data={data} />}
                {isFirstPage && (
                    <div className="mb-6">
                        <h2 className={styles.sectionTitle}>Skills</h2>
                        <div className="flex gap-x-8 gap-y-2 text-sm flex-wrap">
                            <div><strong className={styles.skillsHeader}>Languages:</strong> {(Array.isArray(data.skills.languages) ? data.skills.languages : []).join(', ')}</div>
                            <div><strong className={styles.skillsHeader}>Frameworks:</strong> {(Array.isArray(data.skills.frameworks) ? data.skills.frameworks : []).join(', ')}</div>
                            <div><strong className={styles.skillsHeader}>Tools:</strong> {(Array.isArray(data.skills.tools) ? data.skills.tools : []).join(', ')}</div>
                        </div>
                    </div>
                )}
                <MainContent/>
            </div>
        )}
      </div>
    );
  };

  return <>{Array.from({ length: numPages }).map((_, i) => renderPage(i))}</>;
};

const Header = ({ styles, data }: any) => (
    <div className={styles.header}>
        <h1 className={styles.name}>{data.personalDetails.name}</h1>
        <p className={styles.title}>{data.personalDetails.title}</p>
        <div className={styles.contact}>
            <span>{data.personalDetails.email}</span>|<span>{data.personalDetails.phone}</span>|<span>{data.personalDetails.location}</span>|<span>{data.personalDetails.linkedin}</span>
        </div>
    </div>
);
const SidebarContent = ({ styles, data }: any) => (
    <>
        <div className={styles.header}>
            <h1 className={styles.name}>{data.personalDetails.name}</h1>
            <p className={styles.title}>{data.personalDetails.title}</p>
        </div>
        <h2 className={'text-base font-black uppercase tracking-widest pb-1 mb-3 border-b-2 border-yellow-400'}>Contact</h2>
        <div className={styles.contact}>
            <span>📧 {data.personalDetails.email}</span>
            <span>📞 {data.personalDetails.phone}</span>
            <span>📍 {data.personalDetails.location}</span>
            <span>🔗 {data.personalDetails.linkedin}</span>
        </div>
        <h2 className={'text-base font-black uppercase tracking-widest pb-1 mb-3 border-b-2 border-yellow-400 mt-8'}>Skills</h2>
        <div className="text-sm space-y-1">
            <p><strong className={styles.skillsHeader}>Languages:</strong> {(Array.isArray(data.skills.languages) ? data.skills.languages : []).join(', ')}</p>
            <p><strong className={styles.skillsHeader}>Frameworks:</strong> {(Array.isArray(data.skills.frameworks) ? data.skills.frameworks : []).join(', ')}</p>
            <p><strong className={styles.skillsHeader}>Tools:</strong> {(Array.isArray(data.skills.tools) ? data.skills.tools : []).join(', ')}</p>
        </div>
    </>
);

export default ResumePreview;
