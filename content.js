window.RYOTAQC_CONTENT = {
  site: {
    title: "RyotaQC",
    subtitle: "Portal Artikel, Informasi, Tools, Download, dan Quiz",
    logoText: "RYOTAQC",
    topNote: "Website pembelajaran, informasi, dan update terbaru RyotaQC.",
    menuLabel: "Menu",
    nav: [
      { key: "home", label: "Beranda", href: "index.html" },
      { key: "articles", label: "Artikel", href: "articles.html" },
      { key: "information", label: "Information", href: "information.html" },
      { key: "tools", label: "Tools", href: "tools.html" },
      { key: "download", label: "Download", href: "download.html" },
      { key: "quiz", label: "Quiz", href: "quiz.html" },
      { key: "about", label: "About Me", href: "about.html" }
    ],
    maintenance: {
      // Ubah true jika ingin maintenance aktif untuk pengunjung umum.
      enabled: false,
      title: "Website Sedang Maintenance",
      message:
        "RyotaQC sedang update besar. Silakan tunggu sebentar, kamu masih bisa main mini game di bawah ini.",
      image: "assets/images/step-maintenance-repair.webp",
      imageAlt: "Ilustrasi maintenance RyotaQC",
      gameTitle: "Tap Tap Shoot Basketball",
      devAccess: {
        token: "RYOTAQC-DEV-2026",
        queryParam: "dev_key",
        viewParam: "dev_view",
        storageKey: "ryotaqc_dev_access",
        logoutParam: "dev_logout",
        allowLocalhost: true,
        defaultUnlockedView: "site",
        goSiteLabel: "Go Site",
        backLabel: "Back Maintenance"
      }
    },
    sidebar: {
      aboutTitle: "Tentang Portal",
      aboutBody:
        "RyotaQC adalah portal belajar dan update teknologi berbahasa Indonesia. Fokus pada materi, tips teknis, artikel, dan download pembelajaran.",
      categoriesTitle: "Kategori",
      categories: ["Tutorial", "Tips", "Windows", "MacOS", "Tools", "Download", "Quiz"],
      popularTitle: "Populer",
      popular: [
        "Panduan Running Test Battery Laptop",
        "Cara Menentukan Driver Official yang Tepat",
        "Checklist QC Laptop Sebelum Dijual"
      ]
    }
  },

  pages: {
    home: {
      pageTitle: "Beranda",
      hero: {
        tag: "Featured",
        title: "Selamat Datang di Portal RyotaQC",
        excerpt:
          "Tempat terpusat untuk artikel, informasi berita, panduan pembelajaran, tools, download, dan quiz interaktif.",
        image: "assets/images/step-hardware-inspection.webp",
        imageAlt: "Ilustrasi pengecekan hardware laptop",
        buttonLabel: "Baca Artikel",
        buttonHref: "articles.html"
      },
      blocks: [
        {
          title: "Artikel Terbaru",
          items: [
            {
              category: "Tutorial",
              title: "Panduan Dasar QC Laptop untuk Pemula",
              date: "16 Mei 2026",
              excerpt: "Langkah ringkas memulai pemeriksaan unit laptop secara rapi dan terukur.",
              image: "assets/images/step-hardware-inspection.jpg",
              imageAlt: "Teknisi mengecek laptop"
            },
            {
              category: "Windows",
              title: "Cara Cek Update Driver yang Aman",
              date: "15 Mei 2026",
              excerpt: "Strategi update driver official agar sistem stabil dan performa optimal.",
              image: "assets/images/windows-update-screen.png",
              imageAlt: "Layar update windows"
            },
            {
              category: "Tips",
              title: "Checklist Sebelum Running Test Battery",
              date: "14 Mei 2026",
              excerpt: "Pastikan setting brightness, audio, dan charge awal sudah sesuai SOP.",
              image: "assets/images/windows11-settings.png",
              imageAlt: "Pengaturan windows 11"
            }
          ]
        },
        {
          title: "Berita & Update RyotaQC",
          items: [
            {
              category: "Update",
              title: "Rencana Rilis Materi Minggu Ini",
              date: "16 Mei 2026",
              excerpt: "Akan ada batch artikel baru: battery, maintenance, dan quiz evaluasi.",
              image: "assets/images/step-maintenance-repair.jpg",
              imageAlt: "Perbaikan laptop"
            },
            {
              category: "News",
              title: "Portal Multi Halaman Sudah Aktif",
              date: "16 Mei 2026",
              excerpt: "Setiap menu kini punya halaman sendiri agar lebih rapi dan scalable.",
              image: "assets/images/technician-illustration.svg",
              imageAlt: "Ilustrasi teknisi"
            }
          ]
        }
      ]
    },

    articles: {
      pageTitle: "Artikel",
      intro:
        "Kumpulan artikel pembelajaran dan tutorial untuk membantu pemahaman QC, maintenance, dan troubleshooting.",
      items: [
        {
          category: "Tutorial",
          title: "Mengenal Alur Pemeriksaan Unit Masuk",
          date: "16 Mei 2026",
          excerpt: "Flow pemeriksaan dari inspeksi fisik hingga validasi akhir hasil test.",
          image: "assets/images/step-hardware-inspection.webp",
          imageAlt: "Inspeksi unit laptop"
        },
        {
          category: "Battery",
          title: "Interpretasi Battery Health dan FCC",
          date: "15 Mei 2026",
          excerpt: "Cara membaca indikator kesehatan battery untuk keputusan maintenance atau replace.",
          image: "assets/images/battery-symbol.svg",
          imageAlt: "Ikon battery"
        },
        {
          category: "OS",
          title: "Kapan Harus Downgrade dari Windows 11",
          date: "14 Mei 2026",
          excerpt: "Studi kasus kompatibilitas driver dan dampaknya ke kestabilan sistem.",
          image: "assets/images/windows8-update-screen.png",
          imageAlt: "Layar update windows 8"
        }
      ]
    },

    information: {
      pageTitle: "Information",
      intro: "Ruang berita, pengumuman, dan informasi roadmap pengembangan RyotaQC.",
      list: [
        { title: "Status Project Website", detail: "Struktur sudah siap untuk ekspansi konten artikel skala besar.", badge: "Info" },
        { title: "Roadmap Konten", detail: "Prioritas materi: SOP battery, troubleshooting software, dan modul quiz.", badge: "Roadmap" },
        { title: "Pembaruan UI", detail: "Desain disiapkan ringan agar cepat diakses di mobile dan desktop.", badge: "Update" }
      ]
    },

    tools: {
      pageTitle: "Tools",
      intro: "Daftar tools internal dan utilitas yang dipakai untuk mendukung materi pembelajaran.",
      items: [
        { name: "RyotaQC V4", status: "Active", desc: "Aplikasi bantu QC dan pencatatan teknis unit.", link: "#" },
        { name: "Driver Official Finder", status: "Planned", desc: "Direktori link official brand untuk update driver.", link: "#" },
        { name: "Test Report Builder", status: "Planned", desc: "Generator laporan hasil testing untuk dokumentasi.", link: "#" }
      ]
    },

    download: {
      pageTitle: "Download",
      intro: "Halaman download materi pembelajaran, template, dan dokumen pendukung.",
      items: [
        { title: "Template Laporan QC", type: "PDF", size: "1.2 MB", link: "#" },
        { title: "Checklist Running Test", type: "XLSX", size: "420 KB", link: "#" },
        { title: "Panduan Driver Official", type: "PDF", size: "2.1 MB", link: "#" }
      ]
    },

    quiz: {
      pageTitle: "Quiz",
      intro: "Uji pemahaman materi melalui quiz interaktif dan evaluasi berkala.",
      cards: [
        {
          title: "Quiz Battery Basic",
          level: "Beginner",
          desc: "Memahami dasar running test, battery health, dan keputusan QC awal.",
          button: "Mulai Quiz",
          link: "#"
        },
        {
          title: "Quiz Maintenance Flow",
          level: "Intermediate",
          desc: "Menguji urutan langkah maintenance 1-4 sesuai SOP.",
          button: "Mulai Quiz",
          link: "#"
        }
      ]
    },

    about: {
      pageTitle: "About Me",
      intro: "Profil singkat pengelola dan visi pengembangan portal RyotaQC.",
      profile: {
        name: "RyotaQC",
        role: "QC & Maintenance Creator",
        bio:
          "Membangun pusat pembelajaran QC yang ringkas, mudah dipahami, dan relevan untuk kebutuhan teknisi harian.",
        avatar: "assets/images/technician-illustration.svg",
        avatarAlt: "Avatar teknisi"
      },
      contacts: [
        { label: "Email", value: "ryotaqc@example.com" },
        { label: "GitHub", value: "https://github.com/ilhamryota/RyotaQC" },
        { label: "Lokasi", value: "Indonesia" }
      ]
    }
  },

  footer: {
    left: "RyotaQC",
    right: "Portal Pembelajaran & Informasi 2026"
  }
};
