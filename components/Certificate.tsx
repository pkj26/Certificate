
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CertificateData, ElementPosition, ThemeType } from '../types';

interface CertificateProps {
  data: CertificateData;
  certInfo: { id: string; verificationText: string };
  certificateRef: React.RefObject<HTMLDivElement>;
  isEditMode: boolean;
  onPositionChange: (key: keyof CertificateData['positions'], pos: ElementPosition) => void;
}

// Theme Configuration Definitions
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
    wrapper: "border-t-[20px] border-b-[20px] border-blue-600 bg-white shadow-xl",
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
    bg: "#0a0a0a", // Dark theme background
    textPrimary: "text-green-500",
    textSecondary: "text-green-700",
    accent: "text-green-400",
    headerFont: "Roboto", // Mono-ish feel
    bodyFont: "Roboto",
    showCorners: false,
    borderCol: "#22c55e",
    pattern: "hidden",
    isDark: true, // Custom flag for dark mode adjustments
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
      // Use origin and path for a clean URL
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
    outlineOffset: '4px'
  });

  return (
    <div className="flex justify-center p-0 bg-gray-200 overflow-visible">
      <div 
        ref={certificateRef}
        data-certificate-root
        className={`relative w-[1123px] h-[794px] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${theme.wrapper}`}
        style={{ 
          background: theme.bg,
          lineHeight: '1.4' 
        }}
      >
        {/* Verification Banner Overlay (Only on Scan) */}
        {isVerifiedView && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-8 py-2 rounded-full shadow-2xl font-black tracking-[0.2em] border-2 border-white animate-bounce">
            OFFICIALLY APPROVED & VERIFIED
          </div>
        )}

        {/* Background Watermark/Pattern */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${theme.pattern || 'opacity-5'}`}>
          <div className={`text-[100px] font-bold rotate-[-30deg] border-[20px] rounded-full p-20 uppercase tracking-[15px] ${theme.textPrimary}`} style={{ borderColor: 'currentColor' }}>
            VERIFIED
          </div>
        </div>

        {/* Decorative Corners - Conditional */}
        {theme.showCorners && (
          <>
            <div className={`absolute top-0 left-0 w-24 h-24 border-t-[8px] border-l-[8px] m-4 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
            <div className={`absolute top-0 right-0 w-24 h-24 border-t-[8px] border-r-[8px] m-4 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
            <div className={`absolute bottom-0 left-0 w-24 h-24 border-b-[8px] border-l-[8px] m-4 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
            <div className={`absolute bottom-0 right-0 w-24 h-24 border-b-[8px] border-r-[8px] m-4 ${theme.cornerColor || 'border-[#8b4513]'}`}></div>
          </>
        )}

        <div className="relative z-10 px-16 pt-10 pb-6 h-full flex flex-col items-center">
          
          {/* Top Info Header */}
          <div className={`w-full flex justify-between mb-4 border-b pb-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-left">
              <span className={`block text-[10px] font-black uppercase ${theme.textPrimary}`}>Roll Number:</span>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>{data.rollNumber || 'NOT ISSUED'}</span>
            </div>
            <div className="text-right">
              <span className={`block text-[10px] font-black uppercase ${theme.textPrimary}`}>Issue Date:</span>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>{data.issueDate || 'NOT ISSUED'}</span>
            </div>
          </div>

          {/* Header Section */}
          <div className="flex justify-between w-full items-start mb-6">
             <div className="text-left w-1/4 pt-4">
                <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${theme.textSecondary}`}>ISO 9001:2015</p>
                <p className={`text-[10px] font-bold uppercase tracking-[0.1em] mt-1 ${theme.textSecondary}`}>Reg ID: {certInfo.id}</p>
             </div>
             <div className="text-center w-2/4">
                <h1 className={`text-3xl font-bold tracking-[0.1em] mb-1 uppercase leading-snug ${theme.textPrimary}`} style={{ fontFamily: theme.headerFont }}>
                  {data.institutionName || 'NATIONAL INSTITUTE OF TECHNOLOGY'}
                </h1>
                <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${theme.accent}`}>
                  (Registered under Govt. of India / Ministry of MSME)
                </p>
             </div>
             <div className="w-1/4 flex justify-end">
                <div className={`p-1 border shadow-md flex flex-col items-center ${isDark ? 'bg-white border-none' : 'bg-white border-gray-200'}`}>
                   <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(verificationUrl)}&bgcolor=ffffff`} 
                    alt="Scan to Verify" 
                    className="w-[80px] h-[80px] block"
                   />
                   <span className="text-[7px] mt-1 uppercase font-black tracking-tighter text-black">Verified QR Code</span>
                </div>
             </div>
          </div>

          <div className="w-full h-[2px] mb-10" style={{ background: `linear-gradient(to right, transparent, ${theme.borderCol}, transparent)` }}></div>

          {/* Main Content Body */}
          <div className="text-center w-full flex-1 flex flex-col items-center justify-center py-2">
            <h2 className={`text-6xl font-normal mb-8 ${theme.titleStyle} ${isDark ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: theme.bodyFont }}>
              Certificate of Excellence
            </h2>
            <p className={`text-xl mb-10 font-light italic tracking-[0.1em] ${theme.textSecondary}`}>This is to certify that the candidate</p>
            
            <div className="mb-10">
              <h3 className={`text-5xl font-bold border-b-2 border-dashed inline-block px-12 pb-2 uppercase tracking-[0.05em] ${theme.textPrimary}`} style={{ fontFamily: 'Playfair Display', borderColor: theme.borderCol + (isDark ? 'FF' : '40') }}>
                {data.studentName || 'Student Name'}
              </h3>
            </div>

            <div className="mb-8">
              <p className={`text-2xl ${theme.textSecondary}`}>
                Son/Daughter of <span className={`font-semibold underline decoration-dotted decoration-gray-400 underline-offset-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.fathersName || 'Father/Guardian Name'}</span>
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              <p className={`text-lg leading-relaxed tracking-wide ${theme.textSecondary}`}>
                has successfully completed the diploma course in
              </p>
              <h4 className={`text-3xl font-extrabold uppercase tracking-widest py-1 border-y border-transparent px-8 inline-block ${theme.textPrimary}`}>
                {data.courseName || 'Computer Application Program'}
              </h4>
              <p className={`text-lg leading-relaxed tracking-wide ${theme.textSecondary}`}>
                of <span className={`font-bold mx-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.duration || 'Duration'}</span> and achieved grade <span className={`font-bold mx-1 ${theme.textPrimary}`}>"{data.grade || 'A'}"</span>.
              </p>
              
              {/* Display Teacher Name if available */}
              {data.teacherName && (
                <p className={`text-md mt-4 font-bold italic opacity-80 ${theme.textSecondary}`}>
                  Under the guidance of {data.teacherName}
                </p>
              )}
            </div>
          </div>

          {/* Footer Grid - Photo & Signatures */}
          <div className="grid grid-cols-3 w-full mt-8 items-end relative min-h-[250px]">
            {/* Left - Approved Stamp */}
            <div className="text-left pb-10 pl-4">
               {isVerifiedView && (
                 <div className="border-2 border-green-600 rounded p-2 inline-block -rotate-12 opacity-80 bg-white/10 backdrop-blur-sm">
                   <p className="text-green-600 font-black text-xl leading-none">APPROVED</p>
                   <p className="text-green-600 font-bold text-[8px] uppercase">Digi-Verified</p>
                 </div>
               )}
            </div>
            
            {/* Student Photo Container - Fixed Z-Index & Visibility */}
            <div className="flex justify-center relative z-50">
              <div 
                onMouseDown={(e) => handleMouseDown('photo', e)}
                style={getStyle('photo')}
                className={`w-32 h-40 border-[3px] rounded bg-white flex items-center justify-center overflow-hidden shadow-2xl relative select-none`}
                // Use inline style for border color as utility classes might conflict with dynamic values
                ref={(el) => { if(el) el.style.borderColor = theme.borderCol; }}
              >
                {data.photoUrl ? (
                  <img 
                    key={data.photoUrl} // Use key to force reload
                    src={data.photoUrl} 
                    alt="Student Photograph" 
                    className="w-full h-full object-cover pointer-events-none block opacity-100 visible"
                    style={{ minWidth: '100%', minHeight: '100%' }}
                  />
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-16 h-16 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-400 text-[10px] uppercase block mt-2 font-black">Portrait Area</span>
                  </div>
                )}
                <div className={`absolute top-0 right-0 text-white text-[7px] px-2 py-0.5 font-black uppercase tracking-tighter`} style={{ backgroundColor: theme.borderCol }}>Verified</div>
              </div>
            </div>

            {/* Signature & Official Stamp Section */}
            <div className="text-right flex flex-col items-end space-y-12 relative pr-4 min-w-[220px]">
               {/* THE OFFICIAL RUBBER STAMP */}
               <div 
                  onMouseDown={(e) => handleMouseDown('stamp', e)}
                  style={getStyle('stamp')}
                  className="absolute -top-16 -left-12 w-40 h-40 opacity-80 transform rotate-[-15deg] select-none"
               >
                  <div className={`w-full h-full rounded-full border-[4px] flex items-center justify-center relative bg-transparent`} style={{ borderColor: isDark ? theme.borderCol : '#4c1d95' }}>
                    <div className={`w-[92%] h-[92%] rounded-full border border-dashed`} style={{ borderColor: isDark ? theme.borderCol : '#4c1d95' }}></div>
                    <div className={`absolute inset-0 flex flex-col items-center justify-center font-black leading-none text-center`} style={{ color: isDark ? theme.borderCol : '#4c1d95' }}>
                       <span className="text-[7px] uppercase mb-1 font-black px-2">Board of Computer Education</span>
                       <div className="relative h-6 w-24 flex items-center justify-center">
                          <span className="text-2xl font-bold italic opacity-90 absolute" style={{ fontFamily: 'Great Vibes', transform: 'rotate(-5deg)' }}>
                             S.A. Khan
                          </span>
                       </div>
                       <span className="text-[11px] uppercase border-y-2 py-1 tracking-tighter font-black w-[80%]" style={{ borderColor: isDark ? theme.borderCol : '#4c1d95' }}>APPROVED SEAL</span>
                       <span className="text-[7px] uppercase mt-1 font-black">Regd. Authority</span>
                    </div>
                  </div>
               </div>

               <div onMouseDown={(e) => handleMouseDown('signature1', e)} style={getStyle('signature1')} className="w-52 text-center select-none pt-2">
                  <div className={`text-3xl font-bold italic h-10 flex items-end justify-center tracking-wide ${theme.textPrimary}`} style={{ fontFamily: 'Great Vibes' }}>S. K. Verma</div>
                  <div className={`w-full h-[2px] mt-1`} style={{ backgroundColor: theme.borderCol }}></div>
                  <p className={`text-[10px] font-black mt-1 uppercase tracking-widest ${theme.textPrimary}`}>Controller of Examination</p>
               </div>
               
               <div onMouseDown={(e) => handleMouseDown('signature2', e)} style={getStyle('signature2')} className="w-52 text-center select-none pt-2">
                  <div className={`text-3xl font-bold italic h-10 flex items-end justify-center tracking-wide ${theme.textPrimary}`} style={{ fontFamily: 'Great Vibes' }}>Rajiv Kapoor</div>
                  <div className={`w-full h-[2px] mt-1`} style={{ backgroundColor: theme.borderCol }}></div>
                  <p className={`text-[10px] font-black mt-1 uppercase tracking-widest ${theme.textPrimary}`}>Director General</p>
               </div>
            </div>
          </div>

          {/* Bottom Branding & Verification Message */}
          <div className={`w-full flex justify-between items-center text-[9px] uppercase tracking-widest mt-10 border-t pt-4 ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
             <span className={`font-bold ${theme.textPrimary}`}>Certificate ID: {data.rollNumber || certInfo.id}</span>
             <span className={`text-center font-bold italic flex-1 px-8 truncate tracking-normal ${theme.textPrimary}`} style={{ opacity: 0.6 }}>
                {certInfo.verificationText} | Digital Copy at verify.formathub.in
             </span>
             <span className={`font-bold ${theme.textPrimary}`}>© 2024 GOVERNMENT APPROVED</span>
          </div>

          {/* Golden Seal of Quality */}
          <div className="absolute bottom-20 left-12 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-600 to-yellow-800 border-[3px] border-yellow-200 shadow-2xl flex items-center justify-center transform rotate-12">
             <div className="w-20 h-20 rounded-full border border-yellow-100 flex flex-col items-center justify-center text-white p-1 text-center">
                <span className="text-[8px] font-black tracking-tighter">GOVT</span>
                <span className="text-[11px] font-black border-y border-yellow-100 my-1 px-2 tracking-tighter uppercase">REGD.</span>
                <span className="text-[8px] font-black tracking-tighter">OFFICIAL</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
