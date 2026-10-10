import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, Loader2, Sparkles } from 'lucide-react';
import { Comic, ComicType, ComicFormat, ComicStatus } from '../types/comic';
import { GENRE_LIST } from '../data/comicsData';
import { ComicCard } from './ComicCard';
import { searchBacakomik } from '../services/bacakomikApi';

interface ExploreViewProps {
  comics: Comic[];
  onSelectComic: (comic: Comic) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (e: React.MouseEvent, comic: Comic) => void;
  initialType?: ComicType | 'Semua' | 'Berwarna';
  initialSearchQuery?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  comics,
  onSelectComic,
  bookmarkedIds,
  onToggleBookmark,
  initialType = 'Semua',
  initialSearchQuery = '',
}) => {
  const [search, setSearch] = useState(initialSearchQuery);
  const [liveSearchResults, setLiveSearchResults] = useState<Comic[]>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [selectedType, setSelectedType] = useState<ComicType | 'Semua'>(
    initialType === 'Berwarna' ? 'Semua' : (initialType as ComicType | 'Semua')
  );
  const [selectedFormat, setSelectedFormat] = useState<ComicFormat | 'Semua'>(
    initialType === 'Berwarna' ? 'Berwarna' : 'Semua'
  );
  const [selectedStatus, setSelectedStatus] = useState<ComicStatus | 'Semua'>('Semua');
  const [selectedGenre, setSelectedGenre] = useState('Semua Genre');
  const [sortBy, setSortBy] = useState<'rating' | 'views' | 'chapters' | 'title'>('rating');

  // Live search from bacakomik.my when query length >= 3
  useEffect(() => {
    if (!search.trim() || search.trim().length < 2) {
      setLiveSearchResults([]);
      setIsSearchingLive(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearchingLive(true);
      searchBacakomik(search.trim())
        .then((res) => {
          if (res) setLiveSearchResults(res);
        })
        .finally(() => {
          setIsSearchingLive(false);
        });
    }, 450);

    return () => clearTimeout(timer);
  }, [search]);

  // Combined pool: comics + liveSearchResults (deduplicated)
  const combinedPool = React.useMemo(() => {
    if (liveSearchResults.length === 0) return comics;
    const existingIds = new Set(comics.map((c) => c.id));
    const newItems = liveSearchResults.filter((c) => !existingIds.has(c.id));
    return [...newItems, ...comics];
  }, [comics, liveSearchResults]);

  // Filter comics
  const filteredComics = combinedPool
    .filter((c) => {
      // Search
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.altTitles?.some((alt) => alt.toLowerCase().includes(search.toLowerCase())) ||
        c.author.toLowerCase().includes(search.toLowerCase()) ||
        c.genres.some((g) => g.toLowerCase().includes(search.toLowerCase()));

      // Type
      const matchesType = selectedType === 'Semua' || c.type === selectedType;

      // Format
      const matchesFormat = selectedFormat === 'Semua' || c.format === selectedFormat;

      // Status
      const matchesStatus = selectedStatus === 'Semua' || c.status === selectedStatus;

      // Genre
      const matchesGenre = selectedGenre === 'Semua Genre' || c.genres.includes(selectedGenre);

      return matchesSearch && matchesType && matchesFormat && matchesStatus && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.score - a.score;
      if (sortBy === 'views') {
        const parseViews = (v: string) => {
          if (v.endsWith('M')) return parseFloat(v) * 1000000;
          if (v.endsWith('K')) return parseFloat(v) * 1000;
          return parseFloat(v) || 0;
        };
        return parseViews(b.views) - parseViews(a.views);
      }
      if (sortBy === 'chapters') return b.totalChapters - a.totalChapters;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="px-4 pb-24">
      {/* Search Header */}
      <div className="pt-3 pb-3">
        <h2 className="text-white text-lg font-bold font-display">
          Jelajahi Komik
        </h2>
        <p className="text-slate-400 text-xs mt-0.5">
          Temukan ribuan manga, manhwa & manhua tanpa iklan
        </p>

        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari di bacakomik.my (judul, genre, karakter)..."
            className="w-full bg-[#162032] text-slate-200 text-sm rounded-xl pl-10 pr-24 py-2.5 outline-none border border-slate-700/80 focus:border-red-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none text-[10px] text-slate-400">
            {isSearchingLive ? (
              <span className="flex items-center gap-1 text-red-400 font-medium">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Mencari...</span>
              </span>
            ) : (
              <span className="text-[10px] text-slate-500 font-mono">bacakomik.my</span>
            )}
          </div>
        </div>
      </div>

      {/* Filter Options: Type Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-2">
        {(['Semua', 'Manga', 'Manhwa', 'Manhua'] as (ComicType | 'Semua')[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedType === type
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-[#131b29] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Filter Options: Format & Status */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-3">
        {/* Format */}
        {(['Semua', 'Berwarna', 'Hitam Putih'] as (ComicFormat | 'Semua')[]).map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap border ${
              selectedFormat === fmt
                ? 'bg-slate-700 border-red-500 text-white'
                : 'bg-[#131b29] border-slate-800 text-slate-400'
            }`}
          >
            {fmt}
          </button>
        ))}

        {/* Status */}
        {(['Ongoing', 'Tamat'] as ComicStatus[]).map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(selectedStatus === st ? 'Semua' : st)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap border ${
              selectedStatus === st
                ? 'bg-slate-700 border-red-500 text-white'
                : 'bg-[#131b29] border-slate-800 text-slate-400'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Genre Carousel */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {GENRE_LIST.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                selectedGenre === genre
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 font-semibold'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header with Sorting */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="text-slate-400">
          Ditemukan <strong className="text-white">{filteredComics.length}</strong> komik
        </span>

        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#131b29] text-slate-300 text-xs rounded-lg px-2 py-1 outline-none border border-slate-800 cursor-pointer"
          >
            <option value="rating">Rating Tertinggi</option>
            <option value="views">Paling Populer</option>
            <option value="chapters">Chapter Terbanyak</option>
            <option value="title">Judul (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Comic Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {filteredComics.map((comic) => (
          <ComicCard
            key={comic.id}
            comic={comic}
            isBookmarked={bookmarkedIds.includes(comic.id)}
            onSelect={onSelectComic}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>

      {filteredComics.length === 0 && (
        <div className="py-12 text-center text-slate-500">
          <p className="text-sm">Tidak ada komik yang sesuai dengan filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedType('Semua');
              setSelectedFormat('Semua');
              setSelectedStatus('Semua');
              setSelectedGenre('Semua Genre');
            }}
            className="mt-3 text-xs text-red-400 underline font-semibold"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};
