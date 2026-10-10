import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle, ChevronDown, ChevronUp, Ban } from 'lucide-react';

export const AdFreeBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="px-4 py-1">
        <button
          onClick={() => setDismissed(false)}
          className="text-[11px] text-slate-500 hover:text-slate-400 flex items-center gap-1.5 mx-auto"
        >
          <Shield className="w-3 h-3 text-emerald-400" />
          <span>Status: Bebas Iklan Aktif (Tampilkan Info)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 my-3">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ba2025] via-[#a31920] to-[#801317] p-3.5 shadow-xl shadow-red-950/30 border border-red-500/30 text-white">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent" />

        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="bg-white/20 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                MEMBER PRO AKTIF
              </span>
              <span className="text-[10px] text-red-200">Selamanya</span>
            </div>
            
            <h2 className="text-base font-extrabold tracking-tight font-display leading-tight text-white uppercase drop-shadow-sm">
              AKSES BACA KOMIK TANPA IKLAN
            </h2>
            <p className="text-[11px] text-red-100 font-medium truncate mt-0.5">
              100% Tanpa Pop-up · Tanpa Banner · Kecepatan Penuh
            </p>
          </div>

          {/* Ad-Free stylized icon matching screenshot red ad circle with diagonal line */}
          <div className="shrink-0 flex flex-col items-center justify-center">
            <div className="w-14 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-md relative">
              <div className="w-9 h-9 rounded-full border-2 border-red-600 flex items-center justify-center relative">
                <span className="text-[10px] font-black text-red-600 tracking-tighter">AD</span>
                {/* Diagonal block line */}
                <div className="absolute w-10 h-0.5 bg-red-600 transform rotate-45 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible perk details */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-red-400/30 grid grid-cols-2 gap-2 text-[11px] text-red-50">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span>0 Banner Iklan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span>Tanpa Iklan Redirect</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span>Loading Gambar Instan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span>Mode Baca Offline</span>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-2.5 pt-2 border-t border-red-500/20 flex items-center justify-between text-[10px] text-red-200">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>{expanded ? 'Tutup Detail' : 'Lihat Keuntungan'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          
          <button
            onClick={() => setDismissed(true)}
            className="hover:text-white transition-colors underline"
          >
            Sembunyikan Banner
          </button>
        </div>
      </div>
    </div>
  );
};
