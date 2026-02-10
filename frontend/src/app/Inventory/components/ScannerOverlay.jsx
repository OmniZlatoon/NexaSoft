import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const ScannerOverlay = ({ onScanSuccess, onClose, onError }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/html5-qrcode";
    script.onload = () => {
      const scanner = new window.Html5Qrcode("scanner-region");
      scanner.start(
        { facingMode: "environment" },
        { fps: 20, qrbox: 250 },
        (text) => {
          onScanSuccess(text);
          scanner.stop();
        },
        () => {}
      ).catch(() => {
        onError("Camera permission denied.");
        onClose();
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col p-6 animate-in fade-in">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black uppercase tracking-widest text-[#2D9CDB]">Lens Active</h3>
        <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"><X size={20}/></button>
      </div>
      <div className="relative aspect-square w-full max-w-sm mx-auto bg-white/5 rounded-[3rem] overflow-hidden border-2 border-white/10">
        <div id="scanner-region" className="w-full h-full" />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-[#2D9CDB]/50 rounded-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2D9CDB] shadow-[0_0_15px_#2D9CDB] animate-scan" />
          </div>
        </div>
      </div>
    </div>
  );
};