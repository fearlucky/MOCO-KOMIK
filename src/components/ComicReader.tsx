import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Settings,
  ChevronLeft,
  ChevronRight,
  List,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  MessageSquare,
  Send,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Comic, Chapter, ReaderSettings } from '../types/comic';
import { fetchBacakomikChapterImages } from '../services/bacakomikApi';

interface ComicReaderProps {
  comic: Comic;
  chapter: Chapter;
  onBack: () => void;
  onNavigateChapter: (chapter: Chapter) => void;
  onUpdateProgress: (progress: number) => void;
}

export const ComicReader: React.FC<ComicReaderProps> = ({
  comic,
  chapter,
  onBack,
  onNavigateChapter,
  onUpdateProgress,
}) => {
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pagedCurrentIndex, setPagedCurrentIndex] = useState(0);
  const [scrapedImages, setScrapedImages] = useState<string[]>(chapter.imageUrls || []);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  // Fetch real images from bacakomik.my if chapter has a URL
  useEffect(() => {
    if (chapter.url) {
      let isMounted = true;
      setIsLoadingImages(true);
      setScrapedImages([]);
      setPagedCurrentIndex(0);

      fetchBacakomikChapterImages(chapter.url)
        .then((res) => {
          if (isMounted && res.images && res.images.length > 0) {
            setScrapedImages(res.images);
          }
        })
        .finally(() => {
          if (isMounted) setIsLoadingImages(false);
        });

      return () => {
        isMounted = false;
      };
    } else {
      setScrapedImages(chapter.imageUrls || []);
    }
  }, [chapter.url, chapter.id]);

  // Comments for the chapter
  const [comments, setComments] = useState<
    { id: string; user: string; text: string; time: string; likes: number }[]
  >([
    {
      id: 'c1',
      user: 'Reyhan_Hunter',
      text: 'Gila sih visualisasinya merinding parah! Makasih min udah nyediain tanpa iklan sama sekali!',
      time: '15 menit lalu',
      likes: 42,
    },
    {
      id: 'c2',
      user: 'OtakuManado',
      text: 'Mantap banget lancar jaya scrollnya ga keganggu pop-up ga jelas kaya web sebelah 🔥',
      time: '1 jam lalu',
      likes: 29,
    },
    {
      id: 'c3',
      user: 'Siti_K-Reader',
      text: 'Ariseee!! Pasukan bayangannya keren banget woilahh',
      time: '3 jam lalu',
      likes: 18,
    },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  // Reader Settings
  const [settings, setSettings] = useState<ReaderSettings>({
    mode: comic.type === 'Manga' ? 'paged' : 'webtoon',
    theme: 'slate',
    zoom: 100,
    autoScroll: false,
    autoScrollSpeed: 2,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<number | null>(null);

  // Sort chapters
  const allChaptersSorted = [...comic.chapters].sort((a, b) => a.number - b.number);
  const currentChapterIdx = allChaptersSorted.findIndex((c) => c.id === chapter.id);
  const prevChapter = currentChapterIdx > 0 ? allChaptersSorted[currentChapterIdx - 1] : null;
  const nextChapter =
    currentChapterIdx < allChaptersSorted.length - 1
      ? allChaptersSorted[currentChapterIdx + 1]
      : null;

  // Track scroll progress in Webtoon mode
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      const percent = Math.min(100, Math.max(0, Math.round((scrollTop / total) * 100)));
      setScrollProgress(percent);
      onUpdateProgress(percent);
    }
  };

  // Auto-scroll loop
  useEffect(() => {
    if (isAutoScrolling && settings.mode === 'webtoon') {
      autoScrollIntervalRef.current = window.setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += settings.autoScrollSpeed * 1.5;
        }
      }, 30);
    } else {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    }
    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    };
  }, [isAutoScrolling, settings.mode, settings.autoScrollSpeed]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      user: 'Lucky (Pembaca)',
      text: newCommentText.trim(),
      time: 'Baru saja',
      likes: 1,
    };
    setComments([newEntry, ...comments]);
    setNewCommentText('');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (settings.mode === 'paged') {
          setPagedCurrentIndex((prev) => Math.max(0, prev - 1));
        } else if (prevChapter) {
          onNavigateChapter(prevChapter);
        }
      } else if (e.key === 'ArrowRight') {
        if (settings.mode === 'paged') {
          setPagedCurrentIndex((prev) => Math.min(chapter.panels.length - 1, prev + 1));
        } else if (nextChapter) {
          onNavigateChapter(nextChapter);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.mode, chapter.panels.length, prevChapter, nextChapter]);

  // Theme styling
  const getThemeClass = () => {
    switch (settings.theme) {
      case 'oled':
        return 'bg-black text-slate-100';
      case 'sepia':
        return 'bg-[#1f1b16] text-[#e8dcc8]';
      case 'slate':
      default:
        return 'bg-[#0b0f19] text-slate-100';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${getThemeClass()} select-none`}>
      {/* Top Header Bar */}
      {showControls && (
        <div className="sticky top-0 z-50 bg-[#0b0f19]/95 backdrop-blur-md px-3 py-2.5 flex items-center justify-between border-b border-slate-800 shadow-md">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white p-1 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <div className="text-left truncate max-w-[160px] sm:max-w-xs">
              <h2 className="text-xs font-bold text-white truncate">{comic.title}</h2>
              <p className="text-[10px] text-slate-400 truncate">{chapter.title}</p>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            {/* 100% Ad-Free badge */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
              <ShieldCheck className="w-3 h-3" />
              <span>Bebas Iklan</span>
            </div>

            {/* Auto scroll toggle (Webtoon mode only) */}
            {settings.mode === 'webtoon' && (
              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all ${
                  isAutoScrolling
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Gulir Otomatis"
              >
                {isAutoScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden xs:inline text-[10px]">
                  {isAutoScrolling ? 'Jeda' : 'Auto'}
                </span>
              </button>
            )}

            {/* Chapter list modal toggle */}
            <button
              onClick={() => setShowChapterList(!showChapterList)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Daftar Chapter"
            >
              <List className="w-4 h-4" />
            </button>

            {/* Reader Settings toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Pengaturan Baca"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Main Comic Viewer Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onClick={() => setShowControls((prev) => !prev)}
        className="flex-1 overflow-y-auto overflow-x-hidden relative cursor-default"
      >
        <div
          className="mx-auto transition-all"
          style={{
            maxWidth: `${Math.round(680 * (settings.zoom / 100))}px`,
          }}
        >
          {/* Chapter Opening Header */}
          <div className="p-4 text-center border-b border-slate-800/80 bg-slate-900/40 my-2 rounded-xl mx-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">
              {comic.type} · {comic.format}
            </span>
            <h1 className="text-white font-extrabold text-base sm:text-lg mt-0.5">
              {comic.title}
            </h1>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              {chapter.title}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              <span>Membaca dalam mode tanpa iklan</span>
            </div>
          </div>

          {/* Loading indicator for chapter images from bacakomik.my */}
          {isLoadingImages && (
            <div className="py-20 text-center px-4 bg-slate-900/40 rounded-2xl mx-2 my-4 border border-slate-800">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin mx-auto mb-3" />
              <h3 className="text-white font-bold text-sm">Memuat Gambar dari bacakomik.my...</h3>
              <p className="text-xs text-slate-400 mt-1">
                Mengambil halaman komik resolusi tinggi tanpa gangguan iklan & pop-up
              </p>
            </div>
          )}

          {/* Render Panels depending on mode */}
          {!isLoadingImages && settings.mode === 'webtoon' ? (
            /* Continuous Webtoon Scroll */
            <div className="space-y-3 px-2 py-4">
              {scrapedImages.length > 0 ? (
                /* Real Scraped Images from bacakomik.my */
                scrapedImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden bg-black shadow-xl border border-slate-800/60"
                  >
                    <img
                      src={imgUrl}
                      alt={`Halaman ${idx + 1}`}
                      className="w-full h-auto object-cover block"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[10px] text-slate-500 text-center py-1 bg-black/80 font-mono border-t border-slate-900">
                      Halaman {idx + 1} / {scrapedImages.length}
                    </div>
                  </div>
                ))
              ) : (
                /* Fallback Graphic Panels */
                chapter.panels.map((panel, idx) => (
                  <div
                    key={panel.id}
                    className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0f1624]"
                  >
                    {panel.type === 'image' && panel.imageUrl ? (
                      <img
                        src={panel.imageUrl}
                        alt={`Panel ${idx + 1}`}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    ) : (
                      /* High-Fidelity Illustrated Comic Scene */
                      <div
                        className={`p-6 sm:p-8 bg-gradient-to-b ${
                          panel.sceneData?.bgTheme || 'from-slate-900 to-black'
                        } relative min-h-[460px] flex flex-col justify-between overflow-hidden`}
                      >
                        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

                        {panel.sceneData?.narrative && (
                          <div className="relative z-10 self-start max-w-md bg-black/80 backdrop-blur-xs border-l-2 border-red-500 p-3 rounded-r-lg shadow-lg">
                            <p className="text-xs sm:text-sm text-slate-200 font-medium italic leading-relaxed">
                              {panel.sceneData.narrative}
                            </p>
                          </div>
                        )}

                        {panel.sceneData?.soundEffect && (
                          <div className="relative z-10 my-8 text-center pointer-events-none">
                            <span className="text-3xl sm:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-yellow-400 drop-shadow-[0_4px_12px_rgba(239,68,68,0.7)] font-display transform -rotate-3 inline-block">
                              {panel.sceneData.soundEffect}
                            </span>
                          </div>
                        )}

                        {panel.sceneData?.actionText && (
                          <div className="relative z-10 text-center my-2">
                            <span className="inline-block px-3 py-1 rounded bg-red-600/30 border border-red-500/50 text-red-200 font-bold text-xs uppercase tracking-wide">
                              {panel.sceneData.actionText}
                            </span>
                          </div>
                        )}

                        {panel.sceneData?.dialogue && (
                          <div className="relative z-10 space-y-3 mt-4">
                            {panel.sceneData.dialogue.map((dlg, dIdx) => {
                              const isRight = dlg.side === 'right';
                              return (
                                <div
                                  key={dIdx}
                                  className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}
                                >
                                  <div
                                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 shadow-2xl relative ${
                                      isRight
                                        ? 'bg-white text-slate-950 border-2 border-red-500/80 rounded-br-none'
                                        : 'bg-[#182338] text-slate-100 border border-slate-700 rounded-bl-none'
                                    }`}
                                  >
                                    <span
                                      className={`text-[10px] font-bold block uppercase tracking-wider mb-0.5 ${
                                        isRight ? 'text-red-700' : 'text-cyan-400'
                                      }`}
                                    >
                                      {dlg.speaker}
                                    </span>
                                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                                      "{dlg.text}"
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 font-mono">
                          {idx + 1} / {chapter.panels.length}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : !isLoadingImages ? (
            /* Paged Flip Mode (Manga Style) */
            <div className="px-2 py-4">
              {scrapedImages.length > 0 ? (
                /* Paged view with scraped images */
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
                  <img
                    src={scrapedImages[pagedCurrentIndex]}
                    alt={`Halaman ${pagedCurrentIndex + 1}`}
                    className="w-full h-auto object-cover block mx-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center text-xs text-slate-400 py-3 font-mono bg-black/80">
                    Halaman {pagedCurrentIndex + 1} dari {scrapedImages.length}
                  </div>
                </div>
              ) : chapter.panels[pagedCurrentIndex] ? (
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0f1624]">
                  {chapter.panels[pagedCurrentIndex].type === 'image' &&
                  chapter.panels[pagedCurrentIndex].imageUrl ? (
                    <img
                      src={chapter.panels[pagedCurrentIndex].imageUrl}
                      alt={`Halaman ${pagedCurrentIndex + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div
                      className={`p-6 sm:p-8 bg-gradient-to-b ${
                        chapter.panels[pagedCurrentIndex].sceneData?.bgTheme ||
                        'from-slate-900 to-black'
                      } min-h-[480px] flex flex-col justify-between`}
                    >
                      {chapter.panels[pagedCurrentIndex].sceneData?.narrative && (
                        <div className="bg-black/80 p-3 rounded-lg border-l-2 border-red-500">
                          <p className="text-xs sm:text-sm text-slate-200 italic">
                            {chapter.panels[pagedCurrentIndex].sceneData?.narrative}
                          </p>
                        </div>
                      )}

                      {chapter.panels[pagedCurrentIndex].sceneData?.soundEffect && (
                        <div className="text-center my-6">
                          <span className="text-4xl sm:text-6xl font-black italic tracking-tighter text-amber-400 drop-shadow-lg font-display">
                            {chapter.panels[pagedCurrentIndex].sceneData?.soundEffect}
                          </span>
                        </div>
                      )}

                      {chapter.panels[pagedCurrentIndex].sceneData?.dialogue && (
                        <div className="space-y-3">
                          {chapter.panels[pagedCurrentIndex].sceneData?.dialogue?.map(
                            (dlg, dIdx) => (
                              <div
                                key={dIdx}
                                className={`flex ${
                                  dlg.side === 'right' ? 'justify-end' : 'justify-start'
                                }`}
                              >
                                <div
                                  className={`p-3 rounded-2xl max-w-[80%] ${
                                    dlg.side === 'right'
                                      ? 'bg-white text-black font-semibold'
                                      : 'bg-slate-800 text-white'
                                  }`}
                                >
                                  <span className="text-[10px] block font-bold text-red-600">
                                    {dlg.speaker}
                                  </span>
                                  <p className="text-xs sm:text-sm">"{dlg.text}"</p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      <div className="text-center text-xs text-slate-400 mt-4">
                        Halaman {pagedCurrentIndex + 1} dari {chapter.panels.length}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Paged mode navigation buttons */}
              {(() => {
                const totalPages =
                  scrapedImages.length > 0 ? scrapedImages.length : chapter.panels.length;
                return (
                  <div className="flex items-center justify-between gap-4 mt-4 px-2">
                    <button
                      disabled={pagedCurrentIndex === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPagedCurrentIndex((prev) => Math.max(0, prev - 1));
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelumnya</span>
                    </button>
                    <span className="text-xs text-slate-400 font-mono">
                      {pagedCurrentIndex + 1} / {totalPages || 1}
                    </span>
                    <button
                      disabled={pagedCurrentIndex >= (totalPages || 1) - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPagedCurrentIndex((prev) =>
                          Math.min((totalPages || 1) - 1, prev + 1)
                        );
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 disabled:opacity-40 text-white text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })()}
            </div>
          ) : null}

          {/* Chapter Bottom Nav & Actions */}
          <div className="p-4 mt-6 mx-2 rounded-2xl bg-[#131b29] border border-slate-800 text-center">
            <h3 className="text-white text-sm font-bold font-display">
              Selesai Membaca {chapter.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Seluruh chapter tersedia gratis tanpa iklan!
            </p>

            <div className="flex items-center justify-center gap-3 mt-4">
              {prevChapter ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateChapter(prevChapter);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Ch. {prevChapter.number}</span>
                </button>
              ) : (
                <span className="text-xs text-slate-600 px-3 py-2">
                  Chapter Pertama
                </span>
              )}

              {nextChapter ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateChapter(nextChapter);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-950/40 flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>Lanjut Ch. {nextChapter.number}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBack();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Chapter Terakhir
                </button>
              )}
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="p-4 mt-4 mx-2 rounded-2xl bg-[#131b29] border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-red-400" />
                <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider">
                  Komentar ({comments.length})
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">Diskusi Pembaca</span>
            </div>

            {/* Input Comment */}
            <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Tulis pendapatmu tentang chapter ini..."
                className="flex-1 bg-slate-900 text-xs text-white rounded-xl px-3 py-2 outline-none border border-slate-700 focus:border-red-500"
              />
              <button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center justify-center transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="text-xs border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-semibold">{c.user}</span>
                    <span className="text-[10px] text-slate-500">{c.time}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Control Bar */}
      {showControls && (
        <div className="sticky bottom-0 z-50 bg-[#0b0f19]/95 backdrop-blur-md px-3 py-2.5 border-t border-slate-800 flex items-center justify-between gap-2 shadow-xl">
          {/* Previous Chapter button */}
          <button
            disabled={!prevChapter}
            onClick={() => prevChapter && onNavigateChapter(prevChapter)}
            className="p-2 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition-colors"
            title="Chapter Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Quick Chapter Selector Trigger */}
          <button
            onClick={() => setShowChapterList(true)}
            className="flex-1 max-w-xs py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors border border-slate-700"
          >
            <span className="truncate">Ch. {chapter.number}</span>
            <span className="text-[10px] text-red-400 font-normal">
              {settings.mode === 'webtoon' ? `${scrollProgress}%` : `Hal. ${pagedCurrentIndex + 1}`}
            </span>
          </button>

          {/* Next Chapter button */}
          <button
            disabled={!nextChapter}
            onClick={() => nextChapter && onNavigateChapter(nextChapter)}
            className="p-2 rounded-xl bg-red-600 disabled:opacity-30 text-white transition-colors shadow-md shadow-red-950/40"
            title="Chapter Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Reader Settings Modal / Bottom Sheet */}
      {showSettings && (
        <div
          onClick={() => setShowSettings(false)}
          className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-[#131b29] border border-slate-800 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200"
          >
            <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />
            <h3 className="text-white font-bold text-sm mb-4">Pengaturan Pembaca</h3>

            {/* Reading Mode */}
            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                Mode Membaca
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSettings({ ...settings, mode: 'webtoon' })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    settings.mode === 'webtoon'
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Webtoon (Vertikal)
                </button>
                <button
                  onClick={() => setSettings({ ...settings, mode: 'paged' })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    settings.mode === 'paged'
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Paged (Per Halaman)
                </button>
              </div>
            </div>

            {/* Theme Background */}
            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                Tema Latar
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSettings({ ...settings, theme: 'slate' })}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    settings.theme === 'slate'
                      ? 'bg-[#0b0f19] border-red-500 text-white'
                      : 'bg-[#0b0f19] border-slate-700 text-slate-400'
                  }`}
                >
                  Dark Slate
                </button>
                <button
                  onClick={() => setSettings({ ...settings, theme: 'oled' })}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    settings.theme === 'oled'
                      ? 'bg-black border-red-500 text-white'
                      : 'bg-black border-slate-700 text-slate-400'
                  }`}
                >
                  OLED Black
                </button>
                <button
                  onClick={() => setSettings({ ...settings, theme: 'sepia' })}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    settings.theme === 'sepia'
                      ? 'bg-[#1f1b16] border-red-500 text-[#e8dcc8]'
                      : 'bg-[#1f1b16] border-slate-700 text-slate-400'
                  }`}
                >
                  Sepia Warm
                </button>
              </div>
            </div>

            {/* Zoom Control */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Ukuran Gambar (Zoom)</span>
                <span className="text-white font-mono">{settings.zoom}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setSettings({ ...settings, zoom: Math.max(70, settings.zoom - 10) })
                  }
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="70"
                  max="130"
                  step="5"
                  value={settings.zoom}
                  onChange={(e) =>
                    setSettings({ ...settings, zoom: parseInt(e.target.value) })
                  }
                  className="flex-1 accent-red-600"
                />
                <button
                  onClick={() =>
                    setSettings({ ...settings, zoom: Math.min(130, settings.zoom + 10) })
                  }
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold mt-2"
            >
              Terapkan Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* Chapter List Modal */}
      {showChapterList && (
        <div
          onClick={() => setShowChapterList(false)}
          className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md max-h-[80vh] flex flex-col bg-[#131b29] border border-slate-800 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl"
          >
            <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-sm">Pilih Chapter</h3>
              <span className="text-xs text-slate-400">
                {comic.chapters.length} Chapter
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {[...comic.chapters]
                .sort((a, b) => b.number - a.number)
                .map((ch) => {
                  const isCurrent = ch.id === chapter.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        onNavigateChapter(ch);
                        setShowChapterList(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        isCurrent
                          ? 'bg-red-600 text-white font-bold'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="truncate pr-2">{ch.title}</span>
                      <span className="text-[10px] opacity-75 shrink-0">
                        {ch.releaseDate}
                      </span>
                    </button>
                  );
                })}
            </div>

            <button
              onClick={() => setShowChapterList(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold mt-3"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
