import React, { useState, useEffect, useRef } from 'react';
import AdUnit from './AdUnit';

interface LandingPageProps {
  navigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tools = [
    { key: '/resume-builder', name: 'AI Resume Builder', desc: 'ATS-Friendly Resume for Jobs' },
    { key: '/image-resizer', name: 'SSC Photo Resizer', desc: 'Resize to 20kb-50kb for Exams' },
    { key: '/certificate-generator', name: 'Certificate Maker', desc: 'DCA/ADCA Certificate with Photo' },
    { key: '/jpg-to-pdf', name: 'Image to PDF', desc: 'Combine Photos for Assignment' },
    { key: '/poster-maker', name: 'Online Poster Maker', desc: 'Business & Festival Graphics' },
    { key: '/experience-letter-generator', name: 'Experience Letter', desc: 'Official Relieving Formats' },
    { key: '/salary-slip-generator', name: 'Salary Slip Maker', desc: 'Monthly Payslip in Excel/PDF' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    if (isToolsOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isToolsOpen]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-black text-blue-900 tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
          Format<span className="text-yellow-600">Hub</span>
        </div>
        <div className="hidden lg:flex items-center space-x-8">
           {tools.slice(0, 4).map(tool => (
             <button key={tool.key} onClick={() => navigate(tool.key)} className="text-xs font-black text-gray-400 hover:text-blue-900 uppercase tracking-widest transition">{tool.name}</button>
           ))}
        </div>
        <button onClick={() => navigate('/resume-builder')} className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-black transition shadow-lg">
          Get Started
        </button>
      </nav>

      {/* Hero Section - Highly Optimized for Search Intent */}
      <header className="relative bg-gray-50 py-20 lg:py-32 px-6 lg:px-12 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Free Document Tools for India</span>
          <h1 className="text-4xl lg:text-7xl font-black text-blue-950 mb-6 leading-tight">
            Best Online Tool for <span className="text-blue-600">SSC Photo Resizer</span> & AI Resume Builder
          </h1>
          <p className="text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Easily Resize Photo for SSC (20kb-50kb), Generate DCA Computer Certificates, and Create ATS-Friendly Resumes for Free. No Hidden Charges.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/image-resizer')} className="w-full sm:w-auto bg-blue-900 text-white px-10 py-5 rounded-xl font-black text-lg shadow-2xl hover:bg-black transition-all">
              Resize SSC Photo Now
            </button>
            <button onClick={() => navigate('/certificate-generator')} className="w-full sm:w-auto bg-white border-2 border-gray-200 text-blue-900 px-10 py-5 rounded-xl font-black text-lg hover:border-blue-900 transition-all">
              Make Computer Certificate
            </button>
          </div>
        </div>
      </header>

      {/* Services Grid Section */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-blue-900 mb-4 text-center">Our Most Popular Services</h2>
        <p className="text-center text-gray-500 mb-16">Selected by thousands of Indian students and professionals every day.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div key={tool.key} onClick={() => navigate(tool.key)} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer flex flex-col items-start">
               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">✨</span>
               </div>
               <h3 className="text-xl font-black text-blue-950 mb-2">{tool.name}</h3>
               <p className="text-gray-500 text-sm mb-6 leading-relaxed">{tool.desc}</p>
               <span className="mt-auto text-blue-600 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">Use Tool &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed SEO Content Section (Google Ranking Booster) */}
      <section className="bg-blue-950 text-white py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">How to Get First Page Rank? FormatHub Helps Students & Job Seekers</h2>
            <p className="text-blue-200 text-lg">FormatHub is India's leading platform for free online formats. We focus on tools that are essential for competitive exams like SSC, UPSC, and IBPS.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">SSC & Govt Exam Photo Resizer 20kb-50kb</h3>
              <p className="text-blue-100 text-sm leading-loose">
                If you are applying for SSC CGL 2024-25, you need a photo between 20kb to 50kb and dimensions of 3.5cm x 4.5cm. Our tool automatically adjusts your photo and signature to meet these exact requirements, ensuring your form is never rejected.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Free Computer Course Certificate Maker with Photo</h3>
              <p className="text-blue-100 text-sm leading-loose">
                Are you running a computer center? Create professional DCA, ADCA, Tally, and CCC certificates for your students. Add their photo, roll number, and grade. Download high-quality PDFs with ISO 9001:2015 verification marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">ATS-Friendly AI Resume Builder for Freshers</h3>
              <p className="text-blue-100 text-sm leading-loose">
                Get hired at top companies like TCS, Infosys, and Wipro with our AI-powered resume builder. We provide 100+ templates that pass Applicant Tracking Systems (ATS), helping freshers and professionals create 1 to 5 page resumes in minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Convert JPG to PDF for Assignments Online</h3>
              <p className="text-blue-100 text-sm leading-loose">
                Perfect for IGNOU and CBSE students. Select multiple photos of your handwritten notes and combine them into a single PDF document. It's fast, secure, and preserves high-quality text for online submission.
              </p>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-blue-900">
             <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-white text-blue-950 px-8 py-3 rounded-full font-black hover:bg-yellow-500 transition">Go to Top &rarr;</button>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 text-blue-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
             <FaqItem question="How to resize a photo to 20kb to 50kb for SSC?" answer="Upload your photo to our 'Govt Photo Resizer' tool, select the 'SSC' preset, and click download. It will automatically compress the file to the required 20kb-50kb range." />
             <FaqItem question="Can I download a DCA certificate in PDF format?" answer="Yes! Use our Certificate Generator, enter the student's details, upload their photo, and click 'Download PDF'. You can choose from 10+ professional designs." />
             <FaqItem question="Is this resume builder free for Indian students?" answer="Absolutely! FormatHub's Resume Builder is 100% free. You can create multi-page resumes and download them without any watermark or subscription." />
             <FaqItem question="How to combine multiple photos into one PDF?" answer="Use our 'JPG to PDF' tool. Select all your images, arrange them in order, and click 'Download PDF'. This is the best tool for IGNOU assignment uploads." />
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-12 px-6 text-center">
         <div className="text-xl font-black text-blue-900 mb-4">Format<span className="text-yellow-600">Hub</span></div>
         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">© 2026 FormatHub.in - India's #1 Tool for Students</p>
         <div className="flex justify-center gap-6 text-[10px] font-black uppercase text-gray-500">
            <button onClick={() => navigate('/about')} className="hover:text-blue-900 transition">About Us</button>
            <button onClick={() => navigate('/privacy')} className="hover:text-blue-900 transition">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-blue-900 transition">Terms of Service</button>
         </div>
      </footer>
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-6 font-bold flex justify-between items-center group">
        <span className="text-blue-950 group-hover:text-blue-600 transition-colors">{question}</span>
        <span className={`text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      {isOpen && <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">{answer}</div>}
    </div>
  );
};

export default LandingPage;