'use client'
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowLeft, 
  History, 
  Barcode,
  CheckCircle2,
  LayoutGrid,
  QrCode,
  Printer,
  X,
  Trash2,
  Search,
  ChevronRight,
  Package,
  Bell,
  ShieldAlert,
  Zap,
  LogOut,
  BookOpen,
  Info,
  Maximize2,
  Camera,
  Plus,
  Minus,
  Activity,
  Box,
  RefreshCw
} from 'lucide-react';

// External dependency for barcode scanning
const HTML5_QRCODE_SCRIPT = "https://unpkg.com/html5-qrcode";

const initialCatalogue = [
  { id: "PX-101", name: "Industrial Gasket", price: 45.00, category: "Hardware", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=100&q=80", batch_id: "BT-9920", supplier: "HeavyFlow Ltd", stock: 142, lastSync: "2h ago" },
  { id: "PX-102", name: "Hydraulic Fluid 5L", price: 89.50, category: "Chemicals", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=100&q=80", batch_id: "BT-8812", supplier: "ChemCo", stock: 24, lastSync: "10m ago" },
  { id: "PX-103", name: "Titanium Drill Bit", price: 12.99, category: "Tools", image: "https://images.unsplash.com/photo-1534394415125-5f0af0ee06a7?auto=format&fit=crop&w=100&q=80", batch_id: "BT-4451", supplier: "PrecisionTools", stock: 89, lastSync: "1d ago" },
  { id: "PX-104", name: "Safety Visor Pro", price: 24.50, category: "Safety", image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=100&q=80", batch_id: "BT-2210", supplier: "SecureWear", stock: 56, lastSync: "5h ago" },
  { id: "PX-105", name: "LED Work Light", price: 35.00, category: "Electrical", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=100&q=80", batch_id: "BT-3391", supplier: "VoltSupply", stock: 12, lastSync: "Just now" },
  { id: "PX-106", name: "Steel Toe Boots", price: 95.00, category: "Safety", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80", batch_id: "BT-1099", supplier: "SecureWear", stock: 33, lastSync: "3h ago" }
];

export default function App() {
  const [view, setView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('hub');
  const [catalogue, setCatalogue] = useState(initialCatalogue);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [generatedBarcode, setGeneratedBarcode] = useState(null);
  const [loginId, setLoginId] = useState('');
  const [passcode, setPasscode] = useState('');
  
  const scannerRef = useRef(null);

  // Auto-clear feedback
  useEffect(() => {
    if (feedback || error) {
      const timer = setTimeout(() => {
        setFeedback(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback, error]);

  // Load Scanning Library and Handle Scanner Lifecycle
  useEffect(() => {
    let html5QrCode;

    if (isScannerActive) {
      const script = document.createElement('script');
      script.src = HTML5_QRCODE_SCRIPT;
      script.onload = async () => {
        try {
          // @ts-ignore
          html5QrCode = new Html5Qrcode("scanner-region");
          const config = { fps: 10, qrbox: { width: 250, height: 250 } };
          
          await html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
              handleScanSuccess(decodedText, html5QrCode);
            },
            (errorMessage) => {
              // Ignore scan errors, they happen continuously until a match
            }
          );
        } catch (err) {
          setError("Camera Access Denied");
          setIsScannerActive(false);
        }
      };
      document.body.appendChild(script);
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [isScannerActive]);

  const handleScanSuccess = async (decodedText, scannerInstance) => {
    // Logic: Try to find product by ID or partial barcode match
    const found = catalogue.find(p => 
      decodedText.includes(p.id) || 
      p.id.toLowerCase() === decodedText.toLowerCase()
    );

    if (found) {
      if (scannerInstance) await scannerInstance.stop();
      setFeedback("Asset Identified");
      setSelectedProduct(found);
      setActiveTab('catalogue');
      setIsScannerActive(false);
    } else {
      // Show feedback but keep scanning
      setFeedback(`Unknown Code: ${decodedText.substring(0, 8)}...`);
    }
  };

  const filteredCatalogue = useMemo(() => {
    return catalogue.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, catalogue]);

  const updateStock = (id, delta) => {
    setCatalogue(prev => prev.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);
        if (selectedProduct?.id === id) {
          setSelectedProduct({ ...p, stock: newStock });
        }
        return { ...p, stock: newStock };
      }
      return p;
    }));
    setFeedback(`Stock Adjusted (${delta > 0 ? '+' : ''}${delta})`);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginId.trim() && passcode.trim()) {
      setView('main');
      setFeedback("Identity Verified");
    } else {
      setError("Authorization Failed");
    }
  };

  const handleLogout = () => {
    setView('login');
    setLoginId('');
    setPasscode('');
    setSelectedProduct(null);
    setIsScannerActive(false);
    setFeedback("Session Cleared");
  };

  const generateBarcodeAction = (product) => {
    setGeneratedBarcode(`BC-${product.id}-${product.batch_id}-${Date.now().toString().slice(-4)}`);
    setFeedback("Sync Token Primed");
  };

  const Logo = ({ size = "md" }) => (
    <div className={`flex items-center gap-2 ${size === 'lg' ? 'scale-125 mb-8' : ''}`}>
      <div className={`${size === 'lg' ? 'w-10 h-10' : 'w-7 h-7'} bg-[#2D9CDB] rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-[#2D9CDB]/40`}>
        <Activity size={size === 'lg' ? 24 : 16} className="text-white" />
      </div>
      <span className={`font-black tracking-tighter ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
        NEXA<span className="text-[#2D9CDB]">CORE</span><span className="text-[10px] ml-1 bg-white/10 px-1 rounded">PRO</span>
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex justify-center font-sans overflow-x-hidden selection:bg-[#2D9CDB]/30">
      <div className="w-full max-w-md bg-[#0D0F14] min-h-screen flex flex-col shadow-2xl relative overflow-hidden print:bg-white print:text-black">
        
        {/* LOGIN VIEW */}
        {view === 'login' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-700">
            <Logo size="lg" />
            <div className="w-full bg-[#1E2029] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D9CDB]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h1 className="text-3xl font-black mb-1">Nexus Node</h1>
              <p className="text-slate-400 text-sm mb-8 font-medium">Authentication required to sync</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Operator ID</label>
                  <input 
                    type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)}
                    placeholder="NC-0000"
                    className="w-full bg-[#13151A] border border-white/5 rounded-2xl py-4 px-6 focus:ring-2 ring-[#2D9CDB] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Secure Passcode</label>
                  <input 
                    type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)}
                    placeholder="••••••"
                    className="w-full bg-[#13151A] border border-white/5 rounded-2xl py-4 px-6 focus:ring-2 ring-[#2D9CDB] outline-none transition-all"
                  />
                </div>
                <button type="submit" className="w-full bg-[#2D9CDB] h-16 rounded-2xl font-black uppercase tracking-widest mt-6 active:scale-95 transition-transform shadow-lg shadow-[#2D9CDB]/20 flex items-center justify-center gap-2">
                  <RefreshCw size={18} /> Sync Account
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MAIN INTERFACE */}
        {view === 'main' && (
          <>
            <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-50 bg-[#0D0F14]/80 backdrop-blur-xl border-b border-white/5 print:hidden">
              <div className="flex items-center gap-3">
                {(activeTab !== 'hub' || selectedProduct) && (
                  <button onClick={() => { selectedProduct ? setSelectedProduct(null) : setActiveTab('hub'); }} className="w-8 h-8 flex items-center justify-center text-[#2D9CDB] hover:bg-[#2D9CDB]/10 rounded-full transition-colors">
                    <ArrowLeft size={24} strokeWidth={3}/>
                  </button>
                )}
                <Logo />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleLogout}
                  className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <LogOut size={20} />
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-[#2D9CDB] to-[#1E2029] rounded-xl flex items-center justify-center text-[10px] font-black border border-white/10">OP</div>
              </div>
            </header>

            <main className="flex-1 p-6 pb-28 overflow-y-auto">
              
              {/* HUB VIEW */}
              {activeTab === 'hub' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* HERO SCANNER CARD */}
                  <div className="relative group overflow-hidden rounded-[2.5rem]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#2D9CDB] to-[#56CCF2] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-[#1E2029] p-8 border border-white/5 overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                           <span className="text-[10px] font-black tracking-[0.2em] text-[#2D9CDB]">CORE LINK ACTIVE</span>
                        </div>
                        <h2 className="text-4xl font-black mb-4 leading-none tracking-tight">OPTIC<br/>SCANNER</h2>
                        <button onClick={() => setIsScannerActive(true)} className="bg-[#2D9CDB] text-white px-8 py-5 rounded-2xl font-black text-xs flex items-center gap-3 shadow-xl active:scale-95 transition-all hover:bg-[#35b1f9]">
                          <Barcode size={22}/> INITIALIZE LENS
                        </button>
                      </div>
                      <Box size={160} className="absolute -right-8 -bottom-8 text-white/5 -rotate-12 pointer-events-none" />
                    </div>
                  </div>

                  {/* QUICK STATS */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#1E2029] p-4 rounded-2xl border border-white/5 text-center">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Total Assets</p>
                      <p className="text-xl font-black">{catalogue.length}</p>
                    </div>
                    <div className="bg-[#1E2029] p-4 rounded-2xl border border-white/5 text-center">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Low Stock</p>
                      <p className="text-xl font-black text-orange-400">{catalogue.filter(p => p.stock < 20).length}</p>
                    </div>
                    <div className="bg-[#1E2029] p-4 rounded-2xl border border-white/5 text-center">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Out Sync</p>
                      <p className="text-xl font-black text-[#2D9CDB]">0</p>
                    </div>
                  </div>

                  {/* DOCUMENTATION DROPDOWN */}
                  <button onClick={() => setShowManual(!showManual)} className="w-full bg-[#242731] p-5 rounded-3xl border border-white/5 flex items-center justify-between group transition-all active:scale-95">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#2D9CDB]/10 rounded-2xl flex items-center justify-center text-[#2D9CDB]"><BookOpen size={24} /></div>
                      <div className="text-left">
                        <h3 className="font-bold text-sm">Operator Protocols</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Version 5.2.0-PRO</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className={`text-slate-600 transition-transform ${showManual ? 'rotate-90' : ''}`} />
                  </button>

                  {showManual && (
                    <div className="bg-[#13151A] rounded-3xl p-6 border border-white/5 space-y-4 animate-in slide-in-from-top-4 duration-300">
                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-lg bg-[#2D9CDB] text-black font-black text-xs flex items-center justify-center shrink-0">01</div>
                        <p className="text-xs text-slate-400 leading-relaxed">Aim the central HUD reticle at the asset identifier. Ensure lighting is sufficient for optical parsing.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-lg bg-[#2D9CDB] text-black font-black text-xs flex items-center justify-center shrink-0">02</div>
                        <p className="text-xs text-slate-400 leading-relaxed">Wait for the <span className="text-[#2D9CDB]">Sync Pulse</span> to confirm data retrieval from the central registry.</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setActiveTab('catalogue')} className="bg-[#242731] p-6 rounded-[2.5rem] border border-white/5 text-left active:scale-95 transition-all group relative overflow-hidden">
                      <LayoutGrid size={28} className="text-[#2D9CDB] mb-4 group-hover:scale-110 transition-transform"/>
                      <h3 className="font-bold text-sm">Asset Registry</h3>
                      <p className="text-[10px] text-slate-500 font-black uppercase mt-1 tracking-tighter">Inventory Access</p>
                    </button>
                    <button onClick={() => setActiveTab('history')} className="bg-[#242731] p-6 rounded-[2.5rem] border border-white/5 text-left active:scale-95 transition-all group">
                      <History size={28} className="text-purple-400 mb-4 group-hover:rotate-[-20deg] transition-transform"/>
                      <h3 className="font-bold text-sm">Sync Logs</h3>
                      <p className="text-[10px] text-slate-500 font-black uppercase mt-1 tracking-tighter">Delta History</p>
                    </button>
                  </div>
                </div>
              )}

              {/* CATALOGUE VIEW */}
              {activeTab === 'catalogue' && !selectedProduct && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                      type="text" placeholder="Search Asset ID or Name..."
                      value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#1E2029] border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-white focus:ring-2 ring-[#2D9CDB]/50 outline-none transition-all shadow-xl"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Registry Listing ({filteredCatalogue.length})</p>
                      <button className="text-[10px] font-black text-[#2D9CDB] uppercase">Filter</button>
                    </div>
                    {filteredCatalogue.map(product => (
                      <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-[#1E2029] p-5 rounded-3xl border border-white/5 flex items-center gap-5 hover:border-[#2D9CDB]/40 transition-all cursor-pointer group active:scale-[0.98]">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden shrink-0 relative group-hover:scale-105 transition-transform">
                          <img src={product.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-lg truncate leading-tight mb-1">{product.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] bg-[#0D0F14] text-[#2D9CDB] px-2 py-0.5 rounded-full font-black uppercase tracking-tight border border-white/5">{product.id}</span>
                            <span className={`text-[9px] font-bold ${product.stock < 20 ? 'text-orange-400' : 'text-slate-500'}`}>
                              Stock: {product.stock}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRODUCT DETAILS VIEW */}
              {selectedProduct && (
                <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-400">
                  <div className="bg-[#1E2029] rounded-[3rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                       <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${selectedProduct.stock < 20 ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'}`}>
                         {selectedProduct.stock < 20 ? 'Critical' : 'Stable'}
                       </div>
                    </div>

                    <div className="flex flex-col items-center text-center mb-8">
                      <div className="w-32 h-32 bg-white rounded-[2.5rem] overflow-hidden border-4 border-white/5 mb-6 shadow-2xl">
                        <img src={selectedProduct.image} className="w-full h-full object-cover" />
                      </div>
                      <h2 className="text-3xl font-black mb-1 leading-tight">{selectedProduct.name}</h2>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{selectedProduct.category} Unit</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-[#13151A] p-5 rounded-3xl border border-white/5">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Stock Level</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black">{selectedProduct.stock}</span>
                          <div className="flex gap-1">
                            <button onClick={() => updateStock(selectedProduct.id, -1)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 text-red-400 transition-colors"><Minus size={14}/></button>
                            <button onClick={() => updateStock(selectedProduct.id, 1)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 text-emerald-400 transition-colors"><Plus size={14}/></button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#13151A] p-5 rounded-3xl border border-white/5">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Unit Valuation</p>
                        <p className="text-2xl font-black text-[#2D9CDB]">${selectedProduct.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                       <div className="flex justify-between text-xs py-2 border-b border-white/5">
                         <span className="text-slate-500 font-bold uppercase tracking-widest">Asset Reference</span>
                         <span className="font-mono font-bold">{selectedProduct.id}</span>
                       </div>
                       <div className="flex justify-between text-xs py-2 border-b border-white/5">
                         <span className="text-slate-500 font-bold uppercase tracking-widest">Batch Origin</span>
                         <span className="font-mono font-bold text-[#2D9CDB]">{selectedProduct.batch_id}</span>
                       </div>
                       <div className="flex justify-between text-xs py-2 border-b border-white/5">
                         <span className="text-slate-500 font-bold uppercase tracking-widest">Provider</span>
                         <span className="font-bold">{selectedProduct.supplier}</span>
                       </div>
                       <div className="flex justify-between text-xs py-2">
                         <span className="text-slate-500 font-bold uppercase tracking-widest">Registry Sync</span>
                         <span className="font-bold">{selectedProduct.lastSync}</span>
                       </div>
                    </div>

                    <div className="p-8 bg-[#13151A] rounded-[2rem] border border-white/5 flex flex-col items-center justify-center print:bg-white min-h-[160px]">
                      {!generatedBarcode ? (
                        <button onClick={() => generateBarcodeAction(selectedProduct)} className="flex flex-col items-center gap-4 text-slate-500 hover:text-[#2D9CDB] transition-all group">
                          <QrCode size={48} className="group-hover:scale-110 transition-transform"/>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Issue Sync Token</span>
                        </button>
                      ) : (
                        <div className="w-full text-center space-y-6 animate-in zoom-in-95">
                          <div className="bg-white p-6 rounded-2xl inline-block shadow-2xl">
                            <div className="flex gap-1 h-16 mb-3">
                              {[...Array(32)].map((_, i) => (<div key={i} className="h-full bg-black" style={{ width: (i % 3 === 0) ? '3px' : '1.5px', opacity: Math.random() > 0.1 ? 1 : 0.3 }} />))}
                            </div>
                            <span className="text-[10px] font-mono text-black font-black tracking-[0.25em]">{generatedBarcode}</span>
                          </div>
                          <div className="flex gap-4 justify-center print:hidden">
                            <button onClick={() => window.print()} className="h-14 px-6 bg-[#2D9CDB] rounded-2xl flex items-center justify-center text-white font-black text-xs gap-2 shadow-lg shadow-[#2D9CDB]/30 active:scale-95 transition-all"><Printer size={18} /> PRINT LABELS</button>
                            <button onClick={() => setGeneratedBarcode(null)} className="w-14 h-14 bg-[#242731] rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors active:scale-95"><Trash2 size={20} /></button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LOGS VIEW */}
              {activeTab === 'history' && (
                <div className="py-24 text-center animate-in fade-in zoom-in-95">
                  <div className="w-20 h-20 bg-[#1E2029] rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/5 text-slate-700">
                    <History size={40} />
                  </div>
                  <h3 className="text-xl font-black mb-2">Logs Encrypted</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">System activity history is currently stored in cold storage.</p>
                </div>
              )}

            </main>

            {/* TAB BAR */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0F14]/90 backdrop-blur-2xl border-t border-white/5 px-10 py-5 flex justify-around items-center z-50 print:hidden max-w-md mx-auto">
              {[
                { id: 'catalogue', icon: Box, label: 'ASSETS' },
                { id: 'hub', icon: Zap, label: 'NEXUS' },
                { id: 'history', icon: History, label: 'LOGS' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSelectedProduct(null); }}
                  className={`flex flex-col items-center gap-1.5 transition-all relative ${activeTab === tab.id ? 'text-[#2D9CDB]' : 'text-slate-600'}`}
                >
                  <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                  <span className="text-[9px] font-black uppercase tracking-[0.15em]">{tab.label}</span>
                  {activeTab === tab.id && <div className="absolute -top-5 w-1 h-1 bg-[#2D9CDB] rounded-full shadow-[0_0_8px_#2D9CDB]"></div>}
                </button>
              ))}
            </nav>
          </>
        )}

        {/* HIGH-TECH HUD SCANNER OVERLAY */}
        {isScannerActive && (
          <div className="fixed inset-0 z-[200] bg-black flex flex-col p-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-ping absolute inset-0"></div>
                  <div className="w-3 h-3 rounded-full bg-red-500 relative"></div>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">LENS_SYNC_v2.1</h3>
                  <p className="text-[8px] font-mono text-white/40 tracking-widest uppercase">Targeting Algorithm Active</p>
                </div>
              </div>
              <button 
                onClick={()=>setIsScannerActive(false)} 
                className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-2xl border border-white/10 active:scale-90 transition-all hover:bg-white/20"
              >
                <X size={28}/>
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="relative aspect-square w-full max-w-[320px]">
                {/* HUD Framing Corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#2D9CDB] rounded-tl-[3rem] shadow-[-4px_-4px_15px_rgba(45,156,219,0.3)] z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#2D9CDB] rounded-tr-[3rem] shadow-[4px_-4px_15px_rgba(45,156,219,0.3)] z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#2D9CDB] rounded-bl-[3rem] shadow-[-4px_4px_15px_rgba(45,156,219,0.3)] z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#2D9CDB] rounded-br-[3rem] shadow-[4px_4px_15px_rgba(45,156,219,0.3)] z-20 pointer-events-none" />

                {/* Vertical Laser Pulse */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#2D9CDB] to-transparent shadow-[0_0_20px_#2D9CDB] animate-laser z-20 pointer-events-none" />
                
                {/* Simulated Lens View - NOW WITH REAL CAMERA REGION */}
                <div className="absolute inset-0 -z-10 bg-black rounded-[3rem] flex items-center justify-center overflow-hidden border border-white/10">
                   <div id="scanner-region" className="w-full h-full"></div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_95%)] pointer-events-none" />
                   <div className="absolute w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
                </div>

                {/* Floating HUD Labels */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none">
                   <span className="text-[8px] font-mono text-white/20 tracking-[1em] uppercase">Focus_Depth_0.88</span>
                </div>
              </div>

              <div className="mt-16 text-center space-y-6">
                 <div className="space-y-1">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Ready for Alignment</p>
                  <div className="h-1 w-32 bg-white/10 mx-auto rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#2D9CDB] animate-pulse"></div>
                  </div>
                </div>
                <p className="text-white/40 text-[9px] font-mono max-w-[200px] leading-relaxed">System will auto-redirect upon identification of asset reference.</p>
              </div>
            </div>

            {/* Bottom HUD Metadata Bar */}
            <div className="px-10 py-10 grid grid-cols-3 gap-8 border-t border-white/5 bg-black/60 backdrop-blur-3xl rounded-t-[3rem] -mx-8">
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">ISO</p>
                <p className="text-sm font-mono font-bold">AUTO</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">LAT</p>
                <p className="text-sm font-mono font-bold">51.5N</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">FPS</p>
                <p className="text-sm font-mono font-bold">60.0</p>
              </div>
            </div>
          </div>
        )}

        {/* FEEDBACK TOASTS */}
        {(feedback || error) && (
          <div className="fixed top-28 left-8 right-8 z-[300] animate-in slide-in-from-top-12 max-w-sm mx-auto">
            <div className={`${error ? 'bg-red-500 shadow-red-500/20' : 'bg-[#2D9CDB] shadow-[#2D9CDB]/20'} px-8 py-5 rounded-2xl shadow-2xl flex items-center justify-between border border-white/20 backdrop-blur-lg`}>
              <div className="flex items-center gap-4">
                {error ? <ShieldAlert size={20}/> : <CheckCircle2 size={20}/>}
                <span className="text-sm font-black uppercase tracking-tight">{error || feedback}</span>
              </div>
              <button onClick={() => {setFeedback(null); setError(null);}}><X size={16}/></button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes laser { 
          0% { top: 0%; opacity: 0; } 
          15% { opacity: 1; } 
          85% { opacity: 1; } 
          100% { top: 100%; opacity: 0; } 
        }
        .animate-laser { animation: laser 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
        
        /* Overriding html5-qrcode's default styling to match the UI */
        #scanner-region video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
        }
        #scanner-region {
            border: none !important;
        }
      `}</style>
    </div>
  );
}