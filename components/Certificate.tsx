import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CertificateData, ElementPosition, ThemeType } from '../types';

interface CertificateProps {
  data: CertificateData;
  certInfo: { id: string; verificationText: string };
  certificateRef: React.RefObject<HTMLDivElement>;
  isEditMode: boolean;
  onPositionChange: (key: keyof CertificateData['positions'], pos: ElementPosition) => void;
}

const THEME_STYLES: Record<ThemeType, any> = {
  'classic': {
    wrapper: "border-[15px] border-double border-[#b8860b]",
    bg: "radial-gradient(circle, #fffaf0 0%, #ffffff 100%)",
    textPrimary: "text-blue-900",
    textSecondary: "text-gray-600",
    accent: "text-[#b8860b]",
    headerFont: "Cinzel",
    bodyFont: "Great Vibes",
    showCorners: true,
    borderCol: "#b8860b",
    pattern: "opacity-5",
    titleStyle: "italic tracking-wide"
  },
  'modern-blue': {
    wrapper: "border-t-[20px] border-b-[20px] border-blue-600 bg-white",
    bg: "linear-gradient(180deg, #eff6ff 0%, #ffffff 50%, #eff6ff 100%)",
    textPrimary: "text-blue-800",
    textSecondary: "text-slate-500",
    accent: "text-blue-500",
    headerFont: "Roboto",
    bodyFont: "Playfair Display",
    showCorners: false,
    borderCol: "#2563eb",
    pattern: "hidden",
    titleStyle: "uppercase tracking-[0.2em] font-bold not-italic"
  },
  'academic-red': {
    wrapper: "border-[4px] border-red-900 outline outline-4 outline-offset-4 outline-red-900 m-4 rounded-sm",
    bg: "linear-gradient(to bottom, #fff5f5, #fff)",
    textPrimary: "text-red-900",
    textSecondary: "text-stone-700",
    accent: "text-red-700",
    headerFont: "Cinzel",
    bodyFont: "Playfair Display",
    showCorners: true,
    cornerColor: "border-red-900",
    borderCol: "#7f1d1d",
    pattern: "opacity-10",
    titleStyle: "uppercase tracking-widest font-bold"
  },
  'tech-green': {
    wrapper: "border-2 border-green-500 bg-black",
    bg: "#0a0a0a",
    textPrimary: "text-green-500",
    textSecondary: "text-green-700",
    accent: "text-green-400",
    headerFont: "Roboto",
    bodyFont: "Roboto",
    showCorners: false,
    borderCol: "#22c55e",
    pattern: "hidden",
    isDark: true,
    titleStyle: "uppercase tracking-[0.3em] font-light"
  },
  'royal-purple': {
    wrapper: "border-[12px] border-purple-900 rounded-xl",
    bg: "radial-gradient(circle at center, #faf5ff 0%, #ffffff 100%)",
    textPrimary: "text-purple-900",
    textSecondary: "text-purple-900/60",
    accent: "text-purple-600",
    headerFont: "Cinzel",
    bodyFont: "Great Vibes",
    showCorners: true,
    cornerColor: "border-purple-900",
    borderCol: "#581c87",
    pattern: "opacity-5",
    titleStyle: "italic tracking-wide font-normal"
  },
  'minimal-black': {
    wrapper: "border-[1px] border-black m-8",
    bg: "#ffffff",
    textPrimary: "text-black",
    textSecondary: "text-gray-500",
    accent: "text-black",
    headerFont: "Roboto",
    bodyFont: "Playfair Display",
    showCorners: false,
    borderCol: "#000000",
    pattern: "hidden",
    titleStyle: "uppercase tracking-[0.5em] text-4xl font-light"
  },
  'corporate-teal': {
    wrapper: "border-l-[40px] border-r-[40px] border-teal-700 bg-teal-50/30",
    bg: "linear-gradient(to bottom, #ffffff, #f0fdfa)",
    textPrimary: "text-teal-900",
    textSecondary: "text-teal-700/70",
    accent: "text-teal-600",
    headerFont: "Roboto",
    bodyFont: "Playfair Display",
    showCorners: false,
    borderCol: "#0f766e",
    pattern: "hidden",
    titleStyle: "capitalize tracking-wide font-bold"
  },
  'creative-orange': {
    wrapper: "border-[8px] border-orange-500 rounded-[3rem]",
    bg: "radial-gradient(circle at top right, #fff7ed, #ffffff)",
    textPrimary: "text-orange-900",
    textSecondary: "text-stone-600",
    accent: "text-orange-600",
    headerFont: "Playfair Display",
    bodyFont: "Playfair Display",
    showCorners: false,
    borderCol: "#c2410c",
    pattern: "hidden",
    titleStyle: "italic font-black tracking-tight"
  },
  'navy-gold': {
    wrapper: "border-[20px] border-blue-950 ring-4 ring-yellow-500 ring-inset",
    bg: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)",
    textPrimary: "text-blue-950",
    textSecondary: "text-slate-600",
    accent: "text-yellow-600",
    headerFont: "Cinzel",
    bodyFont: "Playfair Display",
    showCorners: true,
    cornerColor: "border-yellow-600",
    borderCol: "#172554",
    pattern: "opacity-5",
    titleStyle: "uppercase tracking-[0.15em] font-serif"
  },
  'slate-gray': {
    wrapper: "border-y-[30px] border-slate-700 bg-slate-50",
    bg: "#f8fafc",
    textPrimary: "text-slate-800",
    textSecondary: "text-slate-500",
    accent: "text-slate-600",
    headerFont: "Cinzel",
    bodyFont: "Roboto",
    showCorners: false,
    borderCol: "#334155",
    pattern: "hidden",
    titleStyle: "uppercase font-black tracking-wider"
  }
};

