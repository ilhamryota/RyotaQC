from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Image, ListFlowable, ListItem, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output" / "Tutorial-QC-RyotaQC.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleQC", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=20, leading=24, spaceAfter=10))
styles.add(ParagraphStyle(name="HeadQC", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13.5, leading=18, spaceAfter=8, spaceBefore=8))
styles.add(ParagraphStyle(name="BodyQC", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.4, leading=15))
styles.add(ParagraphStyle(name="SmallQC", parent=styles["BodyText"], fontName="Helvetica-Oblique", fontSize=9, textColor=colors.HexColor("#35544A")))


def add_image(story, rel_path, width_cm, height_cm):
    file_path = ROOT / rel_path
    if file_path.exists():
        img = Image(str(file_path))
        img.drawWidth = width_cm * cm
        img.drawHeight = height_cm * cm
        story.append(img)
        story.append(Spacer(1, 8))


story = []
story.append(Paragraph("Panduan SOP Battery QC & Maintenance Laptop - RyotaQC", styles["TitleQC"]))
story.append(Paragraph("Credit Dokumen dibuat oleh <b>RyotaQC</b> sebagai panduan QC & Maintenance Laptop.", styles["BodyQC"]))
story.append(Spacer(1, 8))

story.append(Paragraph("Pembukaan", styles["HeadQC"]))
story.append(
    Paragraph(
        "Sebelum memahami materi, ucapkan Bismillah agar ilmu baru menjadi berkah dan bermanfaat. "
        "Niat adalah landasan amal (HR. Bukhari no. 1, Muslim no. 1907), dan Allah meninggikan derajat orang berilmu (QS. Al-Mujadilah 58:11).",
        styles["BodyQC"],
    )
)
story.append(Spacer(1, 8))
add_image(story, Path("assets/images/step-maintenance-repair.jpg"), 15.5, 8.8)

story.append(Paragraph("1) SOP Running Test Jam Video", styles["HeadQC"]))
story.append(
    Paragraph(
        "Set awal test: brightness 30% (untuk panel 250 nits), atau brightness 20% (untuk panel 300-400 nits), "
        "audio 30%, dan battery wajib 100% sebelum test dimulai.",
        styles["BodyQC"],
    )
)
story.append(
    Paragraph(
        "Penentuan koreksi menggunakan angka jam awal, bukan menit/detik.",
        styles["BodyQC"],
    )
)

rules_data = [
    ["Jam Awal", "Pengurangan SOP", "Contoh Hasil Final"],
    ["2 jam atau kurang", "Lanjut maintenance", "Belum lolos QC"],
    ["3 jam xx menit", "-30 menit", "3:10 -> 2:40, 3:30 -> 3:00"],
    ["4 jam xx menit", "-45 menit", "4:45 -> 4:00"],
    ["5-6 jam xx menit", "-60 menit", "5:20 -> 4:20, 6:13 -> 5:13"],
    ["7 jam atau lebih", "-120 menit", "7:32 -> 5:32, 8:53 -> 6:53"],
]
rules_tbl = Table(rules_data, colWidths=[4.7 * cm, 4.2 * cm, 6.0 * cm])
rules_tbl.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#DCEEE8")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#143A33")),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#9AB7AE")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ]
    )
)
story.append(rules_tbl)
story.append(Spacer(1, 8))

story.append(Paragraph("2) SOP Battery (Lolos QC / Ganti)", styles["HeadQC"]))
battery_items = [
    "Jika Battery Health < 60%, secara standar battery tidak lolos QC.",
    "Pengecualian hanya jika FCC > 30.000 mWh dan hasil running test di atas 2 jam.",
    "Jika BH sekitar 60%, FCC < 30.000 mWh, dan hasil test < 2 jam, battery direkomendasikan ganti.",
]
story.append(ListFlowable([ListItem(Paragraph(x, styles["BodyQC"])) for x in battery_items], bulletType="bullet"))
story.append(Spacer(1, 6))
add_image(story, Path("assets/images/windows11-settings.png"), 15.5, 8.7)

story.append(PageBreak())
story.append(Paragraph("3) Maintenance dan Problem Solving (Langkah 1-4)", styles["HeadQC"]))

