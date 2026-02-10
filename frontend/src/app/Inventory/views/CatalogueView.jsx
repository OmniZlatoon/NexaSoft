import { Search, ChevronRight } from 'lucide-react';

export const CatalogueView = ({ searchQuery, setSearchQuery, filteredCatalogue, setSelectedProduct }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="relative group">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#2D9CDB] transition-colors" size={20} />
      <input 
        type="text" placeholder="Search ID, Name or Batch..."
        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-[#1E2029] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white focus:ring-2 ring-[#2D9CDB]/50 outline-none transition-all shadow-lg"
      />
    </div>
    <div className="grid grid-cols-1 gap-3">
      {filteredCatalogue.map(product => (
        <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-[#1E2029] p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-[#2D9CDB]/30 transition-all cursor-pointer group active:scale-[0.98]">
          <div className="w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0"><img src={product.image} className="w-full h-full object-cover" /></div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base truncate">{product.name}</h4>
            <div className="flex gap-2 mt-1">
              <span className="text-[9px] bg-[#13151A] text-slate-400 px-2 py-0.5 rounded font-black uppercase tracking-tight">ID: {product.id}</span>
              <span className="text-[9px] bg-[#2D9CDB]/10 text-[#2D9CDB] px-2 py-0.5 rounded font-black uppercase tracking-tight">Batch: {product.batch_id}</span>
            </div>
          </div>
          <ChevronRight className="text-slate-700 group-hover:text-[#2D9CDB]" size={18} />
        </div>
      ))}
    </div>
  </div>
);