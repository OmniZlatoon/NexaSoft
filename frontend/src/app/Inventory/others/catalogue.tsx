// import React, { useState, useEffect } from 'react';
// import { 
//   ArrowLeft, 
//   History, 
//   Barcode,
//   CheckCircle2,
//   Plus,
//   Minus,
//   LayoutGrid,
//   QrCode,
//   Printer,
//   X,
//   Trash2,
//   Calendar,
//   ChevronRight,
//   Package,
//   Bell,
//   Info,
//   ShieldAlert,
//   Zap,
//   BookOpen,
//   Lock,
//   User,
//   ExternalLink
// } from 'lucide-react';

// // --- Configuration & Integrated Catalog ---
// const APP_NAME = "NEXUS-V6";
// const catalogue = [
//   { id: 1, name: "Industrial Gasket", price: 45.00, category: "Hardware", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=100&q=80" },
//   { id: 2, name: "Hydraulic Fluid 5L", price: 89.50, category: "Chemicals", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=100&q=80" },
//   { id: 3, name: "Titanium Drill Bit", price: 12.99, category: "Tools", image: "https://images.unsplash.com/photo-1534394415125-5f0af0ee06a7?auto=format&fit=crop&w=100&q=80" },
//   { id: 4, name: "Safety Visor Pro", price: 24.50, category: "Safety", image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=100&q=80" },
//   { id: 5, name: "LED Work Light", price: 35.00, category: "Electrical", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=100&q=80" },
//   { id: 6, name: "Steel Toe Boots", price: 95.00, category: "Safety", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80" },
//   { id: 7, name: "Torque Wrench", price: 58.00, category: "Tools", image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=100&q=80" },
//   { id: 8, name: "Cleaning Solvent", price: 18.25, category: "Chemicals", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=100&q=80" }
// ];

// export default function App() {
//   const [view, setView] = useState('login'); 
//   const [scannedItem, setScannedItem] = useState(null);
//   const [isScannerActive, setIsScannerActive] = useState(false);
//   const [showManual, setShowManual] = useState(false);
//   const [feedback, setFeedback] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedEntry, setSelectedEntry] = useState(null);
  
//   const [qty, setQty] = useState(1);
//   const [expiry, setExpiry] = useState(new Date().toISOString().split('T')[0]);
//   const [history, setHistory] = useState([]);

//   // Login form state
//   const [loginId, setLoginId] = useState('');
//   const [passcode, setPasscode] = useState('');

//   // Auto-clear feedback
//   useEffect(() => {
//     if (feedback || error) {
//       const timer = setTimeout(() => {
//         setFeedback(null);
//         setError(null);
//       }, 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [feedback, error]);

//   // Scanner Logic
//   useEffect(() => {
//     if (isScannerActive) {
//       const script = document.createElement("script");
//       script.src = "https://unpkg.com/html5-qrcode";
//       script.onload = () => {
//         const scanner = new window.Html5Qrcode("scanner-region");
//         scanner.start(
//           { facingMode: "environment" },
//           { fps: 20, qrbox: 250 },
//           (text) => {
//             const product = catalogue.find(p => p.name.toLowerCase() === text.toLowerCase());
//             if (product) {
//               setScannedItem(product);
//               setIsScannerActive(false);
//               scanner.stop();
//             } else {
//               setError(`Item "${text}" not found in catalogue.`);
//             }
//           },
//           () => {}
//         ).catch(() => {
//           setError("Camera permission denied.");
//           setIsScannerActive(false);
//         });
//       };
//       document.body.appendChild(script);
//     }
//   }, [isScannerActive]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (loginId.trim() && passcode.trim()) {
//       setView('hub');
//       setFeedback("Authentication Successful");
//     } else {
//       setError("Please enter valid credentials");
//     }
//   };

