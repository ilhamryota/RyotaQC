from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Image, ListFlowable, ListItem, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'output' / 'Tutorial-QC-RyotaQC.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleQC', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=20, leading=24, spaceAfter=10))
styles.add(ParagraphStyle(name='HeadQC', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, leading=18, spaceAfter=8, spaceBefore=8))
styles.add(ParagraphStyle(name='BodyQC', parent=styles['BodyText'], fontName='Helvetica', fontSize=10.5, leading=15))
styles.add(ParagraphStyle(name='SmallQC', parent=styles['BodyText'], fontName='Helvetica-Oblique', fontSize=9, textColor=colors.HexColor('#35544A')))

story = []
story.append(Paragraph('Panduan QC & Maintenance Laptop - RyotaQC', styles['TitleQC']))
story.append(Paragraph('Credit Dokumen dibuat oleh <b>RyotaQC</b> sebagai panduan QC & Maintenance Laptop.', styles['BodyQC']))
story.append(Spacer(1, 8))
story.append(Paragraph('Pembukaan', styles['HeadQC']))
story.append(Paragraph('Sebelum memahami dan mempelajari materi, ucapkan Bismillah agar ilmu yang dipelajari menjadi berkah dan bermanfaat. Niat adalah landasan amal (HR. Bukhari no. 1, Muslim no. 1907), dan Allah meninggikan derajat orang berilmu (QS. Al-Mujadilah 58:11).', styles['BodyQC']))
story.append(Spacer(1, 8))

hero_img = ROOT / 'assets' / 'images' / 'step-maintenance-repair.jpg'
if hero_img.exists():
    img = Image(str(hero_img))
    img.drawWidth = 15.5 * cm
    img.drawHeight = 8.8 * cm
    story.append(img)
    story.append(Spacer(1, 8))

story.append(Paragraph('1) SOP Running Test Jam Video', styles['HeadQC']))
story.append(Paragraph('Set awal test wajib: brightness 30% pada panel 250 nits, brightness 20% untuk panel 300-400 nits, audio 30%, dan battery 100% sebelum test dimulai.', styles['BodyQC']))

data = [
    ['Hasil Mentah', 'Koreksi', 'Final QC'],
    ['2 jam', 'Lanjut maintenance', 'Belum lolos QC'],
    ['3 jam 30 menit', '-30 menit', '3 jam 00 menit'],
    ['3 jam 10 menit', '-30 menit', '2 jam 40 menit'],
    ['4 jam 45 menit', '-45 menit', '4 jam 00 menit'],
    ['5 jam 20 menit', '-1 jam', '4 jam 20 menit'],
    ['6 jam 13 menit', '-1 jam', '5 jam 13 menit'],
    ['7 jam 32 menit', '-2 jam', '5 jam 32 menit'],
    ['8 jam 53 menit', '-2 jam', '6 jam 53 menit'],
]

tbl = Table(data, colWidths=[5.0*cm, 4.2*cm, 5.0*cm])
tbl.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#DCEEE8')),
    ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#143A33')),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#9AB7AE')),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
]))
story.append(tbl)
story.append(Spacer(1, 8))

story.append(Paragraph('2) Battery QC', styles['HeadQC']))
bullet_items = [
    'Jika Battery Health di bawah 60%, secara standar battery tidak lolos QC dan direkomendasikan ganti.',
    'Pengecualian bisa dipertimbangkan jika FCC di atas 30.000 mWh dan running test nyata di atas 2 jam.',
    'Jika BH sekitar 60%, FCC di bawah 30.000 mWh, dan test di bawah 2 jam: battery wajib diganti.',
]
story.append(ListFlowable([ListItem(Paragraph(x, styles['BodyQC'])) for x in bullet_items], bulletType='bullet'))

settings_img = ROOT / 'assets' / 'images' / 'windows11-settings.png'
if settings_img.exists():
    img2 = Image(str(settings_img))
    img2.drawWidth = 15.5 * cm
    img2.drawHeight = 8.7 * cm
    story.append(Spacer(1, 6))
    story.append(img2)

story.append(PageBreak())
story.append(Paragraph('3) Maintenance & Problem Solving (Langkah 1-4)', styles['HeadQC']))

steps = [
    '<b>Langkah 1 - Update firmware dan power management:</b> update BIOS, chipset, dan aplikasi update resmi OEM.',
    '<b>Langkah 2 - Kalibrasi battery:</b> habiskan battery hingga 0%, charge saat unit mati hingga 100%, lalu running test ulang dan bandingkan hasil.',
    '<b>Langkah 3 - Install ulang OS sesuai dukungan driver:</b> pastikan kompatibilitas penuh Windows 11. Jika tidak didukung, gunakan Windows 10 dan driver resmi.',
    '<b>Langkah 4 - Turunkan 1 versi OS bila perlu:</b> contoh Windows 11 ke Windows 10, lalu full update dan running test ulang.',
]

for s in steps:
    story.append(Paragraph(s, styles['BodyQC']))
    story.append(Spacer(1, 4))

story.append(Paragraph('Jika setelah langkah 3 dan 4 hasil tetap 2 jam atau di bawah 2 jam, battery sudah wajib diganti.', styles['BodyQC']))
story.append(Spacer(1, 8))

update_img = ROOT / 'assets' / 'images' / 'windows-update-screen.png'
if update_img.exists():
    img3 = Image(str(update_img))
    img3.drawWidth = 15.5 * cm
    img3.drawHeight = 11.3 * cm
    story.append(img3)
    story.append(Spacer(1, 6))

story.append(Paragraph('4) Link Official Driver Vendor', styles['HeadQC']))
links = [
    'Lenovo: support.lenovo.com + Lenovo System Update + Lenovo Vantage',
    'Dell: dell.com/support + Dell Command | Update + SupportAssist',
    'HP: support.hp.com/drivers + HP Support Assistant + HP Image Assistant',
    'ASUS: ASUS Download Center + MyASUS System Update',
    'Toshiba/Dynabook: support.dynabook.com (Drivers & Software)',
    'Fujitsu: DeskUpdate + support.ts.fujitsu.com',
]
story.append(ListFlowable([ListItem(Paragraph(x, styles['BodyQC'])) for x in links], bulletType='bullet'))

story.append(Paragraph('Catatan tanggal penting: dukungan resmi Windows 10 berakhir pada 14 Oktober 2025. Gunakan Windows 11 hanya pada unit yang benar-benar kompatibel.', styles['BodyQC']))
story.append(Spacer(1, 8))

story.append(Paragraph('5) Integrasi RyotaQC V4 (D:\\QCApps\\RyotaQC-V4)', styles['HeadQC']))
story.append(Paragraph('Fitur yang relevan: launcher QC (CPU test, HWiNFO, battery health, sentinel, benchmark), running test video via VLC, battery report generator, dan tool-map driver launcher vendor.', styles['BodyQC']))

story.append(Spacer(1, 10))
story.append(Paragraph('Dokumen ini dibuat sebagai panduan pembelajaran dan eksekusi QC secara konsisten.', styles['SmallQC']))

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    rightMargin=1.8*cm,
    leftMargin=1.8*cm,
    topMargin=1.6*cm,
    bottomMargin=1.6*cm,
    title='Panduan QC RyotaQC',
    author='RyotaQC',
)

doc.build(story)
print(f'Generated: {OUT}')
