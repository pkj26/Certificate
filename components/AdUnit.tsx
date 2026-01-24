
import React, { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId = "1234567890", format = "auto", className = "" }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adPushed, setAdPushed] = useState(false);

  useEffect(() => {
    // Do not proceed if an ad has already been pushed for this component instance.
    if (adPushed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger if the element is intersecting (visible) and has a valid client width.
        if (entry.isIntersecting && adRef.current && adRef.current.clientWidth > 0) {
          try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setAdPushed(true); // Mark as pushed to prevent re-triggering.
            observer.disconnect(); // Clean up the observer, it has done its job.
          } catch (e) {
            console.error("AdSense Error", e);
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // Trigger when at least 10% of the element is visible.
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    // Cleanup observer on component unmount.
    return () => {
      observer.disconnect();
    };
  }, [adPushed, slotId]);

  // Replace with your actual Publisher ID from Google AdSense
  const PUBLISHER_ID = "ca-pub-9196805139260752"; 

  return (
    <div ref={adRef} className={`text-center my-6 overflow-hidden w-full ${className}`}>
      {/* AdSense Display Ad */}
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', minHeight: '100px' }} 
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
