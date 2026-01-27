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
            India's Document Hub: Free AI Resume Builder & Professional Formats for 2026
          </h1>
          <p className="text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Job search हो या business चलाना, professional documents har jagah zaroori hain. Create job-winning resumes, official salary slips, certificates, and more. Bilkul free!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => navigate('/resume-builder')} className="w-full sm:w-auto text-lg bg-blue-600 text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Build Your Resume Now
            </button>
            <button onClick={() => document.getElementById('tools-explained')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-lg bg-white text-blue-900 border-2 border-gray-100 px-10 py-5 rounded-full font-bold hover:border-blue-200 hover:bg-gray-50 transition-all">
              Explore All Tools
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
                Welcome to FormatHub, India's most comprehensive free resource for creating critical professional and academic documents. We understand that the right format can make all the difference—whether you're applying for your dream job, running a small business, or managing a training institute. Our powerful online tools are designed with Indian standards in mind to help you create perfect documents in minutes. Ab documentation ki tension khatam!
            </p>

            <h2 className="text-3xl font-black text-blue-900 mb-8">Get Hired Faster: Professional Resume Formats 2026 (ATS-Friendly)</h2>
            <p className="text-gray-600 mb-6">
                Did you know that over 90% of large companies in India now use an Applicant Tracking System (ATS) to screen resumes? If your resume isn't formatted correctly, it might get rejected by the software before a human ever sees it. This is why having a professional, ATS-friendly resume is the most critical step in your job search for 2026. A simple Word document just won't cut it anymore. Your resume must be clean, parsable, and strategically structured.
            </p>
            <p className="text-gray-600 mb-6">
                Our <strong>AI Resume Builder</strong> is designed to solve this exact problem. It doesn't just give you a template; it provides AI-powered, content-rich drafts tailored to specific Indian job roles. Whether you're a B.Tech fresher or a seasoned sales manager, our tool ensures your resume is packed with the right keywords and follows the perfect structure to impress both bots and humans.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-4">How to Create Your Job-Winning Resume in 5 Minutes:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
                <li><strong>Select Your Job Role:</strong> Start by choosing your profession from our extensive list (e.g., "B.Tech Computer Science Fresher," "Senior Backend Developer"). This is the most crucial step.</li>
                <li><strong>Experience the AI Magic:</strong> Our powerful AI instantly generates a complete resume draft, including a professional summary, key skills, and detailed job responsibilities relevant to your chosen role. No more writer's block!</li>
                <li><strong>Edit and Personalize:</strong> Chutkiyon mein apni details daalein. Easily edit the pre-filled content to reflect your unique experience, projects, and achievements.</li>
                <li><strong>Choose Your Design & Length:</strong> Select from multiple professional designs—Modern, Classic, or Creative. Crucially, you can choose a 1-page resume for freshers, a 2-page format for experienced professionals, or even a 5-page CV for academic roles.</li>
                <li><strong>Download Your High-Quality PDF:</strong> With one click, download your perfectly formatted, ATS-compliant resume as a high-resolution PDF, ready to be sent to recruiters.</li>
            </ol>
            <div className="text-center my-8">
                <button onClick={() => navigate('/resume-builder')} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition">Build My Resume Now &rarr;</button>
            </div>

            <h2 className="text-3xl font-black text-blue-900 mb-8">Clear & Compliant: The Ultimate Salary Slip Format India</h2>
            <p className="text-gray-600 mb-6">
                A salary slip is not just a piece of paper; it's a vital financial document. In India, it serves as legal proof of income and is required for everything from applying for a loan and filing your income tax returns (ITR) to negotiating your salary at a new job. A professionally generated salary slip with the correct <strong>Salary Slip Format India</strong>, showing a clear breakdown of earnings (Basic, HRA, Allowances) and deductions (PF, PT, TDS), is essential for financial credibility.
            </p>
             <h3 className="text-xl font-bold text-gray-800 mb-4">How to Generate an Official Salary Slip:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
                <li><strong>Enter Company & Employee Details:</strong> Fill in the basic information like company name, employee name, designation, and the pay period (e.g., March 2026).</li>
                <li><strong>Fill Earnings (Credits):</strong> Input all components of the salary, such as Basic Salary, House Rent Allowance (HRA), Conveyance, and any Special Allowances.</li>
                <li><strong>Fill Deductions (Debits):</strong> Add all statutory and other deductions, including Provident Fund (PF), Professional Tax (PT), and Tax Deducted at Source (TDS).</li>
                <li><strong>See Live Calculations:</strong> Our tool automatically calculates the Gross Earnings, Gross Deductions, and the final Net Salary payable, so you don't have to worry about manual math errors.</li>
                <li><strong>Download PDF & Excel:</strong> Instantly download the payslip in a professional, print-ready PDF format or as an editable Excel file for your records.</li>
            </ol>
            <div className="text-center my-8">
                <button onClick={() => navigate('/salary-slip-generator')} className="bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-800 transition">Create Salary Slip &rarr;</button>
            </div>

            <h2 className="text-3xl font-black text-blue-900 mb-8">Your Professional Proof: Free Experience Letter Generator</h2>
            <p className="text-gray-600 mb-6">
                An experience letter is a formal document issued by an employer that confirms your tenure and role within the company. It's a critical document for background verification checks conducted by future employers. A clear, concise, and professionally formatted experience letter builds trust and validates your career history. Our <strong>Free Experience Letter Generator</strong> uses a standard, HR-approved template to ensure your document is professional and contains all the necessary information.
            </p>
             <h3 className="text-xl font-bold text-gray-800 mb-4">How to Create Your Experience Letter Instantly:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
                <li><strong>Provide Key Details:</strong> Enter the company name, employee's full name, designation, and gender (Mr./Ms.).</li>
                <li><strong>Specify Employment Dates:</strong> Accurately input the employee's date of joining and last date of employment (relieving date).</li>
                <li><strong>Preview the Letter:</strong> Instantly see the generated letter on a professional, official-looking layout.</li>
                <li><strong>Download as PDF:</strong> Download the final document as a high-quality PDF, ready to be printed on a company letterhead and signed.</li>
            </ol>
             <div className="text-center my-8">
                <button onClick={() => navigate('/experience-letter-generator')} className="bg-yellow-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-900 transition">Generate Experience Letter &rarr;</button>
            </div>

            <h2 className="text-3xl font-black text-blue-900 mb-8">Build Credibility: Professional Online Certificate Maker</h2>
            <p className="text-gray-600 mb-6">
                For training centers, computer institutes, and educational organizations, a certificate is a symbol of a student's achievement and a reflection of your institute's brand. A poorly designed certificate can diminish the value of your course. Our <strong>Online Certificate Maker</strong> empowers you to create stunning, official-looking certificates for courses like DCA, ADCA, or any other program. With features like photo uploads and unique QR code verification, you can add a new level of authenticity and professionalism to your certifications.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-4">How to Design a Professional Certificate:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
                <li><strong>Fill in the Details:</strong> Enter the student's name, father's name, course name, duration, grade, and roll number.</li>
                <li><strong>Upload a Student Photo:</strong> Personalize the certificate by uploading a professional passport-sized photograph of the student.</li>
                <li><strong>Choose a Professional Theme:</strong> Select from over 10 elegant and official design themes, from Classic Gold to Modern Blue.</li>
                <li><strong>Download the Verifiable PDF:</strong> Generate a high-resolution, print-ready PDF. Each certificate includes a unique QR code that can be scanned to verify its details, protecting against fraud.</li>
            </ol>
             <div className="text-center my-8">
                <button onClick={() => navigate('/certificate-generator')} className="bg-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-800 transition">Create a Certificate Now &rarr;</button>
            </div>
         </div>
      </section>

      <section id="faq" className="px-6 lg:px-12 py-24 bg-white">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-blue-900 mb-12 text-center">Your Questions, Answered: The Ultimate Document FAQ</h2>
            <div className="space-y-6">
               <FaqItem question="What is the best resume format for freshers in 2026?" answer="For freshers in 2026, the best format is a clean, single-page resume that is ATS-friendly. It should have a clear hierarchy: Name and Contact Info at the top, followed by a concise Professional Summary, Education, Projects/Internships, Skills, and finally Certifications. Our AI Resume Builder's 'Fresher' templates are specifically designed for this, ensuring all important information is presented effectively on one page." />
               <FaqItem question="How can I make my resume ATS-friendly for free?" answer="You can make your resume ATS-friendly by using standard, easy-to-read fonts (like Roboto, Inter), avoiding complex tables, graphics, or columns, and using standard section headings (e.g., 'Work Experience' instead of 'My Career Journey'). The easiest way is to use our free AI Resume Builder. All our templates are rigorously tested to be 100% ATS-compliant, saving you the guesswork." />
               <FaqItem question="Is a 2-page resume acceptable in India?" answer="Yes, a 2-page resume is perfectly acceptable and often recommended for professionals in India with 5+ years of relevant experience. It allows you to detail your accomplishments without overcrowding. For executives or academics with extensive publications, even longer resumes are fine. Our tool allows you to generate resumes from 1 to 5 pages to suit your specific career level." />
               <FaqItem question="What details are mandatory in a salary slip in India?" answer="A legally compliant salary slip in India must include the company's name and address, employee's name and designation, pay period, and a detailed breakdown of earnings (Basic, HRA, etc.) and deductions (PF, ESI, PT, TDS). The final net payable amount must also be clearly stated. Our Salary Slip Generator includes all these mandatory fields." />
               <FaqItem question="Can I use a generated salary slip for a loan application?" answer="Our tool generates salary slips in a standard, professional format that includes all the necessary components banks look for. However, for official purposes like a loan, the document must be genuine and authorized by your employer, often requiring a company stamp and signature. You can use our tool to create the format, which can then be officially issued by your HR department." />
               <FaqItem question="How do I get an experience letter if my company is now closed?" answer="This is a tough situation. While you can't get an official letter on their letterhead, you can use our Experience Letter Generator to create a letter with the standard professional format. You can then try to contact your former manager or HR head via LinkedIn or email and request them to sign the document you've prepared. This can sometimes serve as a substitute." />
               <FaqItem question="What is the difference between an experience letter and a relieving letter?" answer="A relieving letter is issued on your last day of employment, confirming that you have been relieved of your duties and have completed all formalities. An experience letter, which can be the same document or a separate one, certifies your employment duration, designation, and often includes a line about your conduct. Our tool provides a template that serves both purposes." />
               <FaqItem question="How can I create a professional certificate for my computer institute?" answer="With our Online Certificate Maker, you can easily create one in minutes. Simply enter your institute's name, the student's details, course name, upload the student's photo, and choose from over 10 professional designs. You can then download a high-quality PDF with a verifiable QR code, ready for printing and distribution." />
               <FaqItem question="Is FormatHub.in really free to use?" answer="Yes, 100%! All our tools—the AI Resume Builder, Salary Slip Generator, Certificate Maker, and Experience Letter Generator—are completely free to use, with no hidden charges or limits. The platform is supported by advertisements, which allows us to keep our powerful services accessible to everyone in India." />
               <FaqItem question="Is my data safe on FormatHub?" answer="Absolutely. We take your privacy very seriously. FormatHub does not store any of the personal information you enter. All document generation happens directly in your browser. When you close or refresh the page, your data is gone forever. Nothing is saved on our servers." />
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
                  <AdUnit slotId="footer-banner-1" />
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