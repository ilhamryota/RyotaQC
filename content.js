window.RYOTAQC_CONTENT = {
  site: {
    title: "RyotaQC",
    badge: "RyotaQC Update Center",
    menuLabel: "Menu",
    hero: {
      kicker: "Simple. Modern. Fast.",
      title: "Portal Utama RyotaQC",
      subtitle: "Website ini disiapkan untuk materi, informasi, berita update, tools, dan konten edukasi RyotaQC dalam satu tempat.",
      primaryButton: { label: "Lihat Information", target: "#information" },
      secondaryButton: { label: "Buka Tools", target: "#tools" }
    },
    maintenance: {
      enabled: true,
      title: "Website Sedang Maintenance",
      message:
        "Saat ini RyotaQC sedang dalam tahap pengembangan versi terbaru. Kamu tetap bisa main mini game sambil menunggu update selesai.",
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
    menu: [
      { id: "beranda", label: "Beranda" },
      { id: "information", label: "Information" },
      { id: "tools", label: "Tools" },
      { id: "quiz", label: "Quiz" },
      { id: "faq", label: "Faq" },
      { id: "about", label: "About Me" }
    ]
  },

  sections: {
    beranda: {
      title: "Beranda",
      description:
        "Ini adalah halaman utama baru RyotaQC. Struktur website sudah di-reset total agar lebih ringan, rapi, dan siap diisi materi baru.",
      highlights: [
        { title: "Clean Layout", text: "Fokus ke konten inti dengan tampilan modern aesthetic." },
        { title: "Mobile Friendly", text: "Nyaman dipakai di HP, tablet, dan desktop." },
        { title: "Easy Update", text: "Konten bisa kamu ubah langsung dari content.js." }
      ]
    },

    information: {
      title: "Information",
      description: "Ruang untuk berita, pengumuman, dan update terbaru seputar RyotaQC.",
      items: [
        {
          tag: "Update",
          heading: "Website Reset 2026",
          body: "Struktur lama dihapus dan diganti menjadi fondasi baru yang lebih sederhana dan scalable."
        },
        {
          tag: "News",
          heading: "Roadmap Konten",
          body: "Selanjutnya akan diisi artikel tutorial, SOP, dan publikasi update berkala."
        },
        {
          tag: "Info",
          heading: "Satu Pusat Informasi",
          body: "Semua update RyotaQC diarahkan agar terkumpul dalam portal ini."
        }
      ]
    },

    tools: {
      title: "Tools",
      description: "Area daftar tools yang dipakai untuk operasional dan produktivitas.",
      items: [
        { name: "RyotaQC V4", desc: "Toolkit internal untuk proses QC dan pencatatan teknis.", status: "Active", link: "#" },
        { name: "Driver Official Hub", desc: "Shortcut pencarian driver resmi lintas vendor.", status: "Planned", link: "#" },
        { name: "Report Generator", desc: "Generator laporan hasil test dan maintenance.", status: "Planned", link: "#" }
      ]
    },

    quiz: {
      title: "Quiz",
      description: "Nantinya menu ini untuk latihan pemahaman materi QC.",
      ctaLabel: "Mulai Quiz (Coming Soon)",
      ctaLink: "#"
    },

    faq: {
      title: "Faq",
      description: "Pertanyaan umum seputar website dan update RyotaQC.",
      items: [
        {
          q: "Apakah konten ini bisa diedit cepat?",
          a: "Bisa. Semua isi teks utama disimpan di content.js agar mudah diganti."
        },
        {
          q: "Kenapa website kadang maintenance?",
          a: "Maintenance aktif saat ada pengembangan fitur agar update lebih aman."
        },
        {
          q: "Apakah desain ini responsive?",
          a: "Ya, sudah diatur untuk mobile dan desktop."
        }
      ]
    },

    about: {
      title: "About Me",
      description: "Profil singkat pengelola website.",
      name: "RyotaQC",
      role: "QC & Maintenance Creator",
      bio:
        "Membangun panduan, tools, dan sistem informasi yang membantu proses QC laptop agar lebih konsisten, terukur, dan mudah dipahami.",
      contacts: [
        { label: "Email", value: "ryotaqc@example.com" },
        { label: "GitHub", value: "github.com/ilhamryota/RyotaQC" },
        { label: "Location", value: "Indonesia" }
      ]
    }
  },

  footer: {
    left: "RyotaQC",
    right: "Reset Edition 2026"
  }
};
