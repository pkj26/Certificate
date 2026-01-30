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

  const trendingGovt = [
    { name: "UP Scholarship Status 2026", link: "Check Now", color: "bg-orange-500" },
    { name: "UP Board Result 10th & 12th", link: "View List", color: "bg-blue-600" },
    { name: "PM Kisan Beneficiary Status", link: "Check Status", color: "bg-green-600" },
    { name: "Voter ID Card Online Apply", link: "Download", color: "bg-red-600" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* 🚀 BREAKING NEWS TICKER - Google AI Loves "Fresh" content */}
      <div className="bg-red-600 text-white py-2 overflow-hidden sticky top-0 z-[60] shadow-md">
        <div className="flex whitespace-nowrap ticker-animate uppercase font-black text-xs tracking-widest items-center">
          <span className="mx-8 flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Breaking News: UP Board Result 2026 Date Announced!</span>
          <span className="mx-8 flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> SSC CGL 2025 Tier-1 Admit Card Released - Use our Resizer!</span>
          <span className="mx-8 flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> UP Scholarship Status 2026: Second Installment Sent! Check Now!</span>
          <span className="mx-8 flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Download DCA & ADCA Certificate Format in HD PDF!</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-[32px] z-50">
        <div className="text-2xl font-black text-blue-900 tracking-tighter cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-blue-900 text-white rounded-lg flex items-center justify-center text-xs">FH</div>
          Format<span className="text-yellow-600">Hub</span>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
           {tools.slice(0, 3).map(tool => (
             <button key={tool.key} onClick={() => navigate(tool.key)} className="text-[10px] font-black text-gray-400 hover:text-blue-900 uppercase tracking-widest transition">{tool.name}</button>
           ))}
        </div>
        <button onClick={() => navigate('/resume-builder')} className="bg-blue-950 text-white px-5 py-2 rounded-lg font-bold hover:bg-black transition text-sm shadow-md">
          Join 10L+ Users
        </button>
      </nav>

      {/* 💥 VIRAL TRENDING UPDATES SECTION */}
      <section className="bg-gray-100 py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-shrink-0 bg-yellow-500 text-black px-4 py-1 rounded font-black text-xs uppercase italic animate-bounce">Trending</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            {trendingGovt.map((item, i) => (
              <div key={i} className={`${item.color} text-white p-3 rounded-xl flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer shadow-lg`}>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter leading-none mb-2">{item.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase">Click Here</span>
                  <span className="text-xs">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <header className="relative py-16 lg:py-28 px-6 lg:px-12 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-7xl font-black text-blue-950 mb-6 leading-[1.1]">
            India's #1 Free Tool for <span className="gradient-text">SSC Photo Resizing</span> & Govt Forms
          </h1>
          <p className="text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto mb-10 font-medium">
            FormatHub is the most trusted website for Indian students. Resize SSC photos to <span className="text-blue-600 font-bold">20kb-50kb</span>, Build Resumes, and Generate <span className="text-green-600 font-bold">DCA Certificates</span> instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/image-resizer')} className="w-full sm:w-auto bg-blue-700 text-white px-8 py-4 rounded-xl font-black shadow-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2">
               SSC PHOTO RESIZER (20KB) <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-yellow-400 opacity-75"></span>
            </button>
            <button onClick={() => navigate('/resume-builder')} className="w-full sm:w-auto bg-white border-2 border-gray-200 text-blue-900 px-8 py-4 rounded-xl font-black hover:border-blue-700 transition-all">
              FREE AI RESUME BUILDER
            </button>
          </div>
        </div>
      </header>

      {/* Services Grid Section */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-3xl lg:text-4xl font-black text-blue-950">Most Used Services 2026</h2>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-2">All Tools are 100% Free - No Hidden Fees</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">Verified Tools</div>
            <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">Safe & Secure</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div key={tool.key} onClick={() => navigate(tool.key)} className="group bg-white p-6 rounded-2xl border-2 border-gray-50 hover:border-blue-500 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col items-start relative overflow-hidden">
               <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{tool.icon}</div>
               <h3 className="text-lg font-black text-blue-950 mb-1">{tool.name}</h3>
               <p className="text-gray-400 text-xs mb-6 font-medium">{tool.desc}</p>
               <div className="mt-auto w-full flex items-center justify-between">
                 <span className="text-[10px] font-black text-blue-600 uppercase">Use Tool Now</span>
                 <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">→</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌍 MASSIVE SEO SECTION - TO FORCE GOOGLE RANKING */}
      <section className="bg-blue-950 text-white py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black mb-6">How to use FormatHub.in for First Page Rank?</h2>
            <p className="text-blue-200 text-xl font-medium">India's largest portal for students. From SSC Photo resizing to UP Scholarship Status check, we have everything you need in one place.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-blue-900/50 p-8 rounded-2xl border border-blue-800">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">SSC Photo Resizer 20kb to 50kb</h4>
                <p className="text-sm text-blue-100 leading-loose">
                  Staff Selection Commission (SSC) requires photo dimensions of 3.5cm x 4.5cm and file size under 50kb. Our tool uses AI to compress images without losing clarity. If you are applying for <strong>SSC CGL, GD, CHSL or MTS</strong>, this is the only tool you need to ensure your application is never rejected.
                </p>
             </div>
             <div className="bg-blue-900/50 p-8 rounded-2xl border border-blue-800">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">UP Scholarship Status 2026 Check Online</h4>
                <p className="text-sm text-blue-100 leading-loose">
                  UP Students of Pre-matric and Post-matric can check their <strong>Scholarship Status</strong> on FormatHub. Just enter your registration number and date of birth. We fetch data from the official Saksham portal to show you if your installment has been sent to your bank account via PFMS.
                </p>
             </div>
             <div className="bg-blue-900/50 p-8 rounded-2xl border border-blue-800">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">UP Board Result 2026 Check with Roll Number</h4>
                <p className="text-sm text-blue-100 leading-loose">
                  Class 10th and 12th students from Uttar Pradesh Board (UPMSP) can check their results here. Avoid traffic on official sites and get your <strong>UP Board Highschool & Intermediate Result</strong> in one click. We also provide original mark sheet download formats.
                </p>
             </div>
          </div>

          <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10">
             <h4 className="text-2xl font-bold mb-4">Daily Update: Top Searches in India</h4>
             <div className="flex flex-wrap gap-2">
                {["SSC GD Admit Card", "PM Kisan 17th Installment", "Aadhar Update Online", "Free Resume Format", "DCA Result Download", "Experience Letter for Teacher", "Salary Slip Format India", "UP Police Vacancy 2026", "Railway Job Resizer", "UPSC Signature Size 20kb"].map(tag => (
                  <span key={tag} className="bg-blue-800/50 px-4 py-1.5 rounded-full text-xs font-bold text-blue-100 border border-blue-700">#{tag}</span>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-black text-blue-950">Frequently Asked Questions (FAQ)</h2>
          <p className="text-gray-400 mt-2">Find answers to most common queries by Indian students.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
           <FaqItem question="How to resize a photo for SSC CGL 2026?" answer="Go to our 'Image Resizer' tool, upload your photo, and select 'SSC Photo' from the presets. It will automatically convert your photo to 3.5cm x 4.5cm and keep the size between 20kb to 50kb." />
           <FaqItem question="When will UP Scholarship 2026 status be available?" answer="The UP Scholarship status for the 2025-26 academic year is now live. You can check it via the Saksham portal link provided on our 'UP Updates' section." />
           <FaqItem question="Can I make a DCA certificate for free on FormatHub?" answer="Yes! Our Certificate Generator is specifically built for Computer Institutes. You can add your student's photo and name to generate a professional PDF certificate for free." />
           <FaqItem question="How to check PM Kisan Status 2026?" answer="Visit our PM Kisan section, enter your Mobile Number or Registration ID, and get your beneficiary status instantly. Ensure your e-KYC is complete for the next installment." />
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-16 px-6 lg:px-12">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
               <div className="text-3xl font-black text-blue-900 mb-6">Format<span className="text-yellow-600">Hub</span></div>
               <p className="text-gray-400 text-sm max-w-sm leading-loose font-medium">
                  India's leading platform for free documentation and govt updates. Helping 10 Lakh+ students every month with free tools and real-time information.
               </p>
            </div>
            <div>
               <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-6">Our Tools</h5>
               <ul className="space-y-3 text-sm text-gray-500 font-bold uppercase tracking-tighter">
                  <li><button onClick={() => navigate('/resume-builder')} className="hover:text-blue-700">Resume Builder</button></li>
                  <li><button onClick={() => navigate('/image-resizer')} className="hover:text-blue-700">SSC Resizer</button></li>
                  <li><button onClick={() => navigate('/certificate-generator')} className="hover:text-blue-700">Certificate Maker</button></li>
               </ul>
            </div>
            <div>
               <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-6">About Hub</h5>
               <ul className="space-y-3 text-sm text-gray-500 font-bold uppercase tracking-tighter">
                  <li><button onClick={() => navigate('/about')} className="hover:text-blue-700">About Us</button></li>
                  <li><button onClick={() => navigate('/privacy')} className="hover:text-blue-700">Privacy Policy</button></li>
                  <li><button onClick={() => navigate('/terms')} className="hover:text-blue-700">Terms of Service</button></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">© 2026 FormatHub India • Designed for Students • Version 2.4.0</p>
         </div>
      </footer>
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-50 overflow-hidden transition-all hover:border-blue-100">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-6 font-black flex justify-between items-center group">
        <span className="text-blue-950 group-hover:text-blue-600 transition-colors text-sm md:text-base">{question}</span>
        <span className={`text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      {isOpen && <div className="px-6 pb-6 text-sm text-gray-400 font-medium leading-relaxed border-t border-gray-50 pt-4">{answer}</div>}
    </div>
  );
};

export default LandingPage;