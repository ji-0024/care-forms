// form.js

// 和暦元号から西暦を計算するマップ
const eraMap = {
  '令和': 2018,
  '平成': 1988,
  '昭和': 1925,
  // 必要に応じて '大正': 1911 などを追加
};

// ページ読み込み時に select 要素を初期化
window.addEventListener('DOMContentLoaded', () => {
  const eraYear = document.getElementById('eraYear');
  const month   = document.getElementById('month');
  const day     = document.getElementById('day');

  // 元号年：1年～31年
  for (let y = 1; y <= 31; y++) {
    eraYear.add(new Option(`${y}年`, y));
  }
  // 月：1月～12月
  for (let m = 1; m <= 12; m++) {
    month.add(new Option(`${m}月`, m));
  }
  // 日：1日～31日
  for (let d = 1; d <= 31; d++) {
    day.add(new Option(`${d}日`, d));
  }
});

// 和暦入力をISO形式（YYYY-MM-DD）に変換
function getBirthDateISO() {
  const e = document.getElementById('era').value;
  const y = parseInt(document.getElementById('eraYear').value);
  const m = String(document.getElementById('month').value).padStart(2, '0');
  const d = String(document.getElementById('day').value).padStart(2, '0');

  if (!eraMap[e] || isNaN(y)) {
    return '';
  }
  const year = eraMap[e] + y;
  return `${year}-${m}-${d}`;
}

// PDF生成関数
async function generatePDF() {
  // フォームの全入力値を取得
  const applicationDate = document.getElementById('applicationDate').value;
  const insuredNumber   = document.getElementById('insuredNumber').value;
  const myNumber        = document.getElementById('myNumber').value;
  const insurerName     = document.getElementById('insurerName').value;
  const insurerNumber   = document.getElementById('insurerNumber').value;
  const medicalSymbol   = document.getElementById('medicalSymbol').value;
  const medicalNumber   = document.getElementById('medicalNumber').value;
  const medicalBranch   = document.getElementById('medicalBranch').value;
  const furigana        = document.getElementById('furigana').value;
  const name            = document.getElementById('name').value;
  const dob             = getBirthDateISO();
  const gender          = document.getElementById('gender').value;
  const address         = document.getElementById('address').value;

  // 元PDFをロード
  const existingPdfBytes = await fetch('blank_form.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  const page = pdfDoc.getPages()[0];
  // 以下のx,y座標はPDFフォーマットに合わせて調整してください
  page.drawText(applicationDate, { x: 50, y: 800, size: 12, font });
  page.drawText(insuredNumber,   { x: 50, y: 780, size: 12, font });
  page.drawText(myNumber,        { x: 50, y: 760, size: 12, font });
  page.drawText(insurerName,     { x: 50, y: 740, size: 12, font });
  page.drawText(insurerNumber,   { x: 50, y: 720, size: 12, font });
  page.drawText(medicalSymbol,   { x: 50, y: 700, size: 12, font });
  page.drawText(medicalNumber,   { x: 150, y: 700, size: 12, font });
  page.drawText(medicalBranch,   { x: 250, y: 700, size: 12, font });
  page.drawText(furigana,        { x: 50, y: 680, size: 12, font });
  page.drawText(name,            { x: 150, y: 680, size: 12, font });
  page.drawText(dob,             { x: 50, y: 660, size: 12, font });
  page.drawText(gender,          { x: 150, y: 660, size: 12, font });
  page.drawText(address,         { x: 50, y: 640, size: 12, font });

  // PDF出力＆ダウンロード
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), '申請フォーム.pdf');
}
