
import React, { useRef } from 'react';
import { ExperienceData } from '../types';

interface ExpCertProps {
  data: ExperienceData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDownload: () => void;
  previewRef: React.RefObject<HTMLDivElement>;
}

const ExperienceCertificate: React.FC<ExpCertProps> = ({ data, onChange, onDownload, previewRef }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-6">
      {/* Editor Side */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-xl space-y-4 h-fit">
        <h3 className="text-xl font-black text-blue-900 border-b pb-2">Experience Details</h3>
        
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-500 uppercase">Company Name</label>
          <input name="companyName" placeholder="Tech Solutions Pvt Ltd" className="w-full p-2 border rounded" value={data.companyName} onChange={onChange} />
          
          <label className="block text-xs font-bold text-gray-500 uppercase">Employee Name</label>
          <div className="flex gap-2">
            <select name="gender" className="p-2 border rounded w-20" value={data.gender} onChange={onChange}>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
            </select>
            <input name="employeeName" placeholder="Full Name" className="w-full p-2 border rounded" value={data.employeeName} onChange={onChange} />
          </div>

          <label className="block text-xs font-bold text-gray-500 uppercase">Designation</label>
          <input name="designation" placeholder="Software Engineer" className="w-full p-2 border rounded" value={data.designation} onChange={onChange} />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Joined Date</label>
              <input type="date" name="joiningDate" className="w-full p-2 border rounded" value={data.joiningDate} onChange={onChange} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Relieving Date</label>
              <input type="date" name="relievingDate" className="w-full p-2 border rounded" value={data.relievingDate} onChange={onChange} />
            </div>
          </div>
        </div>

        <button onClick={onDownload} className="w-full bg-blue-900 text-white font-black py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 mt-6">
          <span className="text-xl">📄</span> Download PDF
        </button>
      </div>

      {/* Live Preview Side */}
      <div className="w-full lg:w-2/3 bg-gray-200 p-8 flex justify-center overflow-auto">
        <div 
          ref={previewRef}
          className="bg-white shadow-2xl w-[794px] h-[1123px] relative p-16 flex flex-col" // A4 Portrait Dimensions
          style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}
        >
          {/* Header */}
          <div className="text-center border-b-4 border-blue-900 pb-6 mb-12">
            <h1 className="text-4xl font-black text-blue-900 uppercase tracking-widest">{data.companyName || 'COMPANY NAME'}</h1>
            <p className="text-gray-500 tracking-[0.3em] font-bold text-xs mt-2">HUMAN RESOURCES DEPARTMENT</p>
          </div>

          <div className="flex justify-between items-end mb-16">
            <div className="text-sm font-bold">
              Ref: EXP/{new Date().getFullYear()}/{Math.floor(Math.random() * 1000)}
            </div>
            <div className="text-sm font-bold">
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center underline decoration-gray-400 decoration-1 underline-offset-8 uppercase tracking-widest mb-16">
            Experience Certificate
          </h2>

          <div className="flex-1 text-lg leading-loose text-justify text-gray-800 font-serif space-y-8">
            <p>
              <span className="font-bold">TO WHOMSOEVER IT MAY CONCERN</span>
            </p>
            <p>
              This is to certify that <span className="font-bold">{data.gender} {data.employeeName || 'Employee Name'}</span> was associated with <span className="font-bold">{data.companyName || 'our Organization'}</span> as <span className="font-bold">{data.designation || 'Designation'}</span> from <span className="font-bold">{data.joiningDate}</span> to <span className="font-bold">{data.relievingDate}</span>.
            </p>
            <p>
              During this tenure, we found {data.gender === 'Mr.' ? 'him' : 'her'} to be sincere, hardworking, and dedicated to the assigned duties. {data.gender === 'Mr.' ? 'He' : 'She'} has shown excellent character and professional conduct.
            </p>
            <p>
              We wish {data.gender === 'Mr.' ? 'him' : 'her'} all the best for future endeavors.
            </p>
          </div>

          <div className="mt-auto mb-16">
             <p className="font-bold mb-16">For {data.companyName || 'Company Name'}</p>
             <div className="w-48 border-t-2 border-black pt-2">
               <p className="font-bold">Authorized Signatory</p>
               <p className="text-xs text-gray-500">Human Resources</p>
             </div>
          </div>

          <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
            This document is computer generated and does not require a physical signature if verified digitally.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCertificate;
