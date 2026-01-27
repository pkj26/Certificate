import React, { useState, useEffect, useRef } from 'react';
import { SalaryData } from '../types';
import AdUnit from './AdUnit';

interface SalarySlipProps {
  data: SalaryData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Helper components defined BEFORE they are used in the main component.
const FieldRow: React.FC<{ label: string; value: string; mono?: boolean }> = ({ label, value, mono }) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{label}</span>
    <span className={`text-sm font-bold text-gray-800 ${mono ? 'font-mono' : ''}`}>{value || '-'}</span>
  </div>
);

const Row: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex justify-between text-gray-600 text-xs items-center">
    <span>{label}</span>
    <span className="font-mono font-medium text-gray-900">{Number(value) > 0 ? Number(value).toLocaleString() : '-'}</span>
  </div>
);

const SalarySlipGenerator: React.FC<SalarySlipProps> = ({ data, onChange }) => {
  const [totals, setTotals] = useState({ earnings: 0, deductions: 0, net: 0 });
  const slipRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const earnings = (Number(data.basicSalary) || 0) + (Number(data.hra) || 0) + (Number(data.conveyance) || 0) + (Number(data.medical) || 0) + (Number(data.specialAllowance) || 0);
    const deductions = (Number(data.pf) || 0) + (Number(data.tax) || 0) + (Number(data.otherDeductions) || 0);
    setTotals({
      earnings,
      deductions,
      net: earnings - deductions
    });
  }, [data]);

  // Adjust scale based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.45);
      else if (width < 1024) setScale(0.6);
      else if (width < 1280) setScale(0.7);
      else setScale(0.85);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadExampleData = () => {
    // FIX: Ensure all values passed to the event are strings to prevent type mismatches in state.
    const event = (name: string, value: any) => ({ target: { name, value: String(value) } } as React.ChangeEvent<HTMLInputElement>);
    onChange(event('companyName', 'TATA CONSULTANCY SERVICES'));
    onChange(event('employeeName', 'Rahul Kumar Sharma'));
    onChange(event('designation', 'Senior Software Engineer'));
    onChange(event('monthYear', 'March 2026'));
    onChange(event('employeeId', 'TCS-2026-889'));
    onChange(event('basicSalary', 45000));
    onChange(event('hra', 22500));
    onChange(event('conveyance', 1600));
    onChange(event('medical', 1250));
    onChange(event('specialAllowance', 15000));
    onChange(event('pf', 5400));
    onChange(event('tax', 3500));
    onChange(event('otherDeductions', 200));
  };

  const downloadExcel = () => {
    const XLSX = (window as any).XLSX;
    if (!XLSX) {
        alert("Excel library is loading, please try again in a moment.");
        return;
    }
    
    const wb = XLSX.utils.book_new();
    const ws_data = [
      [""], 
      ["", data.companyName.toUpperCase()],
      ["", "SALARY SLIP FOR " + data.monthYear.toUpperCase()],
      [""],
      ["", "EMPLOYEE DETAILS", "", "", "PAYMENT DETAILS"],
      ["", "Name", data.employeeName, "", "Month", data.monthYear],
      ["", "Designation", data.designation, "", "Location", "India (HQ)"],
      ["", "Employee ID", data.employeeId, "", "Mode", "Bank Transfer"],
      [""],
      ["", "EARNINGS", "AMOUNT", "", "DEDUCTIONS", "AMOUNT"],
      ["", "Basic Salary", Number(data.basicSalary), "", "Provident Fund", Number(data.pf)],
      ["", "HRA", Number(data.hra), "", "Professional Tax", Number(data.tax)],
      ["", "Conveyance", Number(data.conveyance), "", "Other Deductions", Number(data.otherDeductions)],
      ["", "Medical Allowance", Number(data.medical), "", "", ""],
      ["", "Special Allowance", Number(data.specialAllowance), "", "", ""],
      [""],
      ["", "TOTAL EARNINGS", totals.earnings, "", "TOTAL DEDUCTIONS", totals.deductions],
      [""],
      ["", "NET SALARY PAYABLE", totals.net],
      ["", "(In Words)", "Rupees Only"],
      [""],
      ["", "For " + data.companyName, "", "", ""],
      ["", "Authorized Signatory", "", "", "Employee Signature"]
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const borderStyle = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    const headerStyle = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1e3a8a" } }, border: borderStyle, alignment: { horizontal: "center" } };
    const boldStyle = { font: { bold: true }, border: borderStyle };
    const normalStyle = { border: borderStyle };
    const titleStyle = { font: { bold: true, sz: 16 }, alignment: { horizontal: "center" } };
    const subTitleStyle = { font: { bold: true, sz: 12 }, alignment: { horizontal: "center" } };

    ws['!cols'] = [{ wch: 2 }, { wch: 25 }, { wch: 15 }, { wch: 2 }, { wch: 25 }, { wch: 15 }];

    if (ws['B2']) ws['B2'].s = titleStyle;
    if (ws['B3']) ws['B3'].s = subTitleStyle;
    ['B10','C10','E10','F10'].forEach(c => { if(ws[c]) ws[c].s = headerStyle; });
    ['B17','C17','E17','F17'].forEach(c => { if(ws[c]) ws[c].s = boldStyle; });

    if(ws['B19']) ws['B19'].s = { font: { bold: true, sz: 14, color: { rgb: "1e40af" } }, fill: { fgColor: { rgb: "dbeafe" } }, border: borderStyle };
    if(ws['C19']) ws['C19'].s = { font: { bold: true, sz: 14 }, fill: { fgColor: { rgb: "dbeafe" } }, border: borderStyle };

    [11, 12, 13, 14, 15].forEach(r => {
      ['B', 'C', 'E', 'F'].forEach(c => {
        const cellRef = `${c}${r}`;
        const cell = ws[cellRef];
        if (cell) cell.s = normalStyle;
        else ws[cellRef] = { v: "", s: normalStyle };
      });
    });

    ws['!merges'] = [
      { s: { r: 1, c: 1 }, e: { r: 1, c: 5 } },
      { s: { r: 2, c: 1 }, e: { r: 2, c: 5 } },
      { s: { r: 18, c: 2 }, e: { r: 18, c: 5 } },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Salary Slip");
    XLSX.writeFile(wb, `Salary_Slip_${data.employeeName.replace(/\s+/g, '_')}_${data.monthYear}.xlsx`);
  };

  const downloadPDF = async () => {
    if (!slipRef.current) return;
    setIsGenerating(true);
    try {
      await new Promise(r => setTimeout(r, 100));
      const canvas = await (window as any).html2canvas(slipRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Salary_Slip_${data.employeeName.replace(/\s+/g, '_')}_${data.monthYear}.pdf`);
    } catch (e) {
      console.error("PDF Generation Error", e);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate container height based on scale to prevent large whitespace
  const originalHeight = 1000; // Approx height of salary slip
  const scaledHeight = originalHeight * scale;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 lg:p-8">
      {/* Grid Layout - Sidebar on Left, Preview on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* EDITOR COLUMN (Approx 1/3 width) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-blue-900">
             <div className="flex justify-between items-center border-b pb-4 mb-4 gap-2">
               <h3 className="text-xl font-black text-blue-900">Salary Components</h3>
               <button onClick={loadExampleData} className="bg-gradient-to-r from-yellow-400 to-orange-600 text-white px-3 py-2 rounded-lg font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-xs uppercase tracking-wide">
                 <span>⚡ Auto-Fill</span>
               </button>
             </div>
             
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Organization Details</label>
                   <input name="companyName" placeholder="e.g. Google India Pvt Ltd" className="w-full p-3 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none text-sm font-semibold" value={data.companyName} onChange={onChange} />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Employee Name</label>
                      <input name="employeeName" placeholder="Full Name" className="w-full p-2 border-2 border-gray-100 rounded-lg text-sm" value={data.employeeName} onChange={onChange} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Designation</label>
                      <input name="designation" placeholder="Job Title" className="w-full p-2 border-2 border-gray-100 rounded-lg text-sm" value={data.designation} onChange={onChange} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Slip Month</label>
                      <input name="monthYear" placeholder="Mar 2026" className="w-full p-2 border-2 border-gray-100 rounded-lg text-sm" value={data.monthYear} onChange={onChange} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Emp ID</label>
                      <input name="employeeId" placeholder="EMP-001" className="w-full p-2 border-2 border-gray-100 rounded-lg text-sm" value={data.employeeId} onChange={onChange} />
                   </div>
                </div>
             </div>
          </div>

          <AdUnit slotId="salary-editor-sidebar" className="my-2" />

          <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-green-500">
            <h4 className="font-bold text-green-700 mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Earnings (Credits)
            </h4>
            <div className="space-y-3">
               <div className="relative group">
                 <input type="number" name="basicSalary" placeholder="Basic Salary (₹)" className="w-full p-2 pl-4 border rounded font-mono text-sm" value={data.basicSalary} onChange={onChange} />
                 <p className="text-[10px] text-gray-400 mt-1 pl-1">Typically 40-50% of CTC.</p>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <input type="number" name="hra" placeholder="HRA" className="w-full p-2 border rounded font-mono text-sm" value={data.hra} onChange={onChange} />
                  <input type="number" name="specialAllowance" placeholder="Special" className="w-full p-2 border rounded font-mono text-sm" value={data.specialAllowance} onChange={onChange} />
                  <input type="number" name="conveyance" placeholder="Transport" className="w-full p-2 border rounded font-mono text-sm" value={data.conveyance} onChange={onChange} />
                  <input type="number" name="medical" placeholder="Medical" className="w-full p-2 border rounded font-mono text-sm" value={data.medical} onChange={onChange} />
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-red-500">
            <h4 className="font-bold text-red-700 mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> Deductions (Debits)
            </h4>
            <div className="grid grid-cols-2 gap-3">
               <input type="number" name="pf" placeholder="Provident Fund" className="w-full p-2 border rounded font-mono text-sm" value={data.pf} onChange={onChange} />
               <input type="number" name="tax" placeholder="TDS / Tax" className="w-full p-2 border rounded font-mono text-sm" value={data.tax} onChange={onChange} />
               <input type="number" name="otherDeductions" placeholder="Other Ded." className="w-full p-2 border rounded font-mono text-sm col-span-2" value={data.otherDeductions} onChange={onChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button onClick={downloadExcel} className="bg-green-700 text-white font-black py-4 rounded-xl shadow-lg hover:bg-green-800 transition-all flex items-center justify-center gap-3 active:scale-95">
              <span className="text-xl">📊</span>
              <div className="text-left leading-none">
                <span className="block text-[10px] opacity-80">EDITABLE</span>
                <span className="text-base">DOWNLOAD EXCEL</span>
              </div>
            </button>

            <button onClick={downloadPDF} disabled={isGenerating} className={`bg-blue-900 text-white font-black py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 ${isGenerating ? 'opacity-70' : ''}`}>
               {isGenerating ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"/> : <span className="text-xl">🖨️</span>}
              <div className="text-left leading-none">
                <span className="block text-[10px] opacity-80">OFFICIAL FORMAT</span>
                <span className="text-base">DOWNLOAD PDF</span>
              </div>
            </button>
          </div>
        </div>

        {/* PREVIEW COLUMN (Approx 2/3 width) */}
        <div className="xl:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-2xl mb-4">
             <AdUnit slotId="salary-preview-top" />
          </div>

          <div className="w-full bg-gray-200/50 border-2 border-dashed border-gray-300 rounded-xl p-4 lg:p-8 flex justify-center items-start overflow-hidden relative min-h-[500px]">
             {/* Scale Controls */}
             <div className="absolute top-2 right-2 flex gap-2 z-10">
               <button onClick={() => setScale(s => Math.min(s + 0.1, 1.2))} className="bg-white p-2 rounded shadow hover:bg-gray-50 text-gray-600">+</button>
               <button onClick={() => setScale(s => Math.max(s - 0.1, 0.3))} className="bg-white p-2 rounded shadow hover:bg-gray-50 text-gray-600">-</button>
             </div>

             {/* Scaled Content Container */}
             <div 
                style={{ 
                  transform: `scale(${scale})`, 
                  transformOrigin: 'top center',
                  height: scaledHeight, // Force container height to match scaled visual height
                  marginBottom: '20px'
                }} 
                className="transition-transform duration-300 ease-out"
             >
                <div ref={slipRef} className="bg-white shadow-2xl min-w-[750px] text-sm font-sans text-gray-800">
                  {/* HEADER */}
                  <div className="bg-blue-900 text-white p-8 text-center">
                    <h1 className="text-3xl font-black uppercase tracking-widest mb-2">{data.companyName || 'YOUR COMPANY NAME'}</h1>
                    <div className="inline-block border-y border-blue-400/30 py-1 px-4">
                      <p className="text-blue-100 text-xs font-bold tracking-[0.3em] uppercase">Payslip for {data.monthYear || 'MONTH YYYY'}</p>
                    </div>
                  </div>

                  <div className="p-10">
                    {/* INFO GRID */}
                    <div className="grid grid-cols-2 gap-x-16 gap-y-6 mb-10 border-b border-gray-100 pb-10">
                      <FieldRow label="Employee Name" value={data.employeeName} />
                      <FieldRow label="Employee ID" value={data.employeeId || '---'} mono />
                      <FieldRow label="Designation" value={data.designation} />
                      <FieldRow label="Bank Name" value="HDFC Bank" />
                      <FieldRow label="Location" value="India (HQ)" />
                      <FieldRow label="Payment Mode" value="Bank Transfer" />
                    </div>

                    {/* TABLE */}
                    <div className="flex border border-gray-200 mb-10">
                      <div className="w-1/2 border-r border-gray-200">
                          <div className="bg-green-50/50 p-3 font-black text-green-800 text-xs uppercase border-b border-gray-200 flex justify-between">
                            <span>Earnings</span>
                            <span>INR (₹)</span>
                          </div>
                          <div className="p-5 space-y-4">
                            <Row label="Basic Salary" value={Number(data.basicSalary)} />
                            <Row label="House Rent Allow. (HRA)" value={Number(data.hra)} />
                            <Row label="Conveyance Allow." value={Number(data.conveyance)} />
                            <Row label="Medical Allow." value={Number(data.medical)} />
                            <Row label="Special Allow." value={Number(data.specialAllowance)} />
                          </div>
                      </div>

                      <div className="w-1/2">
                          <div className="bg-red-50/50 p-3 font-black text-red-800 text-xs uppercase border-b border-gray-200 flex justify-between">
                            <span>Deductions</span>
                            <span>INR (₹)</span>
                          </div>
                          <div className="p-5 space-y-4">
                            <Row label="Provident Fund (PF)" value={Number(data.pf)} />
                            <Row label="Professional Tax" value={Number(data.tax)} />
                            <Row label="Other Deductions" value={Number(data.otherDeductions)} />
                          </div>
                      </div>
                    </div>

                    {/* TOTALS */}
                    <div className="flex bg-gray-50 border border-gray-200 mb-10">
                        <div className="w-1/2 p-4 flex justify-between font-bold text-gray-700 border-r border-gray-200">
                          <span>Gross Earnings</span>
                          <span>₹ {totals.earnings.toLocaleString()}</span>
                        </div>
                        <div className="w-1/2 p-4 flex justify-between font-bold text-gray-700">
                          <span>Gross Deductions</span>
                          <span>₹ {totals.deductions.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* NET PAY */}
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 flex justify-between items-center mb-16 shadow-sm">
                      <div>
                        <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-1">Net Salary Payable</p>
                        <p className="text-[10px] text-blue-500 font-medium">Transferred to registered account</p>
                      </div>
                      <p className="text-4xl font-black text-blue-900">₹ {totals.net.toLocaleString()}</p>
                    </div>

                    {/* SIGNATURES */}
                    <div className="flex justify-between items-end mt-16 pt-8">
                        <div className="text-center relative">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-8">For {data.companyName || 'Company'}</p>
                          <div className="w-48 border-b-2 border-gray-300"></div>
                          <p className="text-[10px] font-bold uppercase mt-2 text-blue-900">Authorized Signatory</p>
                        </div>

                        <div className="text-center">
                          <div className="w-48 border-b-2 border-gray-300 mb-1"></div>
                          <p className="text-[10px] font-bold uppercase mt-2 text-gray-500">Employee Signature</p>
                        </div>
                    </div>
                    
                    <div className="text-center mt-12 text-[9px] text-gray-400 uppercase tracking-widest">
                        This document is system generated • FormatHub.in
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipGenerator;
