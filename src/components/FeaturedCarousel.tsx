import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, BookOpen } from 'lucide-react';
import { Comic } from '../types/comic';

interface FeaturedCarouselProps {
  comics: Comic[];
  onSelectComic: (comic: Comic) => void;
  onReadLatest: (comic: Comic) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  comics,
  onSelectComic,
  onReadLatest,
}) => {
  const featuredList = comics.filter((c) => c.isFeatured || c.score >= 9.2);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 6 seconds if not hovered/interacted
  useEffect(() => {
    if (featuredList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredList.length]);

  if (featuredList.length === 0) return null;

  const currentComic = featuredList[currentIndex];

  const getCountryFlag = (type: string) => {
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

  return (
    <section className="px-4 mb-5">
      {/* Section Header matching screenshot */}
      <div className="mb-2.5">
        <h2 className="text-white text-base font-bold font-display tracking-tight flex items-center justify-between">
          <span>Rilis Terbaru</span>
          <span className="text-slate-400 text-xs font-normal">
            {currentIndex + 1} / {featuredList.length}
          </span>
        </h2>
        <p className="text-slate-400 text-xs mt-0.5">
          Baca rekomendasi manga terbaru
        </p>
      </div>

      {/* Featured Card matching screenshot */}
      <div className="relative rounded-2xl bg-[#141d2e] border border-slate-700/50 p-4 shadow-xl shadow-black/40 overflow-hidden group">
        <div className="flex items-stretch justify-between gap-4">
          {/* Left Column Information */}
          <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
            <div>
              <h3
                onClick={() => onSelectComic(currentComic)}
                className="text-white font-extrabold text-lg sm:text-xl font-display leading-tight truncate hover:text-red-400 cursor-pointer transition-colors"
              >
                {currentComic.title}
              </h3>
              
              <p className="text-slate-300 text-xs font-medium mt-1 truncate">
                Chapter {currentComic.latestChapter} {currentComic.status === 'Tamat' ? 'End' : ''}
              </p>

              <button
                onClick={() => onSelectComic(currentComic)}
                className="text-slate-400 hover:text-slate-200 text-xs font-medium mt-3 block text-left underline decoration-slate-600 hover:decoration-white transition-all"
              >
                Details
              </button>
            </div>

            {/* Rating and Flag */}
            <div className="mt-4">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                {/* Star rating */}
                <div className="flex items-center gap-1 font-semibold text-slate-100">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums">{currentComic.score.toFixed(2)}</span>
                </div>

                {/* Country flag and comic type */}
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="text-sm">{getCountryFlag(currentComic.type)}</span>
                  <span>{currentComic.type}</span>
                </div>
              </div>

              {/* Action button: Quick Read */}
              <button
                onClick={() => onReadLatest(currentComic)}
                className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-semibold shadow-md shadow-red-900/40 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Baca Ch. {currentComic.latestChapter}</span>
              </button>

              {/* Pagination Dots at bottom left as seen in screenshot */}
              <div className="flex items-center gap-1.5 mt-3">
                {featuredList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all rounded-full ${
                      idx === currentIndex
                        ? 'w-4 h-1.5 bg-red-500'
                        : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Cover Image thumbnail */}
          <div
            onClick={() => onSelectComic(currentComic)}
            className="w-32 sm:w-36 shrink-0 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 cursor-pointer relative group-hover:border-red-500/50 transition-all"
          >
            <img
              src={currentComic.cover}
              alt={currentComic.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs text-[10px] text-white px-1.5 py-0.5 rounded font-medium">
              {currentComic.format}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
