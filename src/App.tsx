/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Comic,
  Chapter,
  ComicType,
  ComicFormat,
  ReadingHistoryItem,
} from './types/comic';
import { INITIAL_COMICS } from './data/comicsData';
import { Header } from './components/Header';
import { AdFreeBanner } from './components/AdFreeBanner';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { ComicTypeSelector } from './components/ComicTypeSelector';
import { ComicCard } from './components/ComicCard';
import { ComicDetailView } from './components/ComicDetailView';
import { ComicReader } from './components/ComicReader';
import { BottomNav, TabType } from './components/BottomNav';
import { ExploreView } from './components/ExploreView';
import { FavoritesView } from './components/FavoritesView';
import { ProfileView } from './components/ProfileView';
import { LoginModal } from './components/LoginModal';
import { Flame, Clock, Sparkles, ChevronRight, BookOpen } from 'lucide-react';
import { fetchBacakomikLatest } from './services/bacakomikApi';

export default function App() {
  const [comics, setComics] = useState<Comic[]>(INITIAL_COMICS);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [readingState, setReadingState] = useState<{
    comic: Comic;
    chapter: Chapter;
  } | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<
    ComicType | 'Semua' | 'Berwarna'
  >('Semua');

  // User State
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('bacakomik_user') || 'Lucky';
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('bacakomik_logged_in') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bacakomik_bookmarks');
      return saved ? JSON.parse(saved) : ['solo-leveling', 'return-mount-hua'];
    } catch {
      return ['solo-leveling', 'return-mount-hua'];
    }
  });

  // Reading History
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('bacakomik_history');
      if (saved) return JSON.parse(saved);
      // Pre-seed initial active item for demonstration
      return [
        {
          comicId: 'solo-leveling',
          comicTitle: 'Solo Leveling',
          comicCover: INITIAL_COMICS[0].cover,
          comicType: 'Manhwa',
          chapterId: 'solo-179',
          chapterNumber: 179,
          progressPercent: 65,
          lastReadAt: Date.now() - 1000 * 60 * 25,
        },
      ];
    } catch {
      return [];
    }
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('bacakomik_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Persist history
  useEffect(() => {
    localStorage.setItem('bacakomik_history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  // Live integration: Fetch latest updates from bacakomik.my on mount
  useEffect(() => {
    let isMounted = true;
    fetchBacakomikLatest(1)
      .then((live) => {
        if (isMounted && live && live.length > 0) {
          setComics((prev) => {
            const liveIds = new Set(live.map((c) => c.id));
            const existingKept = prev.filter((c) => !liveIds.has(c.id));
            return [...live, ...existingKept];
          });
          showToast('Tersambung ke server bacakomik.my (Live Updates)');
        }
      })
      .catch((err) => {
        console.warn('Live fetch error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (e: React.MouseEvent, comic: Comic) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(comic.id)) {
      setBookmarkedIds(bookmarkedIds.filter((id) => id !== comic.id));
      showToast(`Dihapus dari favorit: ${comic.title}`);
    } else {
      setBookmarkedIds([...bookmarkedIds, comic.id]);
      showToast(`Ditambahkan ke favorit: ${comic.title}`);
    }
  };

  // Start reading chapter
  const handleOpenChapter = (comic: Comic, chapter: Chapter) => {
    setReadingState({ comic, chapter });
    // Update or add to history
    setReadingHistory((prev) => {
      const filtered = prev.filter((h) => h.comicId !== comic.id);
      const newEntry: ReadingHistoryItem = {
        comicId: comic.id,
        comicTitle: comic.title,
        comicCover: comic.cover,
        comicType: comic.type,
        chapterId: chapter.id,
        chapterNumber: chapter.number,
        progressPercent: 10,
        lastReadAt: Date.now(),
      };
      return [newEntry, ...filtered];
    });
  };

  // Update reading progress % from reader
  const handleUpdateProgress = (progress: number) => {
    if (!readingState) return;
    setReadingHistory((prev) =>
      prev.map((item) =>
        item.comicId === readingState.comic.id &&
        item.chapterId === readingState.chapter.id
          ? { ...item, progressPercent: progress, lastReadAt: Date.now() }
          : item
      )
    );
  };

  // Refresh recommendation button from bacakomik.my
  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    fetchBacakomikLatest(1)
      .then((live) => {
        if (live && live.length > 0) {
          setComics((prev) => {
            const liveIds = new Set(live.map((c) => c.id));
            const existingKept = prev.filter((c) => !liveIds.has(c.id));
            return [...live, ...existingKept];
          });
          showToast('Data bacakomik.my diperbarui!');
        } else {
          setComics((prev) => [...prev].sort(() => Math.random() - 0.5));
          showToast('Rekomendasi komik diperbarui!');
        }
      })
      .catch(() => {
        setComics((prev) => [...prev].sort(() => Math.random() - 0.5));
        showToast('Rekomendasi komik diperbarui!');
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  // Clear history
  const handleClearHistory = () => {
    setReadingHistory([]);
    showToast('Seluruh riwayat baca dibersihkan');
  };

  // Clear all data
  const handleClearAllData = () => {
    setReadingHistory([]);
    setBookmarkedIds([]);
    localStorage.clear();
    showToast('Data aplikasi berhasil direset!');
  };

  // Quick continue from history
  const handleContinueReadingFromHistory = (item: ReadingHistoryItem) => {
    const comic = comics.find((c) => c.id === item.comicId);
    if (!comic) return;
    const ch =
      comic.chapters.find((c) => c.id === item.chapterId) || comic.chapters[0];
    handleOpenChapter(comic, ch);
  };

  // Filtered comics on Home
  const filteredHomeComics = comics.filter((c) => {
    if (selectedTypeFilter === 'Semua') return true;
    if (selectedTypeFilter === 'Berwarna') return c.format === 'Berwarna';
    return c.type === selectedTypeFilter;
  });

  const latestUpdatedComics = [...filteredHomeComics].sort(
    (a, b) => b.latestChapter - a.latestChapter
  );
  const popularComics = [...filteredHomeComics].sort((a, b) => b.score - a.score);

  // If currently inside Reader mode
  if (readingState) {
    return (
      <ComicReader
        comic={readingState.comic}
        chapter={readingState.chapter}
        onBack={() => setReadingState(null)}
        onNavigateChapter={(newChapter) =>
          handleOpenChapter(readingState.comic, newChapter)
        }
        onUpdateProgress={handleUpdateProgress}
      />
    );
  }

  // If currently inside Comic Detail mode
  if (selectedComic) {
    const comicHistory = readingHistory.find(
      (h) => h.comicId === selectedComic.id
    );
    return (
      <div className="max-w-2xl mx-auto min-h-screen bg-[#0b0f19]">
        <ComicDetailView
          comic={selectedComic}
          onBack={() => setSelectedComic(null)}
          onReadChapter={handleOpenChapter}
          isBookmarked={bookmarkedIds.includes(selectedComic.id)}
          onToggleBookmark={() => {
            if (bookmarkedIds.includes(selectedComic.id)) {
              setBookmarkedIds(
                bookmarkedIds.filter((id) => id !== selectedComic.id)
              );
              showToast(`Dihapus dari favorit`);
            } else {
              setBookmarkedIds([...bookmarkedIds, selectedComic.id]);
              showToast(`Ditambahkan ke favorit`);
            }
          }}
          historyItem={comicHistory}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      {/* Container with responsive mobile-first max width */}
      <div className="w-full max-w-xl mx-auto min-h-screen flex flex-col pb-6 relative">
        {/* Top Header */}
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onSearchClick={() => {
            if (activeTab !== 'explore') setActiveTab('explore');
          }}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q && activeTab !== 'explore') setActiveTab('explore');
          }}
        />

        {/* Tab Content */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <div className="pt-2 animate-in fade-in duration-200">
              {/* Ad-Free Status Banner honoring user prompt */}
              <AdFreeBanner />

              {/* Rilis Terbaru (Featured Carousel) */}
              <FeaturedCarousel
                comics={comics}
                onSelectComic={(comic) => setSelectedComic(comic)}
                onReadLatest={(comic) => {
                  const latest = [...comic.chapters].sort(
                    (a, b) => b.number - a.number
                  )[0];
                  if (latest) handleOpenChapter(comic, latest);
                }}
              />

              {/* Tipe Komik (Manga, Manhua, Manhwa, Berwarna) */}
              <ComicTypeSelector
                selectedType={selectedTypeFilter}
                onSelectType={(type) => {
                  setSelectedTypeFilter(type);
                }}
              />

              {/* Continue Reading Bar if user has history */}
              {readingHistory.length > 0 && (
                <section className="px-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-[#182438] to-[#121a29] border border-slate-700/80 flex items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                          Lanjutkan Membaca
                        </span>
                        <h4 className="text-white text-xs sm:text-sm font-semibold truncate">
                          {readingHistory[0].comicTitle} · Ch.{' '}
                          {readingHistory[0].chapterNumber}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleContinueReadingFromHistory(readingHistory[0])
                      }
                      className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shrink-0 shadow-md shadow-red-950/40 flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <span>Lanjut</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* Section: Update Komik Hari Ini */}
              <section className="px-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-red-500" />
                    <h2 className="text-white text-base font-bold font-display tracking-tight">
                      Update Komik Terkini
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-0.5"
                  >
                    <span>Semua</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {latestUpdatedComics.slice(0, 6).map((comic) => (
                    <ComicCard
                      key={comic.id}
                      comic={comic}
                      isBookmarked={bookmarkedIds.includes(comic.id)}
                      onSelect={(c) => setSelectedComic(c)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </section>

              {/* Section: Rekomendasi Populer */}
              <section className="px-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h2 className="text-white text-base font-bold font-display tracking-tight">
                      Populer & Paling Banyak Dibaca
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-0.5"
                  >
                    <span>Lihat Top</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {popularComics.slice(0, 4).map((comic) => (
                    <ComicCard
                      key={comic.id}
                      comic={comic}
                      isBookmarked={bookmarkedIds.includes(comic.id)}
                      onSelect={(c) => setSelectedComic(c)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'explore' && (
            <ExploreView
              comics={comics}
              onSelectComic={(c) => setSelectedComic(c)}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              initialType={selectedTypeFilter}
              initialSearchQuery={searchQuery}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              comics={comics}
              bookmarkedIds={bookmarkedIds}
              readingHistory={readingHistory}
              onSelectComic={(c) => setSelectedComic(c)}
              onContinueReading={handleContinueReadingFromHistory}
              onClearHistory={handleClearHistory}
              onToggleBookmark={handleToggleBookmark}
              onExploreClick={() => setActiveTab('explore')}
            />
          )}

          {activeTab === 'me' && (
            <ProfileView
              userName={userName}
              isLoggedIn={isLoggedIn}
              onUpdateUserName={(name) => {
                setUserName(name);
                localStorage.setItem('bacakomik_user', name);
                showToast(`Nama profil diubah ke ${name}`);
              }}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
              readingHistory={readingHistory}
              bookmarkedCount={bookmarkedIds.length}
              onClearHistory={handleClearHistory}
              onClearAllData={handleClearAllData}
            />
          )}
        </main>

        {/* Bottom Nav with floating refresh button */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onRefreshFeed={handleRefreshFeed}
          isRefreshing={isRefreshing}
        />
      </div>

      {/* Login / Profile Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentName={userName}
        onLogin={(name) => {
          setUserName(name);
          setIsLoggedIn(true);
          localStorage.setItem('bacakomik_user', name);
          localStorage.setItem('bacakomik_logged_in', 'true');
          showToast(`Selamat datang kembali, ${name}!`);
        }}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-60 bg-slate-900/95 border border-slate-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
