// import React, { useState, useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
// import { getFirestore, collection, addDoc, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
// import { 
//   Package, 
//   ArrowLeft, 
//   History, 
//   Barcode,
//   CheckCircle2,
//   Tag,
//   Trash2,
//   ChevronRight,
//   Plus,
//   Minus,
//   LayoutGrid,
//   CloudUpload,
//   Search,
//   Lock,
//   User as UserIcon,
//   Key
// } from 'lucide-react';

// // --- Firebase Configuration ---
// const firebaseConfig = JSON.parse(__firebase_config);
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'nexa-stock-v25';

// // --- Types ---
// interface Product {
//   name: string;
//   sku: string;
//   price: number;
//   category: string;
// }

// interface ScannedEntry {
//   id: string;
//   product: Product;
//   quantity: number;
//   expiry: string;
//   timestamp: string;
//   batchId: string;
// }

// type ViewState = 'login' | 'staff-hub' | 'stock-receiving' | 'live-session' | 'entry-detail' | 'catalogue';

// export default function App() {
//   const [user, setUser] = useState<FirebaseUser | null>(null);
//   const [view, setView] = useState<ViewState>('login');
//   const [scannedItem, setScannedItem] = useState<Product | null>(null);
//   const [isScanning, setIsScanning] = useState<boolean>(false);
//   const [feedback, setFeedback] = useState<string | null>(null);
//   const [isSyncing, setIsSyncing] = useState<boolean>(false);
  
//   // Auth State (Returning to original Employee ID / Access Key)
//   const [employeeId, setEmployeeId] = useState('');
//   const [accessKey, setAccessKey] = useState('');

//   // Form States
//   const [qtyInput, setQtyInput] = useState<number>(1);
//   const [expiryInput, setExpiryInput] = useState<string>("");

//   // Session State
//   const [sessionEntries, setSessionEntries] = useState<ScannedEntry[]>([]);
//   const [selectedEntry, setSelectedEntry] = useState<ScannedEntry | null>(null);

//   // --- Auth Logic (Rule 3) ---
//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         await signInAnonymously(auth);
//       } catch (err) {
//         console.error("Auth failed", err);
//       }
//     };
//     initAuth();
//     const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
//     return () => unsubscribe();
//   }, []);

//   // Feedback Auto-clear
//   useEffect(() => {
//     if (feedback) {
//       const timer = setTimeout(() => setFeedback(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [feedback]);

//   const masterCatalogue: Product[] = [
//     { name: "Cereal Box XL", price: 5.99, sku: "93120045", category: "Dry Goods" },
//     { name: "Organic Milk 1L", price: 2.50, sku: "88231011", category: "Dairy" },
//     { name: "Tomato Paste", price: 1.20, sku: "44201992", category: "Canned" },
//     { name: "Whole Grain Bread", price: 3.10, sku: "55201110", category: "Bakery" }
//   ];

//   const handleLogin = () => {
//     // Reverting to Employee ID / Access Key logic: admin / 1234
//     if (employeeId === 'admin' && accessKey === '1234') {
//       setView('staff-hub');
//       setFeedback("Identity Verified");
//     } else {
//       setFeedback("Invalid Access Credentials");
//     }
//   };

//   const simulateScan = (code: string) => {
//     setIsScanning(true);
//     setTimeout(() => {
//       const item = masterCatalogue.find(p => p.sku === code);
//       if (item) {
//         setScannedItem(item);
//         setQtyInput(1);
//         setExpiryInput(new Date().toISOString().split('T')[0]);
//       } else {
//         setFeedback("SKU not in master list");
//       }
//       setIsScanning(false);
//     }, 800);
//   };

//   const handleConfirmReceiving = () => {
//     if (!scannedItem) return;
//     const newEntry: ScannedEntry = {
//       id: Math.random().toString(36).substr(2, 9),
//       product: scannedItem,
//       quantity: qtyInput,
//       expiry: expiryInput,
//       timestamp: new Date().toISOString(),
//       batchId: `BCH-${Math.floor(Math.random() * 90000) + 10000}`
//     };
//     setSessionEntries([newEntry, ...sessionEntries]);
//     setFeedback("Entry recorded locally");
//     setScannedItem(null);
//   };

