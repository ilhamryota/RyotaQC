const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((node) => observer.observe(node));

const formatMinutes = (totalMinutes) => {
  const safe = Math.max(0, totalMinutes);
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return `${h} jam ${String(m).padStart(2, '0')} menit`;
};

const normalizeRunningTest = (hours, minutes) => {
  const total = hours * 60 + minutes;

  if (total <= 120) {
    return {
      deduction: 0,
      normalized: total,
      note: 'Durasi 2 jam atau kurang: lanjutkan Maintenance langkah 1-4.'
    };
  }

  if (total >= 180 && total < 240) {
    return { deduction: 30, normalized: total - 30, note: 'Koreksi range 3 jam: kurangi 30 menit.' };
  }

  if (total >= 240 && total < 300) {
    return { deduction: 45, normalized: total - 45, note: 'Koreksi range 4 jam: kurangi 45 menit.' };
  }

  if (total >= 300 && total < 420) {
    return { deduction: 60, normalized: total - 60, note: 'Koreksi range 5-6 jam: kurangi 1 jam.' };
  }

  if (total >= 420) {
    return { deduction: 120, normalized: total - 120, note: 'Koreksi range 7 jam ke atas: kurangi 2 jam.' };
  }

  return {
    deduction: 0,
    normalized: total,
    note: 'Durasi belum memenuhi range normalisasi 3 jam ke atas.'
  };
};

const form = document.getElementById('running-test-form');
const output = document.getElementById('calc-output');

if (form && output) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const hours = Number(document.getElementById('input-hours').value || 0);
    const minutes = Number(document.getElementById('input-minutes').value || 0);

    if (hours < 0 || minutes < 0 || minutes > 59) {
      output.textContent = 'Input tidak valid. Pastikan jam >= 0 dan menit 0-59.';
      return;
    }

    const result = normalizeRunningTest(hours, minutes);
    const raw = formatMinutes(hours * 60 + minutes);
    const finalTime = formatMinutes(result.normalized);
    const maintenanceFlag = result.normalized <= 120 ? ' Wajib lanjut maintenance.' : '';

    output.textContent = `Raw: ${raw} | Potongan: ${result.deduction} menit | Final QC: ${finalTime}. ${result.note}${maintenanceFlag}`;
  });
}

const floatNodes = [...document.querySelectorAll('.scroll-float')];

const applyFloat = () => {
  const viewportCenter = window.innerHeight * 0.5;

  floatNodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const speed = Number(node.dataset.speed || 0.06);
    const distance = rect.top + rect.height * 0.5 - viewportCenter;
    const y = distance * speed * -0.16;
    node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
  });
};

applyFloat();
window.addEventListener('scroll', applyFloat, { passive: true });
window.addEventListener('resize', applyFloat);
