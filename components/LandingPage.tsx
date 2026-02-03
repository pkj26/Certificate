import React from 'react';

interface LandingPageProps {
  navigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const tools = [
    { key: '/image-resizer', name: 'SSC Photo Resizer', desc: 'Resize Photo/Sign to 20kb-50kb', icon: '🖼️', tag: 'Most Used' },
    { key: '/certificate-generator', name: 'Certificate Maker', desc: 'DCA/ADCA Certificate with Photo', icon: '🎓', tag: 'Institute' },
    { key: '/resume-builder', name: 'AI Resume Builder', desc: 'ATS Resume for Job Seekers', icon: '📄', tag: 'New' },
    { key: '/jpg-to-pdf', name: 'Image to PDF', desc: 'Convert Assignments to PDF', icon: '📁', tag: 'Free' },
  ];

  const sarkariTables = [
    {
      title: "Latest Results",
      items: [
        "UP Board 10th Result 2026",
        "SSC GD Constable Result 2025",
        "Bihar Board Inter Result 2026",
        "Railway RPF Merit List",
        "IBPS PO Final Result Out"
      ]
    },
    {
      title: "Admit Cards",
      items: [
        "SSC CHSL Tier 1 Admit Card",
        "UPSC Prelims Admit Card 2026",
        "NEET UG Hall Ticket Download",
        "UP Police Constable Re-Exam",
        "Navy SSR/MR Call Letter"
      ]
    },
    {
      title: "Latest Jobs",
      items: [
        "SSC MTS 10000+ Post Online Form",
        "Railway Group D Notification",
        "UP Scholarship Status Check",
        "PM Kisan 18th Installment List",
        "Post Office GDS Recruitment"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Ticker for High CTR */}
      <div className="bg-red-700 text-white py-2 overflow-hidden sticky top-0 z-[100] border-b-2 border-yellow-400">
        <div className="flex whitespace-nowrap ticker-animate uppercase font-black text-xs items-center">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-12">
              🔥 UP Scholarship Status 2026 Check Online • SSC Photo Resizer 20kb to 50kb Free Tool • Sarkari Result 2026 Updates
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
        <div className="text-2xl font-black text-blue-900 cursor-pointer" onClick={() => navigate('/')}>
          Format<span className="text-red-600">Hub</span>.in
        </div>
        <div className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-wider">
          <button onClick={() => navigate('/image-resizer')} className="hover:text-red-600">SSC Resizer</button>
          <button onClick={() => navigate('/certificate-generator')} className="hover:text-red-600">Certificate</button>
          <button onClick={() => navigate('/resume-builder')} className="hover:text-red-600">Resume</button>
        </div>
        <button onClick={() => navigate('/resume-builder')} className="bg-blue-900 text-white px-4 py-2 rounded-lg font-black text-xs uppercase shadow-md">Get Started</button>
      </nav>

      {/* Main Hero (Keyword Focused) */}
      <header className="py-12 px-6 text-center bg-gray-50 border-b">
        <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-4 leading-tight">
          Sarkari Tools & <span className="text-red-600">Result Updates</span> 2026
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 font-medium">
          Official platform for SSC Photo Resizer, Computer Certificate Maker, and Latest Sarkari Results. Trusted by millions of students across India.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate('/image-resizer')} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:bg-black transition">SSC Photo Resizer (20KB)</button>
          <button onClick={() => navigate('/certificate-generator')} className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:bg-black transition">DCA/ADCA Certificate</button>
        </div>
      </header>

      {/* 💥 SARKARI RESULT TABLE (The Secret Ranking Sauce) */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sarkariTables.map((table, i) => (
            <div key={i} className="border-2 border-blue-900 rounded-lg overflow-hidden shadow-lg bg-white">
              <div className="bg-blue-900 text-white p-3 text-center font-black uppercase text-sm">{table.title}</div>
              <ul className="divide-y">
                {table.items.map((item, j) => (
                  <li key={j} className="p-3 text-xs font-bold text-blue-800 hover:bg-yellow-50 cursor-pointer flex justify-between items-center group">
                    <span>{item}</span>
                    <span className="text-red-600 animate-pulse group-hover:scale-125">New</span>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-100 p-2 text-center text-[10px] font-bold text-gray-500 hover:text-blue-900 cursor-pointer uppercase">View All {table.title} →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fast Tools Section */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-black text-center mb-12 text-blue-950 uppercase tracking-tighter">Essential Student Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tools.map((tool) => (
            <div key={tool.key} onClick={() => navigate(tool.key)} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-red-500 transition-all cursor-pointer relative group">
              <div className="absolute top-4 right-4 text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-black uppercase">{tool.tag}</div>
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-lg font-black text-blue-950 mb-2">{tool.name}</h3>
              <p className="text-gray-400 text-xs font-medium leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📝 DEEP SEO CONTENT (To capture Search Intent) */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-gray-800">
        <div className="prose prose-blue lg:prose-xl">
          <h2 className="text-4xl font-black text-blue-900 mb-8 border-l-8 border-red-600 pl-4">How to Use FormatHub for Sarkari Forms?</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-red-700 underline">#1 SSC Photo Resizer 20kb to 50kb Tool</h3>
              <p className="leading-relaxed">Applying for <strong>SSC CGL, CHSL, or MTS 2026</strong>? The most common reason for form rejection is the incorrect photo size. SSC requires a photo between 20kb and 50kb with dimensions of 3.5cm x 4.5cm. Our <strong>SSC Photo Resizer</strong> automatically adjusts your image to these exact specifications, ensuring your application is accepted on the first attempt.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-red-700 underline">#2 UP Scholarship Status 2026 Check Online</h3>
              <p className="leading-relaxed">Students in Uttar Pradesh can check their <strong>Pre-Matric and Post-Matric Scholarship status</strong> directly through our portal. We provide fast links to the UP Scholarship login, Saksham portal, and PFMS payment status. Keep your registration number and date of birth ready to track your scholarship fund.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-red-700 underline">#3 Online Computer Certificate Maker (DCA/ADCA)</h3>
              <p className="leading-relaxed">FormatHub provides an <strong>ISO 9001:2015 certified</strong> format for computer certificates. If you run a computer institute, you can generate professional <strong>DCA, ADCA, Tally, and CCC certificates</strong> with student photos for free. Download high-quality PDFs and issue them to your students for their career growth.</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200">
               <h4 className="text-xl font-black mb-4">Why Google Ranks FormatHub #1?</h4>
               <ul className="list-disc pl-6 space-y-2 font-medium">
                 <li>Fastest Loading Speed for slow 3G/4G connections.</li>
                 <li>Official Formats for Staff Selection Commission (SSC) & UPSC.</li>
                 <li>Privacy-focused: Your data never leaves your browser.</li>
                 <li>100% Free Forever for Indian Students.</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12 px-6 text-center">
        <div className="text-3xl font-black mb-4">Format<span className="text-red-500">Hub</span>.in</div>
        <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-8">Official Tool Portal for Sarkari Results & Documents</p>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase mb-12">
          <button onClick={() => navigate('/about')} className="hover:text-red-500">About</button>
          <button onClick={() => navigate('/privacy')} className="hover:text-red-500">Privacy</button>
          <button onClick={() => navigate('/terms')} className="hover:text-red-500">Terms</button>
          <button onClick={() => window.scrollTo(0,0)} className="text-yellow-400">Back to Top ↑</button>
        </div>
        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
          © 2026 FormatHub India • Sarkari Result • SSC Resizer • UP Scholarship
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;