import { Comic } from '../types/comic';

// Generated authentic high-resolution cover arts
import soloCover from '../assets/images/cover_solo_hunter_1791654901631.jpg';
import mountHuaCover from '../assets/images/cover_mount_hua_1791654914048.jpg';
import magicEmperorCover from '../assets/images/cover_magic_emperor_1791654926073.jpg';
import sorcererCover from '../assets/images/cover_sorcerer_manga_1791654937962.jpg';

export const INITIAL_COMICS: Comic[] = [
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    originalTitle: '나 혼자만 레벨업',
    altTitles: ['Only I Level Up', 'I Level Up Alone'],
    cover: soloCover,
    banner: soloCover,
    type: 'Manhwa',
    format: 'Berwarna',
    status: 'Tamat',
    score: 9.33,
    ratingCount: 184200,
    author: 'Chugong',
    artist: 'DUBU (REDICE STUDIO)',
    genres: ['Action', 'Fantasy', 'System', 'Supernatural', 'Dungeon'],
    synopsis:
      'Di dunia di mana monster bermunculan dari gerbang misterius, manusia dengan kekuatan super yang dikenal sebagai "Hunter" bertarung demi melindungi umat manusia. Sung Jin-Woo, seorang Hunter Rank-E yang dijuluki sebagai "Hunter Terlemah di Dunia", hampir terbunuh di dalam Double Dungeon misterius. Namun saat di ambang kematian, ia menerima Quest tersembunyi dari "Sistem" misterius yang hanya bisa dilihat oleh dirinya sendiri: kesempatan untuk naik level tanpa batas!',
    latestChapter: 179,
    totalChapters: 179,
    updatedTime: '2 jam lalu',
    views: '4.8M',
    isFeatured: true,
    chapters: [
      {
        id: 'solo-179',
        number: 179,
        title: 'Chapter 179 - Epilogue & New Dawn (End)',
        releaseDate: '10 Okt 2026',
        views: '350K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Perang para Monarch telah berakhir. Dunia manusia kembali damai tanpa ada ingatan tentang monster.',
              actionText: 'Jin-Woo berdiri di puncak tebing memandang matahari terbit bersama bayangan pasukan setianya.',
              dialogue: [
                { speaker: 'Beru', text: 'Rajaku, apakah waktu istirahat telah tiba bagi kita?', side: 'left' },
                { speaker: 'Sung Jin-Woo', text: 'Tidak Beru... kita hanya sedang menjaga perdamaian ini dari balik bayangan.', side: 'right' }
              ],
              soundEffect: 'FWOOOSHH',
              bgTheme: 'from-purple-950 via-slate-900 to-indigo-950',
              illustrationType: 'cliffhanger'
            }
          },
          {
            id: 'p-2',
            type: 'scene',
            sceneData: {
              narrative: 'Mata Jin-Woo memancarkan aura ungu kebiruan yang mistis. Suara detak jantung sang Shadow Monarch berdegup tenang.',
              actionText: 'Ribuan bayangan Shadow Soldiers berlutut dengan khidmat di sekelilingnya.',
              dialogue: [
                { speaker: 'Igris', text: 'Pedang hamba selamanya milik Yang Mulia Jin-Woo.', side: 'left' },
                { speaker: 'Sung Jin-Woo', text: 'Bagus. Bangkitlah... mari kita pulang.', side: 'right' }
              ],
              soundEffect: 'ARISE...!',
              bgTheme: 'from-slate-950 via-purple-900 to-black',
              illustrationType: 'magic'
            }
          },
          {
            id: 'p-3',
            type: 'scene',
            sceneData: {
              narrative: 'Catatan Akhir: Terima kasih telah mengikuti perjalanan Hunter Terlemah hingga menjadi Dewa Bayangan.',
              actionText: '[ TAMAT - Solo Leveling Chapter 179 ]',
              dialogue: [
                { speaker: 'Sistem', text: '[Pemberitahuan: Seluruh quest telah berhasil diselesaikan dengan sempurna.]', side: 'right' }
              ],
              soundEffect: 'LEVEL MAX',
              bgTheme: 'from-indigo-950 via-slate-950 to-black',
              illustrationType: 'dungeon'
            }
          }
        ]
      },
      {
        id: 'solo-178',
        number: 178,
        title: 'Chapter 178 - Pertarungan Pamungkas',
        releaseDate: '03 Okt 2026',
        views: '298K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Langit terbelah saat dua kekuatan absolut saling bertabrakan di atas lautan awan kelabu.',
              actionText: 'Jin-Woo menghunus Kamish\'s Wrath dengan kecepatan melampaui suara!',
              dialogue: [
                { speaker: 'Antares', text: 'Bagaimana mungkin seorang manusia fana menampung kekuatan Penguasa Bayangan?!', side: 'left' },
                { speaker: 'Sung Jin-Woo', text: 'Karena aku tidak pernah menyerah saat berada di titik terendah!', side: 'right' }
              ],
              soundEffect: 'KABOOOMMM!!',
              bgTheme: 'from-red-950 via-purple-950 to-black',
              illustrationType: 'duel'
            }
          },
          {
            id: 'p-2',
            type: 'scene',
            sceneData: {
              narrative: 'Aura naga kehancuran membakar cakrawala, namun kabut hitam pasukan bayangan menelannya bulat-bulat.',
              soundEffect: 'SRINGGGG!!',
              bgTheme: 'from-blue-950 via-slate-900 to-black',
              illustrationType: 'magic'
            }
          }
        ]
      },
      {
        id: 'solo-1',
        number: 1,
        title: 'Chapter 01 - Hunter Terlemah di Dunia',
        releaseDate: '15 Jan 2024',
        views: '1.2M',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Gerbang Rank D di bawah stasiun kereta bawah tanah Seoul. Para Hunter bersiap melangkah masuk.',
              dialogue: [
                { speaker: 'Hunter Lain', text: 'Hei, itu Sung Jin-Woo kan? Sang "Hunter Terlemah"? Kalau dia ada, dungeon ini pasti aman.', side: 'left' },
                { speaker: 'Sung Jin-Woo', text: '(Tersenyum getir) Aku harus bertahan hidup demi membayar biaya pengobatan ibu dan sekolah adikku...', side: 'right' }
              ],
              soundEffect: 'GATE OPEN',
              bgTheme: 'from-slate-900 via-zinc-900 to-black',
              illustrationType: 'dungeon'
            }
          },
          {
            id: 'p-2',
            type: 'scene',
            sceneData: {
              narrative: 'Pintu gerbang kedua terbuka di dalam dungeon. Patung dewa raksasa menatap mereka dengan mata menyala merah.',
              actionText: 'Patung itu tersenyum mengerikan dan menembakkan laser maut!',
              dialogue: [
                { speaker: 'Ketua Tim Song', text: 'Semua menunduk!! Patung itu bergerak!!', side: 'left' },
                { speaker: 'Sung Jin-Woo', text: 'Patuhi perintah kuil... Berlututlah di hadapannya!!', side: 'right' }
              ],
              soundEffect: 'BZZZZT!! DUARR!!',
              bgTheme: 'from-red-950 via-slate-950 to-black',
              illustrationType: 'duel'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'return-mount-hua',
    title: 'Return of the Mount Hua Sect',
    originalTitle: '화산귀환',
    altTitles: ['Plum Blossom Swordsman', 'Kembalinya Pendekar Gunung Hua'],
    cover: mountHuaCover,
    banner: mountHuaCover,
    type: 'Manhwa',
    format: 'Berwarna',
    status: 'Ongoing',
    score: 9.28,
    ratingCount: 142000,
    author: 'Biga',
    artist: 'LICO',
    genres: ['Action', 'Martial Arts', 'Comedy', 'Reincarnation', 'Historical'],
    synopsis:
      'Chung Myung, Pendekar Pedang Bunga Prem legendaris dari Sekte Gunung Hua, mengorbankan nyawanya untuk memenggal kepala Chun Ma, Iblis Surgawi yang menghancurkan dunia Kangho. Seratus tahun kemudian, ia terbangun di tubuh seorang anak pengemis! Terkejut mengetahui sekte tercintanya telah runtuh dan dilupakan orang, Chung Myung bertekad membangun kembali Gunung Hua dengan tinju, pedang plum, dan metode gilanya!',
    latestChapter: 142,
    totalChapters: 142,
    updatedTime: '30 menit lalu',
    views: '3.9M',
    isFeatured: true,
    chapters: [
      {
        id: 'hua-142',
        number: 142,
        title: 'Chapter 142 - Kelopak Bunga Prem yang Mekar Kembali',
        releaseDate: '10 Okt 2026',
        views: '180K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Turnamen Pedang Kangho mempertemukan Sekte Gunung Hua melawan murid utama Sekte Wudang.',
              actionText: 'Chung Myung melompat ke arena sambil mengunyah manisan manisan hawthorn dengan santai.',
              dialogue: [
                { speaker: 'Murid Wudang', text: 'Anak sombong! Gunung Hua sudah lama kehilangan taji mereka di dunia persilatan!', side: 'left' },
                { speaker: 'Chung Myung', text: 'Hahaha! Mau bertaruh berapa kepalamu bakal kutancapkan ke tanah dalam 3 detik?', side: 'right' }
              ],
              soundEffect: 'SLAPPPP!!',
              bgTheme: 'from-pink-950 via-slate-900 to-black',
              illustrationType: 'sword'
            }
          },
          {
            id: 'p-2',
            type: 'scene',
            sceneData: {
              narrative: 'Pedang Chung Myung bergerak luwes bagai angin musim semi. Ribuan kelopak bunga prem bersemi di udara dalam bentuk gelombang pedang tajam!',
              actionText: '24 Jurus Pedang Bunga Prem Legendaris terpancar memukau seluruh tetua persilatan.',
              dialogue: [
                { speaker: 'Ketua Sekte Baek', text: 'Itu... itu adalah jurus sejati yang hilang seabad lalu?!', side: 'left' },
                { speaker: 'Chung Myung', text: 'Perhatikan baik-baik, anak nakal. Inilah Pedang Gunung Hua yang sesungguhnya!', side: 'right' }
              ],
              soundEffect: 'SRINGGGGGG!!',
              bgTheme: 'from-rose-950 via-indigo-950 to-black',
              illustrationType: 'sword'
            }
          }
        ]
      },
      {
        id: 'hua-1',
        number: 1,
        title: 'Chapter 01 - Kebangkitan Sang Santo Pedang',
        releaseDate: '20 Mei 2024',
        views: '890K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Puncak Gunung Sepuluh Ribu. Chun Ma sang Pemimpin Sekte Iblis tumbang, namun tubuh Chung Myung juga hancur.',
              dialogue: [
                { speaker: 'Chung Myung', text: 'Gunung Hua... murid-muridku... kuharap kalian hidup bahagia...', side: 'right' }
              ],
              soundEffect: 'KREKK...',
              bgTheme: 'from-stone-900 to-black',
              illustrationType: 'duel'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'magic-emperor',
    title: 'Magic Emperor (Demonic Cultivator)',
    originalTitle: '魔皇仙途',
    altTitles: ['Zhuo Fan', 'The Servile Demon Emperor', 'Kaisar Iblis'],
    cover: magicEmperorCover,
    banner: magicEmperorCover,
    type: 'Manhua',
    format: 'Berwarna',
    status: 'Ongoing',
    score: 9.15,
    ratingCount: 118000,
    author: 'Wuer Manhua',
    artist: 'Ye Xiao',
    genres: ['Action', 'Fantasy', 'Martial Arts', 'Shounen', 'Xianxia'],
    synopsis:
      'Zhuo Yifan adalah Kaisar Iblis terkuat yang dikhianati oleh murid kepercayaannya sendiri karena buku warisan Kuno Sembilan Rahasia. Jiwanya merasuki tubuh seorang pelayan muda bernama Zhuo Fan dari Klan Luo yang sedang terancam punah. Terikat oleh sumpah darah tubuh aslinya, ia bersumpah membawa keluarga Luo ke puncak kekaisaran sembari membalaskan dendamnya dengan siasat licik dan kejam!',
    latestChapter: 460,
    totalChapters: 460,
    updatedTime: '4 jam lalu',
    views: '5.2M',
    isFeatured: true,
    chapters: [
      {
        id: 'me-460',
        number: 460,
        title: 'Chapter 460 - Tipu Muslihat Sang Kaisar Iblis',
        releaseDate: '09 Okt 2026',
        views: '210K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Di aula megah Lembah Neraka, tetua klan bangsawan menuduh Zhuo Fan bersekutu dengan iblis.',
              actionText: 'Zhuo Fan tersenyum dingin dengan sayap guntur ungu berkilauan di punggungnya.',
              dialogue: [
                { speaker: 'Tetua Lembah', text: 'Zhuo Fan! Serahkan pil surgawi itu atau seluruh Klan Luo akan kami musnahkan hari ini!', side: 'left' },
                { speaker: 'Zhuo Fan', text: 'Kalian semut-semut kecil... kalian bahkan tidak sadar formasi pembunuhanku sudah aktif sejak setengah jam lalu.', side: 'right' }
              ],
              soundEffect: 'CACKLE...!',
              bgTheme: 'from-purple-950 via-slate-950 to-black',
              illustrationType: 'magic'
            }
          },
          {
            id: 'p-2',
            type: 'scene',
            sceneData: {
              narrative: 'Api ungu membakar seluruh pilar aula dalam sekejap mata. Tidak ada satu pun yang bisa melarikan diri dari cengkeraman Qi Iblis.',
              soundEffect: 'BOOOMMM!!',
              bgTheme: 'from-violet-950 via-slate-900 to-black',
              illustrationType: 'magic'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'cursed-thunder',
    title: 'Cursed Thunder: Tokyo on Fire',
    originalTitle: '呪術雷神',
    altTitles: ['Jujutsu Raishin', 'Petir Terkutuk Tokyo'],
    cover: sorcererCover,
    banner: sorcererCover,
    type: 'Manga',
    format: 'Hitam Putih',
    status: 'Ongoing',
    score: 9.20,
    ratingCount: 96000,
    author: 'Kenji Arata',
    artist: 'Tatsuya Mori',
    genres: ['Action', 'Supernatural', 'Shounen', 'School', 'Horror'],
    synopsis:
      'Di sudut gelap Shibuya yang dilanda hujan lebat malam itu, kutukan tingkat khusus terbangun dan mulai memangsa energi kehidupan warga sipil. Ren Kusanagi, seorang siswa SMA biasa yang secara misterius dapat melihat benang kutukan hitam, terpaksa melepaskan segel petir kuno yang terkurung di lengan kanannya!',
    latestChapter: 88,
    totalChapters: 88,
    updatedTime: '1 hari lalu',
    views: '2.4M',
    isFeatured: true,
    chapters: [
      {
        id: 'ct-88',
        number: 88,
        title: 'Chapter 88 - Pembatas Domain: Petir Hitam Tak Berujung',
        releaseDate: '08 Okt 2026',
        views: '160K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Hujan deras membasahi aspal Shibuya. Sosok monster kutukan raksasa merayap keluar dari reruntuhan gedung 109.',
              actionText: 'Ren menyilangkan kedua jarinya, memicu kobaran petir hitam kemerahan yang memekakkan telinga.',
              dialogue: [
                { speaker: 'Monster Kutukan', text: 'GYAAAARRR!! MANUSIA MAKANAN KAMI!!', side: 'left' },
                { speaker: 'Ren Kusanagi', text: 'Ryoiki Tenkai: Raishin Gokuraku... Musnahlah dalam kilat!', side: 'right' }
              ],
              soundEffect: 'BZZZZZT-CRACKKK!!',
              bgTheme: 'from-zinc-950 via-neutral-900 to-black',
              illustrationType: 'city'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'omniscient-readers-viewpoint',
    title: "Omniscient Reader's Viewpoint",
    originalTitle: '전지적 독자 시점',
    altTitles: ['ORV', 'Sudut Pandang Pembaca Serba Tahu'],
    cover: soloCover, // high quality manhwa styling
    type: 'Manhwa',
    format: 'Berwarna',
    status: 'Ongoing',
    score: 9.42,
    ratingCount: 220000,
    author: 'Sing Shong',
    artist: 'Sleepy-C (Redice Studio)',
    genres: ['Action', 'Apocalypse', 'Fantasy', 'Psychological', 'System'],
    synopsis:
      'Kim Dokja adalah pekerja kantoran biasa yang satu-satunya hobinya adalah membaca novel web fantasi panjang "Tiga Cara Bertahan Hidup di Dunia Hancur". Tepat setelah ia menyelesaikan membaca bab terakhir sebagai satu-satunya pembaca setia selama 10 tahun, dunia nyata tiba-tiba berubah menjadi skenario persis novel tersebut!',
    latestChapter: 215,
    totalChapters: 215,
    updatedTime: '5 jam lalu',
    views: '4.2M',
    isFeatured: false,
    chapters: [
      {
        id: 'orv-215',
        number: 215,
        title: 'Chapter 215 - Skenario Kesepuluh: Tahta Kegelapan',
        releaseDate: '07 Okt 2026',
        views: '310K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Kubah Seoul kini dikelilingi oleh konstelasi para dewa dan pahlawan mitologi yang mengamati dari langit luas.',
              dialogue: [
                { speaker: 'Dokkaebi Bihyung', text: 'Perhatian para inkarnasi! Hadiah skenario ini bernilai 500,000 koin!', side: 'left' },
                { speaker: 'Kim Dokja', text: 'Aku sudah tahu cara mengalahkan bos skenario ini tanpa kehilangan satu pun rekan tim.', side: 'right' }
              ],
              soundEffect: 'COIN DROP!!',
              bgTheme: 'from-blue-950 via-slate-900 to-black',
              illustrationType: 'dungeon'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'nano-machine',
    title: 'Nano Machine',
    originalTitle: '나노 마신',
    altTitles: ['Mesin Nano', 'Lord of Demonic Cult'],
    cover: mountHuaCover,
    type: 'Manhwa',
    format: 'Berwarna',
    status: 'Ongoing',
    score: 9.31,
    ratingCount: 165000,
    author: 'Hanjoongwolya',
    artist: 'GGBG',
    genres: ['Action', 'Martial Arts', 'Sci-Fi', 'Revenge', 'Cultivation'],
    synopsis:
      'Yeo Woon adalah pangeran haram dari Sekte Iblis yang selalu dihina dan diancam dibunuh oleh para tetua klan. Suatu malam saat terluka parah diserang pembunuh bayaran, keturunan misterius dari masa depan menyuntikkan mesin nano ke dalam aliran darahnya, memberinya kekuatan analisa instan dan penguasaan teknik pedang tak tertandingi!',
    latestChapter: 210,
    totalChapters: 210,
    updatedTime: '6 jam lalu',
    views: '3.5M',
    isFeatured: false,
    chapters: [
      {
        id: 'nano-210',
        number: 210,
        title: 'Chapter 210 - Pemindaian Energi Abadi',
        releaseDate: '05 Okt 2026',
        views: '190K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Sistem kecerdasan buatan Nano Machine bersuara langsung ke dalam saraf otak Yeo Woon.',
              dialogue: [
                { speaker: 'Nano AI', text: '[Tuan, struktur tulang musuh telah dianalisa. Kelemahan terletak pada rusuk kiri.]', side: 'left' },
                { speaker: 'Yeo Woon', text: 'Eksekusi jurus Pedang Iblis Tingkat Enam!', side: 'right' }
              ],
              soundEffect: 'BEEP... SLASH!!',
              bgTheme: 'from-cyan-950 via-slate-950 to-black',
              illustrationType: 'sword'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'martial-peak',
    title: 'Martial Peak',
    originalTitle: '武炼巅峰',
    altTitles: ['Puncak Bela Diri', 'Yang Kai'],
    cover: magicEmperorCover,
    type: 'Manhua',
    format: 'Berwarna',
    status: 'Ongoing',
    score: 8.92,
    ratingCount: 310000,
    author: 'Momo',
    artist: 'Pikapi',
    genres: ['Action', 'Fantasy', 'Harem', 'Martial Arts', 'Adventure'],
    synopsis:
      'Perjalanan menuju puncak bela diri adalah jalan yang sunyi, berbahaya, dan tanpa ampun. Yang Kai, seorang murid penyapu lantai di Sekte Lingxiao, menemukan Kitab Hitam tanpa kata yang mengubah takdirnya menjadi penguasa ribuan bintang!',
    latestChapter: 3820,
    totalChapters: 3820,
    updatedTime: '1 jam lalu',
    views: '6.7M',
    isFeatured: false,
    chapters: [
      {
        id: 'mp-3820',
        number: 3820,
        title: 'Chapter 3820 - Penguasa Ruang dan Waktu',
        releaseDate: '10 Okt 2026',
        views: '120K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Di batas ruang galaksi kekacauan, Yang Kai merentangkan tangannya menyatukan kekuatan hukum ruang semesta.',
              dialogue: [
                { speaker: 'Yang Kai', text: 'Hukum Ruang, tunduklah pada kehendakku!', side: 'right' }
              ],
              soundEffect: 'SPACE CRACK!!',
              bgTheme: 'from-amber-950 via-slate-950 to-black',
              illustrationType: 'magic'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'chainsaw-demon',
    title: 'Chainsaw Fiend',
    originalTitle: 'チェンソーマン',
    altTitles: ['Pria Gergaji Mesin', 'Tokyo Devil Hunters'],
    cover: sorcererCover,
    type: 'Manga',
    format: 'Hitam Putih',
    status: 'Ongoing',
    score: 9.18,
    ratingCount: 175000,
    author: 'Tatsuki Fujimoto',
    artist: 'Tatsuki Fujimoto',
    genres: ['Action', 'Horror', 'Supernatural', 'Dark Fantasy', 'Comedy'],
    synopsis:
      'Denji adalah pemuda miskin yang terpaksa menjadi pemburu iblis ilegal bersama anjing iblis gergajinya, Pochita, demi melunasi hutang ayahnya. Setelah dikhianati yakuza, Pochita melebur dengan jantung Denji dan menjadikannya hibrida iblis gergaji mesin yang tak bisa mati!',
    latestChapter: 165,
    totalChapters: 165,
    updatedTime: '2 hari lalu',
    views: '3.1M',
    isFeatured: false,
    chapters: [
      {
        id: 'cd-165',
        number: 165,
        title: 'Chapter 165 - Pertarungan di Restoran Cepat Saji',
        releaseDate: '06 Okt 2026',
        views: '240K',
        panels: [
          {
            id: 'p-1',
            type: 'scene',
            sceneData: {
              narrative: 'Sirine kota berbunyi nyaring saat Iblis Api meledakkan persimpangan jalan.',
              actionText: 'Denji menarik tali starter di dadanya. Rantai gergaji menderu liar!',
              dialogue: [
                { speaker: 'Denji', text: 'VRRRR!! AKU CUMA MAU MAKAN BURGER DENGAN TENANG HARI INI!!', side: 'right' }
              ],
              soundEffect: 'VRRRRRRRRR!!',
              bgTheme: 'from-zinc-950 to-neutral-900',
              illustrationType: 'duel'
            }
          }
        ]
      }
    ]
  }
];

export const GENRE_LIST = [
  'Semua Genre',
  'Action',
  'Fantasy',
  'Martial Arts',
  'Adventure',
  'Supernatural',
  'System',
  'Reincarnation',
  'Comedy',
  'Sci-Fi',
  'Horror',
  'Dungeon',
  'Shounen'
];