//   const commitStock = () => {
//     const entry = {
//       id: Math.random().toString(36).substr(2, 9),
//       product: scannedItem,
//       qty,
//       expiry,
//       timestamp: new Date().toLocaleString(),
//       batchId: `B-${Math.floor(1000 + Math.random() * 9000)}`
//     };
//     setHistory([entry, ...history]);
//     setScannedItem(null);
//     setQty(1);
//     setFeedback("Inventory Sync Successful");
//   };

//   const goBack = () => {
//     if (view === 'details') setView('history');
//     else if (view === 'catalogue') setView('hub');
//     else if (scannedItem) setScannedItem(null);
//     else setView('hub');
//   };

//   // --- UI Components ---

//   const Logo = ({ size = "md" }) => (
//     <div className={`flex items-center gap-2 ${size === 'lg' ? 'scale-125 mb-8' : ''}`}>
//       <div className={`${size === 'lg' ? 'w-10 h-10' : 'w-6 h-6'} bg-[#2D9CDB] rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-[#2D9CDB]/40`}>
//         <Zap size={size === 'lg' ? 24 : 14} className="text-white fill-white" />
//       </div>
//       <span className={`font-black tracking-tighter ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
//         NEXA<span className="text-[#2D9CDB]">SOFT</span>
//       </span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#13151A] text-white flex justify-center font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] overflow-x-hidden">
//       <div className="w-full max-w-md bg-[#13151A] min-h-screen flex flex-col shadow-2xl relative overflow-hidden">
        
//         {/* VIEW: LOGIN */}
//         {view === 'login' && (
//           <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-700">
//             <Logo size="lg" />
            
//             <div className="w-full bg-[#1E2029] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
//               <div className="mb-8">
//                 <h1 className="text-3xl font-black mb-1">Welcome</h1>
//                 <p className="text-slate-400 text-sm">Enter your clerk credentials</p>
//               </div>

//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Clerk ID</label>
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                     <input 
//                       type="text" 
//                       value={loginId}
//                       onChange={(e) => setLoginId(e.target.value)}
//                       placeholder="NS-8840"
//                       className="w-full bg-[#13151A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 ring-[#2D9CDB] outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Passcode</label>
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                     <input 
//                       type="password" 
//                       value={passcode}
//                       onChange={(e) => setPasscode(e.target.value)}
//                       placeholder="••••••••"
//                       className="w-full bg-[#13151A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 ring-[#2D9CDB] outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 <button type="submit" className="w-full bg-[#2D9CDB] h-16 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-[#2D9CDB]/20 active:scale-95 transition-all mt-4">
//                   Authenticate
//                 </button>
//               </form>
//             </div>
//             <p className="mt-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">v18.5.2 Secure Cloud Node</p>
//           </div>
//         )}

//         {/* --- MAIN APP INTERFACE --- */}
//         {view !== 'login' && (
//           <>
//             <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-50 bg-[#13151A]/80 backdrop-blur-xl border-b border-white/5">
//               <div className="flex items-center gap-3">
//                 {(view !== 'hub' || scannedItem) && (
//                   <button onClick={goBack} className="w-8 h-8 flex items-center justify-center text-[#2D9CDB]">
//                     <ArrowLeft size={24} strokeWidth={3}/>
//                   </button>
//                 )}
//                 <Logo />
//               </div>
//               <div className="flex gap-4">
//                 <Bell size={22} className="text-slate-500" />
//                 <div className="w-8 h-8 bg-gradient-to-tr from-[#2D9CDB] to-[#56CCF2] rounded-full flex items-center justify-center text-[10px] font-black">JS</div>
//               </div>
//             </header>

//             <main className="flex-1 p-6 pb-24 overflow-y-auto">
              
