'use client'
import React, { useState } from 'react';

const Registration = () => {
  const [view, setView] = useState('login');
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("General-Manager");
  const [showPass, setShowPass] = useState(false);

  // Navigation Handlers
  const handleToggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
    setStep(1);
  };

  const handleNextStep = () => setStep(2);
  const handlePrevStep = () => setStep(1);

  // Reusable Role Selection Component
  const RoleSelector = () => (
    <div className="space-y-[10px]">
      <div className="text-[11px] font-semibold text-[#565963] uppercase tracking-wider pl-[4px]">Select Role</div>
      <div className="grid grid-cols-3 gap-[12px]">
        {['General-Manager', 'Branch-Manager', 'Hybrid'].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`
              h-[50px] rounded-[14px] text-[10px] font-bold uppercase tracking-wide border transition-all duration-200 flex items-center justify-center text-center px-1 leading-tight
              ${role === r 
                ? 'bg-[#2D9CDB]/10 border-[#2D9CDB] text-[#2D9CDB] shadow-[0_0_15px_rgba(45,156,219,0.15)]' 
                : 'bg-[#242731] border-transparent text-[#6B6D76] hover:bg-[#2A2D38] hover:text-[#9EA0A8]'
              }
            `}
          >
            {r.replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );

  // Updated CustomInput: icon is now explicitly optional to satisfy TS/ESLint requirements
  const CustomInput = (
    //The function params
    { label, 
      type = "text", 
      placeholder, 
      icon = null, 
      isPassword = false }:{ 
        //Funtion params datatypes
      label: string; 
      type?: string; 
      placeholder?: string; 
      icon?: React.ReactNode; 
      isPassword?: boolean; 
}) => (
    <div className="relative group w-full">
      <div className="absolute top-[10px] left-[18px] text-[10px] font-semibold text-[#565963] uppercase tracking-wider group-focus-within:text-[#2D9CDB] transition-colors z-30">
        {label}
      </div>
      <input 
        type={isPassword ? (showPass ? "text" : "password") : type} 
        placeholder={placeholder}
        className="w-full h-[64px] pt-[22px] pb-[6px] px-[18px] bg-[#242731] border-[2px] border-transparent rounded-[16px] text-[15px] focus:outline-none focus:border-[#2D9CDB] focus:shadow-[0_0_20px_rgba(45,156,219,0.2)] transition-all text-white relative z-20"
      />
      {icon && !isPassword && (
        <div className="absolute right-[18px] top-[22px] opacity-40 text-[#7A7C85] group-focus-within:text-[#2D9CDB] group-focus-within:opacity-100 transition-all z-30">
          {icon}
        </div>
      )}
      {isPassword && (
        <button 
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-[18px] top-[22px] text-[#7A7C85] hover:text-[#2D9CDB] transition-all z-30"
        >
          {showPass ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>
      )}
    </div>
  );

  const CustomSelect = ({ label, options, defaultValue }:{label: string, options: string[], defaultValue: string}) => (
    <div className="relative group w-full">
      <div className="absolute top-[10px] left-[18px] text-[10px] font-semibold text-[#565963] uppercase tracking-wider group-focus-within:text-[#2D9CDB] transition-colors z-30">
        {label}
      </div>
      <select 
        defaultValue={defaultValue}
        className="w-full h-[64px] pt-[22px] pb-[6px] px-[18px] bg-[#242731] border-[2px] border-transparent rounded-[16px] text-[15px] focus:outline-none focus:border-[#2D9CDB] focus:shadow-[0_0_20px_rgba(45,156,219,0.2)] transition-all text-white appearance-none relative z-20 cursor-pointer"
      >
        {options.map(opt => <option key={opt} value={opt} className="bg-[#1E2029] text-white">{opt}</option>)}
      </select>
      <div className="absolute right-[18px] top-[26px] pointer-events-none z-30 text-[#7A7C85] group-focus-within:text-[#2D9CDB]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#2D2F39] flex items-center justify-center font-['Inter',sans-serif] text-white antialiased p-4">
      <div className="relative w-[1120px] h-[760px] bg-[#1E2029] rounded-[32px] overflow-hidden flex shadow-2xl transition-all duration-500">
        
        {/* Background Overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="architecture" 
            className="w-full h-full object-cover opacity-50 grayscale-[0.2]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E2029] via-[#1E2029]/40 to-transparent"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-20 w-full flex flex-col px-[100px] py-[60px]">
          
          <nav className="flex items-center justify-between mb-[50px]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[24px] h-[24px] bg-[#2D9CDB] rounded-full shadow-[0_0_12px_rgba(45,156,219,0.5)]"></div>
              <span className="text-[20px] font-semibold tracking-tight">Nexa Soft<span className="text-[#2D9CDB]">.</span></span>
            </div>
            <button onClick={() => setView('login')} className="text-[15px] font-medium text-white hover:opacity-80 transition-opacity">Home</button>
          </nav>

          <div className="relative flex-1">
            {/* --- LOGIN VIEW --- */}
            <div className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${view === 'login' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>
              <div className="max-w-[440px] space-y-[20px]">
                <div>
                  <span className="text-[12px] font-bold tracking-[0.1em] text-[#6B6D76] mb-[12px] block uppercase">Secure Access</span>
                  <h1 className="text-[48px] font-bold mb-[30px] tracking-tight leading-tight">Account Login<span className="text-[#2D9CDB]">.</span></h1>
                </div>

                <form className="space-y-[18px]" onSubmit={(e) => e.preventDefault()}>
                  <RoleSelector />
                  <CustomInput label="Company" placeholder="e.g. Santa Lucia Ltd" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M17 21v-8H7v8"/></svg>} />
                  <CustomInput label="Email" type="email" placeholder="admin@santalucia.cm" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>} />
                  <CustomInput label="Password" isPassword={true} placeholder="••••••••" />
                  
                  <div className="flex gap-[20px] pt-[15px]">
                    <button onClick={handleToggleView} className="flex-1 h-[58px] bg-[#3E424D] hover:bg-[#4A4E5A] text-[15px] font-semibold rounded-[18px] transition-all">Sign Up</button>
                    <button className="flex-1 h-[58px] bg-[#2D9CDB] hover:bg-[#35A9EB] text-[15px] font-semibold rounded-[18px] shadow-[0_10px_20px_rgba(45,156,219,0.3)] transition-all">Log In</button>
                  </div>
                </form>
              </div>
            </div>

            {/* --- SIGNUP VIEW --- */}
            <div className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${view === 'signup' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
              <div className="max-w-[480px]">
                <h1 className="text-[36px] font-bold mb-[25px] tracking-tight leading-tight">
                  {step === 1 ? "Create Profile" : "Organization Details"}<span className="text-[#2D9CDB]">.</span>
                </h1>

                <div className="space-y-[15px]">
                  {/* Step 1: Profile */}
                  <div className={`transition-all duration-500 transform space-y-[15px] ${step === 1 ? 'translate-x-0 opacity-100 relative' : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none'}`}>
                    <div className="grid grid-cols-2 gap-[15px]">
                      <CustomInput label="First Name" placeholder="Jean" />
                      <CustomInput label="Last Name" placeholder="Mbeki" />
                    </div>
                    
                     {/* Phone Number with Country Code */}
                    <div className="relative group w-full">
                      <div className="absolute top-[10px] left-[18px] text-[10px] font-semibold text-[#565963] uppercase tracking-wider group-focus-within:text-[#2D9CDB] z-30">Phone Number</div>
                      <div className="flex w-full h-[64px] bg-[#242731] border-[2px] border-transparent rounded-[16px] overflow-hidden group-focus-within:border-[#2D9CDB] group-focus-within:shadow-[0_0_20px_rgba(45,156,219,0.2)] transition-all">
                        <select className="bg-transparent text-[14px] mt-4  font-bold text-[#2D9CDB] pl-[18px] pr-2 focus:outline-none cursor-pointer border-r border-[#3E424D]">
                          <option className="bg-[#1E2029] text-white" value="+237">+237 (CM)</option>
                          <option className="bg-[#1E2029] text-white" value="+1">+1 (US)</option>
                          <option className="bg-[#1E2029] text-white" value="+44">+44 (UK)</option>
                        </select>
                        
                        <input 
                          type="text" 
                          placeholder="652422909"
                          className="flex-1 pt-[18px] px-[12px] bg-transparent text-[15px] focus:outline-none text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[15px]">
                      <CustomInput label="Date of Birth" type="date" placeholder="1985-04-21" />
                      <CustomSelect label="Country" defaultValue="Cameroon" options={["Cameroon", "Nigeria", "USA", "France", "UK"]} />
                    </div>

                    <CustomInput label="Email Address" type="email" placeholder="admin@santalucia.cm" />
                    
                    <div className="grid grid-cols-2 gap-[15px]">
                      <CustomInput label="Password" isPassword={true} placeholder="••••••••" />
                      <CustomInput label="Confirm" isPassword={true} placeholder="••••••••" />
                    </div>
                    
                    <div className="flex gap-[15px] pt-[10px]">
                      <button onClick={handleToggleView} className="flex-1 h-[54px] bg-[#3E424D] hover:bg-[#4A4E5A] text-[14px] font-semibold rounded-[16px] transition-colors">Log In</button>
                      <button onClick={handleNextStep} className="flex-1 h-[54px] bg-[#2D9CDB] hover:bg-[#35A9EB] text-[14px] font-semibold rounded-[16px] transition-all">Next</button>
                    </div>
                  </div>

                  {/* Step 2: Organization */}
                  <div className={`transition-all duration-500 transform space-y-[15px] ${step === 2 ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 absolute inset-0 pointer-events-none'}`}>
                    <RoleSelector />
                    <CustomInput label="Company Name" placeholder="Santa Lucia Ltd" />
                    <CustomInput label="Organization Email" type="email" placeholder="SantaLucia@gmail.com" />
                    
                    <div className="grid grid-cols-2 gap-[15px]">
                      <CustomInput label="Company Address" placeholder="Douala, Littoral" />
                      <CustomInput label="Tax ID (TIN/VAT)" placeholder="e.g. RC/DLA/2023/B/..." />
                    </div>
                    
                    <div className="relative group w-full">
                      <div className="absolute top-[10px] left-[18px] text-[10px] font-semibold text-[#565963] uppercase tracking-wider">Business License (PDF/JPG)</div>
                      <div className="w-full h-[70px] pt-[25px] flex items-center justify-center bg-[#242731] border-2 border-dashed border-[#3E424D] hover:border-[#2D9CDB] group-hover:bg-[#2A2D38] rounded-[16px] cursor-pointer transition-all">
                        <span className="text-[#6B6D76] text-[12px]">Click or drag files here to upload</span>
                      </div>
                    </div>

                    <div className="flex gap-[15px] pt-[10px]">
                      <button onClick={handlePrevStep} className="flex-1 h-[54px] bg-[#3E424D] hover:bg-[#4A4E5A] text-[14px] font-semibold rounded-[16px] transition-colors">Previous</button>
                      <button className="flex-1 h-[54px] bg-[#2D9CDB] hover:bg-[#35A9EB] text-[14px] font-semibold rounded-[16px] transition-all shadow-lg shadow-[#2D9CDB]/20">Create Account</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[60px] right-[100px]">
            <div className="flex items-center gap-[4px] opacity-90">
              <div className="w-[12px] h-[12px] bg-white rounded-full"></div>
              <span className="text-[32px] font-bold tracking-tighter italic">NS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;