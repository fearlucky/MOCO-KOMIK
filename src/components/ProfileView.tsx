import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  BookOpen,
  Clock,
  Sparkles,
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  Layers,
  Palette,
  Info,
} from 'lucide-react';
import { ReadingHistoryItem } from '../types/comic';

interface ProfileViewProps {
  userName: string;
  isLoggedIn: boolean;
  onUpdateUserName: (name: string) => void;
  onOpenLoginModal: () => void;
  readingHistory: ReadingHistoryItem[];
  bookmarkedCount: number;
  onClearHistory: () => void;
  onClearAllData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userName,
  isLoggedIn,
  onUpdateUserName,
  onOpenLoginModal,
  readingHistory,
  bookmarkedCount,
  onClearHistory,
  onClearAllData,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [themeName, setThemeName] = useState('Midnight Dark');
  const [readingModeDefault, setReadingModeDefault] = useState('Webtoon Vertikal');
  const [copiedNotification, setCopiedNotification] = useState('');

  const totalChaptersRead = readingHistory.length;
  // Estimated reading time (~8 min per chapter)
  const totalReadingMinutes = totalChaptersRead * 8;
  const hours = Math.floor(totalReadingMinutes / 60);
  const minutes = totalReadingMinutes % 60;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(
      {
        userName,
        exportedAt: new Date().toISOString(),
        readingHistory,
      },
      null,
      2
    );
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bacakomik-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedNotification('Data berhasil dicadangkan!');
    setTimeout(() => setCopiedNotification(''), 2500);
  };

  return (
    <div className="px-4 pb-24">
      {/* Title */}
      <div className="pt-3 pb-3">
        <h2 className="text-white text-lg font-bold font-display">
          Profil & Pengaturan
        </h2>
        <p className="text-slate-400 text-xs mt-0.5">
          Kelola preferensi akun dan statistik membaca kamu
        </p>
      </div>

      {/* User Card */}
      <div className="p-4 rounded-2xl bg-[#141d2e] border border-slate-700/60 shadow-xl mb-4">
        <div className="flex items-center gap-3.5">
          {/* Avatar with PRO crown */}
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-red-950/50">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-slate-950 p-1 rounded-full shadow-md">
              <Sparkles className="w-3 h-3 fill-slate-950" />
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-slate-900 text-white text-xs px-2 py-1 rounded-lg border border-slate-700 outline-none flex-1"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-red-600 text-white text-xs rounded-lg font-semibold"
                >
                  Simpan
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-base truncate">
                  {userName}
                </h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-[10px] text-slate-400 hover:text-white underline"
                >
                  Ubah
                </button>
              </div>
            )}

            <div className="flex items-center gap-1.5 mt-1">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                MEMBER PRO TANPA IKLAN
              </span>
            </div>
          </div>
        </div>

        {/* Ad-Free Promise Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900/40 to-slate-900/60 border border-red-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>Iklan Terblokir Otomatis:</span>
          </div>
          <span className="text-emerald-400 font-bold font-mono">100% (0 Iklan)</span>
        </div>
      </div>

      {/* Reading Statistics */}
      <div className="mb-5">
        <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-2.5">
          Statistik Membaca
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-[#131b29] border border-slate-800 text-center">
            <BookOpen className="w-4 h-4 text-red-400 mx-auto mb-1.5" />
            <span className="text-lg font-bold text-white font-mono block">
              {bookmarkedCount}
            </span>
            <span className="text-[10px] text-slate-400">Favorit</span>
          </div>

          <div className="p-3 rounded-xl bg-[#131b29] border border-slate-800 text-center">
            <Layers className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
            <span className="text-lg font-bold text-white font-mono block">
              {totalChaptersRead}
            </span>
            <span className="text-[10px] text-slate-400">Chapter</span>
          </div>

          <div className="p-3 rounded-xl bg-[#131b29] border border-slate-800 text-center">
            <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1.5" />
            <span className="text-lg font-bold text-white font-mono block">
              {hours > 0 ? `${hours}j ` : ''}{minutes}m
            </span>
            <span className="text-[10px] text-slate-400">Waktu Baca</span>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="mb-5">
        <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-2.5">
          Preferensi Baca
        </h3>
        <div className="space-y-2">
          {/* Default reading mode */}
          <div className="p-3 rounded-xl bg-[#131b29] border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Mode Baca Default</span>
            </div>
            <select
              value={readingModeDefault}
              onChange={(e) => setReadingModeDefault(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs rounded-lg px-2 py-1 outline-none border border-slate-700"
            >
              <option value="Webtoon Vertikal">Webtoon (Vertikal)</option>
              <option value="Paged Per Halaman">Paged (Per Halaman)</option>
            </select>
          </div>

          {/* Theme */}
          <div className="p-3 rounded-xl bg-[#131b29] border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Palette className="w-4 h-4 text-slate-400" />
              <span>Tema Warna</span>
            </div>
            <select
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs rounded-lg px-2 py-1 outline-none border border-slate-700"
            >
              <option value="Midnight Dark">Midnight Dark (Default)</option>
              <option value="OLED Black">OLED Pitch Black</option>
              <option value="Deep Navy">Deep Navy Blue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="mb-5">
        <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-2.5">
          Penyimpanan & Cadangan
        </h3>
        <div className="space-y-2">
          <button
            onClick={handleExportData}
            className="w-full p-3 rounded-xl bg-[#131b29] hover:bg-[#182335] border border-slate-800 flex items-center justify-between text-xs text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-slate-400" />
              <span>Cadangkan Data (Export JSON)</span>
            </div>
            <span className="text-[10px] text-slate-500">Unduh</span>
          </button>

          <button
            onClick={onClearHistory}
            className="w-full p-3 rounded-xl bg-[#131b29] hover:bg-[#182335] border border-slate-800 flex items-center justify-between text-xs text-red-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Hapus Riwayat Membaca</span>
            </div>
            <span className="text-[10px] text-slate-500">Bersihkan</span>
          </button>

          <button
            onClick={onClearAllData}
            className="w-full p-3 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 flex items-center justify-between text-xs text-red-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Reset Semua Data Aplikasi</span>
            </div>
            <span className="text-[10px] text-red-400">Reset</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {copiedNotification && (
        <div className="p-3 mb-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* App Info Box */}
      <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center text-xs text-slate-400">
        <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-300 mb-1">
          <Info className="w-3.5 h-3.5 text-red-400" />
          <span>Bacakomik Alter v2.6 Pro Edition</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Versi alter bebas iklan. Dibuat khusus untuk kenyamanan membaca manga, manhwa & manhua dengan performa optimal.
        </p>
      </div>
    </div>
  );
};