//               {/* HUB VIEW */}
//               {view === 'hub' && !scannedItem && !isScannerActive && (
//                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
//                   {/* Action Card */}
//                   <div className="relative group">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-[#2D9CDB] to-[#56CCF2] rounded-[2rem] blur opacity-25"></div>
//                     <div className="relative bg-[#1E2029] rounded-[2rem] p-8 border border-white/5 overflow-hidden">
//                       <div className="relative z-10">
//                         <h2 className="text-3xl font-black mb-2 leading-tight">INVENTORY<br/>CONTROL</h2>
//                         <button 
//                           onClick={() => setIsScannerActive(true)}
//                           className="bg-[#2D9CDB] text-white px-6 py-4 rounded-xl font-bold text-xs flex items-center gap-3 shadow-lg active:scale-95 transition-all"
//                         >
//                           <Barcode size={18}/> Launch Scanner
//                         </button>
//                       </div>
//                       <Package size={140} className="absolute -right-6 -bottom-6 text-white/5 rotate-12" />
//                     </div>
//                   </div>

//                   {/* Manual Button */}
//                   <button 
//                     onClick={() => setShowManual(true)}
//                     className="w-full bg-[#242731] p-5 rounded-2xl border border-white/5 flex items-center justify-between group active:bg-[#2D9CDB]/10"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 bg-[#2D9CDB]/10 rounded-xl flex items-center justify-center text-[#2D9CDB]">
//                         <BookOpen size={20} />
//                       </div>
//                       <div className="text-left">
//                         <h3 className="font-bold text-sm">Operating Manual</h3>
//                         <p className="text-[10px] text-slate-500 font-medium">Read instructions & safety protocols</p>
//                       </div>
//                     </div>
//                     <ChevronRight size={18} className="text-slate-700" />
//                   </button>

//                   <div className="grid grid-cols-2 gap-4">
//                     <button onClick={() => setView('catalogue')} className="bg-[#242731] p-6 rounded-[2rem] border border-white/5 text-left active:scale-95 transition-all">
//                       <LayoutGrid size={24} className="text-emerald-400 mb-4"/>
//                       <h3 className="font-bold text-sm">Catalogue</h3>
//                       <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">8 Products</p>
//                     </button>
//                     <button onClick={() => setView('history')} className="bg-[#242731] p-6 rounded-[2rem] border border-white/5 text-left active:scale-95 transition-all">
//                       <History size={24} className="text-[#2D9CDB] mb-4"/>
//                       <h3 className="font-bold text-sm">Sync Log</h3>
//                       <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{history.length} Entries</p>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* SCANNER VIEW (Contained Window) */}
//               {isScannerActive && !scannedItem && (
//                 <div className="animate-in zoom-in-95 duration-300">
//                   <div className="bg-[#1E2029] rounded-[2rem] p-4 border border-white/5 shadow-2xl mb-6 overflow-hidden">
//                     <div className="flex items-center justify-between mb-4 px-2">
//                        <h3 className="text-xs font-black uppercase tracking-widest text-[#2D9CDB]">Lens Active</h3>
//                        <button onClick={()=>setIsScannerActive(false)} className="text-slate-500"><X size={20}/></button>
//                     </div>
                    
//                     <div className="relative aspect-square w-full bg-black rounded-2xl overflow-hidden border-2 border-white/5">
//                       <div id="scanner-region" className="w-full h-full" />
//                       <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
//                         <div className="w-48 h-48 border-2 border-[#2D9CDB]/50 rounded-2xl relative">
//                            <div className="absolute top-0 left-0 w-full h-1 bg-[#2D9CDB] shadow-[0_0_15px_#2D9CDB] animate-scan" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <button onClick={()=>setIsScannerActive(false)} className="bg-[#242731] h-14 rounded-xl font-bold text-xs uppercase text-slate-400">Cancel</button>
//                     <button className="bg-[#242731] h-14 rounded-xl font-bold text-xs uppercase text-[#2D9CDB] flex items-center justify-center gap-2"><Zap size={16}/> Flash</button>
//                   </div>
//                 </div>
//               )}

