import React, { useState, useRef } from 'react';
import AdUnit from './AdUnit';

const ImageToPdf: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // FIX: Explicitly cast the result of Array.from to File[] to ensure 'file' is typed as File (which extends Blob).
      const files = Array.from(e.target.files) as File[];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === images.length - 1)) return;
    
    const newImages = [...images];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
    setImages(newImages);
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
        // Dynamic import to avoid SSR issues if any, though standard import works in SPA
        const { jsPDF } = (window as any).jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);

        for (let i = 0; i < images.length; i++) {
            if (i > 0) pdf.addPage();
            
            const imgData = images[i];
            
            // Create an image element to get dimensions
            const img = new Image();
            img.src = imgData;
            await new Promise((resolve) => { img.onload = resolve; });

            const imgRatio = img.width / img.height;
            const pageRatio = maxWidth / maxHeight;

            let finalWidth, finalHeight;

            // Fit image within margins while maintaining aspect ratio
            if (imgRatio > pageRatio) {
                finalWidth = maxWidth;
                finalHeight = maxWidth / imgRatio;
            } else {
                finalHeight = maxHeight;
                finalWidth = maxHeight * imgRatio;
            }

            // Center image on page
            const x = (pageWidth - finalWidth) / 2;
            const y = (pageHeight - finalHeight) / 2;

            pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
            pdf.text(`Page ${i + 1}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
        }

        pdf.save('FormatHub_Converted_Document.pdf');
    } catch (error) {
        console.error("PDF Generation failed", error);
        alert("Failed to create PDF. Please try with fewer images.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-900 text-white pt-8 pb-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-4">JPG to PDF Converter</h1>
        <p className="text-blue-200 max-w-2xl mx-auto text-sm md:text-base">
          Convert your photos, documents, and assignments into a single PDF file securely. 100% Free for Students & Job Seekers.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <div className="text-center border-2 border-dashed border-blue-300 rounded-xl p-10 bg-blue-50 hover:bg-blue-100 transition cursor-pointer relative">
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
                <span className="text-5xl block mb-4">📸 ➡️ 📄</span>
                <h3 className="text-xl font-bold text-blue-900">Select Photos / Images</h3>
                <p className="text-gray-500 mt-2">Tap to upload multiple JPG or PNG files</p>
            </div>

            {images.length > 0 && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-700">Selected Images ({images.length})</h3>
                        <button onClick={() => setImages([])} className="text-red-500 text-xs font-bold uppercase hover:underline">Clear All</button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group border rounded-lg overflow-hidden shadow-sm bg-gray-100">
                                <img src={img} alt={`page-${idx}`} className="w-full h-32 object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                    <button onClick={() => moveImage(idx, 'up')} className="text-white bg-blue-600 p-1 rounded hover:bg-blue-700 disabled:opacity-50" disabled={idx === 0}>⬆</button>
                                    <button onClick={() => moveImage(idx, 'down')} className="text-white bg-blue-600 p-1 rounded hover:bg-blue-700 disabled:opacity-50" disabled={idx === images.length - 1}>⬇</button>
                                    <button onClick={() => removeImage(idx)} className="text-white bg-red-600 p-1 rounded hover:bg-red-700">✕</button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] text-center py-1">
                                    Page {idx + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <AdUnit slotId="img-to-pdf-middle" className="mb-4" />
                        
                        <button 
                            onClick={generatePdf} 
                            disabled={isGenerating}
                            className="w-full md:w-auto bg-green-600 text-white px-10 py-4 rounded-full font-black text-lg shadow-xl hover:bg-green-700 hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
                        >
                            {isGenerating ? 'Converting...' : '⬇ Download PDF Now'}
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 prose prose-blue max-w-none">
            <h2 className="text-2xl font-black text-blue-900">How to Convert Photo to PDF Online (Free)</h2>
            <p>
                Whether you are a student submitting assignments for <strong>IGNOU / CBSE</strong>, or a job seeker uploading documents for <strong>SSC / UPSC</strong> forms, you often need to combine multiple photos into a single PDF file.
            </p>
            <p>FormatHub's <strong>Image to PDF Converter</strong> is the safest and fastest way to do this.</p>
            
            <h3 className="text-lg font-bold text-gray-800">Why use this tool?</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>No Uploading:</strong> Unlike other sites, your personal photos (Aadhar, Pan Card) are processed inside your browser. They are never sent to our servers.</li>
                <li><strong>Unlimited Pages:</strong> Combine as many notes or assignment pages as you want.</li>
                <li><strong>Easy Reordering:</strong> Drag and drop support to arrange page numbers correctly.</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-800 mt-6">Steps to Convert JPG to PDF:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                <li>Click on the <strong>Select Photos</strong> box above.</li>
                <li>Choose multiple images (JPG or PNG) from your gallery.</li>
                <li>Use the arrow buttons to arrange them in the correct order (Page 1, Page 2...).</li>
                <li>Click <strong>Download PDF</strong> to get your file instantly.</li>
            </ol>
        </div>
        
        <AdUnit slotId="img-to-pdf-bottom" className="mt-8" />
      </div>
    </div>
  );
};

export default ImageToPdf;