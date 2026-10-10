import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  BookOpen,
  Eye,
  Check,
  ArrowUpDown,
  Search,
  Sparkles,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Comic, Chapter, ReadingHistoryItem } from '../types/comic';
import { fetchBacakomikDetail } from '../services/bacakomikApi';

interface ComicDetailViewProps {
  comic: Comic;
  onBack: () => void;
  onReadChapter: (comic: Comic, chapter: Chapter) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  historyItem?: ReadingHistoryItem;
}

export const ComicDetailView: React.FC<ComicDetailViewProps> = ({
  comic,
  onBack,
  onReadChapter,
  isBookmarked,
  onToggleBookmark,
  historyItem,
}) => {
  const [currentComic, setCurrentComic] = useState<Comic>(comic);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [chapterSearch, setChapterSearch] = useState('');
  const [sortAscending, setSortAscending] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // If comic has a bacakomik.my url and fewer than 3 chapters, fetch full chapter list!
  useEffect(() => {
    if (comic.url && comic.chapters.length <= 1) {
      let isMounted = true;
      setIsLoadingDetails(true);
      fetchBacakomikDetail(comic.url)
        .then((detail) => {
          if (isMounted && detail && Array.isArray(detail.chapters) && detail.chapters.length > 0) {
            const fetchedChapters: Chapter[] = detail.chapters;
            setCurrentComic((prev) => ({
              ...prev,
              title: detail.title || prev.title,
              cover: detail.cover || prev.cover,
              synopsis: detail.synopsis || prev.synopsis,
              genres: detail.genres && detail.genres.length > 0 ? detail.genres : prev.genres,
              author: detail.author || prev.author,
              status: detail.status || prev.status,
              totalChapters: fetchedChapters.length,
              chapters: fetchedChapters,
            }));
          }
        })
        .finally(() => {
          if (isMounted) setIsLoadingDetails(false);
        });
      return () => {
        isMounted = false;
      };
    }
  }, [comic.url, comic.chapters.length]);

  const getFlag = (type: string) => {
    switch (type) {
      case 'Manga':
        return '🇯🇵';
      case 'Manhwa':
        return '🇰🇷';
      case 'Manhua':
        return '🇨🇳';
      default:
        return '🌐';
    }
  };

  // Filter and sort chapters
  const filteredChapters = currentComic.chapters
    .filter((ch) =>
      ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
      ch.number.toString().includes(chapterSearch)
    )
    .sort((a, b) => (sortAscending ? a.number - b.number : b.number - a.number));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Baca komik ${currentComic.title} tanpa iklan di Bacakomik Alter!`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const firstChapter = [...currentComic.chapters].sort((a, b) => a.number - b.number)[0];
  const latestChapter = [...currentComic.chapters].sort((a, b) => b.number - a.number)[0];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 pb-24">
      {/* Top sticky bar */}
      <div className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold truncate max-w-[200px]">
            {currentComic.title}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {currentComic.url && (
            <a
              href={currentComic.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              title="Kunjungi bacakomik.my"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white transition-colors relative"
            title="Bagikan"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
              isBookmarked
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            <span>{isBookmarked ? 'Tersimpan' : 'Favorit'}</span>
          </button>
        </div>
      </div>

      {/* Backdrop Header Banner */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden">
        <img
          src={currentComic.banner || currentComic.cover}
          alt={currentComic.title}
          className="w-full h-full object-cover filter blur-xs brightness-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
      </div>

      {/* Main Comic Details Info Container */}
      <div className="px-4 -mt-24 relative z-10">
        <div className="flex gap-4 items-end">
          {/* Cover image */}
          <div className="w-28 sm:w-36 shrink-0 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-900">
            <img
              src={currentComic.cover}
              alt={currentComic.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick headline info */}
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>{getFlag(currentComic.type)} {currentComic.type}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold">{currentComic.status}</span>
              <span aria-hidden="true">·</span>
              <span>{currentComic.format}</span>
            </div>

            <h1 className="text-white text-lg sm:text-2xl font-black font-display leading-tight line-clamp-2">
              {currentComic.title}
            </h1>

            {currentComic.url && (
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-cyan-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Base: bacakomik.my</span>
              </div>
            )}

            {/* Rating pill */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-lg text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="tabular-nums">{currentComic.score.toFixed(2)}</span>
              </div>
              <span className="text-xs text-slate-400">
                ({currentComic.ratingCount.toLocaleString()} suara)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Read Chapter */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {historyItem ? (
            <button
              onClick={() => {
                const foundCh = currentComic.chapters.find((c) => c.id === historyItem.chapterId) || latestChapter;
                if (foundCh) onReadChapter(currentComic, foundCh);
              }}
              className="col-span-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-red-950/40 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lanjutkan Ch. {historyItem.chapterNumber} ({historyItem.progressPercent}%)</span>
            </button>
          ) : (
            <>
              {firstChapter && (
                <button
                  onClick={() => onReadChapter(currentComic, firstChapter)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all border border-slate-700"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>Ch. Pertama (Ch. {firstChapter.number})</span>
                </button>
              )}
              {latestChapter && (
                <button
                  onClick={() => onReadChapter(currentComic, latestChapter)}
                  className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/40 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Ch. Terbaru (Ch. {latestChapter.number})</span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Metadata info grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-[#131b29] border border-slate-800 text-center text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block">Author</span>
            <span className="text-white font-semibold truncate block">{currentComic.author}</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="text-slate-400 text-[10px] block">Artist</span>
            <span className="text-white font-semibold truncate block">{currentComic.artist}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Total Chapter</span>
            <span className="text-white font-semibold block">{currentComic.chapters.length} Ch</span>
          </div>
        </div>

        {/* Genre Tags */}
        <div className="mt-4">
          <span className="text-slate-400 text-xs font-medium block mb-2">Genre</span>
          <div className="flex flex-wrap gap-1.5">
            {currentComic.genres.map((g) => (
              <span
                key={g}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Synopsis Section */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#131b29] border border-slate-800/80">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-1.5">
            Sinopsis
          </h3>
          <p
            className={`text-slate-300 text-xs leading-relaxed ${
              synopsisExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {currentComic.synopsis}
          </p>
          <button
            onClick={() => setSynopsisExpanded(!synopsisExpanded)}
            className="text-red-400 hover:text-red-300 text-xs font-semibold mt-1.5"
          >
            {synopsisExpanded ? 'Sembunyikan' : 'Selengkapnya...'}
          </button>
        </div>

        {/* Chapters Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white text-base font-bold font-display flex items-center gap-2">
                <span>Daftar Chapter</span>
                {isLoadingDetails && (
                  <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                )}
              </h3>
              <span className="text-slate-400 text-xs">
                Tersedia {currentComic.chapters.length} chapter tanpa iklan
              </span>
            </div>

            <button
              onClick={() => setSortAscending(!sortAscending)}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortAscending ? 'Terlama' : 'Terbaru'}</span>
            </button>
          </div>

          {/* Chapter search input if more than 5 chapters */}
          {comic.chapters.length > 3 && (
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                placeholder="Cari nomor chapter (contoh: 179)..."
                className="w-full bg-[#131b29] text-xs text-white rounded-xl pl-8 pr-3 py-2 outline-none border border-slate-800 focus:border-red-500"
              />
            </div>
          )}

          {/* Chapters List */}
          <div className="space-y-2">
            {filteredChapters.map((ch) => {
              const isCurrentReading = historyItem?.chapterId === ch.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => onReadChapter(currentComic, ch)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isCurrentReading
                      ? 'bg-red-950/30 border-red-500/60 shadow-md shadow-red-950/30'
                      : 'bg-[#131b29] border-slate-800/80 hover:bg-[#182335] hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs sm:text-sm font-semibold truncate">
                        {ch.title}
                      </span>
                      {isCurrentReading && (
                        <span className="bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                          Dibaca
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>{ch.releaseDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-3 h-3" />
                        <span>{ch.views}</span>
                      </span>
                    </div>
                  </div>

                  <button className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-semibold transition-colors">
                    Baca
                  </button>
                </div>
              );
            })}

            {filteredChapters.length === 0 && (
              <div className="p-6 text-center text-slate-500 text-xs">
                Tidak ada chapter yang cocok dengan pencarian "{chapterSearch}".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