//               {/* PRODUCT DETAILS (After Scan) */}
//               {scannedItem && (
//                 <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-400">
//                   <div className="bg-[#1E2029] rounded-[2.5rem] p-8 border border-[#2D9CDB]/30 shadow-2xl">
//                     <div className="flex justify-between items-start mb-6">
//                       <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shadow-lg border border-white/10">
//                         <img src={scannedItem.image} alt={scannedItem.name} className="w-full h-full object-cover" />
//                       </div>
//                       <div className="bg-[#2D9CDB]/10 text-[#2D9CDB] px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
//                         Active Stock
//                       </div>
//                     </div>
//                     <div className="mb-8">
//                       <h2 className="text-3xl font-black mb-1">{scannedItem.name}</h2>
//                       <p className="text-2xl font-bold text-[#2D9CDB]">${scannedItem.price.toFixed(2)}</p>
//                     </div>
//                     <div className="space-y-4 pt-6 border-t border-white/5">
//                       <div className="bg-[#13151A] rounded-2xl p-4 border border-white/5 flex items-center justify-between">
//                         <button onClick={()=>setQty(Math.max(1, qty-1))} className="w-10 h-10 rounded-lg bg-[#242731] flex items-center justify-center"><Minus size={18}/></button>
//                         <div className="text-center">
//                           <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Qty</p>
//                           <span className="text-2xl font-bold tabular-nums">{qty}</span>
//                         </div>
//                         <button onClick={()=>setQty(qty+1)} className="w-10 h-10 rounded-lg bg-[#242731] flex items-center justify-center"><Plus size={18}/></button>
//                       </div>
//                       <input 
//                         type="date" 
//                         value={expiry} 
//                         onChange={e=>setExpiry(e.target.value)}
//                         className="w-full bg-[#13151A] border border-white/5 rounded-2xl py-4 px-6 text-white font-medium focus:ring-2 ring-[#2D9CDB] outline-none"
//                       />
//                     </div>
//                   </div>
//                   <button onClick={commitStock} className="w-full bg-[#2D9CDB] h-16 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-[#2D9CDB]/20">
//                     Sync to Inventory
//                   </button>
//                 </div>
//               )}

//               {/* CATALOGUE VIEW */}
//               {view === 'catalogue' && (
//                 <div className="space-y-4 animate-in fade-in">
//                   {catalogue.map(product => (
//                     <div key={product.id} className="bg-[#1E2029] p-3 rounded-2xl border border-white/5 flex items-center gap-4">
//                       <img src={product.image} className="w-14 h-14 rounded-xl object-cover bg-white" />
//                       <div className="flex-1">
//                         <h4 className="font-bold text-sm">{product.name}</h4>
//                         <p className="text-[10px] text-slate-500 uppercase font-bold">{product.category}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-black text-[#2D9CDB]">${product.price.toFixed(2)}</p>
//                         <button className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">Edit</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* HISTORY VIEW */}
//               {view === 'history' && (
//                 <div className="space-y-3 animate-in fade-in">
//                   {history.length === 0 ? (
//                     <div className="py-20 text-center opacity-20">
//                       <History size={48} className="mx-auto mb-4" />
//                       <p className="font-black text-xs uppercase tracking-widest">No entries yet</p>
//                     </div>
//                   ) : history.map(item => (
//                     <div key={item.id} className="bg-[#1E2029] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="w-10 h-10 bg-[#2D9CDB]/10 rounded-xl flex items-center justify-center font-black text-[#2D9CDB] text-xs">
//                           {item.qty}
//                         </div>
//                         <div className="text-left">
//                           <h4 className="font-bold text-sm leading-none mb-1">{item.product.name}</h4>
//                           <p className="text-[10px] text-slate-500 font-bold uppercase">{item.timestamp}</p>
//                         </div>
//                       </div>
//                       <ChevronRight size={18} className="text-slate-800" />
//                     </div>
//                   ))}
//                 </div>
//               )}

//             </main>

