import { Zap } from 'lucide-react';

export const Logo = ({ size = "md" }) => (
  <div className={`flex items-center gap-2 ${size === 'lg' ? 'scale-125 mb-8' : ''}`}>
    <div className={`${size === 'lg' ? 'w-10 h-10' : 'w-6 h-6'} bg-[#2D9CDB] rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-[#2D9CDB]/40`}>
      <Zap size={size === 'lg' ? 24 : 14} className="text-white fill-white" />
    </div>
    <span className={`font-black tracking-tighter ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
      NEXA<span className="text-[#2D9CDB]">SOFT</span>
    </span>
  </div>
);