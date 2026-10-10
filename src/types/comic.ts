export type ComicType = 'Manga' | 'Manhwa' | 'Manhua';
export type ComicFormat = 'Berwarna' | 'Hitam Putih';
export type ComicStatus = 'Ongoing' | 'Tamat';

export interface ChapterPanel {
  id: string;
  type: 'image' | 'scene';
  imageUrl?: string;
  sceneData?: {
    narrative?: string;
    actionText?: string;
    dialogue?: { speaker: string; text: string; side?: 'left' | 'right' }[];
    soundEffect?: string;
    bgTheme: string;
    illustrationType: 'duel' | 'magic' | 'dungeon' | 'sword' | 'city' | 'cliffhanger';
  };
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  views: string;
  url?: string;
  imageUrls?: string[];
  panels: ChapterPanel[];
}

export interface Comic {
  id: string;
  title: string;
  originalTitle?: string;
  altTitles?: string[];
  cover: string;
  banner?: string;
  type: ComicType;
  format: ComicFormat;
  status: ComicStatus;
  score: number;
  ratingCount: number;
  author: string;
  artist: string;
  genres: string[];
  synopsis: string;
  latestChapter: number;
  latestChapterUrl?: string;
  totalChapters: number;
  chapters: Chapter[];
  updatedTime: string;
  views: string;
  isFeatured?: boolean;
  url?: string;
  source?: 'bacakomik.my' | 'local';
}

export interface ReadingHistoryItem {
  comicId: string;
  comicTitle: string;
  comicCover: string;
  comicType: ComicType;
  chapterId: string;
  chapterNumber: number;
  progressPercent: number;
  lastReadAt: number;
}

export interface ReaderSettings {
  mode: 'webtoon' | 'paged';
  theme: 'slate' | 'oled' | 'sepia';
  zoom: number; // 80 - 140%
  autoScroll: boolean;
  autoScrollSpeed: number; // 1 - 5
}
