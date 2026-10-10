import React from 'react';
import { ComicType } from '../types/comic';

interface ComicTypeSelectorProps {
  selectedType: ComicType | 'Semua' | 'Berwarna';
  onSelectType: (type: ComicType | 'Semua' | 'Berwarna') => void;
}

export const ComicTypeSelector: React.FC<ComicTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <section className="px-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-base font-bold font-display tracking-tight">
          Tipe Komik
        </h2>
        {selectedType !== 'Semua' && (
          <button
            onClick={() => onSelectType('Semua')}
            className="text-xs text-red-400 hover:text-red-300 font-medium"
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {/* Manga Card (Japan) */}
        <button
          onClick={() => onSelectType(selectedType === 'Manga' ? 'Semua' : 'Manga')}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center min-h-[96px] ${
            selectedType === 'Manga'
              ? 'bg-[#1b263b] border-red-500 shadow-lg shadow-red-950/30'
              : 'bg-[#131b29] border-slate-800/80 hover:bg-[#182335] hover:border-slate-700'
          }`}
        >
          {/* Japanese flag circle icon */}
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center shadow-md mb-2 shrink-0">
            <div className="w-5 h-5 rounded-full bg-rose-600" />
          </div>
          <span className="text-slate-200 text-xs font-semibold">Manga</span>
        </button>

        {/* Manhua Card (China) */}
        <button
          onClick={() => onSelectType(selectedType === 'Manhua' ? 'Semua' : 'Manhua')}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center min-h-[96px] ${
            selectedType === 'Manhua'
              ? 'bg-[#1b263b] border-red-500 shadow-lg shadow-red-950/30'
              : 'bg-[#131b29] border-slate-800/80 hover:bg-[#182335] hover:border-slate-700'
          }`}
        >
          {/* Chinese flag circle icon */}
          <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-md mb-2 shrink-0 relative overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-300 fill-current">
              <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.5-6.2 4.5 2.3-7.3-6.1-4.5h7.6z" />
            </svg>
          </div>
          <span className="text-slate-200 text-xs font-semibold">Manhua</span>
        </button>

        {/* Manhwa Card (Korea) */}
        <button
          onClick={() => onSelectType(selectedType === 'Manhwa' ? 'Semua' : 'Manhwa')}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center min-h-[96px] ${
            selectedType === 'Manhwa'
              ? 'bg-[#1b263b] border-red-500 shadow-lg shadow-red-950/30'
              : 'bg-[#131b29] border-slate-800/80 hover:bg-[#182335] hover:border-slate-700'
          }`}
        >
          {/* Korean Taegeuk flag circle icon */}
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md mb-2 shrink-0 relative p-1">
            <div className="w-7 h-7 rounded-full overflow-hidden flex flex-col shadow-inner">
              <div className="h-3.5 bg-red-600" />
              <div className="h-3.5 bg-blue-700" />
            </div>
          </div>
          <span className="text-slate-200 text-xs font-semibold">Manhwa</span>
        </button>

        {/* Berwarna / Hitam Putih Card */}
        <button
          onClick={() => onSelectType(selectedType === 'Berwarna' ? 'Semua' : 'Berwarna')}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center min-h-[96px] ${
            selectedType === 'Berwarna'
              ? 'bg-[#1b263b] border-red-500 shadow-lg shadow-red-950/30'
              : 'bg-[#131b29] border-slate-800/80 hover:bg-[#182335] hover:border-slate-700'
          }`}
        >
          {/* Rainbow / Color palette icon */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 flex items-center justify-center shadow-md mb-2 shrink-0">
            <div className="w-5 h-5 rounded-full bg-[#131b29] flex items-center justify-center text-[10px] font-black text-white">
              C
            </div>
          </div>
          <span className="text-slate-200 text-xs font-semibold truncate max-w-full">
            Berwarna
          </span>
        </button>
      </div>
    </section>
  );
};
