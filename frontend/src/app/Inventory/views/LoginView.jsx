"use client";
import { Logo } from '../components/Logo';

export const LoginView = ({ onLogin, loginId, setLoginId, passcode, setPasscode }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-700">
    <Logo size="lg" />
    <div className="w-full bg-[#1E2029] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
      <h1 className="text-3xl font-black mb-1">Staff Portal</h1>
      <p className="text-slate-400 text-sm mb-8">Enter credentials to begin</p>
      <form onSubmit={onLogin} className="space-y-4">
        <input 
          type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)}
          placeholder="Employee ID"
          className="w-full bg-[#13151A] border border-white/5 rounded-2xl py-4 px-6 focus:ring-2 ring-[#2D9CDB] outline-none"
        />
        <input 
          type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          className="w-full bg-[#13151A] border border-white/5 rounded-2xl py-4 px-6 focus:ring-2 ring-[#2D9CDB] outline-none"
        />
        <button type="submit" className="w-full bg-[#2D9CDB] h-16 rounded-2xl font-black uppercase tracking-widest mt-4 active:scale-95 transition-transform shadow-lg shadow-[#2D9CDB]/20">Authorize</button>
      </form>
    </div>
  </div>
);