//             {/* TAB BAR */}
//             {!isScannerActive && (
//               <nav className="fixed bottom-0 left-0 right-0 h-24 bg-[#13151A]/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-8 z-40 max-w-md mx-auto">
//                 <button onClick={()=>setView('hub')} className={`flex flex-col items-center gap-1 ${view === 'hub' ? 'text-[#2D9CDB]' : 'text-slate-600'}`}>
//                   <LayoutGrid size={24} strokeWidth={view === 'hub' ? 3 : 2} />
//                   <span className="text-[9px] font-black uppercase tracking-tighter">Nexus</span>
//                 </button>
//                 <div 
//                   onClick={()=>setIsScannerActive(true)}
//                   className="w-16 h-16 bg-[#2D9CDB] rounded-2xl -mt-10 border-[6px] border-[#13151A] flex items-center justify-center shadow-xl shadow-[#2D9CDB]/30 active:scale-90 transition-transform cursor-pointer"
//                 >
//                   <Barcode size={28} className="text-white" />
//                 </div>
//                 <button onClick={()=>setView('history')} className={`flex flex-col items-center gap-1 ${view === 'history' ? 'text-[#2D9CDB]' : 'text-slate-600'}`}>
//                   <History size={24} strokeWidth={view === 'history' ? 3 : 2} />
//                   <span className="text-[9px] font-black uppercase tracking-tighter">History</span>
//                 </button>
//               </nav>
//             )}
//           </>
//         )}

//         {/* --- OPERATING MANUAL MODAL --- */}
//         {showManual && (
//           <div className="fixed inset-0 z-[200] flex items-end">
//             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setShowManual(false)} />
//             <div className="relative w-full bg-[#1E2029] rounded-t-[3rem] p-8 border-t border-white/10 animate-in slide-in-from-bottom-full duration-500">
//               <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 bg-[#2D9CDB] rounded-2xl flex items-center justify-center text-white">
//                   <BookOpen size={24} />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-black">Operating Manual</h2>
//                   <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Official Protocol v4.0</p>
//                 </div>
//               </div>
//               <div className="space-y-6 mb-10">
//                 {[
//                   { title: "Authentication", desc: "Use your Clerk ID to unlock inventory access." },
//                   { title: "Scanning", desc: "Align the product name label in the lens window." },
//                   { title: "Validation", desc: "System checks registry automatically. Reject non-listed items." },
//                   { title: "Synchronization", desc: "Enter quantity and expiry before committing to cloud." }
//                 ].map((step, i) => (
//                   <div key={i} className="flex gap-4">
//                     <div className="text-[#2D9CDB] font-black text-sm">0{i+1}</div>
//                     <div>
//                       <h4 className="font-bold text-sm mb-1">{step.title}</h4>
//                       <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button 
//                 onClick={()=>setShowManual(false)}
//                 className="w-full h-14 bg-[#242731] rounded-2xl font-bold text-sm uppercase tracking-widest active:scale-95 transition-all"
//               >
//                 Close Manual
//               </button>
//             </div>
//           </div>
//         )}

//         {/* FEEDBACK TOASTS */}
//         {(feedback || error) && (
//           <div className="fixed top-12 left-6 right-6 z-[300] animate-in slide-in-from-top-10">
//             <div className={`${error ? 'bg-red-500' : 'bg-[#2D9CDB]'} px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20`}>
//               {error ? <ShieldAlert size={20}/> : <CheckCircle2 size={20}/>}
//               <span className="text-sm font-bold tracking-tight">{error || feedback}</span>
//             </div>
//           </div>
//         )}

//       </div>

//       <style>{`
//         @keyframes scan {
//           0% { top: 0%; opacity: 0; }
//           20% { opacity: 1; }
//           80% { opacity: 1; }
//           100% { top: 100%; opacity: 0; }
//         }
//         .animate-scan {
//           animation: scan 2.5s linear infinite;
//         }
//         input[type="date"]::-webkit-calendar-picker-indicator {
//           filter: invert(0.8);
//           position: absolute;
//           right: 15px;
//         }
//         ::-webkit-scrollbar { display: none; }
//       `}</style>
//     </div>
//   );
// }