//   const syncSessionToDatabase = async () => {
//     if (!user || sessionEntries.length === 0) return;
//     setIsSyncing(true);
    
//     try {
//       const sessionRef = collection(db, 'artifacts', appId, 'public', 'data', 'inventory_sessions');
//       await addDoc(sessionRef, {
//         clerkId: employeeId,
//         timestamp: new Date().toISOString(),
//         items: sessionEntries,
//         totalItems: sessionEntries.reduce((acc, curr) => acc + curr.quantity, 0),
//         status: "COMPLETED"
//       });
      
//       setSessionEntries([]);
//       setFeedback("Database Synced Successfully");
//       setView('staff-hub');
//     } catch (error) {
//       console.error(error);
//       setFeedback("Sync Error: Cloud Unavailable");
//     } finally {
//       setIsSyncing(false);
//     }
//   };

//   // --- UI Components ---
//   const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//     <div className="min-h-screen bg-[#13151A] text-white font-sans selection:bg-[#2D9CDB]/30">
//       <div className="max-w-md mx-auto min-h-screen flex flex-col relative overflow-hidden pb-10 shadow-2xl bg-[#1E2029]">
//         {feedback && (
//           <div className="fixed top-6 left-6 right-6 bg-[#2D9CDB] p-4 rounded-2xl z-[100] flex items-center justify-center shadow-2xl animate-bounce">
//             <CheckCircle2 size={18} className="mr-2" />
//             <span className="font-bold text-sm tracking-tight uppercase">{feedback}</span>
//           </div>
//         )}
//         <header className="px-6 py-8 flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className="w-5 h-5 bg-[#2D9CDB] rounded-md rotate-45" />
//             <h1 className="text-xl font-black tracking-tighter uppercase">NEXA<span className="text-[#2D9CDB]">STOCK</span></h1>
//           </div>
//           {view !== 'login' && (
//             <div className="flex items-center space-x-2 bg-[#242731] px-3 py-1.5 rounded-full border border-[#3E424D]">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//               <span className="text-[10px] font-black text-[#6B6D76] uppercase tracking-widest">{employeeId}</span>
//             </div>
//           )}
//         </header>
//         <main className="flex-1 px-6">{children}</main>
//       </div>
//     </div>
//   );

//   const BarcodeWidget: React.FC<{ sku: string; batch: string }> = ({ sku, batch }) => (
//     <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center space-y-2">
//       <div className="flex space-x-0.5 h-12 w-full overflow-hidden">
//         {Array.from({ length: 40 }).map((_, i) => (
//           <div key={i} className="h-full bg-black" style={{ width: `${Math.random() * 3 + 1}px`, opacity: Math.random() > 0.1 ? 1 : 0 }} />
//         ))}
//       </div>
//       <div className="flex justify-between w-full text-[8px] font-mono text-black font-bold uppercase">
//         <span>SKU:{sku}</span>
//         <span>ID:{batch}</span>
//       </div>
//     </div>
//   );

//   // --- Views ---

//   if (view === 'login') {
//     return (
//       <Layout>
//         <div className="mt-16 space-y-2 mb-10">
//           <h2 className="text-4xl font-black leading-tight uppercase">STAFF<br/>ACCESS<span className="text-[#2D9CDB]">.</span></h2>
//           <p className="text-[#6B6D76] font-bold text-xs tracking-[0.2em] uppercase">Inventory Execution Module</p>
//         </div>
//         <div className="space-y-4">
//           <div className="relative group">
//             <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#565963] group-focus-within:text-[#2D9CDB] transition-colors">
//                <UserIcon size={18} />
//             </div>
//             <input 
//               type="text" placeholder="Employee ID" value={employeeId} onChange={e => setEmployeeId(e.target.value)}
//               className="w-full h-[68px] bg-[#242731] rounded-2xl pl-14 pr-6 border border-transparent focus:border-[#2D9CDB] outline-none transition-all placeholder:text-[#565963] font-bold"
//             />
//           </div>
//           <div className="relative group">
//              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#565963] group-focus-within:text-[#2D9CDB] transition-colors">
//                <Key size={18} />
//             </div>
//             <input 
//               type="password" placeholder="Access Key" value={accessKey} onChange={e => setAccessKey(e.target.value)}
//               className="w-full h-[68px] bg-[#242731] rounded-2xl pl-14 pr-6 border border-transparent focus:border-[#2D9CDB] outline-none transition-all placeholder:text-[#565963] font-bold"
//             />
//           </div>
//           <button 
//             onClick={handleLogin}
//             className="w-full h-[68px] bg-[#2D9CDB] rounded-2xl font-black tracking-[0.2em] text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#2D9CDB]/20"
//           >
//             <Lock size={18} />
//             <span>AUTHENTICATE</span>
//           </button>
//           <p className="text-center text-[10px] text-[#565963] uppercase font-bold tracking-[0.3em] pt-4">Internal Use Only • Encrypted</p>
//         </div>
//       </Layout>
//     );
//   }

