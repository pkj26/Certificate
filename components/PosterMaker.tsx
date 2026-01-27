
import React, { useState, useRef, useEffect } from 'react';
import AdUnit from './AdUnit';

interface PosterElement {
  id: string;
  type: 'text' | 'image' | 'sticker';
  content: string; // Text content or Image URL
  x: number;
  y: number;
  width?: number; // For images
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  fontWeight?: string;
}

const TEMPLATES = [
  {
    name: "Big Sale",
    bg: "#ef4444",
    elements: [
      { id: 't1', type: 'text', content: 'MEGA SALE', x: 50, y: 50, fontSize: 60, color: '#ffffff', fontWeight: '900' },
      { id: 't2', type: 'text', content: 'UP TO 50% OFF', x: 80, y: 140, fontSize: 30, color: '#fef08a', fontWeight: '700' },
      { id: 's1', type: 'sticker', content: '🔥', x: 250, y: 50, fontSize: 50 }
    ]
  },
  {
    name: "Hiring Now",
    bg: "#1e3a8a",
    elements: [
      { id: 't1', type: 'text', content: 'WE ARE HIRING', x: 40, y: 60, fontSize: 40, color: '#ffffff', fontWeight: '800' },
      { id: 't2', type: 'text', content: 'Join Our Team', x: 40, y: 110, fontSize: 24, color: '#93c5fd', fontWeight: '500' },
      { id: 't3', type: 'text', content: 'Apply at hr@company.com', x: 40, y: 450, fontSize: 18, color: '#ffffff', fontWeight: '400' }
    ]
  },
  {
    name: "Festival Greeting",
    bg: "#f59e0b",
    elements: [
      { id: 't1', type: 'text', content: 'Happy Diwali', x: 50, y: 150, fontSize: 50, color: '#78350f', fontWeight: 'bold' },
      { id: 's1', type: 'sticker', content: '🪔', x: 180, y: 80, fontSize: 60 },
      { id: 't2', type: 'text', content: 'Wishes from Family', x: 80, y: 220, fontSize: 20, color: '#fffbeb', fontWeight: 'normal' }
    ]
  },
  {
    name: "Motivational Quote",
    bg: "#111827",
    elements: [
      { id: 't1', type: 'text', content: '"DREAM BIG"', x: 60, y: 180, fontSize: 45, color: '#ffffff', fontWeight: '900' },
      { id: 't2', type: 'text', content: '- Stay Focused', x: 140, y: 250, fontSize: 18, color: '#9ca3af', fontWeight: 'italic' }
    ]
  },
  {
    name: "Event Invite",
    bg: "#ffffff",
    elements: [
      { id: 't1', type: 'text', content: 'MUSIC NIGHT', x: 40, y: 50, fontSize: 40, color: '#000000', fontWeight: '900' },
      { id: 't2', type: 'text', content: 'Saturday, 8 PM', x: 40, y: 100, fontSize: 20, color: '#dc2626', fontWeight: 'bold' },
      { id: 's1', type: 'sticker', content: '🎸', x: 280, y: 40, fontSize: 50 }
    ]
  }
];

const STICKERS = ['🔥', '❤️', '⭐', '🎉', '✅', '📍', '📞', '🛍️', '🇮🇳', '🪔', '🎸', '💻'];

