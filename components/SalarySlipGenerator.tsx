
import React, { useState, useEffect, useRef } from 'react';
import { SalaryData } from '../types';
import AdUnit from './AdUnit';

interface SalarySlipProps {
  data: SalaryData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SalarySlipGenerator: React.FC<SalarySlipProps> = ({ data, onChange }) => {
  const [totals, setTotals] = useState({ earnings: 0, deductions: 0, net: 0 });
  const slipRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const earnings = (Number(data.basicSalary) || 0) + (Number(data.hra) || 0) + (Number(data.conveyance) || 0) + (Number(data.medical) || 0) + (Number(data.specialAllowance) || 0);
    const deductions = (Number(data.pf) || 0) + (Number(data.tax) || 0) + (Number(data.otherDeductions) || 0);
    setTotals({
      earnings,
      deductions,
      net: earnings - deductions
    });
  }, [data]);

  const loadExampleData = () => {
    // Manually trigger updates for all fields to simulate a real salary structure
    const event = (name: string, value: any) => ({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
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
    if (!XLSX) return alert("Excel generator loading...");

    const wb = XLSX.utils.book_new();

    // Define data structure
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
      ["", "For " + data.companyName, "", "", ""], // Added Organization Line
      ["", "Authorized Signatory", "", "", "Employee Signature"]
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Apply Styles
    const borderStyle = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    const headerStyle = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1e3a8a" } }, border: borderStyle, alignment: { horizontal: "center" } };
    const boldStyle = { font: { bold: true }, border: borderStyle };
    const normalStyle = { border: borderStyle };
    const titleStyle = { font: { bold: true, sz: 16 }, alignment: { horizontal: "center" } };
    const subTitleStyle = { font: { bold: true, sz: 12 }, alignment: { horizontal: "center" } };

    // Set Column Widths
    ws['!cols'] = [
      { wch: 2 },  // Margin
      { wch: 25 }, // Label 1
      { wch: 15 }, // Value 1
      { wch: 2 },  // Gap
      { wch: 25 }, // Label 2
      { wch: 15 }  // Value 2
    ];

    // Apply specific cell styles
    // Title
    ws['B2'].s = titleStyle;
    ws['B3'].s = subTitleStyle;
    
    // Headers (Earnings / Deductions)
    ws['B10'].s = headerStyle;
    ws['C10'].s = headerStyle;
    ws['E10'].s = headerStyle;
    ws['F10'].s = headerStyle;

    // Totals Row
    ws['B17'].s = boldStyle;
    ws['C17'].s = boldStyle;
    ws['E17'].s = boldStyle;
    ws['F17'].s = boldStyle;

    // Net Pay
    ws['B19'].s = { font: { bold: true, sz: 14, color: { rgb: "1e40af" } }, fill: { fgColor: { rgb: "dbeafe" } }, border: borderStyle };
    ws['C19'].s = { font: { bold: true, sz: 14 }, fill: { fgColor: { rgb: "dbeafe" } }, border: borderStyle };

    // Data Loop for borders
    const dataRows = [11, 12, 13, 14, 15];
    dataRows.forEach(r => {
      ['B', 'C', 'E', 'F'].forEach(c => {
        const cell = ws[`${c}${r}`];
        if (cell) cell.s = normalStyle;
        else ws[`${c}${r}`] = { v: "", s: normalStyle }; // Create empty cell for border
      });
    });

    // Merges
    ws['!merges'] = [
      { s: { r: 1, c: 1 }, e: { r: 1, c: 5 } }, // Company Name
      { s: { r: 2, c: 1 }, e: { r: 2, c: 5 } }, // Month Title
      { s: { r: 18, c: 2 }, e: { r: 18, c: 5 } }, // Net Pay Merge
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Salary Slip");
    XLSX.writeFile(wb, `Salary_Slip_${data.employeeName.replace(/\s+/g, '_')}_${data.monthYear}.xlsx`);
  };

  const downloadPDF = async () => {
    if (!slipRef.current) return;
    setIsGenerating(true);

    try {
      // Small delay to ensure render
      await new Promise(r => setTimeout(r, 100));

      const canvas = await (window as any).html2canvas(slipRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Salary_Slip_${data.employeeName.replace(/\s+/g, '_')}_${data.monthYear}.pdf`);
    } catch (e) {
      console.error("PDF Generation Error", e);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl mx-auto p-4 lg:p-8">
      {/* Professional Editor Side */}
      <div className="w-full xl:w-1/3 space-y-6 order-2 xl:order-1">
        <div className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-blue-900">
           <div className="flex justify-between items-center border-b pb-4 mb-4 gap-2">
             <h3 className="text-xl font-black text-blue-900">Salary Components</h3>
             <button onClick={loadExampleData} className="bg-gradient-to-r from-yellow-400 to-orange-600 text-white px-3 py-2 rounded-lg font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-xs uppercase tracking-wide animate-pulse hover:animate-none">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
               </svg>
               <span>Auto-Fill Example</span>
             </button>
           </div>
           
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase">Organization Details</label>
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

        {/* Ad Placement: Sidebar Middle */}
        <AdUnit slotId="salary-editor-sidebar" className="my-2" />

        <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-green-500">
          <h4 className="font-bold text-green-700 mb-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Earnings (Credits)
          </h4>
          <div className="space-y-3">
             <div className="relative group">
               <input type="number" name="basicSalary" placeholder="Basic Salary (₹)" className="w-full p-2 pl-4 border rounded font-mono text-sm" value={data.basicSalary} onChange={onChange} />
               <p className="text-[10px] text-gray-400 mt-1 pl-1">Typically 40-50% of CTC. Fully taxable.</p>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div>
                   <input type="number" name="hra" placeholder="HRA" className="w-full p-2 border rounded font-mono text-sm" value={data.hra} onChange={onChange} />
                   <p className="text-[10px] text-gray-400 mt-1">House Rent Allowance</p>
                </div>
                <div>
                   <input type="number" name="specialAllowance" placeholder="Special" className="w-full p-2 border rounded font-mono text-sm" value={data.specialAllowance} onChange={onChange} />
                   <p className="text-[10px] text-gray-400 mt-1">Balancing Component</p>
                </div>
                <div>
                   <input type="number" name="conveyance" placeholder="Transport" className="w-full p-2 border rounded font-mono text-sm" value={data.conveyance} onChange={onChange} />
                </div>
                <div>
                   <input type="number" name="medical" placeholder="Medical" className="w-full p-2 border rounded font-mono text-sm" value={data.medical} onChange={onChange} />
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-red-500">
          <h4 className="font-bold text-red-700 mb-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> Deductions (Debits)
          </h4>
          <div className="grid grid-cols-2 gap-3">
             <div>
                <input type="number" name="pf" placeholder="Provident Fund" className="w-full p-2 border rounded font-mono text-sm" value={data.pf} onChange={onChange} />
                <p className="text-[10px] text-gray-400 mt-1">12% of Basic (Govt Rule)</p>
             </div>
             <div>
                <input type="number" name="tax" placeholder="TDS / Tax" className="w-full p-2 border rounded font-mono text-sm" value={data.tax} onChange={onChange} />
                <p className="text-[10px] text-gray-400 mt-1">Income Tax Deduction</p>
             </div>
             <div className="col-span-2">
                <input type="number" name="otherDeductions" placeholder="Other Deductions (Loan/Advance)" className="w-full p-2 border rounded font-mono text-sm" value={data.otherDeductions} onChange={onChange} />
             </div>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={downloadExcel} className="w-full bg-green-700 text-white font-black py-4 rounded-xl shadow-lg hover:bg-green-800 transition-all flex items-center justify-center gap-3 active:scale-95">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <div className="text-left">
              <span className="block text-xs font-normal opacity-80">EDITABLE FILE</span>
              <span className="text-lg">DOWNLOAD EXCEL</span>
            </div>
          </button>

          <button onClick={downloadPDF} disabled={isGenerating} className={`w-full bg-blue-900 text-white font-black py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isGenerating ? (
               <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )}
            <div className="text-left">
              <span className="block text-xs font-normal opacity-80">PRINT READY</span>
              <span className="text-lg">DOWNLOAD PDF</span>
            </div>
          </button>
        </div>
      </div>

      {/* Live Preview Side */}
      <div className="w-full xl:w-2/3 flex flex-col items-center order-1 xl:order-2">
        {/* Ad Placement: Top of Preview */}
        <div className="w-full mb-4">
           <AdUnit slotId="salary-preview-top" />
        </div>

        <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 lg:p-12 flex justify-center items-start overflow-hidden">
          {/* Responsive Scaling Wrapper for Salary Slip */}
          <div className="transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] xl:scale-100 origin-top transition-all duration-300">
             <div ref={slipRef} className="bg-white shadow-2xl min-w-[700px] text-sm font-sans">
                {/* Slip Header */}
                <div className="bg-blue-900 text-white p-6 text-center">
                  <h1 className="text-2xl font-black uppercase tracking-widest mb-1">{data.companyName || 'COMPANY NAME'}</h1>
                  <p className="text-blue-200 text-xs font-bold tracking-[0.2em] uppercase">Payslip for the period of {data.monthYear || 'MONTH YYYY'}</p>
                </div>

                <div className="p-8">
                  {/* Employee Info Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-12 mb-8 text-gray-700 border-b pb-8">
                    <div className="flex justify-between border-b border-dashed pb-1">
                      <span className="font-bold text-gray-500 text-xs uppercase">Employee Name</span>
                      <span className="font-bold">{data.employeeName}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-1">
                      <span className="font-bold text-gray-500 text-xs uppercase">Employee ID</span>
                      <span className="font-bold font-mono">{data.employeeId || '---'}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-1">
                      <span className="font-bold text-gray-500 text-xs uppercase">Designation</span>
                      <span className="font-bold">{data.designation}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-1">
                      <span className="font-bold text-gray-500 text-xs uppercase">Bank Name</span>
                      <span className="font-bold">HDFC Bank</span>
                    </div>
                  </div>

                  {/* Financial Table */}
                  <div className="flex border border-gray-200 mb-8">
                    {/* Earnings Column */}
                    <div className="w-1/2 border-r border-gray-200">
                        <div className="bg-green-50 p-2 font-black text-green-800 text-xs uppercase border-b border-gray-200 flex justify-between">
                          <span>Earnings</span>
                          <span>Amount (₹)</span>
                        </div>
                        <div className="p-4 space-y-3">
                          <Row label="Basic Salary" value={data.basicSalary} />
                          <Row label="HRA" value={data.hra} />
                          <Row label="Conveyance" value={data.conveyance} />
                          <Row label="Medical" value={data.medical} />
                          <Row label="Special Allowance" value={data.specialAllowance} />
                        </div>
                    </div>

                    {/* Deductions Column */}
                    <div className="w-1/2">
                        <div className="bg-red-50 p-2 font-black text-red-800 text-xs uppercase border-b border-gray-200 flex justify-between">
                          <span>Deductions</span>
                          <span>Amount (₹)</span>
                        </div>
                        <div className="p-4 space-y-3">
                          <Row label="Provident Fund" value={data.pf} />
                          <Row label="Professional Tax" value={data.tax} />
                          <Row label="Other Deductions" value={data.otherDeductions} />
                        </div>
                    </div>
                  </div>

                  {/* Totals Row */}
                  <div className="flex bg-gray-50 border border-gray-200 mb-8 font-bold">
                      <div className="w-1/2 p-3 flex justify-between text-green-700 border-r border-gray-200">
                        <span>Total Earnings</span>
                        <span>₹ {totals.earnings.toLocaleString()}</span>
                      </div>
                      <div className="w-1/2 p-3 flex justify-between text-red-700">
                        <span>Total Deductions</span>
                        <span>₹ {totals.deductions.toLocaleString()}</span>
                      </div>
                  </div>

                  {/* Net Pay */}
                  <div className="bg-blue-50 border border-blue-100 p-4 flex justify-between items-center rounded-lg mb-12">
                    <div>
                      <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Net Salary Payable</p>
                      <p className="text-xs text-blue-600 italic">**Transferred to Bank Account</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-blue-900">₹ {totals.net.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Footer Signatures with Auto-Generated Stamp */}
                  <div className="flex justify-between items-end mt-12 pt-8">
                      <div className="text-center relative">
                        <p className="text-xs font-bold mb-1">For {data.companyName || 'Company'}</p>
                        
                        {/* Digital Rubber Stamp */}
                        <div className="absolute -top-16 left-4 w-28 h-28 border-4 border-purple-900 rounded-full opacity-70 transform -rotate-12 flex items-center justify-center pointer-events-none mix-blend-multiply">
                            <div className="w-[90%] h-[90%] border-2 border-dashed border-purple-900 rounded-full flex flex-col items-center justify-center p-2 text-center leading-none">
                              <span className="text-[6px] font-black text-purple-900 uppercase">Authorized</span>
                              <span className="text-[6px] font-black text-purple-900 uppercase my-0.5">***</span>
                              <span className="text-[6px] font-black text-purple-900 uppercase">{data.companyName?.substring(0, 20) || 'COMPANY'}</span>
                              <span className="text-[6px] font-black text-purple-900 uppercase mt-1">HR Dept.</span>
                            </div>
                        </div>

                        {/* Cursive Signature */}
                        <div className="relative z-10 font-['Great_Vibes'] text-2xl text-blue-900 mb-1">
                            Auth. Signatory
                        </div>
                        
                        <div className="w-40 border-b-2 border-gray-300"></div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Authorized Signatory</p>
                      </div>

                      <div className="text-center">
                        <div className="h-8"></div> {/* Spacer for alignment */}
                        <div className="w-40 border-b-2 border-gray-300 mb-1"></div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Employee Signature</p>
                      </div>
                  </div>
                  
                  <div className="text-center mt-8 text-[10px] text-gray-300">
                      This is a computer generated document.
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string, value: number }) => (
  <div className="flex justify-between text-gray-600 text-xs">
    <span>{label}</span>
    <span className="font-mono font-medium">{Number(value) > 0 ? Number(value).toLocaleString() : '-'}</span>
  </div>
);

export default SalarySlipGenerator;
