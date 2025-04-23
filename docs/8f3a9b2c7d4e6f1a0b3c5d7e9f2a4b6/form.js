// form.js
const eraMap = { 明治:1868, 大正:1912, 昭和:1926, 平成:1989, 令和:2019 };

function initDropdown(eraId, yearId, monthId, dayId) {
  const eraSel   = document.getElementById(eraId);
  const yearSel  = document.getElementById(yearId);
  const monthSel = document.getElementById(monthId);
  const daySel   = document.getElementById(dayId);
  if (eraSel) Object.keys(eraMap).forEach(e => eraSel.add(new Option(e, e)));
  if (yearSel) for (let y = 1; y <= 99; y++) yearSel.add(new Option(`${y}年`, y));
  if (monthSel) for (let m = 1; m <= 12; m++) monthSel.add(new Option(`${m}月`, m));
  if (daySel) for (let d = 1; d <= 31; d++) daySel.add(new Option(`${d}日`, d));
}

window.addEventListener('DOMContentLoaded', () => {
  initDropdown('era','eraYear','month','day');
  initDropdown('validEraStart','validYearStart','validMonthStart','validDayStart');
  initDropdown('validEraEnd','validYearEnd','validMonthEnd','validDayEnd');
});

function getISO(eraId, yearId, monthId, dayId) {
  const era = document.getElementById(eraId)?.value;
  const y   = parseInt(document.getElementById(yearId)?.value, 10);
  const m   = String(document.getElementById(monthId)?.value).padStart(2,'0');
  const d   = String(document.getElementById(dayId)?.value).padStart(2,'0');
  if (!eraMap[era] || isNaN(y)) return '';
  return `${eraMap[era]+y-1}-${m}-${d}`;
}

async function generatePDF() {
  const data = {
    dob: getISO('era','eraYear','month','day'),
    validStart: getISO('validEraStart','validYearStart','validMonthStart','validDayStart'),
    validEnd: getISO('validEraEnd','validYearEnd','validMonthEnd','validDayEnd')
  };
  console.log(data);
  // TODO: embed data into PDF
}