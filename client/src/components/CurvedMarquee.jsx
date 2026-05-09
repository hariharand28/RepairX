import React, { useEffect, useRef } from 'react';

const items = ["AI-Powered Diagnostics •", "Live Service Tracking •", "Verified Professionals •", "Secure Payments •", "90-Min Response •"];

export default function CurvedMarquee() {
  const textPathRef = useRef(null);
  const offsetRef = useRef(0);
  const textContent = new Array(10).fill(items.join(" ")).join(" ");

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      offsetRef.current -= 0.1;
      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${offsetRef.current}%`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="py--50 bg-white overflow-hidden flex justify-center items-center">
      <div className="w-full max-w-[1600px]">
        <svg viewBox="0 0 1000 120" className="w-full overflow-visible">
          <defs>
            <path id="masterCurve" d="M0,60 C150,110 350,10 500,60 C650,110 850,10 1000,60" />
          </defs>
          <text className="fill-[#111827] text-[18px] font-black uppercase tracking-[0.3em] select-none">
            <textPath ref={textPathRef} href="#masterCurve" startOffset="0%">
              {textContent}
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}