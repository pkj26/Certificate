
import React, { useEffect } from 'react';

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId = "1234567890", format = "auto", className = "" }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error", e);
    }
  }, []);

  // Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual Publisher ID from Google AdSense
  const PUBLISHER_ID = "ca-pub-0000000000000000"; 

  return (
    <div className={`text-center my-6 overflow-hidden ${className}`}>
      {/* AdSense Display Ad */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={PUBLISHER_ID}
           data-ad-slot={slotId}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
      
      {/* Visual Placeholder for Development/When Ad fails to load */}
      <div className="bg-gray-100 border border-gray-200 text-gray-400 text-xs uppercase py-2 tracking-widest flex flex-col items-center justify-center min-h-[100px] adsense-placeholder">
        <span className="font-bold">Advertisement</span>
        <span className="text-[9px]">Google AdSense Space</span>
      </div>
      <style>{`
        .adsbygoogle[data-ad-status="filled"] + .adsense-placeholder {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AdUnit;
