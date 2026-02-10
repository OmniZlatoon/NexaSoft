import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  History, 
  Barcode,
  CheckCircle2,
  Plus,
  Minus,
  LayoutGrid,
  User,
  Key,
  QrCode,
  Printer,
  Maximize2,
  X,
  Zap,
  Trash2,
  HelpCircle,
  Calendar,
  Layers,
  ChevronRight,
  Package,
  ArrowRight
} from 'lucide-react';

// --- Configuration & Mock Data ---
const APP_NAME = "NEXA-SOFT";
const catalogue = [
  { id: 1, name: "Premium Cereal", price: 8.50, sku: "12345678", category: "Food" },
  { id: 2, name: "Alkaline Water 500ml", price: 1.25, sku: "87654321", category: "Drinks" }
];

export default function App() {
  const [view, setView] = useState('login');
  const [scannedItem, setScannedItem] = useState(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  
  // Terminal State
  const [employeeId, setEmployeeId] = useState('');
  const [accessKey, setAccessKey] = useState('');

  // Inventory Inputs
  const [qty, setQty] = useState(1);
  const [expiry, setExpiry] = useState(new Date().toISOString().split('T')[0]);
  const [history, setHistory] = useState([]);
  const [labelView, setLabelView] = useState(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Load Scanner Script and Handle Camera
  useEffect(() => {
    if (isScannerActive) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/html5-qrcode";
      script.onload = () => {
        const scanner = new window.Html5Qrcode("scanner-region");
        scanner.start(
          { facingMode: "environment" },
          { fps: 20, qrbox: 250 },
          (text) => {
            const product = catalogue.find(p => p.sku === text) || { name: "Unknown SKU", price: 0, sku: text };
            setScannedItem(product);
            setIsScannerActive(false);
            scanner.stop();
          },
          () => {}
        ).catch(() => {
          setFeedback("Camera Init Failed");
          setIsScannerActive(false);
        });
      };
      document.body.appendChild(script);
      return () => {
        // Cleanup would go here if needed
      };
    }
  }, [isScannerActive]);

  const commitStock = () => {
    const entry = {
      id: Math.random().toString(36).substr(2, 9),
      product: scannedItem,
      qty,
      expiry,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      batch: `NS-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setHistory([entry, ...history]);
    setScannedItem(null);
    setQty(1);
    setFeedback("Entry Saved Successfully");
  };

  // --- Login View ---
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 text-white font-sans">
        <div className="w-full max-w-sm space-y-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <Zap className="text-cyan-400" size={40} />
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">{APP_NAME}<span className="text-cyan-500">.</span></h1>
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.4em] mt-2">Terminal Authentication</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#111] border border-white/5 rounded-2xl p-4 focus-within:border-cyan-500/50 transition-all shadow-inner">
              <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Clerk ID</label>
              <input type="text" value={employeeId} onChange={e=>setEmployeeId(e.target.value)} placeholder="000-000" className="bg-transparent border-none outline-none w-full font-bold text-white placeholder:text-slate-800" />
            </div>
            <div className="bg-[#111] border border-white/5 rounded-2xl p-4 focus-within:border-cyan-500/50 transition-all shadow-inner">
              <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Access Pin</label>
              <input type="password" value={accessKey} onChange={e=>setAccessKey(e.target.value)} placeholder="••••" className="bg-transparent border-none outline-none w-full font-bold text-white placeholder:text-slate-800" />
            </div>
            <button onClick={() => setView('hub')} className="w-full h-16 bg-cyan-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-500 transition-all active:scale-95 shadow-lg shadow-cyan-900/40">
              Login to Nexus
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex justify-center font-sans selection:bg-cyan-500/30">
      <div className="w-full max-w-md bg-[#0A0A0A] min-h-screen flex flex-col border-x border-white/5 relative">
        
        {/* Global UI Header */}
        <header className="px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {scannedItem || view !== 'hub' ? (
              <button onClick={() => { setScannedItem(null); setView('hub'); setLabelView(null); }} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5"><ArrowLeft size={18}/></button>
            ) : null}
            <div>
              <h2 className="text-sm font-black italic tracking-tighter uppercase">{APP_NAME} <span className="text-cyan-500">v3</span></h2>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Active Terminal</p>
            </div>
          </div>
          <button onClick={() => setShowGuide(true)} className="w-10 h-10 bg-cyan-500/10 text-cyan-500 rounded-xl flex items-center justify-center border border-cyan-500/20"><HelpCircle size={18}/></button>
        </header>

        <main className="flex-1 px-6 pb-24">
          
          {/* Main Hub */}
          {view === 'hub' && !scannedItem && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <button onClick={() => setIsScannerActive(true)} className="w-full h-56 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-8 text-left relative overflow-hidden group active:scale-[0.98] transition-all shadow-2xl shadow-cyan-900/20">
                <Barcode size={80} className="absolute -right-4 -top-4 opacity-10 rotate-12" />
                <div className="h-full flex flex-col justify-end">
                  <h3 className="text-3xl font-black italic leading-none mb-2">SCAN<br/>INVENTORY</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-cyan-200/60">Launch Optical Lens</p>
                </div>
                <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20"><Maximize2 size={20}/></div>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setView('history')} className="bg-[#111] p-6 rounded-[2rem] border border-white/5 text-left space-y-4 hover:border-white/10 transition-all group">
                  <History size={24} className="text-cyan-500 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="block text-xs font-black uppercase">Session Logs</span>
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{history.length} Records</span>
                  </div>
                </button>
                <button className="bg-[#111] p-6 rounded-[2rem] border border-white/5 text-left space-y-4 opacity-50 cursor-not-allowed">
                  <Package size={24} className="text-purple-500" />
                  <div>
                    <span className="block text-xs font-black uppercase">Database</span>
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Master List</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Tactical Stock Entry Screen - Improved Visuals */}
          {scannedItem && !labelView && (
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
              <div className="bg-[#111] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-cyan-600/20 to-transparent p-8 border-b border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em]">Verified Asset</span>
                      <h3 className="text-3xl font-black italic uppercase leading-tight mt-2">{scannedItem.name}</h3>
                      <div className="flex gap-2 mt-3">
                         <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-black uppercase tracking-widest text-slate-400">SKU: {scannedItem.sku}</span>
                      </div>
                    </div>
                    <div className="bg-cyan-500 text-black px-4 py-2 rounded-2xl font-black text-xs shadow-lg shadow-cyan-500/20">${scannedItem.price}</div>
                  </div>
                </div>

                <div className="p-8 space-y-10">
                  {/* Quantity Control - Tactical Design */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">
                      <Layers size={12} className="text-cyan-500" /> Batch Quantity
                    </label>
                    <div className="flex items-center justify-between bg-black rounded-[2.5rem] p-2 border border-white/5 shadow-inner">
                      <button onClick={()=>setQty(Math.max(1, qty-1))} className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all text-cyan-400 border border-white/5"><Minus/></button>
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black italic tracking-tighter tabular-nums text-white leading-none">{qty}</span>
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-1">Units</span>
                      </div>
                      <button onClick={()=>setQty(qty+1)} className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all text-cyan-400 border border-white/5"><Plus/></button>
                    </div>
                  </div>

                  {/* Expiry Control - Tactical Design */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">
                      <Calendar size={12} className="text-cyan-500" /> Quality Lifecycle
                    </label>
                    <div className="bg-black rounded-[2rem] p-6 border border-white/5 flex items-center justify-between shadow-inner group">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Expiry Date</span>
                          <input 
                            type="date" 
                            value={expiry} 
                            onChange={e=>setExpiry(e.target.value)} 
                            className="bg-transparent border-none outline-none text-white font-black uppercase text-lg w-full cursor-pointer"
                          />
                       </div>
                       <div className="w-12 h-12 bg-cyan-500/5 rounded-xl flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                          <ArrowRight size={18} className="text-cyan-500" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={commitStock} className="h-20 bg-cyan-600 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-cyan-900/40 hover:bg-cyan-500 active:scale-95 transition-all">
                  Commit To Ledger
                </button>
                <button onClick={()=>setScannedItem(null)} className="h-16 bg-white/5 rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] text-slate-600 border border-white/5">
                  Discard Scan
                </button>
              </div>
            </div>
          )}

          {/* History / Log View */}
          {view === 'history' && (
            <div className="space-y-3 animate-in fade-in duration-500">
              <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6 px-2">Local Activity Stream</h3>
              {history.map(item => (
                <div key={item.id} onClick={() => setLabelView(item)} className="bg-[#111] p-5 rounded-[2rem] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-cyan-500/50 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                      <span className="text-cyan-500 font-black text-xl">{item.qty}</span>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black uppercase leading-none">{item.product.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[7px] font-bold text-slate-600 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">ID: {item.batch}</span>
                        <span className="text-[7px] font-bold text-cyan-600 uppercase tracking-widest">{item.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-800 group-hover:text-cyan-500 transition-all" />
                </div>
              ))}
              {history.length === 0 && (
                <div className="py-20 text-center text-slate-700">
                  <p className="text-[10px] font-black uppercase tracking-widest">No assets logged in this session</p>
                </div>
              )}
            </div>
          )}

          {/* High-Fidelity Label View - Realistic Design */}
          {labelView && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <div className="bg-white rounded-[3.5rem] p-1 shadow-xl">
                <div className="bg-white rounded-[3rem] p-10 text-black border-4 border-dashed border-slate-200">
                  <div className="flex flex-col items-center text-center space-y-8">
                    {/* Realistic Barcode */}
                    <div className="w-full flex justify-center py-4 bg-slate-50 rounded-3xl">
                      <div className="flex items-end gap-[2px] h-20">
                        {[...Array(35)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-black" 
                            style={{ 
                              width: i % 4 === 0 ? '4px' : '1px', 
                              height: i % 7 === 0 ? '100%' : '80%',
                              opacity: i % 10 === 0 ? 0.3 : 1
                            }} 
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">{labelView.product.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase">Inventory Control Asset</p>
                    </div>

                    <div className="w-full flex justify-between items-center py-8 border-y border-slate-100 mt-4 px-2">
                      <div className="text-left space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Expiration</p>
                        <p className="text-sm font-black text-red-600">{labelView.expiry}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                         <QrCode size={48} className="text-slate-900" />
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Retail Price</p>
                        <p className="text-sm font-black text-cyan-600">${labelView.product.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between w-full text-[7px] font-black uppercase text-slate-300 tracking-[0.2em]">
                      <span>BATCH: {labelView.batch}</span>
                      <span>GEN BY NEXA-SOFT V3</span>
                      <span>LOC: WHSE-A1</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 h-20 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                  <Printer size={20}/> Print Asset Label
                </button>
                <button onClick={() => { setHistory(history.filter(h => h.id !== labelView.id)); setLabelView(null); setView('history'); }} className="w-20 h-20 bg-red-950/20 text-red-500 rounded-[2rem] border border-red-900/20 flex items-center justify-center active:scale-95 transition-all">
                   <Trash2 size={24} />
                </button>
              </div>
            </div>
          )}

        </main>

        {/* User Feedback Overlay */}
        {feedback && (
          <div className="fixed bottom-10 left-6 right-6 z-[1000] animate-in slide-in-from-bottom-10">
            <div className="bg-cyan-600 p-4 rounded-3xl flex items-center gap-3 shadow-[0_20px_50px_rgba(8,145,178,0.3)] border border-cyan-400">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.1em]">{feedback}</p>
            </div>
          </div>
        )}

        {/* Scanner Overlay */}
        {isScannerActive && (
          <div className="fixed inset-0 bg-black z-[1000] flex flex-col">
            <div id="scanner-region" className="flex-1 bg-black" />
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/5 rounded-[3rem] relative bg-cyan-500/5">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-500 rounded-tl-[2rem]" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-500 rounded-tr-[2rem]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-500 rounded-bl-[2rem]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-cyan-500 rounded-br-[2rem]" />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-cyan-500 shadow-[0_0_25px_cyan] animate-[scan_2.5s_ease-in-out_infinite]" />
              </div>
              <p className="mt-8 text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] animate-pulse">Scanning Surface...</p>
            </div>
            <div className="p-10 bg-black/90 backdrop-blur-2xl border-t border-white/10 flex justify-between items-center">
               <div className="space-y-1">
                <p className="text-white font-black text-sm uppercase tracking-widest italic">A.I. Vision Active</p>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Detecting Barcode / QR Symbology</p>
               </div>
               <button onClick={()=>setIsScannerActive(false)} className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all active:scale-90"><X/></button>
            </div>
          </div>
        )}

        {/* Guide Modal - Improved Design */}
        {showGuide && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[2000] flex items-end sm:items-center justify-center p-6">
            <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-[3.5rem] p-10 space-y-10 animate-in slide-in-from-bottom-12 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center"><HelpCircle size={16} className="text-cyan-500"/></div>
                  <h3 className="text-white font-black uppercase tracking-widest text-[10px]">Manual v3.0</h3>
                </div>
                <button onClick={()=>setShowGuide(false)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"><X size={18}/></button>
              </div>
              <div className="space-y-8">
                {[
                  { icon: <Barcode/>, t: "Asset Acquisition", d: "Engage the camera to identify physical items via optical scanning." },
                  { icon: <Layers/>, t: "Tactical Logging", d: "Adjust batch quantities and set quality control dates in the entry hub." },
                  { icon: <Printer/>, t: "Label Output", d: "Generate high-fidelity stickers for retail or warehouse placement." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 text-cyan-500 border border-white/5 shadow-inner">{step.icon}</div>
                    <div className="pt-1">
                      <p className="text-white font-black text-xs uppercase tracking-widest mb-1.5">{step.t}</p>
                      <p className="text-slate-500 text-[10px] leading-relaxed font-medium">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={()=>setShowGuide(false)} className="w-full h-16 bg-cyan-600 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-cyan-900/40">
                Acknowledge Protocol
              </button>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0.2; }
          50% { top: 100%; opacity: 1; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}