//   if (view === 'staff-hub') {
//     return (
//       <Layout>
//         <div 
//           onClick={() => setView('stock-receiving')}
//           className="bg-gradient-to-br from-[#2D9CDB] to-[#1a6a97] p-8 rounded-[2.5rem] mb-6 cursor-pointer hover:scale-[1.01] transition-all shadow-xl shadow-blue-900/10"
//         >
//           <div className="flex justify-between items-start mb-8">
//             <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/10">
//               <Barcode size={24} />
//             </div>
//             <Package size={24} className="opacity-30" />
//           </div>
//           <h3 className="text-3xl font-black uppercase leading-none mb-2">Stock<br/>Arrivals</h3>
//           <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Input new quantities & expiry</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div onClick={() => setView('live-session')} className="bg-[#242731] border border-[#3E424D] p-6 rounded-[2rem] space-y-4 cursor-pointer hover:bg-[#2D3139]">
//             <div className="flex justify-between items-center">
//               <History size={20} className="text-[#2D9CDB]" />
//               <span className="text-[10px] font-black bg-[#2D9CDB]/10 text-[#2D9CDB] px-2 py-0.5 rounded-md">{sessionEntries.length}</span>
//             </div>
//             <span className="block text-[10px] font-black tracking-widest uppercase text-[#6B6D76]">Local Buffer</span>
//           </div>
//           <div onClick={() => setView('catalogue')} className="bg-[#242731] border border-[#3E424D] p-6 rounded-[2rem] space-y-4 cursor-pointer hover:bg-[#2D3139]">
//             <LayoutGrid size={20} className="text-[#F2994A]" />
//             <span className="block text-[10px] font-black tracking-widest uppercase text-[#6B6D76]">Catalogue</span>
//           </div>
//         </div>

//         {sessionEntries.length > 0 && (
//           <button 
//             onClick={syncSessionToDatabase}
//             disabled={isSyncing}
//             className="mt-6 w-full h-[72px] bg-white text-black rounded-[2rem] flex items-center justify-center space-x-3 font-black uppercase tracking-widest disabled:opacity-50"
//           >
//             {isSyncing ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" /> : <CloudUpload size={20} />}
//             <span>{isSyncing ? 'Synchronizing...' : 'Finalize & Sync'}</span>
//           </button>
//         )}

//         <button 
//           onClick={() => setView('login')} 
//           className="mt-8 mx-auto flex items-center gap-2 text-[#565963] font-black text-[10px] uppercase tracking-[0.3em]"
//         >
//           <ArrowLeft size={12} />
//           End Session
//         </button>
//       </Layout>
//     );
//   }

//   if (view === 'stock-receiving') {
//     return (
//       <Layout>
//         <div className="flex items-center justify-between mb-8">
//           <button onClick={() => setView('staff-hub')} className="p-2 -ml-2 text-[#6B6D76]"><ArrowLeft size={24} /></button>
//           <span className="text-xs font-black tracking-[0.3em] uppercase text-[#6B6D76]">Receiving</span>
//           <div className="w-10" />
//         </div>

