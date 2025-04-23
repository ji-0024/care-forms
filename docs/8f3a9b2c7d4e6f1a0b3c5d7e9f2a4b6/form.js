// form.js

// Era map
const eraMap = { '明治':1868, '大正':1912, '昭和':1926, '平成':1989, '令和':2019 };

window.addEventListener('DOMContentLoaded', () => {
  ['valid','f',''].forEach(prefix => {
    const eraSel = document.getElementById(prefix+'EraStart') || document.getElementById(prefix+'Era');
    const yearSel = document.getElementById(prefix+'YearStart') || document.getElementById(prefix+'Year');
    const monthSel = document.getElementById(prefix+'MonthStart') || document.getElementById(prefix+'Month');
    const daySel = document.getElementById(prefix+'DayStart') || document.getElementById(prefix+'Day');
    // Populate all select boxes
    Object.keys(eraMap).forEach(e => eraSel?.add(new Option(e,e)));
    for(let i=1;i<=99;i++) yearSel?.add(new Option(i+'年',i));
    for(let m=1;m<=12;m++) monthSel?.add(new Option(m+'月',m));
    for(let d=1;d<=31;d++) daySel?.add(new Option(d+'日',d));
  });
});

function getYMD(prefix) {
  const era = document.getElementById(prefix+'Era')?.value;
  const y = parseInt(document.getElementById(prefix+'Year')?.value,10);
  const m = String(document.getElementById(prefix+'Month')?.value).padStart(2,'0');
  const d = String(document.getElementById(prefix+'Day')?.value).padStart(2,'0');
  if(!eraMap[era]||isNaN(y)) return '';
  return `${eraMap[era]+y-1}-${m}-${d}`;
}

async function generatePDF() {
  // Collect fields
  const data = {
    careLevel: document.getElementById('careLevel').value,
    validStart: getYMD('valid'),
    validEnd: getYMD('validEraEnd'? 'validEnd':'valid'),
    facilityName: document.getElementById('facilityName').value,
    // ... similarly collect other fields by id
  };
  console.log(data);
  // TODO: embed into PDF
}