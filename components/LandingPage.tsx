
// FIX: Corrected the import statement for React hooks. The hooks should not be wrapped in quotes.
import React, { useState, useEffect, useRef } from 'react';
import AdUnit from './AdUnit';

interface LandingPageProps {
  navigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tools = [
    { key: '/resume-builder', name: 'AI Resume Builder' },
    { key: '/image-resizer', name: 'Govt Photo Resizer' },
    { key: '/poster-maker', name: 'Online Poster Maker' },
    { key: '/jpg-to-pdf', name: 'JPG to PDF Converter' },
    { key: '/certificate-generator', name: 'Certificate Maker' },
    { key: '/experience-letter-generator', name: 'Experience Letter' },
    { key: '/salary-slip-generator', name: 'Salary Slip Generator' },
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
      <nav className="flex items-center justify-between px-6 lg:px-12 py-6 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="text-2xl lg:text-3xl font-black text-blue-900 tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
          Format<span className="text-yellow-600">Hub</span>
        </div>
        <div className="flex items-center space-x-6">
           <a href="#tools-explained" className="hidden lg:block text-sm font-bold text-gray-500 hover:text-blue-900 uppercase tracking-widest transition">Our Tools</a>
           
           <div className="relative hidden lg:block" ref={dropdownRef}>
              <button onClick={() => setIsToolsOpen(!isToolsOpen)} className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-blue-900 uppercase tracking-widest transition">
                <span>Tools</span>
                <svg className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isToolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {tools.map(tool => (
                    <button 
                      key={tool.key}
                      onClick={() => {
                        navigate(tool.key);
                        setIsToolsOpen(false);
                      }} 
                      className="w-full text-left px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition"
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
              )}
           </div>

           <button onClick={() => navigate('/resume-builder')} className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-blue-900/30 transform hover:-translate-y-0.5">
             Create Resume
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 lg:px-12 py-20 lg:py-24 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-widest mb-6">
            India's #1 Document Resource
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-blue-900 mb-8 tracking-tight leading-tight">
            India's Document Hub: Free Resume, PDF Tools & Exam Formats
          </h1>
          <p className="text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Convert Photos to PDF, Resize Exam Images (50kb), and build job-winning resumes. All tools are 100% Free & Mobile Friendly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => navigate('/poster-maker')} className="w-full sm:w-auto text-lg bg-pink-600 text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-pink-600/30 hover:shadow-2xl hover:bg-pink-700 hover:-translate-y-1 transition-all">
              Create Free Poster
            </button>
            <button onClick={() => navigate('/image-resizer')} className="w-full sm:w-auto text-lg bg-white text-blue-900 border-2 border-gray-100 px-10 py-5 rounded-full font-bold hover:border-blue-200 hover:bg-gray-50 transition-all">
              Resize Exam Photo
            </button>
          </div>
          
          <div className="max-w-4xl mx-auto">
             <AdUnit slotId="hero-banner-1" />
          </div>
        </div>
      </header>
      
      <section id="tools-explained" className="px-6 lg:px-12 py-24 bg-gray-50 border-y border-gray-200">
         <div className="max-w-4xl mx-auto prose prose-blue prose-lg">
            <p className="lead text-xl text-gray-700 text-center mb-16">
                Welcome to FormatHub, India's most comprehensive free resource. We have updated our platform with powerful design tools to help small businesses and students.
            </p>

            <h2 className="text-3xl font-black text-blue-900 mb-8">New! Free Online Poster Maker 2026</h2>
            <p className="text-gray-600 mb-6">
                Need a poster for your shop's Diwali Sale or a "Hiring Now" post for Instagram? Our <strong>Online Poster Maker</strong> lets you design professional graphics in minutes.
            </p>
            <p className="text-gray-600 mb-6">
                With pre-made templates for Festivals, Sales, and Events, you can drag and drop text, add your own photos/logos, and download high-quality images for free.
            </p>
            <div className="text-center my-8">
                <button onClick={() => navigate('/poster-maker')} className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pink-700 transition">Design a Poster Now &rarr;</button>
            </div>

            <h2 className="text-3xl font-black text-blue-900 mb-8">New! JPG to PDF Converter (Photo to PDF)</h2>
            <p className="text-gray-600 mb-6">
                Need to submit assignments for IGNOU, CBSE, or upload documents for job applications? Our <strong>Image to PDF Converter</strong> lets you select multiple photos from your gallery and combine them into a single, high-quality PDF file.
            </p>
            <div className="text-center my-8">
                <button onClick={() => navigate('/jpg-to-pdf')} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition">Combine Photos to PDF &rarr;</button>
            </div>

            <h2 className="text-3xl font-black text-blue-900 mb-8">Govt Exam Photo Resizer (20KB - 50KB)</h2>
            <p className="text-gray-600 mb-6">
                Applying for SSC CGL, UPSC, IBPS, or NEET? You know the struggle: "Image should be between 20kb to 50kb" and "Dimensions 3.5cm x 4.5cm".
            </p>
            <div className="text-center my-8">
                <button onClick={() => navigate('/image-resizer')} className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transition">Resize Image Now &rarr;</button>
            </div>
         </div>
      </section>

      <section id="faq" className="px-6 lg:px-12 py-24 bg-white">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-blue-900 mb-12 text-center">Your Questions, Answered</h2>
            <div className="space-y-6">
               <FaqItem question="How to make a poster online for free?" answer="Use FormatHub's Poster Maker. Select a template, customize the text, add your photo, and download. It's completely free and works in your browser." />
               <FaqItem question="How to convert photo to PDF for assignment?" answer="Use our free 'JPG to PDF' tool. Select your photos, arrange them in order using the up/down arrows, and click 'Download PDF'. It's perfect for handwritten notes." />
               <FaqItem question="How to resize photo for SSC CGL 2026?" answer="Use our 'Govt Photo Resizer' tool. Select 'SSC (CGL/CHSL) Photo' from the dropdown. It will automatically set the dimensions to 3.5cm x 4.5cm and compress the file size to between 20kb and 50kb." />
               <FaqItem question="Is FormatHub.in really free to use?" answer="Yes, 100%! All our tools—the AI Resume Builder, Salary Slip Generator, Image Resizer, Poster Maker, and PDF Converter—are completely free to use." />
            </div>
         </div>
      </section>

      <footer className="bg-blue-950 text-white pt-20 pb-10 border-t border-blue-900/50">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
               <div className="text-2xl font-black text-white tracking-tighter mb-6">
                 Format<span className="text-yellow-600">Hub</span>
               </div>
               <p className="text-blue-300 max-w-sm leading-relaxed mb-6">
                 India's leading platform for generating free, professional resumes, certificates, and exam tools.
               </p>
               <div className="w-full h-24 bg-blue-900/50 rounded flex items-center justify-center">
                  <AdUnit slotId="footer-banner-1" />
               </div>
            </div>
            <div>
               <h4 className="font-black text-white uppercase tracking-widest mb-6">Tools</h4>
               <ul className="space-y-3 text-blue-300 text-sm">
                 <li><button onClick={() => navigate('/poster-maker')} className="hover:text-white transition text-left">Poster Maker</button></li>
                 <li><button onClick={() => navigate('/jpg-to-pdf')} className="hover:text-white transition text-left">JPG to PDF Converter</button></li>
                 <li><button onClick={() => navigate('/resume-builder')} className="hover:text-white transition text-left">AI Resume Builder</button></li>
                 <li><button onClick={() => navigate('/image-resizer')} className="hover:text-white transition text-left">Photo Resizer (50kb)</button></li>
                 <li><button onClick={() => navigate('/certificate-generator')} className="hover:text-white transition text-left">Certificate Generator</button></li>
                 <li><button onClick={() => navigate('/salary-slip-generator')} className="hover:text-white transition text-left">Salary Slips</button></li>
               </ul>
            </div>
            <div>
               <h4 className="font-black text-white uppercase tracking-widest mb-6">Legal</h4>
               <ul className="space-y-3 text-blue-300 text-sm">
                 <li onClick={() => navigate('/privacy')} className="hover:text-white transition cursor-pointer">Privacy Policy</li>
                 <li onClick={() => navigate('/terms')} className="hover:text-white transition cursor-pointer">Terms of Service</li>
                 <li onClick={() => navigate('/about')} className="hover:text-white transition cursor-pointer">About Us</li>
               </ul>
            </div>
         </div>
         <div className="text-center border-t border-blue-900 pt-10">
            <p className="font-bold text-blue-400 text-xs uppercase tracking-widest">© 2026 FormatHub.in. All Rights Reserved.</p>
         </div>
      </footer>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}
const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
       <div className="bg-white border-2 border-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
          <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-6">
             <h4 className="font-bold text-blue-900 text-lg">{question}</h4>
             <span className={`transform transition-transform duration-300 text-2xl font-light text-blue-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>+</span>
          </button>
          {isOpen && (
            <div className="px-6 pb-6">
               <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          )}
       </div>
   )
};

export default LandingPage;
