window.RYOTAQC_CONTENT = {
  site: {
    title: "RyotaQC",
    brandPill: "ryotaqc",
    menuLabel: "menu",
    introTag: "SOP Battery Running Test",
    maintenance: {
      // Ubah ke true untuk mengaktifkan maintenance mode.
      enabled: true,
      title: "Website Sedang Dalam Tahap Pengembangan",
      message:
        "RyotaQC sedang maintenance untuk update fitur dan perbaikan tampilan. Silakan cek kembali setelah proses selesai. Sambil menunggu, kamu bisa main mini game Tap Tap Shoot Basketball di bawah.",
      image: "assets/images/step-maintenance-repair.webp",
      imageAlt: "Ilustrasi maintenance laptop",
      gameTitle: "Tap Tap Shoot Basketball",
      devAccess: {
        // Developer unlock URL: ?dev_key=RYOTAQC-DEV-2026
        token: "RYOTAQC-DEV-2026",
        queryParam: "dev_key",
        viewParam: "dev_view",
        storageKey: "ryotaqc_dev_access",
        logoutParam: "dev_logout",
        allowLocalhost: true,
        goSiteLabel: "Go Site",
        backLabel: "Back Maintenance"
      }
    },
    topLinks: [
      { label: "Knowladge", target: "#panel-knowledge" },
      { label: "Tools", target: "#panel-tools-v4" },
      { label: "SOP", target: "#panel-sop-battery" },
      { label: "Tutorial", target: "#panel-running-rules" },
      { label: "Windows Tips And Trick", target: "#panel-os-guidance" },
      { label: "MacOS Information", target: "#panel-macos-info" },
      { label: "Quiz", target: "#panel-calculator" },
      { label: "Information", target: "#panel-driver" },
      { label: "Tentang", target: "#panel-cta" },
      { label: "Kontak", target: "#site-footer" }
    ]
  },
  panels: [
    {
      id: "panel-intro",
      type: "intro",
      theme: "split",
      kicker: "Pembukaan",
      title: "Bismillah, semoga ilmu QC battery ini menjadi berkah, bermanfaat, dan memudahkan pekerjaan harian.",
      body: "Sebelum mempelajari SOP ini, luruskan niat karena amal bergantung pada niat (HR. Bukhari no. 1, Muslim no. 1907). Allah juga meninggikan derajat orang berilmu (QS. Al-Mujadilah 58:11).",
      axisHint: "Scroll untuk SOP Battery",
      brand: "RYOTAQC",
      heroTitle: "WE'LL CREATE YOUR PERFECT QC FLOW",
      heroSub: "Start achieving your laptop QC goals. Join us today.",
      caption: "Here, animation gives a pumping vibe to a fitness website."
    },
    {
      id: "panel-knowledge",
      type: "split",
      theme: "split",
      titleLines: ["KNOWLADGE", "SOP BATTERY", "RYOTAQC"],
      body: "Halaman ini memusatkan seluruh materi ke SOP Battery: running test jam video, keputusan lolos/tidak lolos battery, maintenance 4 langkah, kompatibilitas OS, tools RyotaQC V4, link driver official, dan kalkulator hitung cepat.",
      image: "assets/images/step-maintenance-repair.webp",
      imageAlt: "Teknisi melakukan pemeriksaan laptop"
    },
    {
      id: "panel-sop-battery",
      type: "cards",
      theme: "lavender",
      kicker: "SOP BATTERY",
      heading: "Set Awal Running Test Jam Video",
      cards: [
        {
          title: "Brightness & Audio",
          text: "Brightness 30% untuk layar 250 nits. Jika layar 300-400 nits gunakan brightness 20%. Audio wajib di 30%.",
          image: "assets/images/windows11-settings.png",
          imageAlt: "Contoh pengaturan brightness dan audio"
        },
        {
          title: "Kapasitas Awal",
          text: "Pastikan battery benar-benar terisi 100% sebelum test dimulai agar hasil antar unit bisa dibandingkan adil.",
          image: "assets/images/battery-minimal.svg",
          imageAlt: "Ilustrasi battery penuh"
        },
        {
          title: "Patokan Hitung",
          text: "Lihat angka jam awal, bukan menit/detik. Ini menjadi dasar koreksi hasil running test.",
          image: "assets/images/step-hardware-inspection.webp",
          imageAlt: "Teknisi melakukan inspeksi hardware"
        },
        {
          title: "Trigger Maintenance",
          text: "Jika hasil mentah berada di 2 jam atau lebih rendah, unit wajib lanjut ke tahap maintenance dan problem solving.",
          image: "assets/images/technician-illustration.svg",
          imageAlt: "Ilustrasi teknisi dan alur perbaikan"
        }
      ]
    },
    {
      id: "panel-running-rules",
      type: "steps",
      theme: "dark",
      kicker: "TUTORIAL KOREKSI JAM",
      heading: "Aturan Normalisasi Hasil Running Test",
      steps: [
        "Jam mulai angka 3: kurangi 30 menit. Contoh 3 jam 30 menit jadi 3 jam, 3 jam 10 menit jadi 2 jam 40 menit.",
        "Jam mulai angka 4: kurangi 45 menit. Contoh 4 jam 45 menit jadi 4 jam.",
        "Jam mulai angka 5 atau 6: kurangi 1 jam. Contoh 5 jam 20 menit jadi 4 jam 20 menit, 6 jam 13 menit jadi 5 jam 13 menit.",
        "Jam mulai angka 7 sampai 12 atau lebih: kurangi 2 jam. Contoh 7 jam 32 menit jadi 5 jam 32 menit, 8 jam 53 menit jadi 6 jam 53 menit.",
        "Jika hasil akhir tetap 2 jam atau di bawahnya, unit diproses ke maintenance dan evaluasi battery."
      ],
      image: "assets/images/windows-update-screen.png",
      imageAlt: "Contoh layar monitoring saat running test"
    },
    {
      id: "panel-battery-decision",
      type: "focus",
      theme: "light",
      kicker: "SOP > BATTERY",
      heading: "Keputusan Lolos QC atau Wajib Ganti",
      body: "Jika Battery Health di bawah 60%, secara standar battery tidak lolos QC. Pengecualian hanya saat FCC di atas 30.000 mWh dan hasil running test di atas 2 jam. Jika BH sekitar 60%, FCC di bawah 30.000 mWh, dan hasil test kurang dari 2 jam, rekomendasi final adalah ganti battery.",
      image: "assets/images/battery-symbol.svg",
      imageAlt: "Simbol battery untuk keputusan QC"
    },
    {
      id: "panel-maintenance",
      type: "steps",
      theme: "dark",
      kicker: "MAINTENANCE & PROBLEM SOLVING",
      heading: "Langkah Wajib 1-4 Saat Hasil 2 Jam",
      steps: [
        "Langkah 1: update firmware, BIOS, chipset, power management, dan aplikasi update resmi vendor. Fokus komponen yang mempengaruhi manajemen daya battery.",
        "Langkah 2: setelah langkah 1 selesai, lakukan kalibrasi battery. Habiskan sampai 0%, charge saat laptop mati sampai 100%, lalu ulang running test dan bandingkan hasil sebelum/sesudah update.",
        "Langkah 3: jika tidak membaik, install ulang OS sesuai dukungan driver penuh. Untuk Windows 11, pastikan driver tersedia dan status update mengarah ke Recommended, bukan hanya Critical.",
        "Jika unit sebenarnya mentok di Windows 10, jangan dipaksa ke Windows 11 karena biasanya driver turunannya tidak optimal dan risiko bug lebih tinggi.",
        "Langkah 4: bila langkah 3 belum berhasil, turunkan 1 versi OS. Contoh Windows 11 ke Windows 10, atau Windows 10 ke Windows 8, lalu full update dan running test ulang.",
        "Jika setelah langkah 1-4 hasil tetap di 2 jam atau di bawah, battery sudah wajib diganti karena usia pakai dan performa tidak lagi optimal."
      ],
      image: "assets/images/step-maintenance-repair.webp",
      imageAlt: "Ilustrasi proses maintenance laptop"
    },
    {
      id: "panel-os-guidance",
      type: "cards",
      theme: "lavender",
      kicker: "WINDOWS TIPS AND TRICK",
      heading: "Panduan Kompatibilitas Driver & OS",
      cards: [
        {
          title: "Windows 11 Hanya Jika Native Support",
          text: "Pastikan vendor menyediakan driver Windows 11 untuk model unit. Prioritaskan paket update dengan status Recommended agar manajemen daya lebih stabil.",
          image: "assets/images/windows11-settings.png",
          imageAlt: "Contoh pengaturan sistem Windows 11"
        },
        {
          title: "Jika Driver Tidak Tersedia",
          text: "Jangan memaksa Windows 11 pada unit yang dukungannya tidak penuh. Kembalikan ke Windows 10 agar stack driver lebih matang.",
          image: "assets/images/windows-update-screen.png",
          imageAlt: "Contoh update Windows"
        },
        {
          title: "Riwayat Dukungan Windows 10",
          text: "Dukungan standar Windows 10 berakhir pada 14 Oktober 2025. Karena tanggal ini sudah lewat, validasi keamanan dan kebijakan update internal harus lebih ketat.",
          image: "assets/images/windows8-update-screen.png",
          imageAlt: "Contoh tampilan update sistem versi lama"
        }
      ]
    },
    {
      id: "panel-macos-info",
      type: "focus",
      theme: "light",
      kicker: "MACOS INFORMATION",
      heading: "Catatan Singkat Untuk Unit MacBook",
      body: "SOP utama halaman ini fokus ke laptop Windows. Untuk MacBook, prinsip QC battery tetap sama: cek health cycle, lakukan update sistem stabil terbaru, lalu running test terukur. Driver tidak diambil dari OEM Windows, melainkan dari update resmi Apple/macOS.",
      image: "assets/images/technician-illustration.svg",
      imageAlt: "Ilustrasi teknisi sebagai catatan lintas platform"
    },
    {
      id: "panel-tools-v4",
      type: "cards",
      theme: "lavender",
      kicker: "TOOLS RYOTAQC V4",
      heading: "Integrasi D:\\QCApps\\RyotaQC-V4 Untuk SOP Battery",
      cards: [
        {
          title: "Config Tool Map",
          text: "Launcher dibaca dari src/RyotaQC.App/Config/tool-map.json. Tool yang relevan: HWiNFO, Battery Health, CPU Test, Sentinel, Benchmark, battery report, dan VLC untuk running test video.",
          image: "assets/images/step-hardware-inspection.webp",
          imageAlt: "Ilustrasi daftar tools QC"
        },
        {
          title: "Script Build Rilis",
          text: "Script 01-publish-release.ps1, 02-build-setup.ps1, dan 03-build-portable.ps1 dipakai untuk paket setup dan portable agar alur QC bisa dibagikan konsisten.",
          image: "assets/images/step-maintenance-repair.webp",
          imageAlt: "Ilustrasi release dan packaging"
        },
        {
          title: "Internal QC Workflow",
          text: "Modul internal mencakup Running Test (log JSON), Battery Report (HTML), LCD/Keyboard/Audio/Camera test. Ini mendukung pembuktian sebelum dan sesudah maintenance.",
          image: "assets/images/windows-update-screen.png",
          imageAlt: "Ilustrasi workflow pengujian"
        }
      ]
    },
    {
      id: "panel-driver",
      type: "links",
      theme: "light",
      kicker: "OFFICIAL DRIVER LINKS",
      heading: "Direct Link Vendor Resmi (Lenovo, Dell, HP, ASUS, Toshiba/Dynabook, Fujitsu)",
      groups: [
        {
          name: "Lenovo",
          links: [
            { label: "Lenovo Support", href: "https://support.lenovo.com/" },
            { label: "Lenovo Drivers & Software", href: "https://support.lenovo.com/id/en/?tabName=Downloads" },
            { label: "Lenovo System Update", href: "https://support.lenovo.com/us/en/downloads/ds012808-lenovo-system-update-for-windows-10-7-32-bit-64-bit-desktop-notebook-workstation" }
          ]
        },
        {
          name: "Dell",
          links: [
            { label: "Dell Drivers & Downloads", href: "https://www.dell.com/support/home/en-us/drivers" },
            { label: "Dell Command Update", href: "https://www.dell.com/support/manuals/en-us/command-update/dcu_ug/dell-command-update" },
            { label: "SupportAssist", href: "https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/software-and-downloads/supportassist" }
          ]
        },
        {
          name: "HP",
          links: [
            { label: "HP Drivers", href: "https://support.hp.com/us-en/drivers" },
            { label: "HP Support Assistant", href: "https://support.hp.com/us-en/help/hp-support-assistant" },
            { label: "HP Image Assistant", href: "https://support.hp.com/us-en/document/ish_7636709-7636753-16" }
          ]
        },
        {
          name: "ASUS",
          links: [
            { label: "ASUS Download Center", href: "https://www.asus.com/support/download-center/" },
            { label: "MyASUS System Update", href: "https://www.asus.com/support/FAQ/1051729/" },
            { label: "ASUS Live Update Info", href: "https://www.asus.com/us/support/faq/1018727/" }
          ]
        },
        {
          name: "Toshiba / Dynabook",
          links: [
            { label: "Dynabook Drivers & Software", href: "https://support.dynabook.com/support/driversResults" },
            { label: "Dynabook Service Station", href: "https://support.dynabook.com/support/viewContentDetail?contentId=4016624" }
          ]
        },
        {
          name: "Fujitsu",
          links: [
            { label: "Fujitsu DeskUpdate", href: "https://download.ts.fujitsu.com/deskupdate/index.asp?lng=en" },
            { label: "Fujitsu Support Downloads", href: "https://support.ts.fujitsu.com/Softwarelist0.htm" }
          ]
        }
      ]
    },
    {
      id: "panel-calculator",
      type: "calculator",
      theme: "dark",
      kicker: "QUIZ & CALCULATOR",
      heading: "Kalkulator SOP Battery (Running Test + Keputusan QC)",
      body: "Masukkan hasil mentah test (jam dan menit), Battery Health (%), serta FCC (mWh). Sistem menghitung hasil normalisasi sesuai aturan SOP dan memberi rekomendasi QC battery.",
      rules: [
        { range: "Jam mulai 3", deduction: "-30 menit", example: "3:10 -> 2:40" },
        { range: "Jam mulai 4", deduction: "-45 menit", example: "4:45 -> 4:00" },
        { range: "Jam mulai 5-6", deduction: "-60 menit", example: "6:13 -> 5:13" },
        { range: "Jam mulai 7+", deduction: "-120 menit", example: "8:53 -> 6:53" }
      ],
      quickChecks: [
        "Jika hasil final <= 2 jam: lanjut maintenance 1-4.",
        "Jika BH < 60% dan FCC < 30.000 mWh: battery cenderung wajib ganti.",
        "Jika BH < 60% tetapi FCC > 30.000 mWh dan hasil final > 2 jam: boleh pertimbangan dengan catatan QC."
      ],
      buttonLabel: "Hitung Sekarang"
    },
    {
      id: "panel-cta",
      type: "cta",
      theme: "dark",
      heading: "Dokumen dibuat oleh RyotaQC sebagai panduan QC & Maintenance Laptop.",
      body: "Materi ini dirapikan untuk pembelajaran teknis: jelas, rinci, lengkap, dan siap dipakai sebagai SOP harian. Versi PDF bisa langsung diunduh melalui tombol berikut.",
      buttons: [
        { label: "Buka PDF Panduan", href: "output/Tutorial-QC-RyotaQC.pdf" },
        { label: "Sumber Gambar", href: "docs/sumber-gambar.md" },
        { label: "Repo Tutorial-QC", href: "#" }
      ]
    }
  ],
  footer: {
    left: "RyotaQC",
    right: "SOP Battery - QC & Maintenance"
  }
};
