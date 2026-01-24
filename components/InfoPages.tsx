
import React, { useEffect } from 'react';

interface PageProps {
  onBack: () => void;
}

export const AboutUs: React.FC<PageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
    <div className="bg-blue-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 text-sm font-bold uppercase tracking-widest hover:text-yellow-400">← Back to Home</button>
        <h1 className="text-4xl font-black">About FormatHub</h1>
      </div>
    </div>
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white -mt-8 rounded-xl shadow-lg mb-12">
      <p className="text-lg leading-relaxed">
        Welcome to <strong>FormatHub.in</strong>, India's premier free online tool designed specifically for educational institutes, small businesses, and HR professionals.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Our Mission</h3>
          <p>To digitize and simplify the documentation process for computer institutes and small businesses across India, completely free of cost.</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Why Free?</h3>
          <p>We believe education tools should be accessible. Our platform is supported by advertisements, allowing us to offer premium features without subscription fees.</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">What We Offer</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>DCA/ADCA Certificates:</strong> Professional formats with QR verification logic.</li>
        <li><strong>Salary Slips:</strong> Automated Excel and PDF generation for Indian payroll standards.</li>
        <li><strong>Experience Letters:</strong> Standard HR templates for employee relieving.</li>
      </ul>
    </div>
  </div>
);

export const PrivacyPolicy: React.FC<PageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
    <div className="bg-blue-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 text-sm font-bold uppercase tracking-widest hover:text-yellow-400">← Back to Home</button>
        <h1 className="text-4xl font-black">Privacy Policy</h1>
      </div>
    </div>
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white -mt-8 rounded-xl shadow-lg mb-12">
      <p className="text-sm text-gray-500">Last Updated: January 2026</p>
      
      <h2 className="text-xl font-bold text-blue-900">1. Information Collection</h2>
      <p>FormatHub does not store your personal data on our servers. All certificate data (Student Names, Photos, Salary Details) is processed locally in your browser to generate PDFs. Once you refresh the page, the data is wiped.</p>

      <h2 className="text-xl font-bold text-blue-900">2. Cookies & Advertising</h2>
      <p>We use third-party vendors, including Google, who use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
        <li>Users may opt out of personalized advertising by visiting Ads Settings.</li>
      </ul>

      <h2 className="text-xl font-bold text-blue-900">3. QR Code Data</h2>
      <p>The QR codes generated on certificates contain a base64 encoded string of the data you entered. This allows for offline verification but does not involve database storage.</p>
    </div>
  </div>
);

export const TermsOfService: React.FC<PageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
    <div className="bg-blue-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 text-sm font-bold uppercase tracking-widest hover:text-yellow-400">← Back to Home</button>
        <h1 className="text-4xl font-black">Terms of Service</h1>
      </div>
    </div>
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white -mt-8 rounded-xl shadow-lg mb-12">
      <h2 className="text-xl font-bold text-blue-900">1. Acceptance of Terms</h2>
      <p>By accessing FormatHub.in, you agree to be bound by these terms of service, all applicable laws and regulations.</p>

      <h2 className="text-xl font-bold text-blue-900">2. Use License</h2>
      <p>Permission is granted to download the materials (PDFs/Images) generated on FormatHub for personal or commercial use (e.g., issuing to students).</p>
      <p>However, you may not:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Use the website to generate fake government documents or forge signatures of officials you do not represent.</li>
        <li>Attempt to reverse engineer the software.</li>
      </ul>

      <h2 className="text-xl font-bold text-blue-900">3. Disclaimer</h2>
      <p>The materials on FormatHub are provided "as is". We make no warranties regarding the legal validity of the generated documents in a court of law. It is the user's responsibility to ensure they have the authority to issue such certificates.</p>
    </div>
  </div>
);
