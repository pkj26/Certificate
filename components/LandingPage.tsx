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
           <a href="#downloads" className="hidden lg:block text-sm font-bold text-gray-500 hover:text-blue-900 uppercase tracking-widest transition">All Formats</a>
           
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
            India's #1 Free Document & Resume Maker
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-blue-900 mb-8 tracking-tight leading-tight">
            AI Resume Builder &<br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x">Document Formats</span>
          </h1>
          <p className="text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Create a job-winning resume in seconds. Plus, download <strong>DCA Certificates</strong> and <strong>Salary Slips</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => navigate('/resume-builder')} className="w-full sm:w-auto text-lg bg-blue-600 text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Build Your Resume Now
            </button>
            <button onClick={() => document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-lg bg-white text-blue-900 border-2 border-gray-100 px-10 py-5 rounded-full font-bold hover:border-blue-200 hover:bg-gray-50 transition-all">
              View All Formats
            </button>
          </div>
          
          <div className="max-w-4xl mx-auto">
             <AdUnit slotId="hero-banner-1" />
          </div>
        </div>
      </header>

      {/* Statistics Strip */}
      <div className="bg-blue-900 text-white py-8 border-y border-blue-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <p className="text-3xl font-black text-yellow-500">100+</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Resume Templates</p>
            </div>
            <div>
                <p className="text-3xl font-black text-yellow-500">100%</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Free Forever</p>
            </div>
            <div>
                <p className="text-3xl font-black text-yellow-500">1-5</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Page Resumes</p>
            </div>
             <div>
                <p className="text-3xl font-black text-yellow-500">50K+</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Monthly Users</p>
            </div>
        </div>
      </div>

      {/* Popular Downloads Section */}
      <section id="downloads" className="px-6 lg:px-12 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-blue-900 mb-4">Our Free Tools</h2>
            <p className="text-gray-600 text-lg">Generate professional resumes and essential documents in one click.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2 bg-blue-50 rounded-2xl p-8 border-2 border-blue-500 hover:shadow-2xl transition-all cursor-pointer group flex flex-col items-center text-center" onClick={() => navigate('/resume-builder')}>
              <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg">🤖</div>
              <h3 className="text-2xl font-black text-blue-900 mb-2">AI Resume Builder</h3>
              <p className="text-sm text-gray-600 mb-4 font-bold text-blue-600 uppercase tracking-widest">100+ ATS-Friendly Templates</p>
              <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
                Select your job role and get a complete, pre-filled resume. Just edit your details and download a 1 to 5 page PDF. Perfect for freshers and experienced professionals.
              </p>
              <span className="mt-auto bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full group-hover:scale-105 transition-transform">
                Create Your Resume
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate('/certificate-generator')}>
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition">🎓</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">DCA Certificate Maker</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Generate high-quality Diploma in Computer Application (DCA) certificates with QR codes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate('/salary-slip-generator')}>
               <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition">📊</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Salary Slip Generator</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Professional salary slip format with automatic tax and allowance calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ... (rest of the component is the same) ... */}
      <section className="bg-gray-50 py-8">
         <div className="max-w-5xl mx-auto px-6">
            <AdUnit slotId="mid-content-1" />
         </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
                <span className="text-blue-600 font-black tracking-widest uppercase text-xs">Simple Process</span>
                <h2 className="text-3xl font-black text-blue-900 mt-2">How It Works</h2>
             </div>
             <div className="grid md:grid-cols-4 gap-4">
                {[
                    { step: "01", title: "Select Template", desc: "Choose your job role from 100+ options." },
                    { step: "02", title: "Auto-Fill Data", desc: "Get a complete resume example instantly." },
                    { step: "03", title: "Edit Your Info", desc: "Update the name, skills, and experience." },
                    { step: "04", title: "Download PDF", desc: "Get a high-quality, multi-page PDF." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative overflow-hidden">
                        <div className="text-6xl font-black text-gray-200 absolute -top-4 -right-4 select-none">{item.step}</div>
                        <h3 className="text-lg font-bold text-blue-900 relative z-10">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-2 relative z-10">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>
      </section>
      
      <section id="seo-content" className="px-6 lg:px-12 py-24 bg-gray-50 border-t border-gray-200">
         <div className="max-w-4xl mx-auto prose prose-blue prose-lg">
            <h2 className="text-3xl font-black text-blue-900 mb-8">Your Guide to the Perfect Resume in 2026</h2>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Why Use an AI Resume Builder?</h3>
            <p className="text-gray-600 mb-6">
                Creating a resume that stands out to both recruiters and Applicant Tracking Systems (ATS) is challenging. <strong>FormatHub's AI Resume Builder</strong> provides pre-filled, industry-specific templates that are already optimized. Whether you need a concise <em>1 page resume format for freshers</em> or a comprehensive <em>5 page resume for an academic role</em>, our tool adapts to your needs.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Multi-Page Resumes: When to Use Them</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-blue-900">1-2 Page Resumes</h4>
                    <p className="text-sm text-gray-600 mt-2">Ideal for most professionals, including IT, Sales, and Marketing. A <strong>2 page resume template</strong> is perfect for candidates with over 5-10 years of relevant experience.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-blue-900">3-5 Page Resumes</h4>
                    <p className="text-sm text-gray-600 mt-2">Typically used in academia, medicine, or for senior executives with extensive publications, patents, or projects. Our tool lets you generate these detailed formats easily.</p>
                </div>
            </div>
         </div>
      </section>

      <section id="features" className="px-6 lg:px-12 py-24 bg-white">
        <div className="max-w-2xl mx-auto text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-black text-blue-900 mb-4">Why Choose FormatHub?</h2>
           <p className="text-gray-600 text-lg">The most powerful free tool for resumes and certificates.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <FeatureCard icon="🤖" title="AI Auto-Fill" desc="Select your job title and get a complete, high-quality resume draft instantly. Save hours of writing." />
           <FeatureCard icon="📄" title="Multi-Page Options" desc="Choose the perfect length for your career. Generate anything from a 1-page summary to a 5-page detailed CV." />
           <FeatureCard icon="✅" title="ATS-Friendly Templates" desc="Our templates are designed to be easily parsed by Applicant Tracking Systems, increasing your chances of getting noticed." />
           <FeatureCard icon="🎨" title="10+ Certificate Designs" desc="Choose from Classic Gold, Modern Blue, and more for professional computer course certificates." />
           <FeatureCard icon="🔒" title="QR Code Verification" desc="Each certificate comes with a unique, scannable QR code that links to a secure verification page." />
           <FeatureCard icon="🖨️" title="Instant PDF Download" desc="Download high-resolution PDFs of your resumes and certificates, ready for printing or digital submission." />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
          <AdUnit slotId="pre-faq-1" />
      </div>

      <section id="faq" className="px-6 lg:px-12 py-24 bg-gray-50 border-t border-gray-100">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-blue-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid gap-6">
               <FaqItem question="Is the AI Resume Builder really free?" answer="Yes, 100%! Our AI Resume Builder, along with all our document generators, is completely free to use. The platform is supported by ads." />
               <FaqItem question="How many pages should my resume be?" answer="For freshers and professionals with under 10 years of experience, a 1-page resume is ideal. For those with more extensive experience, a 2-page resume is acceptable. Our tool provides options from 1 to 5 pages to suit every need." />
               <FaqItem question="What is an ATS-friendly resume?" answer="An ATS-friendly resume uses a clean, simple format with standard fonts and clear headings that can be easily read by the software recruiters use to screen candidates. All our templates are ATS-optimized." />
               <FaqItem question="Can I download my resume in Word format?" answer="Currently, we only support high-quality PDF downloads as it preserves formatting across all devices. We may add other formats in the future." />
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
                 India's leading platform for generating free, professional resumes and certificates.
               </p>
               <div className="w-full h-24 bg-blue-900/50 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-400 opacity-50">Ad Space</span>
               </div>
            </div>
            <div>
               <h4 className="font-black text-white uppercase tracking-widest mb-6">Tools</h4>
               <ul className="space-y-3 text-blue-300 text-sm">
                 <li><button onClick={() => navigate('/resume-builder')} className="hover:text-white transition text-left">AI Resume Builder</button></li>
                 <li><button onClick={() => navigate('/certificate-generator')} className="hover:text-white transition text-left">Certificate Generator</button></li>
                 <li><button onClick={() => navigate('/experience-letter-generator')} className="hover:text-white transition text-left">Experience Letters</button></li>
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

const FeatureCard = ({ icon, title, desc }: {icon: string, title: string, desc: string}) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-blue-200 hover:-translate-y-2 transition-all duration-300 group h-full">
    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">{icon}</div>
    <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm font-medium">{desc}</p>
  </div>
);

const FaqItem = ({ question, answer }: {question: string, answer: string}) => (
   <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h4 className="font-bold text-blue-900 text-lg mb-2">❓ {question}</h4>
      <p className="text-gray-600 leading-relaxed">{answer}</p>
   </div>
);

export default LandingPage;
