"use client";
import { Barcode, BookOpen, ChevronRight, LayoutGrid, History, Package, Zap } from 'lucide-react';

export const HubView = ({ setIsScannerActive, setActiveTab }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#2D9CDB] to-[#56CCF2] rounded-[2rem] blur opacity-25"></div>
      <div className="relative bg-[#1E2029] rounded-[2rem] p-8 border border-white/5 overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 leading-tight">NODE<br/>TERMINAL</h2>
          <button onClick={() => setIsScannerActive(true)} className="bg-[#2D9CDB] text-white px-6 py-4 rounded-xl font-bold text-xs flex items-center gap-3 shadow-lg active:scale-95 transition-all">
            <Barcode size={18}/> Scan Asset
          </button>
        </div>
        <Package size={140} className="absolute -right-6 -bottom-6 text-white/5 rotate-12" />
      </div>
    </div>

    <button className="w-full bg-[#242731] p-5 rounded-2xl border border-white/5 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#2D9CDB]/10 rounded-xl flex items-center justify-center text-[#2D9CDB]"><BookOpen size={20} /></div>
        <div className="text-left">
          <h3 className="font-bold text-sm">Operating Manual</h3>
          <p className="text-[10px] text-slate-500 font-medium tracking-wide">Standard Protocol v4.0</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-700" />
    </button>

    <div className="grid grid-cols-2 gap-4">
      <button onClick={() => setActiveTab('catalogue')} className="bg-[#242731] p-6 rounded-[2rem] border border-white/5 text-left active:scale-95 transition-all">
        <LayoutGrid size={24} className="text-emerald-400 mb-4"/>
        <h3 className="font-bold text-sm">Catalogue</h3>
        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Registry</p>
      </button>
      <button onClick={() => setActiveTab('history')} className="bg-[#242731] p-6 rounded-[2rem] border border-white/5 text-left active:scale-95 transition-all">
        <History size={24} className="text-[#2D9CDB] mb-4"/>
        <h3 className="font-bold text-sm">Sync Log</h3>
        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Activity</p>
      </button>
    </div>
  </div>
);