import React, { useState, useEffect, useRef } from 'react';
import AdUnit from './AdUnit';

interface LandingPageProps {
  navigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const tools = [
    { key: '/resume-builder', name: 'AI Resume Builder', desc: 'ATS-Friendly Resume for Jobs', icon: '📄' },
    { key: '/image-resizer', name: 'SSC Photo Resizer', desc: 'Resize to 20kb-50kb for Exams', icon: '🖼️' },
    { key: '/certificate-generator', name: 'Certificate Maker', desc: 'DCA/ADCA Certificate with Photo', icon: '🎓' },
    { key: '/jpg-to-pdf', name: 'Image to PDF', desc: 'Combine Photos for Assignment', icon: '📁' },
    { key: '/poster-maker', name: 'Online Poster Maker', desc: 'Business & Festival Graphics', icon: '🎨' },
    { key: '/experience-letter-generator', name: 'Experience Letter', desc: 'Official Relieving Formats', icon: '🏢' },
    { key: '/salary-slip-generator', name: 'Salary Slip Maker', desc: 'Monthly Payslip in Excel/PDF', icon: '💸' },
  ];

  const updates = [
    { title: "UP Scholarship 2026 Status Check", label: "New", color: "text-red-600" },
    { title: "SSC GD Constable Admit Card 2025", label: "Updates", color: "text-blue-600" },
    { title: "UP Board 10th/12th Result 2026 Date", label: "Coming Soon", color: "text-green-600" },
    { title: "PM Kisan 18th Installment List", label: "Check", color: "text-orange-600" },
    { title: "Railway RPF Admit Card Download", label: "Active", color: "text-red-600" },
    { title: "CCC Certificate Download 2026", label: "Free", color: "text-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* 🚀 GOOGLE RANKING BOOSTER: Sarkari Style Ticker */}
      <div className="bg-blue-900 text-white py-1 overflow-hidden sticky top-0 z-[60] shadow-md border-b border-yellow-500">
        <div className="flex whitespace-nowrap ticker-animate uppercase font-black text-[10px] tracking-widest items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-2">
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-[8px]">LIVE</span> 
              Sarkari Result 2026: UP Board Class 10th & 12th Results Expected in April! Check UP Scholarship Status Online.
            </span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-3 bg-white border-b border-gray-100 sticky top-[28px] z-50">
        <div className="text-2xl font-black text-blue-900 tracking-tighter cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-blue-900 text-white rounded-lg flex items-center justify-center text-xs">FH</div>
          Format<span className="text-yellow-600">Hub</span>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
           <button onClick={() => navigate('/certificate-generator')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Computer Certificate</button>
           <button onClick={() => navigate('/image-resizer')} className="text-[10px] font-black text-gray-400 hover:text-blue-900 uppercase tracking-widest">SSC Resizer</button>
           <button onClick={() => navigate('/resume-builder')} className="text-[10px] font-black text-gray-400 hover:text-blue-900 uppercase tracking-widest">AI Resume</button>
        </div>
        <button onClick={() => navigate('/resume-builder')} className="bg-blue-950 text-white px-5 py-2 rounded-lg font-bold hover:bg-black transition text-xs shadow-md uppercase">
          Build Resume
        </button>
      </nav>

      {/* 💥 SARKARI RESULT STYLE UPDATES (Massive Traffic Driver) */}
      <section className="bg-gray-50 py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto border-4 border-blue-900 rounded-xl bg-white overflow-hidden shadow-2xl">
          <div className="bg-blue-900 text-white p-3 text-center font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4">
             <span className="animate-pulse text-yellow-400 text-lg">★</span>
             Latest Sarkari Updates 2026
             <span className="animate-pulse text-yellow-400 text-lg">★</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {updates.map((update, i) => (
              <div key={i} className="bg-white p-4 hover:bg-yellow-50 transition-colors cursor-pointer group border-b md:border-b-0">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-black uppercase">{update.label}</span>
                   <span className="text-gray-300 group-hover:text-blue-600 transition-colors">→</span>
                </div>
                <h3 className={`text-sm font-bold ${update.color} hover:underline`}>{update.title}</h3>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
             Fastest Information Portal for Indian Students • UP Scholarship • PM Kisan • SSC CGL
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <header className="relative py-16 lg:py-24 px-6 lg:px-12 text-center bg-white border-b border-gray-50">
        <div className="max-w-4xl mx-auto">
          <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Free Certificate & Resume Maker</span>
          <h1 className="text-4xl lg:text-7xl font-black text-blue-950 mb-6 leading-[1.1]">
            Create Computer <span className="text-blue-600">Certificate with Photo</span> & SSC Resizer
          </h1>
          <p className="text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto mb-10 font-medium">
            Generate DCA/ADCA Certificates for free. Resize SSC photos to <span className="text-blue-600 font-bold">20kb-50kb</span> instantly. Used by 10 Lakh+ students and computer institutes in India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/certificate-generator')} className="w-full sm:w-auto bg-blue-700 text-white px-8 py-4 rounded-xl font-black shadow-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2">
               MAKE COMPUTER CERTIFICATE 🎓
            </button>
            <button onClick={() => navigate('/image-resizer')} className="w-full sm:w-auto bg-white border-2 border-gray-200 text-blue-900 px-8 py-4 rounded-xl font-black hover:border-blue-700 transition-all">
              RESIZE SSC PHOTO (20KB)
            </button>
          </div>
        </div>
      </header>

      {/* Tools Section */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 text-blue-950">Free Document Generators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div key={tool.key} onClick={() => navigate(tool.key)} className="group bg-white p-6 rounded-2xl border-2 border-gray-50 hover:border-blue-500 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col items-start relative overflow-hidden">
               <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{tool.icon}</div>
               <h3 className="text-lg font-black text-blue-950 mb-1">{tool.name}</h3>
               <p className="text-gray-400 text-xs mb-6 font-medium">{tool.desc}</p>
               <span className="mt-auto text-[10px] font-black text-blue-600 uppercase">Start Now &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-blue-950 text-white py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-black mb-8">How to get 1st Rank on Google?</h2>
            <p className="text-blue-200 text-lg">FormatHub provides real-time updates for UP Scholarship, Board Results, and PM Kisan to help you stay ahead.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-yellow-500 italic underline">#1 SSC Photo Resizer 20kb to 50kb</h3>
               <p className="text-sm text-blue-100 leading-relaxed">
                 Applying for SSC CGL 2026? You must have a photo between 20kb to 50kb. Dimensions must be 3.5cm x 4.5cm. Our tool automatically adjusts your photo for Staff Selection Commission forms without losing quality. We also support UPSC, IBPS, and Railway photo resizing.
               </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-yellow-500 italic underline">#2 UP Scholarship Status 2026 Check</h3>
               <p className="text-sm text-blue-100 leading-relaxed">
                 Check your pre-matric and post-matric scholarship status on our dashboard. We provide direct links to the Saksham portal. Whether you are from General, OBC, SC, or ST category, find your payment status using your registration number and date of birth.
               </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-yellow-500 italic underline">#3 Computer Certificate Maker with Photo</h3>
               <p className="text-sm text-blue-100 leading-relaxed">
                 Own a computer center? Generate professional DCA, ADCA, Tally, and CCC certificates for your students in 1 minute. Upload their photo, name, and roll number to download an ISO-9001 certified format in high-quality PDF. 100% Free for educational purposes.
               </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-yellow-500 italic underline">#4 Free AI Resume Builder for Freshers</h3>
               <p className="text-sm text-blue-100 leading-relaxed">
                 Build an ATS-friendly resume for jobs in 2026. Our AI-powered templates are designed for freshers in B.Tech, MBA, and Diploma courses. Download professional 1-page or 2-page CVs in PDF for free and get hired at top MNCs like TCS and Wipro.
               </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-16 px-6 text-center">
         <div className="text-3xl font-black text-blue-900 mb-6">Format<span className="text-yellow-600">Hub</span>.in</div>
         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-12">India's #1 Tool Portal for Students and Professionals</p>
         <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase text-gray-400">
            <button onClick={() => navigate('/about')} className="hover:text-blue-900">About Us</button>
            <button onClick={() => navigate('/privacy')} className="hover:text-blue-900">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-blue-900">Terms of Service</button>
            <button onClick={() => window.scrollTo(0, 0)} className="text-blue-600">Back to Top ↑</button>
         </div>
         <div className="mt-12 text-[8px] text-gray-300 font-bold uppercase tracking-[0.3em]">
            © 2026 FormatHub India • Sarkari Updates • Document Tools • AI Resume
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;