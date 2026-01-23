
import React from 'react';
import AdUnit from './AdUnit';

interface LandingPageProps {
  onStart: (mode?: 'course' | 'salary' | 'experience') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-6 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="text-2xl lg:text-3xl font-black text-blue-900 tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>
          Format<span className="text-yellow-600">Hub</span>
        </div>
        <div className="flex items-center space-x-6">
           <a href="#features" className="hidden lg:block text-sm font-bold text-gray-500 hover:text-blue-900 uppercase tracking-widest transition">Features</a>
           <a href="#faq" className="hidden lg:block text-sm font-bold text-gray-500 hover:text-blue-900 uppercase tracking-widest transition">FAQ</a>
           <button onClick={() => onStart('course')} className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-blue-900/30 transform hover:-translate-y-0.5">
             Create Certificate
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 lg:px-12 py-20 lg:py-24 text-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-widest mb-6">
            India's #1 Free Document & Certificate Maker
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-blue-900 mb-8 tracking-tight leading-tight">
            Professional <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x">Document Formats</span>
          </h1>
          <p className="text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Download <strong>DCA Certificates</strong>, <strong>Experience Letters</strong>, and <strong>Salary Slips</strong>. 
            Customize and generate government-compliant documents in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => onStart('course')} className="w-full sm:w-auto text-lg bg-blue-600 text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Start Generating
            </button>
            <button onClick={() => document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-lg bg-white text-blue-900 border-2 border-gray-100 px-10 py-5 rounded-full font-bold hover:border-blue-200 hover:bg-gray-50 transition-all">
              View Formats
            </button>
          </div>
          
          {/* Ad Placement: Top Banner (High CTR) */}
          <div className="max-w-4xl mx-auto">
             <AdUnit slotId="hero-banner-1" />
          </div>
        </div>
      </header>

      {/* Popular Downloads & SEO Content Section */}
      <section id="downloads" className="px-6 lg:px-12 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-blue-900 mb-4">Popular Document Formats</h2>
            <p className="text-gray-600 text-lg">Use our free tools to generate essential professional documents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* SEO Card 1: DCA Certificate */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group" onClick={() => onStart('course')}>
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition">🎓</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">DCA Certificate Performa Download</h3>
              <p className="text-sm text-gray-600 mb-4 font-bold text-blue-600 uppercase tracking-widest">5+ Professional Designs</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Generate high-quality Diploma in Computer Application (DCA) certificates. Available in Word-style editing with PDF export. Compliant with ISO 9001 standards.
              </p>
              <span className="text-blue-600 font-bold text-sm flex items-center">
                Create Now <span className="ml-2">→</span>
              </span>
            </div>

            {/* SEO Card 2: Experience Certificate */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group" onClick={() => onStart('experience')}>
               <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:bg-yellow-500 group-hover:text-white transition">💼</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Experience Certificate Format</h3>
              <p className="text-sm text-gray-600 mb-4 font-bold text-yellow-600 uppercase tracking-widest">100% Editable</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Get the best Experience Letter format for employees. Fully editable and professional. Ideal for internships, jobs, and relieving letters.
              </p>
              <span className="text-blue-600 font-bold text-sm flex items-center">
                Create Now <span className="ml-2">→</span>
              </span>
            </div>

            {/* SEO Card 3: Salary Slip */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group" onClick={() => onStart('salary')}>
               <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition">📊</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Salary Slip Excel Format (2026)</h3>
              <p className="text-sm text-gray-600 mb-4 font-bold text-green-600 uppercase tracking-widest">Auto-Calculation</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Professional salary slip format with automatic tax and allowance calculations. Perfect for HRs and small business owners. Download as PDF or Excel.
              </p>
              <span className="text-blue-600 font-bold text-sm flex items-center">
                Create Now <span className="ml-2">→</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement: Middle Content */}
      <section className="bg-gray-50 py-8">
         <div className="max-w-5xl mx-auto px-6">
            <AdUnit slotId="mid-content-1" />
         </div>
      </section>

      {/* SEO Content: How It Works (Critical for AdSense Approval) */}
      <section className="px-6 lg:px-12 py-24 bg-white">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-blue-900 mb-10 text-center">How to Generate a Valid Computer Certificate Online?</h2>
            
            <div className="space-y-12">
               <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-black text-xl flex-shrink-0">1</div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Select Your Format</h3>
                     <p className="text-gray-600 leading-relaxed">
                        Choose from our library of 10+ themes including "Classic Gold," "Modern Blue," or "Tech Green." These templates are designed for courses like ADCA, DCA, CCC, Tally, and C++.
                     </p>
                  </div>
               </div>
               
               <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-black text-xl flex-shrink-0">2</div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Student Details</h3>
                     <p className="text-gray-600 leading-relaxed">
                        Fill in the Student Name, Father's Name, Roll Number, and Course Duration. You can also upload a passport-size photo and digital signature. Our system automatically formats the text.
                     </p>
                  </div>
               </div>

               <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-black text-xl flex-shrink-0">3</div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Download PDF with QR Code</h3>
                     <p className="text-gray-600 leading-relaxed">
                        Click "Download Official PDF." Your certificate will include a unique QR code. When scanned, this code verifies the authenticity of the document, making it suitable for job applications and interviews.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 lg:px-12 py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-black text-blue-900 mb-4">Why Choose FormatHub?</h2>
           <p className="text-gray-600 text-lg">The most powerful free tool for institutes to generate student certificates online.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <FeatureCard 
             icon="🎨" 
             title="10+ Certificate Designs" 
             desc="Choose from Classic Gold, Modern Blue, Tech Green, and more. Perfect for Computer Institutes, Coaching Centers, and Schools." 
           />
           <FeatureCard 
             icon="🔒" 
             title="QR Code Verification" 
             desc="Each certificate comes with a unique, scannable QR code that links to a secure verification page on FormatHub." 
           />
           <FeatureCard 
             icon="📸" 
             title="Photo & Signature" 
             desc="Easily upload student photos and authorized signatures. Our tool automatically formats them for printing." 
           />
           <FeatureCard 
             icon="✍️" 
             title="Digital Stamps" 
             desc="Pre-loaded with official 'Verified' and 'Approved' rubber stamps to give your certificates an authentic look." 
           />
           <FeatureCard 
             icon="👨‍🏫" 
             title="Add Teacher/Instructor" 
             desc="Include the name of the Course Instructor or Guidance Teacher directly on the certificate for added authenticity." 
           />
           <FeatureCard 
             icon="🖨️" 
             title="A4 PDF Download" 
             desc="Download instantly in print-ready A4 Landscape PDF format. High resolution suitable for framing." 
           />
        </div>
      </section>

      {/* Ad Placement: Before FAQ */}
      <div className="max-w-4xl mx-auto px-6">
          <AdUnit slotId="pre-faq-1" />
      </div>

      {/* FAQ Section (SEO Goldmine) */}
      <section id="faq" className="px-6 lg:px-12 py-24 bg-white border-t border-gray-100">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-blue-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid gap-6">
               <FaqItem 
                 question="Is this certificate format valid for private jobs?" 
                 answer="Yes, the formats provided on FormatHub follow standard professional layouts used by institutes across India. They include QR codes and ISO markings, making them suitable for private job applications." 
               />
               <FaqItem 
                 question="Can I generate a Salary Slip for a bank loan?" 
                 answer="Our Salary Slip Generator creates professional, calculated slips. However, for bank loans, ensure you have the official stamp and signature of your employer on the printed document." 
               />
               <FaqItem 
                 question="Is FormatHub really free?" 
                 answer="Yes! FormatHub is supported by ads, allowing us to provide premium certificate, experience letter, and salary slip tools completely free of cost." 
               />
               <FaqItem 
                 question="What is ADCA course full form?" 
                 answer="ADCA stands for 'Advance Diploma in Computer Application'. It is a popular 1-year diploma course in India. You can generate ADCA certificates easily using our tool." 
               />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white pt-20 pb-10 border-t border-blue-900/50">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
               <div className="text-2xl font-black text-white tracking-tighter mb-6">
                 Format<span className="text-yellow-600">Hub</span>
               </div>
               <p className="text-blue-300 max-w-sm leading-relaxed mb-6">
                 FormatHub is India's leading platform for generating free, professional certificates for educational institutions.
               </p>
               {/* Footer Ad Placement */}
               <div className="w-full h-24 bg-blue-900/50 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-400 opacity-50">Ad Space</span>
               </div>
            </div>
            <div>
               <h4 className="font-black text-white uppercase tracking-widest mb-6">Tools</h4>
               <ul className="space-y-3 text-blue-300 text-sm">
                 <li><button onClick={() => onStart('course')} className="hover:text-white transition">Certificate Generator</button></li>
                 <li><button onClick={() => onStart('experience')} className="hover:text-white transition">Experience Letters</button></li>
                 <li><button onClick={() => onStart('salary')} className="hover:text-white transition">Salary Slips</button></li>
               </ul>
            </div>
            <div>
               <h4 className="font-black text-white uppercase tracking-widest mb-6">Legal</h4>
               <ul className="space-y-3 text-blue-300 text-sm">
                 <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
                 <li className="hover:text-white transition cursor-pointer">Terms of Service</li>
                 <li className="hover:text-white transition cursor-pointer">Contact Us</li>
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
   <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
      <h4 className="font-bold text-blue-900 text-lg mb-2">❓ {question}</h4>
      <p className="text-gray-600 leading-relaxed">{answer}</p>
   </div>
);

export default LandingPage;
