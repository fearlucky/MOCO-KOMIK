import React, { useState } from 'react';
import { X, ShieldCheck, Sparkles, User, KeyRound } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
  currentName: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  currentName,
}) => {
  const [nameInput, setNameInput] = useState(currentName || 'Lucky');
  const [emailInput, setEmailInput] = useState('luckymak2120@gmail.com');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onLogin(nameInput.trim());
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[#131b29] border border-slate-700/80 rounded-2xl p-5 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center mx-auto mb-2.5 shadow-lg shadow-red-950/50">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-base font-display">
            Masuk Akun Bacakomik
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Sinkronkan favorit dan riwayat membaca tanpa iklan
          </p>
        </div>

        {/* Member Pro Advantage Note */}
        <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2.5 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Akun ini otomatis mendapatkan lisensi PRO Bebas Iklan Permanen!</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">
              Nama Profil / Panggilan
            </label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Contoh: Lucky"
              className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none border border-slate-700 focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">
              Email / Akun
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="nama@email.com"
              className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none border border-slate-700 focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-xl shadow-red-950/40 flex items-center justify-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Masuk Sekarang (Akses VIP Aktif)</span>
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-500 mt-3">
          Dengan masuk, seluruh bookmark kamu aman di penyimpanan browser lokal.
        </p>
      </div>
    </div>
  );
};
