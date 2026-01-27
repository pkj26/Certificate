
import React, { useState, useRef, useEffect } from 'react';
import AdUnit from './AdUnit';

interface ResizeSettings {
  width: number;
  height: number;
  unit: 'px' | 'cm' | 'mm';
  maxSizeKB: number;
  format: 'image/jpeg' | 'image/png';
}

const EXAM_PRESETS = [
  { name: 'Custom Size', width: 350, height: 450, unit: 'px', maxSizeKB: 50, format: 'image/jpeg' },
  { name: 'SSC (CGL/CHSL) Photo', width: 3.5, height: 4.5, unit: 'cm', maxSizeKB: 50, format: 'image/jpeg' },
  { name: 'SSC Signature', width: 4.0, height: 2.0, unit: 'cm', maxSizeKB: 20, format: 'image/jpeg' },
  { name: 'UPSC (IAS/IPS) Photo', width: 350, height: 350, unit: 'px', maxSizeKB: 300, format: 'image/jpeg' },
  { name: 'IBPS (Banking) Photo', width: 4.5, height: 3.5, unit: 'cm', maxSizeKB: 50, format: 'image/jpeg' },
  { name: 'IBPS Signature', width: 140, height: 60, unit: 'px', maxSizeKB: 20, format: 'image/jpeg' },
  { name: 'NEET UG Photo', width: 3.5, height: 4.5, unit: 'cm', maxSizeKB: 200, format: 'image/jpeg' },
  { name: 'GATE Photo', width: 3.5, height: 4.5, unit: 'cm', maxSizeKB: 200, format: 'image/jpeg' },
  { name: 'Passport Size (Standard)', width: 3.5, height: 4.5, unit: 'cm', maxSizeKB: 100, format: 'image/jpeg' },
];

const ImageResizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedSize, setProcessedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Settings State
  const [settings, setSettings] = useState<ResizeSettings>({
    width: 3.5, height: 4.5, unit: 'cm', maxSizeKB: 50, format: 'image/jpeg'
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedUrl(null);
    }
  };

  const applyPreset = (presetName: string) => {
    const preset = EXAM_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setSettings({
        width: preset.width,
        height: preset.height,
        unit: preset.unit as any,
        maxSizeKB: preset.maxSizeKB,
        format: preset.format as any
      });
    }
  };

  const cmToPx = (cm: number) => Math.round(cm * 37.7952755906);
  const mmToPx = (mm: number) => Math.round(mm * 3.7795275591);

  const processImage = async () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsProcessing(true);
    
    const img = new Image();
    img.src = previewUrl!;
    
    await new Promise((resolve) => { img.onload = resolve; });

    let targetWidth = settings.width;
    let targetHeight = settings.height;

    if (settings.unit === 'cm') {
      targetWidth = cmToPx(settings.width);
      targetHeight = cmToPx(settings.height);
    } else if (settings.unit === 'mm') {
      targetWidth = mmToPx(settings.width);
      targetHeight = mmToPx(settings.height);
    }

    const canvas = canvasRef.current;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // White background for JPGs to handle transparency issues
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    }

    // Compression Loop
    let quality = 0.9;
    let blob: Blob | null = null;
    let attempts = 0;

    // Binary search approach for quality could be better, but simple loop works for small adjustments
    while (attempts < 20) {
      blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, settings.format, quality));
      
      if (!blob) break;
      
      if (blob.size / 1024 <= settings.maxSizeKB || quality < 0.1) {
        break;
      }
      
      quality -= 0.05;
      attempts++;
    }

    if (blob) {
      setProcessedUrl(URL.createObjectURL(blob));
      setProcessedSize(blob.size);
    }
    
    setIsProcessing(false);
  };

  const downloadImage = () => {
    if (processedUrl) {
      const link = document.createElement('a');
      link.href = processedUrl;
      link.download = `Resized_${selectedFile?.name.split('.')[0]}.${settings.format === 'image/jpeg' ? 'jpg' : 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-900 text-white pt-8 pb-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-4">Govt Exam Photo Resizer & Compressor</h1>
        <p className="text-blue-200 max-w-2xl mx-auto text-sm md:text-base">
          Resize and compress your photo and signature to exact KB and Dimensions for SSC, UPSC, IBPS, NEET, and other online forms. 100% Free & Secure.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">1. Select Exam / Purpose</label>
              <select 
                onChange={(e) => applyPreset(e.target.value)} 
                className="w-full p-3 border-2 border-blue-100 rounded-lg font-bold text-gray-700 focus:border-blue-500 outline-none"
              >
                {EXAM_PRESETS.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Width</label>
                  <input type="number" value={settings.width} onChange={e => setSettings({...settings, width: Number(e.target.value)})} className="w-full p-2 border rounded font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Height</label>
                  <input type="number" value={settings.height} onChange={e => setSettings({...settings, height: Number(e.target.value)})} className="w-full p-2 border rounded font-mono" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Unit</label>
                  <select value={settings.unit} onChange={e => setSettings({...settings, unit: e.target.value as any})} className="w-full p-2 border rounded">
                    <option value="px">Pixels (px)</option>
                    <option value="cm">Centimeters (cm)</option>
                    <option value="mm">Millimeters (mm)</option>
                  </select>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-gray-500 uppercase">Max Size (KB)</label>
                   <input type="number" value={settings.maxSizeKB} onChange={e => setSettings({...settings, maxSizeKB: Number(e.target.value)})} className="w-full p-2 border rounded font-mono text-red-600 font-bold" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">2. Upload Image</label>
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:bg-blue-50 transition cursor-pointer relative">
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <span className="text-4xl block mb-2">📤</span>
                <span className="text-sm font-bold text-blue-800">Click to Upload Photo/Signature</span>
                <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG</p>
              </div>
            </div>

            <button 
              onClick={processImage} 
              disabled={!selectedFile || isProcessing}
              className={`w-full py-4 rounded-xl font-black text-white shadow-lg uppercase tracking-wider transition-all ${!selectedFile ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl active:scale-95'}`}
            >
              {isProcessing ? 'Processing...' : 'Resize & Compress Now'}
            </button>
          </div>

          {/* RIGHT: Preview */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[400px]">
            <AdUnit slotId="image-resizer-top" className="mb-4" />
            
            {processedUrl ? (
              <div className="text-center w-full">
                 <h3 className="text-green-600 font-black uppercase tracking-widest mb-4">Success! Image Ready</h3>
                 <div className="border-4 border-white shadow-md inline-block mb-4">
                    <img src={processedUrl} alt="Resized" className="max-w-full max-h-[250px]" />
                 </div>
                 <div className="flex justify-center gap-4 text-sm font-bold text-gray-600 mb-6">
                    <span>New Size: {(processedSize / 1024).toFixed(2)} KB</span>
                    <span>Dimensions: {settings.unit === 'px' ? settings.width : cmToPx(settings.width)}x{settings.unit === 'px' ? settings.height : cmToPx(settings.height)}px</span>
                 </div>
                 <button onClick={downloadImage} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 animate-pulse">
                    Download Image ↓
                 </button>
              </div>
            ) : previewUrl ? (
              <div className="text-center opacity-60">
                <img src={previewUrl} alt="Original" className="max-w-full max-h-[200px] mb-2 grayscale" />
                <p className="text-xs font-bold">Original Preview</p>
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                <span className="text-6xl block mb-4 opacity-20">🖼️</span>
                <p className="text-sm font-bold">Upload an image to see preview</p>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
        </div>
        
        {/* SEO Content Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8 md:p-12 prose prose-blue max-w-none">
          <h2 className="text-2xl font-black text-blue-900">How to Resize Photo & Signature for SSC, UPSC, IBPS Online Forms</h2>
          <p>
            Applying for government jobs in India requires uploading photos and signatures in very specific formats. 
            Most portals like <strong>SSC (Staff Selection Commission)</strong>, <strong>UPSC (Union Public Service Commission)</strong>, and <strong>IBPS</strong> reject images if they are larger than 50KB or have incorrect dimensions.
          </p>
          <p>
            FormatHub's <strong>Free Online Image Resizer</strong> solves this instantly. We have pre-configured presets for all major Indian exams.
          </p>

          <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">SSC CGL/CHSL Requirements</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Photo Size: 20 KB to 50 KB</li>
                <li>• Dimensions: 3.5cm x 4.5cm</li>
                <li>• Format: JPEG/JPG</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-bold text-green-900 mb-2">UPSC IAS/IPS Requirements</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Size: 20 KB to 300 KB</li>
                <li>• Dimensions: 350px x 350px</li>
                <li>• Format: JPG</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h3 className="font-bold text-yellow-900 mb-2">IBPS / Banking Requirements</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Photo: 20-50 KB (4.5cm x 3.5cm)</li>
                <li>• Signature: 10-20 KB (140x60px)</li>
                <li>• Thumb Impression: 20-50 KB</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800">Why use FormatHub Image Compressor?</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Privacy First:</strong> Your images are processed inside your browser. We never upload your photos to any server.</li>
            <li><strong>Exact KB Reduction:</strong> Unlike other tools, we specifically target the "Max KB" limit required by government portals.</li>
            <li><strong>No Watermark:</strong> 100% free professional tool for students.</li>
          </ul>
        </div>

        <AdUnit slotId="image-resizer-bottom" className="mt-8" />
      </div>
    </div>
  );
};

export default ImageResizer;
