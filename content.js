window.RYOTAQC_CONTENT = {
  site: {
    title: "RyotaQC",
    brandPill: "ryotaqc",
    menuLabel: "menu",
    introTag: "QC motion homepage",
    topLinks: [
      { label: "SOP", target: "#panel-sop" },
      { label: "Battery", target: "#panel-battery" },
      { label: "Maintenance", target: "#panel-maintenance" },
      { label: "Driver", target: "#panel-driver" }
    ]
  },
  panels: [
    {
      id: "panel-intro",
      type: "intro",
      theme: "dark",
      kicker: "RyotaQC Motion System",
      title: "UI/UX animation emphasizes the details users should focus on.",
      body: "Homepage ini dibangun untuk memberi pengalaman visual kuat, ritme transisi yang halus, dan arah baca yang jelas untuk materi QC laptop.",
      axisHint: "Scroll"
    },
    {
      id: "panel-split",
      type: "split",
      theme: "split",
      titleLines: ["WE'LL CREATE", "YOUR PERFECT", "QC FLOW"],
      body: "Dokumen QC kamu ditata ulang dalam alur visual yang tegas: instruksi utama tetap mudah dibaca, sementara animasi menjaga perhatian pengguna.",
      image: "assets/images/step-maintenance-repair.webp",
      imageAlt: "Teknisi merawat laptop"
    },
    {
      id: "panel-words",
      type: "strips",
      theme: "dark",
      words: ["INTERFACE", "ANIMATION", "TECHNIQUES"],
      caption: "Transisi tipografi besar untuk menegaskan blok informasi penting."
    },
    {
      id: "panel-sop",
      type: "cards",
      theme: "lavender",
      kicker: "SOP RUNNING TEST",
      heading: "Tahapan Utama Running Test",
      cards: [
        {
          title: "Set Awal",
          text: "Brightness 30% (250 nits), 20% (300-400 nits), audio 30%, battery 100%.",
          image: "assets/images/windows11-settings.png",
          imageAlt: "Contoh tampilan pengaturan"
        },
        {
          title: "Patokan Durasi",
          text: "Hitung dari angka jam awal. Jika hasil mentah 2 jam atau kurang, lanjut maintenance.",
          image: "assets/images/battery-minimal.svg",
          imageAlt: "Ikon battery"
        },
        {
          title: "Normalisasi",
          text: "3 jam kurangi 30 menit, 4 jam kurangi 45 menit, 5-6 jam kurangi 1 jam, 7+ jam kurangi 2 jam.",
          image: "assets/images/step-hardware-inspection.webp",
          imageAlt: "Inspeksi hardware"
        }
      ]
    },
    {
      id: "panel-battery",
      type: "focus",
      theme: "light",
      kicker: "BATTERY QC",
      heading: "Keputusan Battery Lolos / Tidak Lolos",
      body: "Jika BH < 60%, FCC < 30.000 mWh, dan running test < 2 jam maka battery wajib ganti. Jika FCC masih tinggi dan hasil test > 2 jam, boleh pertimbangan dengan catatan QC.",
      image: "assets/images/windows-update-screen.png",
      imageAlt: "Layar update sistem"
    },
    {
      id: "panel-maintenance",
      type: "steps",
      theme: "dark",
      kicker: "MAINTENANCE 1-4",
      heading: "Urutan Problem Solving Wajib",
      steps: [
        "Update firmware, BIOS, chipset, dan power management resmi OEM.",
        "Kalibrasi battery: habiskan 0%, charge saat mati sampai 100%, test ulang.",
        "Install ulang OS sesuai kompatibilitas penuh driver.",
        "Jika gagal, turunkan 1 versi OS lalu full update dan running test ulang."
      ],
      image: "assets/images/technician-illustration.svg",
      imageAlt: "Ilustrasi teknisi"
    },
    {
      id: "panel-driver",
      type: "links",
      theme: "light",
      kicker: "OFFICIAL LINKS",
      heading: "Driver & Update Resmi Vendor",
      groups: [
        {
          name: "Lenovo",
          links: [
            { label: "Lenovo Support", href: "https://support.lenovo.com/" },
            { label: "Lenovo System Update", href: "https://support.lenovo.com/us/en/downloads/ds012808-lenovo-system-update-for-windows-10-7-32-bit-64-bit-desktop-notebook-workstation" }
          ]
        },
        {
          name: "Dell",
          links: [
            { label: "Dell Drivers", href: "https://www.dell.com/support/home/en-us/drivers" },
            { label: "Dell Command Update", href: "https://www.dell.com/support/kbdoc/en-us/000177325/dell-command-update" }
          ]
        },
        {
          name: "HP",
          links: [
            { label: "HP Drivers", href: "https://support.hp.com/us-en/drivers" },
            { label: "HP Support Assistant", href: "https://support.hp.com/us-en/help/hp-support-assistant" }
          ]
        },
        {
          name: "ASUS",
          links: [
            { label: "ASUS Download Center", href: "https://www.asus.com/support/download-center/" },
            { label: "MyASUS System Update", href: "https://www.asus.com/us/support/faq/1051729/" }
          ]
        },
        {
          name: "Dynabook",
          links: [
            { label: "Dynabook Drivers", href: "https://support.dynabook.com/support/driversResults" },
            { label: "Service Station", href: "https://support.dynabook.com/support/viewContentDetail?contentId=4016624" }
          ]
        },
        {
          name: "Fujitsu",
          links: [
            { label: "DeskUpdate", href: "https://download.ts.fujitsu.com/deskupdate/index.asp?lng=en" },
            { label: "Support Downloads", href: "https://support.ts.fujitsu.com/Softwarelist0.htm" }
          ]
        }
      ]
    },
    {
      id: "panel-cta",
      type: "cta",
      theme: "dark",
      heading: "Dokumen dibuat oleh RyotaQC sebagai panduan QC & Maintenance Laptop.",
      body: "Windows 10 resmi berakhir dukungan pada 14 Oktober 2025. Pastikan validasi kompatibilitas saat menentukan OS final unit.",
      buttons: [
        { label: "Buka PDF Panduan", href: "output/Tutorial-QC-RyotaQC.pdf" },
        { label: "Sumber Gambar", href: "docs/sumber-gambar.md" }
      ]
    }
  ],
  footer: {
    left: "RyotaQC",
    right: "Homepage Motion Edition"
  }
};