const Certificate: React.FC<CertificateProps> = ({ data, certInfo, certificateRef, isEditMode, onPositionChange }) => {
  const [dragging, setDragging] = useState<{ key: keyof CertificateData['positions']; startX: number; startY: number; initialPos: ElementPosition } | null>(null);

  const isVerifiedView = useMemo(() => {
    return new URLSearchParams(window.location.search).has('d');
  }, []);

  const theme = THEME_STYLES[data.theme] || THEME_STYLES['classic'];
  const isDark = theme.isDark;

  const verificationUrl = useMemo(() => {
    try {
      const essentialData = {
        studentName: data.studentName,
        fathersName: data.fathersName,
        courseName: data.courseName,
        duration: data.duration,
        grade: data.grade,
        rollNumber: data.rollNumber,
        issueDate: data.issueDate,
        institutionName: data.institutionName,
        theme: data.theme,
        teacherName: data.teacherName,
        photoUrl: data.photoUrl 
      };
      const encoded = btoa(JSON.stringify(essentialData));
      const baseUrl = `${window.location.origin}/certificate-generator`;
      return `${baseUrl}?d=${encoded}`;
    } catch (e) {
      return window.location.href;
    }
  }, [data]);

  const handleMouseDown = (key: keyof CertificateData['positions'], e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setDragging({
      key,
      startX: e.clientX,
      startY: e.clientY,
      initialPos: { ...data.positions[key] }
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragging.startX;
    const dy = e.clientY - dragging.startY;
    onPositionChange(dragging.key, {
      x: dragging.initialPos.x + dx,
      y: dragging.initialPos.y + dy
    });
  }, [dragging, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  const getStyle = (key: keyof CertificateData['positions']) => ({
    transform: `translate(${data.positions[key].x}px, ${data.positions[key].y}px)`,
    cursor: isEditMode ? 'move' : 'default',
    zIndex: dragging?.key === key ? 100 : 40,
    outline: isEditMode ? '2px dashed #3b82f6' : 'none',
    outlineOffset: '4px',
    position: 'absolute' as const
  });

  return (
    <div className="flex justify-center p-0 bg-gray-200 overflow-visible">
      <div 
        ref={certificateRef}
        className={`relative w-[1123px] min-h-[794px] shadow-2xl overflow-visible flex flex-col transition-all duration-500 ease-in-out ${theme.wrapper}`}
        style={{ 
          background: theme.bg,
          lineHeight: '1.5' 
        }}
      >
        {isVerifiedView && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-8 py-2 rounded-full shadow-2xl font-black tracking-[0.2em] border-2 border-white animate-bounce">
            OFFICIALLY APPROVED & VERIFIED
          </div>
        )}

        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${theme.pattern || 'opacity-5'}`}>
          <div className={`text-[120px] font-bold rotate-[-30deg] border-[25px] rounded-full p-24 uppercase tracking-[20px] ${theme.textPrimary}`} style={{ borderColor: 'currentColor' }}>
            VERIFIED
          </div>
        </div>

        {theme.showCorners && (
          <>
            <div className={`absolute top-0 left-0 w-24 h-24 border-t-[8px] border-l-[8px] m-4 z-20 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
            <div className={`absolute top-0 right-0 w-24 h-24 border-t-[8px] border-r-[8px] m-4 z-20 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
            <div className={`absolute bottom-0 left-0 w-24 h-24 border-b-[8px] border-l-[8px] m-4 z-20 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
            <div className={`absolute bottom-0 right-0 w-24 h-24 border-b-[8px] border-r-[8px] m-4 z-20 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
          </>
        )}

        <div className="relative z-10 px-16 pt-12 pb-12 flex-1 flex flex-col items-center">
          
          <div className={`w-full flex justify-between mb-6 border-b-2 pb-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-left">
              <span className={`block text-[11px] font-black uppercase tracking-widest ${theme.textPrimary}`}>Roll Number:</span>
              <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>{data.rollNumber || 'PENDING'}</span>
            </div>
            <div className="text-right">
              <span className={`block text-[11px] font-black uppercase tracking-widest ${theme.textPrimary}`}>Issue Date:</span>
              <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>{data.issueDate || 'PENDING'}</span>
            </div>
          </div>

          <div className="flex justify-between w-full items-start mb-8 gap-8">
             <div className="text-left w-1/4 pt-4">
                <p className={`text-[12px] font-black uppercase tracking-[0.2em] ${theme.textSecondary}`}>ISO 9001:2015</p>
                <p className={`text-[12px] font-black uppercase tracking-[0.2em] mt-2 ${theme.textSecondary}`}>Reg ID: {certInfo.id}</p>
             </div>
             <div className="text-center w-2/4">
                <h1 className={`text-4xl font-black tracking-tighter mb-2 uppercase leading-none ${theme.textPrimary}`} style={{ fontFamily: theme.headerFont }}>
                  {data.institutionName || 'NATIONAL INSTITUTE'}
                </h1>
                <p className={`text-[12px] font-black tracking-[0.3em] uppercase ${theme.accent}`}>
                  (Ministry of MSME Govt. of India Registered)
                </p>
             </div>
             <div className="w-1/4 flex justify-end">
                <div className={`p-1.5 border-2 shadow-xl flex flex-col items-center rounded-lg ${isDark ? 'bg-white border-transparent' : 'bg-white border-gray-100'}`}>
                   <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(verificationUrl)}&bgcolor=ffffff`} 
                    alt="Scan to Verify" 
                    className="w-[90px] h-[90px] block"
                   />
                   <span className="text-[8px] mt-1.5 uppercase font-black tracking-tighter text-black">Scan to Verify Authenticity</span>
                </div>
             </div>
          </div>

          <div className="w-full h-[3px] mb-12" style={{ background: `linear-gradient(to right, transparent, ${theme.borderCol}, transparent)` }}></div>

          <div className="text-center w-full flex-1 flex flex-col items-center justify-center py-4 space-y-8">
            <h2 className={`text-7xl font-normal leading-tight ${theme.titleStyle} ${isDark ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: theme.bodyFont }}>
              Certificate of Excellence
            </h2>
            
            <p className={`text-2xl font-light italic tracking-[0.1em] ${theme.textSecondary}`}>This document acknowledges that</p>
            
            <div className="w-full">
              <h3 className={`text-6xl font-black border-b-4 border-double inline-block px-16 pb-4 uppercase tracking-tighter ${theme.textPrimary}`} style={{ fontFamily: 'Playfair Display', borderColor: theme.borderCol }}>
                {data.studentName || 'Full Name'}
              </h3>
            </div>

            <p className={`text-3xl ${theme.textSecondary}`}>
              Son/Daughter of <span className={`font-black underline decoration-double decoration-gray-300 underline-offset-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.fathersName || 'Guardian Name'}</span>
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
              <p className={`text-2xl leading-relaxed tracking-wide ${theme.textSecondary}`}>
                has successfully completed the diploma program in
              </p>
              <h4 className={`text-4xl font-black uppercase tracking-[0.1em] py-4 px-12 inline-block border-y-2 border-transparent ${theme.textPrimary}`}>
                {data.courseName || 'Computer Application Program'}
              </h4>
              <p className={`text-2xl leading-relaxed tracking-wide ${theme.textSecondary}`}>
                with a duration of <span className={`font-black mx-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.duration}</span> and secured Grade <span className={`font-black mx-1 text-3xl ${theme.textPrimary}`}>"{data.grade}"</span>.
              </p>
              
              {data.teacherName && (
                <p className={`text-lg mt-6 font-black italic opacity-90 ${theme.textSecondary}`}>
                  Course Instructor: Prof. {data.teacherName}
                </p>
              )}
            </div>
          </div>

          <div className="w-full mt-16 flex justify-between items-end relative min-h-[220px]">
            <div className="flex flex-col items-center space-y-4">
              <div 
                onMouseDown={(e) => handleMouseDown('photo', e)}
                style={getStyle('photo')}
                className={`w-36 h-48 border-[4px] rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-2xl select-none`}
                ref={(el) => { if(el) el.style.borderColor = theme.borderCol; }}
              >
                {data.photoUrl ? (
                  <img src={data.photoUrl} alt="Photo" className="w-full h-full object-cover pointer-events-none block" />
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-20 h-20 text-gray-200 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-[10px] uppercase block mt-2 font-black">Photo Here</span>
                  </div>
                )}
                <div className={`absolute top-0 right-0 text-white text-[8px] px-3 py-1 font-black uppercase tracking-widest`} style={{ backgroundColor: theme.borderCol }}>OFFICIAL</div>
              </div>
            </div>

            <div className="flex flex-col items-center relative w-1/3">
               <div 
                  onMouseDown={(e) => handleMouseDown('stamp', e)}
                  style={getStyle('stamp')}
                  className="w-44 h-44 opacity-90 transform -rotate-12 select-none"
               >
                  <div className={`w-full h-full rounded-full border-[5px] flex items-center justify-center relative bg-white/10 backdrop-blur-sm`} style={{ borderColor: theme.borderCol }}>
                    <div className={`w-[90%] h-[90%] rounded-full border-2 border-dashed`} style={{ borderColor: theme.borderCol }}></div>
                    <div className={`absolute inset-0 flex flex-col items-center justify-center font-black leading-tight text-center p-2`} style={{ color: theme.borderCol }}>
                       <span className="text-[8px] uppercase font-black">Technical Education Board</span>
                       <div className="relative h-8 w-28 flex items-center justify-center overflow-hidden">
                          <span className="text-3xl font-bold italic opacity-80 absolute" style={{ fontFamily: 'Great Vibes' }}>
                             Authority
                          </span>
                       </div>
                       <span className="text-[12px] uppercase border-y-2 py-1 tracking-widest font-black w-full" style={{ borderColor: theme.borderCol }}>VALIDATED</span>
                       <span className="text-[8px] uppercase mt-1 font-black">Regd. Controller</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col space-y-12 w-1/3">
               <div onMouseDown={(e) => handleMouseDown('signature1', e)} style={getStyle('signature1')} className="w-full text-center select-none pt-4">
                  <div className={`text-4xl font-black italic h-12 flex items-end justify-center tracking-wide ${theme.textPrimary}`} style={{ fontFamily: 'Great Vibes' }}>S. K. Verma</div>
                  <div className={`w-full h-[2px] mt-2`} style={{ backgroundColor: theme.borderCol }}></div>
                  <p className={`text-[12px] font-black mt-2 uppercase tracking-[0.2em] ${theme.textPrimary}`}>Controller Exam</p>
               </div>
               
               <div onMouseDown={(e) => handleMouseDown('signature2', e)} style={getStyle('signature2')} className="w-full text-center select-none pt-4">
                  <div className={`text-4xl font-black italic h-12 flex items-end justify-center tracking-wide ${theme.textPrimary}`} style={{ fontFamily: 'Great Vibes' }}>Rajiv Kapoor</div>
                  <div className={`w-full h-[2px] mt-2`} style={{ backgroundColor: theme.borderCol }}></div>
                  <p className={`text-[12px] font-black mt-2 uppercase tracking-[0.2em] ${theme.textPrimary}`}>Managing Director</p>
               </div>
            </div>
          </div>

          <div className={`w-full flex justify-between items-center text-[10px] uppercase tracking-[0.4em] mt-16 border-t-2 pt-6 ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
             <span className={`font-black ${theme.textPrimary}`}>CERT ID: {data.rollNumber || certInfo.id}</span>
             <span className={`text-center font-bold italic flex-1 px-12 truncate ${theme.textPrimary}`} style={{ opacity: 0.7 }}>
                {certInfo.verificationText} | verify at verify.formathub.in
             </span>
             <span className={`font-black ${theme.textPrimary}`}>© 2026 OFFICIAL DOCUMENT</span>
          </div>

          <div className="absolute bottom-24 left-16 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-600 to-yellow-900 border-[4px] border-yellow-100 shadow-2xl flex items-center justify-center transform rotate-12 z-30">
             <div className="w-24 h-24 rounded-full border-2 border-yellow-200 flex flex-col items-center justify-center text-white p-2 text-center">
                <span className="text-[10px] font-black tracking-tighter">QUALITY</span>
                <span className="text-[13px] font-black border-y-2 border-yellow-200 my-1 px-3 tracking-tighter uppercase">ASSURED</span>
                <span className="text-[10px] font-black tracking-tighter">OFFICIAL</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;