const PosterMaker: React.FC = () => {
  const [elements, setElements] = useState<PosterElement[]>(TEMPLATES[0].elements as PosterElement[]);
  const [bgColor, setBgColor] = useState(TEMPLATES[0].bg);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [canvasSize] = useState({ width: 400, height: 500 }); // Mobile-friendly ratio
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragItem = useRef<any>(null);

  // --- Actions ---

  const addText = () => {
    const newEl: PosterElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'New Text',
      x: 50,
      y: 50,
      fontSize: 24,
      color: '#000000',
      fontWeight: 'bold'
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const addSticker = (sticker: string) => {
    const newEl: PosterElement = {
      id: Date.now().toString(),
      type: 'sticker',
      content: sticker,
      x: 100,
      y: 100,
      fontSize: 40
    };
    setElements([...elements, newEl]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newEl: PosterElement = {
            id: Date.now().toString(),
            type: 'image',
            content: event.target.result as string,
            x: 20,
            y: 20,
            width: 150
          };
          setElements([...elements, newEl]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const loadTemplate = (index: number) => {
    setBgColor(TEMPLATES[index].bg);
    // Deep copy elements to avoid reference issues
    setElements(JSON.parse(JSON.stringify(TEMPLATES[index].elements)));
    setSelectedId(null);
  };

  const updateElement = (key: keyof PosterElement, value: any) => {
    if (!selectedId) return;
    setElements(prev => prev.map(el => el.id === selectedId ? { ...el, [key]: value } : el));
  };

  const deleteElement = () => {
    if (selectedId) {
      setElements(prev => prev.filter(el => el.id !== selectedId));
      setSelectedId(null);
    }
  };

  const downloadPoster = async () => {
    if (!canvasRef.current) return;
    // Deselect before capture so selection box doesn't show
    const currentSelection = selectedId;
    setSelectedId(null);
    
    await new Promise(r => setTimeout(r, 100)); // Wait for render
    
    try {
      const canvas = await (window as any).html2canvas(canvasRef.current, {
        scale: 3, // High resolution
        useCORS: true,
        backgroundColor: null
      });
      const link = document.createElement('a');
      link.download = 'Poster_Design_FormatHub.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error("Download failed", e);
    } finally {
      setSelectedId(currentSelection);
    }
  };

  // --- Drag Logic ---

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    const el = elements.find(el => el.id === id);
    if (el) {
      dragItem.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        initialX: el.x,
        initialY: el.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragItem.current) return;
    const dx = e.clientX - dragItem.current.startX;
    const dy = e.clientY - dragItem.current.startY;
    
    setElements(prev => prev.map(el => 
      el.id === dragItem.current.id 
        ? { ...el, x: dragItem.current.initialX + dx, y: dragItem.current.initialY + dy } 
        : el
    ));
  };

  const handleMouseUp = () => {
    dragItem.current = null;
  };

  return (
    <div className="min-h-screen bg-gray-100" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4">Free Online Poster Maker 2026</h1>
        <p className="text-pink-100 max-w-2xl mx-auto text-sm md:text-base">
          Design professional posters for Business, Festivals, and Social Media in minutes. Drag, drop, and download for free.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: Tools */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500">
              <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-widest text-xs">1. Choose Template</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {TEMPLATES.map((t, i) => (
                  <button key={i} onClick={() => loadTemplate(i)} className="text-[10px] font-bold p-2 bg-gray-100 hover:bg-pink-50 border rounded text-center truncate">
                    {t.name}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-widest text-xs">2. Add Elements</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button onClick={addText} className="bg-blue-50 text-blue-700 font-bold py-3 rounded-lg border border-blue-200 hover:bg-blue-100">
                  + Add Text
                </button>
                <label className="bg-purple-50 text-purple-700 font-bold py-3 rounded-lg border border-purple-200 hover:bg-purple-100 cursor-pointer text-center block">
                  + Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <div className="mb-4">
                <p className="text-[10px] text-gray-400 font-bold mb-2">STICKERS</p>
                <div className="flex flex-wrap gap-2">
                  {STICKERS.map(s => (
                    <button key={s} onClick={() => addSticker(s)} className="text-2xl hover:scale-125 transition">{s}</button>
                  ))}
                </div>
              </div>

              <hr className="my-4"/>

              {/* PROPERTIES PANEL (Only if selected) */}
              {selectedId ? (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500">EDIT SELECTED</span>
                    <button onClick={deleteElement} className="text-red-500 text-xs font-bold underline">Delete</button>
                  </div>
                  
                  {elements.find(e => e.id === selectedId)?.type === 'text' && (
                    <>
                      <input 
                        type="text" 
                        value={elements.find(e => e.id === selectedId)?.content} 
                        onChange={(e) => updateElement('content', e.target.value)}
                        className="w-full p-2 border rounded text-sm font-bold"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="color" className="w-full h-10 p-1 rounded border" value={elements.find(e => e.id === selectedId)?.color} onChange={(e) => updateElement('color', e.target.value)} />
                        <input type="number" className="w-full p-2 border rounded text-sm" placeholder="Size" value={elements.find(e => e.id === selectedId)?.fontSize} onChange={(e) => updateElement('fontSize', Number(e.target.value))} />
                      </div>
                    </>
                  )}
                  {elements.find(e => e.id === selectedId)?.type === 'image' && (
                     <div className="space-y-1">
                        <label className="text-[10px]">Image Width</label>
                        <input type="range" min="50" max="400" className="w-full" value={elements.find(e => e.id === selectedId)?.width} onChange={(e) => updateElement('width', Number(e.target.value))} />
                     </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-xs text-gray-400 py-4 italic">Select an element on the canvas to edit styles</div>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-lg">
                <h3 className="font-bold text-gray-800 mb-2 uppercase tracking-widest text-xs">Background Color</h3>
                <div className="flex gap-2 flex-wrap">
                    {['#ffffff', '#000000', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1'].map(c => (
                        <button key={c} onClick={() => setBgColor(c)} className="w-8 h-8 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: c }}></button>
                    ))}
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden" />
                </div>
            </div>

            <AdUnit slotId="poster-sidebar" />
          </div>

          {/* RIGHT: Canvas Area */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl shadow-xl w-full flex flex-col items-center">
               <div className="relative overflow-hidden border-2 border-gray-200 shadow-inner mb-6"
                    ref={canvasRef}
                    style={{ 
                        width: canvasSize.width, 
                        height: canvasSize.height, 
                        backgroundColor: bgColor,
                        transition: 'background-color 0.3s'
                    }}
                    onMouseDown={() => setSelectedId(null)} // Deselect clicking bg
               >
                  {elements.map(el => (
                    <div
                        key={el.id}
                        onMouseDown={(e) => handleMouseDown(e, el.id)}
                        style={{
                            position: 'absolute',
                            left: el.x,
                            top: el.y,
                            fontSize: el.fontSize,
                            color: el.color,
                            fontWeight: el.fontWeight,
                            cursor: 'move',
                            border: selectedId === el.id ? '2px dashed #2563eb' : 'none',
                            padding: '4px',
                            zIndex: selectedId === el.id ? 100 : 10,
                            userSelect: 'none'
                        }}
                    >
                        {el.type === 'image' ? (
                            <img src={el.content} alt="upload" style={{ width: el.width, pointerEvents: 'none' }} />
                        ) : (
                            el.content
                        )}
                    </div>
                  ))}
               </div>

               <button onClick={downloadPoster} className="bg-pink-600 text-white px-10 py-4 rounded-full font-black text-lg shadow-lg hover:bg-pink-700 hover:scale-105 transition-all flex items-center gap-2">
                 <span>⬇</span> Download High Quality Poster
               </button>
               <p className="text-xs text-gray-500 mt-2">Exported as PNG • No Watermark</p>
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <div className="mt-20 bg-white rounded-xl shadow-md p-8 md:p-12 prose prose-pink max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Create Professional Posters Online in 2026: The Ultimate Guide</h2>
            <p className="text-lg text-gray-700 mb-6">
                In the digital age of 2026, visual content is king. Whether you are running a small business in Mumbai, organizing a college fest in Delhi, or managing a social media page, you need stunning graphics to grab attention. FormatHub's <strong>Free Online Poster Maker</strong> allows you to design high-quality, professional posters without hiring an expensive graphic designer.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Businesses Need High-Quality Posters</h3>
            <p>
                A poster is not just an image; it is your brand's voice. With the rise of Instagram and WhatsApp marketing in India, a <strong>Business Advertisement Poster</strong> is the fastest way to communicate sales, new arrivals, or hiring alerts.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Brand Recall:</strong> Consistent colors and logos make people remember you.</li>
                <li><strong>Information Speed:</strong> A well-designed "Mega Sale" poster conveys the message in 0.5 seconds.</li>
                <li><strong>Cost-Effective:</strong> Traditional printing is expensive. Digital posters are free to create and share.</li>
            </ul>

            {/* NEW BLOG SECTION */}
            <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">10 Best Graphic Design Tips for 2026</h2>
            <p className="mb-6">As digital marketing evolves, so do design trends. To ensure your posters stand out on Instagram, LinkedIn, and Facebook, follow these expert tips for 2026:</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">1. Embrace Minimalism</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Clutter kills conversion. In 2026, keep it simple. Use ample whitespace and let your main message breathe. If you are announcing a sale, "50% OFF" should be the focus, not the background pattern.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">2. Bold & Massive Typography</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Big fonts are in. Don't be afraid to let your text overlap images or take up 50% of the canvas. Use the 'Font Size' slider in our tool to maximize impact.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">3. High Contrast Colors</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Ensure your text is readable. If your background is dark (like our 'Motivational' template), use bright yellow or white text. Accessibility is key for social media feeds.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">4. Authentic Imagery</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Generic stock photos are out. Use our 'Upload Image' feature to add real photos of your products, team, or events. Authenticity builds trust.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">5. Visual Hierarchy</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Guide the viewer's eye. The most important information (e.g., "Mega Sale") should be the biggest. Details like "Terms Apply" should be the smallest.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">6. Mobile-First Design</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">80% of users view content on mobile. Our default canvas size is optimized for vertical viewing (Instagram Stories/Reels style) to ensure maximum visibility.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">7. Consistent Branding</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Use the same color palette and font style across all your posters. This helps customers recognize your brand instantly on their busy feeds.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">8. Use of 3D Elements</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Flat design is evolving. Add depth by using shadows or our library of 3D-style stickers (like the fire emoji or gift box) to make your offer pop.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">9. Clear Call to Action (CTA)</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Don't leave users guessing. Tell them what to do. Add text like "Call Now", "Visit Website", or "Shop Today" in a contrasting color.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-700 text-lg mb-2">10. Emotional Storytelling</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Connect emotionally. Instead of just "Gym Open", try "Transform Your Life Today". Use visuals that evoke happiness, success, or urgency.</p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Design a Poster in 2 Minutes</h3>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Select a Template:</strong> Don't start from scratch. Use our pre-made layouts for "Big Sale", "Hiring", or "Festivals".</li>
                <li><strong>Customize Text:</strong> Click on the text to change it. Support for English and Hindi text input (using your keyboard).</li>
                <li><strong>Add Your Photo/Logo:</strong> Use the "Upload Image" button to add your brand logo or product photo.</li>
                <li><strong>Download:</strong> Click the download button to get a watermark-free PNG file ready for WhatsApp Status or Instagram Stories.</li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tips for Choosing Colors and Fonts</h3>
            <p className="mb-4">
                To make your <strong>Instagram Post Designer</strong> experience better, follow these simple rules:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Contrast is Key:</strong> If your background is dark (like our 'Motivational' template), use white or yellow text.</li>
                <li><strong>Less is More:</strong> Don't clutter. Keep your main message big (e.g., "50% OFF").</li>
                <li><strong>Font Psychology:</strong> Use Bold fonts for headlines and thinner fonts for details like dates or addresses.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Best Poster Design Tool in India</h3>
            <p>
                FormatHub is built for Indian users. We understand the need for <strong>Festival Poster Makers with Name and Photo</strong>. Whether it's Diwali, Eid, or Independence Day, you can drag and drop stickers, add your name, and share it instantly with family and customers.
            </p>

            <div className="bg-pink-50 p-6 rounded-lg border border-pink-100 my-8">
                <h4 className="font-bold text-pink-900 mb-2">Frequently Asked Questions</h4>
                <div className="space-y-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800">Is this poster maker free?</p>
                        <p className="text-sm text-gray-600">Yes, 100% free. No hidden charges, no watermarks.</p>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-gray-800">Can I type in Hindi?</p>
                        <p className="text-sm text-gray-600">Yes! Just use your phone or computer's Hindi keyboard to type text into the boxes.</p>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-gray-800">What is the size of the poster?</p>
                        <p className="text-sm text-gray-600">The default size is optimized for Social Media (Instagram/WhatsApp) vertical viewing.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PosterMaker;
