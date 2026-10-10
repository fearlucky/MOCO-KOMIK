import React from 'react';
import { Home, Compass, Heart, Settings, RefreshCw } from 'lucide-react';

export type TabType = 'home' | 'explore' | 'favorites' | 'me';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  onRefreshFeed: () => void;
  isRefreshing?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onRefreshFeed,
  isRefreshing = false,
}) => {
  return (
    <>
      {/* Floating Refresh Button from Screenshot (positioned bottom right above the nav bar) */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={onRefreshFeed}
          aria-label="Refresh Rekomendasi"
          className="w-12 h-12 rounded-full bg-[#1b263b] hover:bg-[#23314c] active:scale-90 text-slate-200 hover:text-white flex items-center justify-center shadow-xl shadow-black/50 border border-slate-700/80 transition-all group"
        >
          <RefreshCw
            className={`w-5 h-5 text-slate-300 group-hover:text-white transition-transform ${
              isRefreshing ? 'animate-spin text-red-400' : ''
            }`}
          />
        </button>
      </div>

      {/* Fixed Bottom Navigation Bar matching screenshot */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0f19]/95 backdrop-blur-md border-t border-slate-800/80">
        <div className="max-w-md mx-auto grid grid-cols-4 h-16 items-center px-2">
          {/* Home Tab */}
          <button
            onClick={() => onChangeTab('home')}
            className={`flex flex-col items-center justify-center h-full transition-colors ${
              activeTab === 'home' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Home
                className={`w-5 h-5 transition-transform ${
                  activeTab === 'home' ? 'scale-110 text-red-500 fill-red-500/20' : ''
                }`}
              />
              {activeTab === 'home' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
              )}
            </div>
            <span
              className={`text-[11px] font-semibold mt-1 tracking-tight ${
                activeTab === 'home' ? 'text-white font-bold' : ''
              }`}
            >
              Home
            </span>
          </button>

          {/* Explore Tab */}
          <button
            onClick={() => onChangeTab('explore')}
            className={`flex flex-col items-center justify-center h-full transition-colors ${
              activeTab === 'explore' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Compass
                className={`w-5 h-5 transition-transform ${
                  activeTab === 'explore' ? 'scale-110 text-red-500' : ''
                }`}
              />
              {activeTab === 'explore' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
              )}
            </div>
            <span
              className={`text-[11px] font-semibold mt-1 tracking-tight ${
                activeTab === 'explore' ? 'text-white font-bold' : ''
              }`}
            >
              Explore
            </span>
          </button>

          {/* Favorit Tab */}
          <button
            onClick={() => onChangeTab('favorites')}
            className={`flex flex-col items-center justify-center h-full transition-colors ${
              activeTab === 'favorites' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Heart
                className={`w-5 h-5 transition-transform ${
                  activeTab === 'favorites' ? 'scale-110 text-red-500 fill-red-500' : ''
                }`}
              />
              {activeTab === 'favorites' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
              )}
            </div>
            <span
              className={`text-[11px] font-semibold mt-1 tracking-tight ${
                activeTab === 'favorites' ? 'text-white font-bold' : ''
              }`}
            >
              Favorit
            </span>
          </button>

          {/* Me Tab */}
          <button
            onClick={() => onChangeTab('me')}
            className={`flex flex-col items-center justify-center h-full transition-colors ${
              activeTab === 'me' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Settings
                className={`w-5 h-5 transition-transform ${
                  activeTab === 'me' ? 'scale-110 text-red-500' : ''
                }`}
              />
              {activeTab === 'me' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
              )}
            </div>
            <span
              className={`text-[11px] font-semibold mt-1 tracking-tight ${
                activeTab === 'me' ? 'text-white font-bold' : ''
              }`}
            >
              Me
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
