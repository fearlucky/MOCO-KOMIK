import React, { useState } from 'react';
import { Heart, Clock, Download, Trash2, BookOpen, ChevronRight } from 'lucide-react';
import { Comic, ReadingHistoryItem } from '../types/comic';
import { ComicCard } from './ComicCard';

interface FavoritesViewProps {
  comics: Comic[];
  bookmarkedIds: string[];
  readingHistory: ReadingHistoryItem[];
  onSelectComic: (comic: Comic) => void;
  onContinueReading: (historyItem: ReadingHistoryItem) => void;
  onClearHistory: () => void;
  onToggleBookmark: (e: React.MouseEvent, comic: Comic) => void;
  onExploreClick: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  comics,
  bookmarkedIds,
  readingHistory,
  onSelectComic,
  onContinueReading,
  onClearHistory,
  onToggleBookmark,
  onExploreClick,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'history' | 'offline'>('bookmarks');

  const bookmarkedComics = comics.filter((c) => bookmarkedIds.includes(c.id));

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    return `${days} hari lalu`;
  };

  return (
    <div className="px-4 pb-24">
      {/* Title */}
      <div className="pt-3 pb-3">
        <h2 className="text-white text-lg font-bold font-display">
          Koleksi & Riwayat
        </h2>
        <p className="text-slate-400 text-xs mt-0.5">
          Simpan komik favorit dan lanjutkan bacaan terakhirmu
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex p-1 bg-[#131b29] rounded-xl border border-slate-800 mb-4">
        <button
          onClick={() => setActiveSubTab('bookmarks')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            activeSubTab === 'bookmarks'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Favorit ({bookmarkedComics.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            activeSubTab === 'history'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Riwayat ({readingHistory.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('offline')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            activeSubTab === 'offline'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Offline</span>
        </button>
      </div>

      {/* Bookmarks Tab */}
      {activeSubTab === 'bookmarks' && (
        <div>
          {bookmarkedComics.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {bookmarkedComics.map((comic) => (
                <ComicCard
                  key={comic.id}
                  comic={comic}
                  isBookmarked={true}
                  onSelect={onSelectComic}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">
                Belum Ada Komik Favorit
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
                Klik ikon hati pada komik yang kamu sukai untuk menyimpannya di sini.
              </p>
              <button
                onClick={onExploreClick}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-950/40"
              >
                Cari Komik Sekarang
              </button>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeSubTab === 'history' && (
        <div>
          {readingHistory.length > 0 && (
            <div className="flex justify-end mb-3">
              <button
                onClick={onClearHistory}
                className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus Semua Riwayat</span>
              </button>
            </div>
          )}

          {readingHistory.length > 0 ? (
            <div className="space-y-2.5">
              {readingHistory.map((item) => {
                const fullComic = comics.find((c) => c.id === item.comicId);
                return (
                  <div
                    key={`${item.comicId}-${item.chapterId}`}
                    className="p-3 rounded-2xl bg-[#131b29] border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition-all"
                  >
                    {/* Comic cover thumbnail */}
                    <div
                      onClick={() => fullComic && onSelectComic(fullComic)}
                      className="w-14 aspect-[3/4] rounded-lg overflow-hidden bg-slate-800 shrink-0 cursor-pointer border border-slate-700"
                    >
                      <img
                        src={item.comicCover}
                        alt={item.comicTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-red-400 font-bold uppercase mb-0.5">
                        <span>{item.comicType}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-400 font-normal">
                          {formatTimeAgo(item.lastReadAt)}
                        </span>
                      </div>

                      <h4
                        onClick={() => fullComic && onSelectComic(fullComic)}
                        className="text-white text-xs sm:text-sm font-semibold truncate cursor-pointer hover:text-red-400"
                      >
                        {item.comicTitle}
                      </h4>

                      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                        <span>Chapter {item.chapterNumber}</span>
                        <span className="font-mono text-[11px] text-emerald-400">
                          {item.progressPercent}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${item.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Continue Button */}
                    <button
                      onClick={() => onContinueReading(item)}
                      className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white shrink-0 shadow-md shadow-red-950/40 transition-colors"
                      title="Lanjutkan Membaca"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">
                Belum Ada Riwayat Baca
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
                Chapter yang kamu baca akan otomatis tersimpan di sini secara realtime.
              </p>
              <button
                onClick={onExploreClick}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors"
              >
                Mulai Membaca Komik
              </button>
            </div>
          )}
        </div>
      )}

      {/* Offline Tab */}
      {activeSubTab === 'offline' && (
        <div className="p-5 rounded-2xl bg-[#131b29] border border-slate-800 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <Download className="w-6 h-6" />
          </div>
          <h3 className="text-white text-sm font-bold font-display mb-1">
            Fitur Cache Offline Aktif
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4 leading-relaxed">
            Semua chapter yang pernah kamu buka otomatis tersimpan di memori perangkat lokal. Kamu bisa membacanya kapan saja tanpa koneksi internet dan tanpa gangguan iklan sama sekali!
          </p>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span>Status Cache Offline:</span>
              <span className="text-emerald-400 font-semibold">Tersimpan Otomatis</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Penggunaan Memori Lokal:</span>
              <span className="text-white font-mono">14.2 MB</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Koneksi Jaringan:</span>
              <span className="text-cyan-400 font-semibold">Online & Siap Offline</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
