import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// Helper to fetch bacakomik.my with proper headers
async function fetchBacakomik(url: string) {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Referer: 'https://bacakomik.my/',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  });
  if (!resp.ok) {
    throw new Error(`Failed to fetch ${url} (status: ${resp.status})`);
  }
  return await resp.text();
}

// 1. API: Latest Comics from bacakomik.my
app.get('/api/bacakomik/latest', async (req, res) => {
  try {
    const page = req.query.page || '1';
    const targetUrl =
      page === '1' ? 'https://bacakomik.my/' : `https://bacakomik.my/page/${page}/`;

    const html = await fetchBacakomik(targetUrl);
    const $ = cheerio.load(html);

    const comics: any[] = [];
    $('.animepost').each((i, el) => {
      const title = $(el).find('h4').text().trim();
      const link = $(el).find('a').attr('href') || '';
      const typeClass = $(el).find('.typeflag').attr('class') || '';
      let type = 'Manga';
      if (typeClass.includes('Manhwa')) type = 'Manhwa';
      else if (typeClass.includes('Manhua')) type = 'Manhua';

      let cover =
        $(el).find('img').attr('data-lazy-src') ||
        $(el).find('img').attr('src') ||
        '';

      const chapterText = $(el).find('.lsch a').text().trim();
      const chapterUrl = $(el).find('.lsch a').attr('href') || '';
      const dateText = $(el).find('.datech').text().trim() || 'Baru';

      // Clean chapter number
      const numMatch = chapterText.match(/(\d+(\.\d+)?)/);
      const chapterNum = numMatch ? parseFloat(numMatch[1]) : 1;

      if (title && link) {
        // Generate slug id
        const slug = link.replace('https://bacakomik.my/komik/', '').replace(/\/$/, '');
        comics.push({
          id: slug || `comic-${i}`,
          title,
          url: link,
          type,
          format: type === 'Manhwa' || type === 'Manhua' ? 'Berwarna' : 'Hitam Putih',
          cover: cover.startsWith('http') ? cover : `https://bacakomik.my${cover}`,
          latestChapter: chapterNum,
          latestChapterText: chapterText.replace(/\s+/g, ' '),
          latestChapterUrl: chapterUrl,
          updatedTime: dateText,
          status: 'Ongoing',
          score: 9.0 + (i % 5) * 0.08,
        });
      }
    });

    res.json({
      success: true,
      source: 'https://bacakomik.my',
      total: comics.length,
      page: parseInt(page as string),
      data: comics,
    });
  } catch (err: any) {
    console.error('Error in /api/bacakomik/latest:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. API: Search Comics from bacakomik.my
app.get('/api/bacakomik/search', async (req, res) => {
  try {
    const q = (req.query.q as string) || '';
    if (!q.trim()) {
      return res.json({ success: true, total: 0, data: [] });
    }

    const searchUrl = `https://bacakomik.my/?s=${encodeURIComponent(q.trim())}`;
    const html = await fetchBacakomik(searchUrl);
    const $ = cheerio.load(html);

    const results: any[] = [];
    $('.animepost').each((i, el) => {
      const title = $(el).find('h4').text().trim();
      const link = $(el).find('a').attr('href') || '';
      const typeClass = $(el).find('.typeflag').attr('class') || '';
      let type = 'Manga';
      if (typeClass.includes('Manhwa')) type = 'Manhwa';
      else if (typeClass.includes('Manhua')) type = 'Manhua';

      let cover =
        $(el).find('img').attr('data-lazy-src') ||
        $(el).find('img').attr('src') ||
        '';

      const chapterText = $(el).find('.lsch a').text().trim();
      const chapterUrl = $(el).find('.lsch a').attr('href') || '';
      const numMatch = chapterText.match(/(\d+(\.\d+)?)/);
      const chapterNum = numMatch ? parseFloat(numMatch[1]) : 1;

      if (title && link) {
        const slug = link.replace('https://bacakomik.my/komik/', '').replace(/\/$/, '');
        results.push({
          id: slug || `search-${i}`,
          title,
          url: link,
          type,
          format: type === 'Manhwa' || type === 'Manhua' ? 'Berwarna' : 'Hitam Putih',
          cover: cover.startsWith('http') ? cover : `https://bacakomik.my${cover}`,
          latestChapter: chapterNum,
          latestChapterText: chapterText.replace(/\s+/g, ' '),
          latestChapterUrl: chapterUrl,
          status: 'Ongoing',
          score: 9.15,
        });
      }
    });

    res.json({
      success: true,
      query: q,
      total: results.length,
      data: results,
    });
  } catch (err: any) {
    console.error('Error in /api/bacakomik/search:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. API: Comic Detail & Chapter List from bacakomik.my
app.get('/api/bacakomik/detail', async (req, res) => {
  try {
    const url = req.query.url as string;
    if (!url) {
      return res.status(400).json({ success: false, error: 'url parameter required' });
    }

    const html = await fetchBacakomik(url);
    const $ = cheerio.load(html);

    // Title
    const title =
      $('h1.entry-title').text().trim() ||
      $('.infox h1').text().trim() ||
      $('h1').first().text().trim();

    // Cover
    let cover =
      $('.thumb img').attr('data-lazy-src') ||
      $('.thumb img').attr('src') ||
      $('img[title*="Komik"]').attr('data-lazy-src') ||
      '';

    // Synopsis
    let synopsis =
      $('.entry-content[itemprop="description"]').text().trim() ||
      $('.desc').text().trim() ||
      $('.sinopsis').text().trim();
    synopsis = synopsis.replace(/\s+/g, ' ').replace(/^Sinopsis\s+/i, '');

    // Genres
    const genres: string[] = [];
    $('.genre-info a, a[href*="/genre/"]').each((_, el) => {
      const g = $(el).text().trim();
      if (g && !genres.includes(g)) genres.push(g);
    });

    // Author & Status & Type
    let author = 'Komikus';
    let status = 'Ongoing';
    let type = 'Manga';

    $('.spe span').each((_, el) => {
      const text = $(el).text();
      if (text.includes('Pengarang:') || text.includes('Author:')) {
        author = text.split(':')[1]?.trim() || author;
      }
      if (text.includes('Status:')) {
        const s = text.split(':')[1]?.trim();
        if (s && s.toLowerCase().includes('completed') || s?.toLowerCase().includes('tamat')) {
          status = 'Tamat';
        }
      }
      if (text.includes('Jenis Komik:') || text.includes('Type:')) {
        const t = text.split(':')[1]?.trim();
        if (t?.includes('Manhwa')) type = 'Manhwa';
        else if (t?.includes('Manhua')) type = 'Manhua';
      }
    });

    // Score
    const ratingText = $('.rating strong, [itemprop="ratingValue"]').text().trim();
    const score = ratingText ? parseFloat(ratingText) : 9.25;

    // Chapters
    const chapters: any[] = [];
    $('.epsbr a, #chapter_list li a, .bxcl ul li a, .lchx a').each((_, el) => {
      const chUrl = $(el).attr('href');
      let chTitle = $(el).find('.barunew, span').text().trim() || $(el).text().trim();
      chTitle = chTitle.replace(/\s+/g, ' ');

      if (chUrl && !chapters.some((c) => c.url === chUrl)) {
        const numMatch = chUrl.match(/chapter-?(\d+(\.\d+)?)/i);
        const num = numMatch ? parseFloat(numMatch[1]) : chapters.length + 1;
        chapters.push({
          id: chUrl.replace(/https?:\/\/bacakomik\.my\//, '').replace(/\/$/, ''),
          number: num,
          title: chTitle || `Chapter ${num}`,
          url: chUrl,
          releaseDate: 'Tersedia',
          views: '100K+',
        });
      }
    });

    res.json({
      success: true,
      data: {
        title: title.replace(/^Komik\s+/i, ''),
        url,
        cover,
        synopsis: synopsis || 'Baca komik ini gratis tanpa iklan di Bacakomik Alter.',
        genres: genres.length > 0 ? genres : ['Action', 'Fantasy'],
        author,
        status,
        type,
        format: type === 'Manhwa' || type === 'Manhua' ? 'Berwarna' : 'Hitam Putih',
        score: isNaN(score) ? 9.2 : score,
        chapters,
      },
    });
  } catch (err: any) {
    console.error('Error in /api/bacakomik/detail:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. API: Chapter Pages & Images from bacakomik.my
app.get('/api/bacakomik/chapter', async (req, res) => {
  try {
    const url = req.query.url as string;
    if (!url) {
      return res.status(400).json({ success: false, error: 'url parameter required' });
    }

    const html = await fetchBacakomik(url);
    const $ = cheerio.load(html);

    // Extract images inside reader
    const images: string[] = [];
    $('img').each((_, el) => {
      const src = $(el).attr('data-lazy-src') || $(el).attr('src');
      const alt = $(el).attr('alt') || '';
      if (
        src &&
        src.startsWith('http') &&
        (alt.toLowerCase().includes('chapter') ||
          src.includes('/data/') ||
          src.includes('wp-content/uploads/WP-manga'))
      ) {
        if (!images.includes(src)) images.push(src);
      }
    });

    // If images empty, try finding all images inside #readerarea
    if (images.length === 0) {
      $('#readerarea img').each((_, el) => {
        const src = $(el).attr('data-lazy-src') || $(el).attr('src');
        if (src && src.startsWith('http') && !images.includes(src)) {
          images.push(src);
        }
      });
    }

    // Previous and Next chapter links
    const prevUrl = $('a[rel="prev"], .nextprev a.prev').attr('href') || null;
    const nextUrl = $('a[rel="next"], .nextprev a.next').attr('href') || null;

    // Convert image URLs through our proxy to prevent CORS and hotlinking restrictions
    const proxiedImages = images.map(
      (img) => `/api/bacakomik/proxy-image?url=${encodeURIComponent(img)}`
    );

    res.json({
      success: true,
      url,
      totalImages: images.length,
      images: proxiedImages,
      rawImages: images,
      prevUrl,
      nextUrl,
    });
  } catch (err: any) {
    console.error('Error in /api/bacakomik/chapter:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. API: Image Proxy with Referer Header
app.get('/api/bacakomik/proxy-image', async (req, res) => {
  try {
    const targetUrl = req.query.url as string;
    if (!targetUrl) return res.status(400).send('URL required');

    const imageResp = await fetch(targetUrl, {
      headers: {
        'User-Agent': USER_AGENT,
        Referer: 'https://bacakomik.my/',
      },
    });

    if (!imageResp.ok) {
      return res.status(imageResp.status).send('Image fetch failed');
    }

    const contentType = imageResp.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24h

    const arrayBuffer = await imageResp.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    console.error('Error in /api/bacakomik/proxy-image:', err.message);
    res.status(502).send('Error proxying image');
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} [mode: ${isProd ? 'prod' : 'dev'}]`);
    console.log(`Base komik live integration connected to https://bacakomik.my`);
  });
}

startServer();