//         {!scannedItem ? (
//           <div className="space-y-6">
//             <div className="aspect-square bg-black rounded-[3rem] border-4 border-[#242731] relative overflow-hidden flex items-center justify-center">
//                <div className="text-center">
//                   <div className={`p-6 rounded-full border-2 border-dashed border-[#2D9CDB]/30 mb-4 ${isScanning ? 'animate-pulse' : ''}`}>
//                     <Barcode size={48} className="text-[#2D9CDB]/40" />
//                   </div>
//                   <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#6B6D76]">Focus Barcode</p>
//                </div>
//                {isScanning && <div className="absolute inset-0 bg-[#2D9CDB]/5 animate-pulse border-y-2 border-[#2D9CDB]/20" />}
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//                <button onClick={() => simulateScan("93120045")} className="h-[64px] bg-[#242731] rounded-2xl text-[10px] font-black uppercase border border-[#3E424D] active:border-[#2D9CDB] transition-all">Mock: Cereal</button>
//                <button onClick={() => simulateScan("88231011")} className="h-[64px] bg-[#242731] rounded-2xl text-[10px] font-black uppercase border border-[#3E424D] active:border-[#2D9CDB] transition-all">Mock: Milk</button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//              <div className="bg-[#242731] p-6 rounded-[2rem] border-l-4 border-[#2D9CDB]">
//                 <p className="text-[#2D9CDB] text-[10px] font-black uppercase tracking-widest mb-1">Validated Product</p>
//                 <h4 className="text-2xl font-black uppercase mb-1 leading-tight">{scannedItem.name}</h4>
//                 <p className="text-[#6B6D76] text-xs font-mono">SKU: {scannedItem.sku}</p>
//              </div>
//              <div className="bg-[#242731] p-5 rounded-2xl border border-[#3E424D]">
//                 <label className="block text-[10px] font-black text-[#6B6D76] uppercase mb-4 text-center tracking-widest">Entry Quantity</label>
//                 <div className="flex items-center justify-between">
//                    <button onClick={() => setQtyInput(Math.max(1, qtyInput - 1))} className="w-14 h-14 bg-[#13151A] rounded-xl border border-[#3E424D] flex items-center justify-center"><Minus size={18}/></button>
//                    <span className="text-4xl font-black">{qtyInput}</span>
//                    <button onClick={() => setQtyInput(qtyInput + 1)} className="w-14 h-14 bg-[#2D9CDB] text-white rounded-xl flex items-center justify-center"><Plus size={18}/></button>
//                 </div>
//              </div>
//              <div className="bg-[#242731] p-5 rounded-2xl border border-[#3E424D]">
//                 <label className="block text-[10px] font-black text-[#6B6D76] uppercase mb-2 tracking-widest">Expiry Date</label>
//                 <input type="date" value={expiryInput} onChange={e => setExpiryInput(e.target.value)} className="w-full bg-transparent text-xl font-bold text-white outline-none" />
//              </div>
//              <div className="flex gap-4 pt-2">
//                <button onClick={() => setScannedItem(null)} className="flex-1 h-[68px] bg-[#242731] text-[#6B6D76] rounded-2xl font-black uppercase text-xs tracking-widest">Cancel</button>
//                <button onClick={handleConfirmReceiving} className="flex-[2] h-[68px] bg-[#2D9CDB] text-white rounded-2xl font-black tracking-widest uppercase shadow-lg shadow-[#2D9CDB]/20">Confirm Goods</button>
//              </div>
//           </div>
//         )}
//       </Layout>
//     );
//   }

//   if (view === 'live-session') {
//     return (
//       <Layout>
//         <div className="flex items-center justify-between mb-8">
//           <button onClick={() => setView('staff-hub')} className="p-2 -ml-2 text-[#6B6D76]"><ArrowLeft size={24} /></button>
//           <span className="text-xs font-black tracking-[0.3em] uppercase text-[#6B6D76]">Local Buffer</span>
//           <div className="w-10" />
//         </div>
//         <div className="space-y-3">
//           {sessionEntries.map(entry => (
//             <div key={entry.id} onClick={() => { setSelectedEntry(entry); setView('entry-detail'); }} className="bg-[#242731] p-5 rounded-[2rem] border border-[#3E424D] flex items-center justify-between active:scale-[0.98] transition-all">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-[#13151A] rounded-xl flex items-center justify-center border border-[#3E424D]"><span className="text-[#2D9CDB] text-lg font-black">{entry.quantity}</span></div>
//                 <div><h5 className="font-black text-sm uppercase">{entry.product.name}</h5><p className="text-[10px] text-[#6B6D76] font-mono tracking-tighter">{entry.batchId}</p></div>
//               </div>
//               <ChevronRight size={16} className="text-[#6B6D76]" />
//             </div>
//           ))}
//           {sessionEntries.length === 0 && (
//             <div className="text-center py-20 opacity-20">
//                <History size={64} className="mx-auto mb-4" />
//                <p className="text-xs font-black uppercase tracking-widest">No Buffer Data</p>
//             </div>
//           )}
//         </div>
//       </Layout>
//     );
//   }

