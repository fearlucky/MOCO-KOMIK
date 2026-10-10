import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Comic } from '../types/comic';

interface ComicCardProps {
  comic: Comic;
  isBookmarked?: boolean;
  onSelect: (comic: Comic) => void;
  onToggleBookmark?: (e: React.MouseEvent, comic: Comic) => void;
}

export const ComicCard: React.FC<ComicCardProps> = ({
  comic,
  isBookmarked = false,
  onSelect,
  onToggleBookmark,
}) => {
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

  return (
    <div
      onClick={() => onSelect(comic)}
      className="group flex flex-col cursor-pointer transition-all duration-200"
    >
      {/* Poster Cover */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#162032] border border-slate-800 group-hover:border-slate-600 shadow-md group-hover:shadow-xl transition-all">
        <img
          src={comic.cover}
          alt={comic.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />

        {/* Type & Format Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
          <span>{getFlag(comic.type)}</span>
          <span>{comic.type}</span>
        </div>

        {/* Bookmark Button */}
        {onToggleBookmark && (
          <button
            onClick={(e) => onToggleBookmark(e, comic)}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isBookmarked ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>
        )}

        {/* Bottom overlay: Score and Chapter */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 font-bold text-amber-400 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="tabular-nums">{comic.score.toFixed(1)}</span>
          </div>

          <span className="bg-red-600/90 text-white font-semibold px-1.5 py-0.5 rounded text-[10px]">
            Ch. {comic.latestChapter}
          </span>
        </div>
      </div>

      {/* Title & Info */}
      <div className="mt-2">
        <h4 className="text-white text-xs sm:text-sm font-semibold line-clamp-2 group-hover:text-red-400 transition-colors leading-tight">
          {comic.title}
        </h4>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5 truncate">
          <span>{comic.genres[0]}</span>
          <span aria-hidden="true">·</span>
          <span>{comic.status}</span>
        </div>
      </div>
    </div>
  );
};
