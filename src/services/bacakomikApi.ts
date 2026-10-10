import { Comic, Chapter } from '../types/comic';

export interface BacakomikLatestItem {
  id: string;
  title: string;
  url: string;
  type: 'Manga' | 'Manhwa' | 'Manhua';
  format: 'Berwarna' | 'Hitam Putih';
  cover: string;
  latestChapter: number;
  latestChapterText: string;
  latestChapterUrl: string;
  updatedTime: string;
  status: 'Ongoing' | 'Tamat';
  score: number;
}

export async function fetchBacakomikLatest(page = 1): Promise<Comic[]> {
  try {
    const res = await fetch(`/api/bacakomik/latest?page=${page}`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    return json.data.map((item: BacakomikLatestItem) => ({
      id: item.id,
      title: item.title,
      cover: item.cover,
      type: item.type,
      format: item.format,
      status: item.status,
      score: item.score,
      ratingCount: 84000,
      author: 'Official Bacakomik',
      artist: 'Official',
      genres: [item.type, 'Action', 'Adventure'],
      synopsis: `Baca komik ${item.title} chapter ${item.latestChapter} terbaru berbahasa Indonesia online gratis tanpa iklan di Bacakomik Alter. Bersumber dari bacakomik.my.`,
      latestChapter: item.latestChapter,
      latestChapterUrl: item.latestChapterUrl,
      totalChapters: item.latestChapter,
      updatedTime: item.updatedTime,
      views: '500K+',
      url: item.url,
      source: 'bacakomik.my',
      chapters: [
        {
          id: `${item.id}-latest`,
          number: item.latestChapter,
          title: item.latestChapterText || `Chapter ${item.latestChapter}`,
          releaseDate: item.updatedTime,
          views: '150K',
          url: item.latestChapterUrl,
          panels: [],
        },
      ],
    }));
  } catch (err) {
    console.warn('Failed to fetch from bacakomik latest endpoint:', err);
    return [];
  }
}

export async function searchBacakomik(query: string): Promise<Comic[]> {
  try {
    const res = await fetch(`/api/bacakomik/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    return json.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      cover: item.cover,
      type: item.type,
      format: item.format,
      status: item.status,
      score: item.score || 9.2,
      ratingCount: 45000,
      author: 'Bacakomik',
      artist: 'Komikus',
      genres: [item.type, 'Action'],
      synopsis: `Komik ${item.title} bahasa Indonesia langsung dari bacakomik.my tanpa iklan.`,
      latestChapter: item.latestChapter,
      latestChapterUrl: item.latestChapterUrl,
      totalChapters: item.latestChapter,
      updatedTime: 'Baru',
      views: '200K+',
      url: item.url,
      source: 'bacakomik.my',
      chapters: [
        {
          id: `${item.id}-ch-${item.latestChapter}`,
          number: item.latestChapter,
          title: item.latestChapterText || `Chapter ${item.latestChapter}`,
          releaseDate: 'Tersedia',
          views: '80K',
          url: item.latestChapterUrl,
          panels: [],
        },
      ],
    }));
  } catch (err) {
    console.warn('Search bacakomik failed:', err);
    return [];
  }
}

export async function fetchBacakomikDetail(comicUrl: string): Promise<{
  title?: string;
  cover?: string;
  synopsis?: string;
  genres?: string[];
  author?: string;
  status?: 'Ongoing' | 'Tamat';
  score?: number;
  chapters?: Chapter[];
} | null> {
  try {
    const res = await fetch(`/api/bacakomik/detail?url=${encodeURIComponent(comicUrl)}`);
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.success || !json.data) return null;

    const d = json.data;
    return {
      title: d.title,
      cover: d.cover,
      synopsis: d.synopsis,
      genres: d.genres,
      author: d.author,
      status: d.status,
      score: d.score,
      chapters: d.chapters?.map((ch: any) => ({
        id: ch.id,
        number: ch.number,
        title: ch.title,
        releaseDate: ch.releaseDate,
        views: ch.views,
        url: ch.url,
        panels: [],
      })),
    };
  } catch (err) {
    console.warn('Fetch detail failed:', err);
    return null;
  }
}

export async function fetchBacakomikChapterImages(chapterUrl: string): Promise<{
  images: string[];
  prevUrl?: string;
  nextUrl?: string;
}> {
  try {
    const res = await fetch(`/api/bacakomik/chapter?url=${encodeURIComponent(chapterUrl)}`);
    if (!res.ok) return { images: [] };
    const json = await res.json();
    if (!json.success || !Array.isArray(json.images)) return { images: [] };
    return {
      images: json.images,
      prevUrl: json.prevUrl,
      nextUrl: json.nextUrl,
    };
  } catch (err) {
    console.warn('Fetch chapter images failed:', err);
    return { images: [] };
  }
}