//   if (view === 'entry-detail' && selectedEntry) {
//     return (
//       <Layout>
//         <div className="flex items-center justify-between mb-8">
//           <button onClick={() => setView('live-session')} className="p-2 -ml-2 text-[#6B6D76]"><ArrowLeft size={24} /></button>
//           <span className="text-xs font-black tracking-[0.3em] uppercase text-[#6B6D76]">Validation</span>
//           <div className="w-10" />
//         </div>
//         <div className="space-y-6">
//            <div className="bg-[#242731] p-6 rounded-[2.5rem] border border-[#3E424D]">
//               <h4 className="text-2xl font-black uppercase mb-4 leading-tight">{selectedEntry.product.name}</h4>
//               <div className="space-y-3">
//                  <div className="flex justify-between text-[10px] font-black uppercase text-[#6B6D76] tracking-widest"><span>Batch ID</span><span className="text-white font-mono">{selectedEntry.batchId}</span></div>
//                  <div className="flex justify-between text-[10px] font-black uppercase text-[#6B6D76] tracking-widest"><span>Expiry</span><span className="text-white">{selectedEntry.expiry}</span></div>
//                  <div className="flex justify-between text-[10px] font-black uppercase text-[#6B6D76] tracking-widest"><span>Logged</span><span className="text-white">{new Date(selectedEntry.timestamp).toLocaleTimeString()}</span></div>
//               </div>
//            </div>
//            <div className="bg-[#242731] p-6 rounded-[2.5rem] border border-[#3E424D]">
//               <span className="block text-[10px] font-black uppercase text-[#6B6D76] mb-4 text-center tracking-widest">Generated Label</span>
//               <BarcodeWidget sku={selectedEntry.product.sku} batch={selectedEntry.batchId} />
//            </div>
//            <button onClick={() => setView('live-session')} className="w-full h-16 bg-[#242731] border border-[#3E424D] rounded-2xl font-black uppercase tracking-widest text-xs">Return to Buffer</button>
//         </div>
//       </Layout>
//     );
//   }

//   if (view === 'catalogue') {
//     return (
//       <Layout>
//         <div className="flex items-center justify-between mb-8">
//           <button onClick={() => setView('staff-hub')} className="p-2 -ml-2 text-[#6B6D76]"><ArrowLeft size={24} /></button>
//           <span className="text-xs font-black tracking-[0.3em] uppercase text-[#6B6D76]">Catalogue</span>
//           <div className="w-10" />
//         </div>
//         <div className="bg-[#242731] rounded-2xl px-5 flex items-center mb-6 border border-[#3E424D] group focus-within:border-[#2D9CDB]">
//            <Search size={18} className="text-[#6B6D76] group-focus-within:text-[#2D9CDB]" />
//            <input type="text" placeholder="Search product library..." className="w-full h-14 bg-transparent px-3 outline-none text-xs font-bold" />
//         </div>
//         <div className="space-y-3">
//           {masterCatalogue.map(product => (
//             <div key={product.sku} className="bg-[#242731] p-5 rounded-[2rem] border border-[#3E424D] flex items-center justify-between">
//               <div>
//                 <h5 className="font-black text-sm uppercase">{product.name}</h5>
//                 <p className="text-[10px] text-[#2D9CDB] font-black uppercase tracking-widest">{product.category}</p>
//               </div>
//               <div className="text-right">
//                 <span className="text-sm font-black text-white">${product.price.toFixed(2)}</span>
//                 <p className="text-[9px] font-mono text-[#6B6D76]">{product.sku}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Layout>
//     );
//   }

//   return null;
// }