step_items = [
    "<b>Langkah 1:</b> Update firmware, BIOS, chipset, power management, dan utility update resmi vendor.",
    "<b>Langkah 2:</b> Kalibrasi battery: habiskan 0%, charge saat unit mati sampai 100%, lalu running test ulang dan bandingkan hasil.",
    "<b>Langkah 3:</b> Install ulang OS sesuai dukungan driver penuh. Untuk Windows 11 pastikan driver tersedia dan update recommended.",
    "<b>Langkah 4:</b> Jika belum berhasil, turunkan 1 versi OS (Windows 11 ke 10, atau 10 ke 8), lakukan full update lalu running test ulang.",
    "Jika setelah langkah 1-4 hasil tetap di 2 jam atau kurang, battery wajib diganti.",
]
for item in step_items:
    story.append(Paragraph(item, styles["BodyQC"]))
    story.append(Spacer(1, 4))

add_image(story, Path("assets/images/windows-update-screen.png"), 15.5, 11.3)

story.append(Paragraph("4) Kompatibilitas OS (Windows Tips)", styles["HeadQC"]))
story.append(
    Paragraph(
        "Gunakan Windows 11 hanya pada unit yang benar-benar didukung driver native. "
        "Bila dipaksakan ke unit yang mentok di Windows 10, performa driver dan stabilitas battery dapat menurun.",
        styles["BodyQC"],
    )
)
story.append(
    Paragraph(
        "Tanggal penting: dukungan standar Windows 10 berakhir pada 14 Oktober 2025.",
        styles["BodyQC"],
    )
)
story.append(Spacer(1, 8))

story.append(Paragraph("5) Driver Resmi Vendor", styles["HeadQC"]))
vendor_links = [
    "Lenovo: support.lenovo.com + Lenovo Drivers + Lenovo System Update",
    "Dell: dell.com/support/drivers + Dell Command | Update + SupportAssist",
    "HP: support.hp.com/drivers + HP Support Assistant + HP Image Assistant",
    "ASUS: asus.com/support/download-center + MyASUS System Update",
    "Toshiba/Dynabook: support.dynabook.com/support/driversResults + Service Station",
    "Fujitsu: download.ts.fujitsu.com/deskupdate + support.ts.fujitsu.com/Softwarelist0.htm",
]
story.append(ListFlowable([ListItem(Paragraph(x, styles["BodyQC"])) for x in vendor_links], bulletType="bullet"))
story.append(Spacer(1, 8))

story.append(Paragraph("6) Integrasi RyotaQC V4 (D:\\QCApps\\RyotaQC-V4)", styles["HeadQC"]))
ryota_v4_items = [
    "Launcher eksternal dibaca dari src/RyotaQC.App/Config/tool-map.json.",
    "Tool yang relevan untuk SOP battery: HWiNFO, Battery Health, CPU Test, Sentinel, Benchmark, battery report, dan VLC.",
    "Script rilis: scripts/01-publish-release.ps1, 02-build-setup.ps1, 03-build-portable.ps1.",
    "Modul internal QC: Running Test (log JSON), Battery Report (HTML), LCD/Keyboard/Audio/Camera test.",
]
story.append(ListFlowable([ListItem(Paragraph(x, styles["BodyQC"])) for x in ryota_v4_items], bulletType="bullet"))
story.append(Spacer(1, 8))

story.append(Paragraph("7) Rumus Kalkulator SOP", styles["HeadQC"]))
story.append(
    Paragraph(
        "Hitung hasil mentah (jam:menit), lalu kurangi sesuai jam awal: 3->30 menit, 4->45 menit, 5-6->60 menit, 7+->120 menit. "
        "Jika hasil final <= 2 jam, lanjut maintenance. "
        "Jika BH < 60% dan FCC < 30.000 mWh serta hasil tetap rendah, battery direkomendasikan ganti.",
        styles["BodyQC"],
    )
)

story.append(Spacer(1, 10))
story.append(Paragraph("Dokumen ini dibuat untuk standar kerja QC yang konsisten dan mudah diaudit.", styles["SmallQC"]))

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    rightMargin=1.8 * cm,
    leftMargin=1.8 * cm,
    topMargin=1.6 * cm,
    bottomMargin=1.6 * cm,
    title="Panduan SOP Battery RyotaQC",
    author="RyotaQC",
)
doc.build(story)
print(f"Generated: {OUT}")
