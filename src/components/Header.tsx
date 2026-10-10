import React from 'react';
import { Search, UserCheck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  userName: string;
  isLoggedIn: boolean;
  onOpenLoginModal: () => void;
  onSearchClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  isLoggedIn,
  onOpenLoginModal,
  onSearchClick,
  searchQuery,
  onSearchChange,
}) => {
  // Determine greeting based on current local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat pagi';
    if (hour >= 11 && hour < 15) return 'Selamat siang';
    if (hour >= 15 && hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  return (
    <header className="px-4 pt-3 pb-2 sticky top-0 z-30 bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800/50">
      {/* Top greeting row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Logo matching screenshot: stylized crimson red comic emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-900/40 p-2 relative group cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-white fill-current transform -rotate-6"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-4-4 1.41-1.41L12 14.17l5.59-5.59L19 10l-7 7z" />
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-red-400 text-slate-950 font-black text-[9px] px-1 rounded-sm">
              PRO
            </span>
          </div>

          <div>
            <h1 className="text-slate-400 text-xs font-medium tracking-wide">
              {getGreeting()}
            </h1>
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1.5 text-slate-100 hover:text-white font-semibold text-sm transition-colors text-left"
            >
              <span>{isLoggedIn ? userName : 'Belum Login'}</span>
              {isLoggedIn ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="text-[10px] text-red-400 underline font-normal">
                  (Masuk)
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Ad-Free & bacakomik.my Status Indicator in Header */}
        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bebas Iklan</span>
          </div>
          <span className="text-[9px] text-slate-400 font-mono">
            Base: bacakomik.my
          </span>
        </div>
      </div>

      {/* Search Input Bar matching screenshot */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onClick={onSearchClick}
          placeholder="Cari disini (judul komik, genre, karakter)..."
          className="w-full bg-[#162032] hover:bg-[#1a273e] focus:bg-[#1b2940] text-slate-200 placeholder:text-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none border border-slate-700/60 focus:border-red-500/80 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-700/50"
          >
            Bersihkan
          </button>
        )}
      </div>
    </header>
  );
};
