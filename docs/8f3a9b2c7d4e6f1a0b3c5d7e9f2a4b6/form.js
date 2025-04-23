// form.js

// 元号→西暦マップ
const eraMap = { 明治:1868, 大正:1912, 昭和:1926, 平成:1989, 令和:2019 };

// ドロップダウンを初期化する関数
function initDropdown(eraId, yearId, monthId, dayId) {
  const eraSel   = document.getElementById(eraId);
  const yearSel  = document.getElementById(yearId);
  const monthSel = document.getElementById(monthId);
  const daySel   = document.getElementById(dayId);

  if (eraSel) {
    Object.keys(eraMap).forEach(e => {
      eraSel.add(new Option(e, e));
    });
  }
  if (yearSel) {
    for (let y = 1; y <= 99; y++) {
      yearSel.add(new Option(`${y}年`, y));
    }
  }
  if (monthSel) {
    for (let m = 1; m <= 12; m++) {
      monthSel.add(new Option(`${m}月`, m));
    }
  }
  if (daySel) {
    for (let d = 1; d <= 31; d++) {
      daySel.add(new Option(`${d}日`, d));
    }
  }
}

// 西暦年・月・日から ISO 日付 (YYYY-MM-DD) を組み立て
function getISO(yearId, monthId, dayId) {
  const y = parseInt(document.getElementById(yearId).value, 10);
  const m = String(document.getElementById(monthId).value).padStart(2, '0');
  const d = String(document.getElementById(dayId).value).padStart(2, '0');
  if (isNaN(y)) return '';
  return `${y}-${m}-${d}`;
}


// フォーム入力を PDF に埋め込んで生成・ダウンロード
async function generatePDF() {
  const data = {
    '申請年月日': document.getElementById('applicationDate').value,
    '被保険者番号': document.getElementById('insuredNumber').value,
    'マイナンバー': document.getElementById('myNumber').value,
    '保険者名': document.getElementById('insurerName').value,
    '保険者番号': document.getElementById('insurerNumber').value,
    '記号': document.getElementById('medicalSymbol').value,
    '番号': document.getElementById('medicalNumber').value,
    '枝番': document.getElementById('medicalBranch').value,
    'フリガナ': document.getElementById('furigana').value,
    '氏名': document.getElementById('name').value,
    '生年月日': getISO('era', 'eraYear', 'month', 'day'),
    '性別': document.getElementById('gender').value,
    '住所': document.getElementById('address').value,
    '電話番号': document.getElementById('phoneNumber').value,
    '要介護区分': document.getElementById('careLevel').value,
    '有効期間開始': getISO('validEraStart', 'validYearStart', 'validMonthStart', 'validDayStart'),
    '有効期間終了': getISO('validEraEnd', 'validYearEnd', 'validMonthEnd', 'validDayEnd'),
    '入所施設名': document.getElementById('facilityName').value,
    '入所開始': getISO('facilityEraStart', 'facilityYearStart', 'facilityMonthStart', 'facilityDayStart'),
    '入所終了': getISO('facilityEraEnd', 'facilityYearEnd', 'facilityMonthEnd', 'facilityDayEnd'),
    '医療機関名': document.getElementById('medicalName').value,
    '医療開始': getISO('medicalEraStart', 'medicalYearStart', 'medicalMonthStart', 'medicalDayStart'),
    '医療終了': getISO('medicalEraEnd', 'medicalYearEnd', 'medicalMonthEnd', 'medicalDayEnd'),
    '提出者種別': document.getElementById('agentType').value,
    '提出者名称': document.getElementById('agentName').value,
    '提出者住所': document.getElementById('agentAddress').value,
    '提出者電話': document.getElementById('agentTel').value,
    '代理人氏名': document.getElementById('agentOtherName').value,
    '本人関係': document.getElementById('relation').value,
    '代理人住所': document.getElementById('agentOtherAddress').value,
    '代理人電話': document.getElementById('agentOtherTel').value,
    '医師氏名': document.getElementById('doctorName').value,
    '医療機関': document.getElementById('doctorHospital').value,
    '医師住所': document.getElementById('doctorAddress').value,
    '医師電話': document.getElementById('doctorTel').value,
    '特定疾病名': document.getElementById('diseaseName').value
  };

  const { PDFDocument, StandardFonts } = PDFLib;
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]);
  const font = await pdfDoc.embedFont(StandardFonts.HELVETICA);
  const fontSize = 12;
  let x = 40, y = page.getHeight() - 50;

  Object.entries(data).forEach(([label, val]) => {
    page.drawText(`${label}：${val}`, { x, y, size: fontSize, font });
    y -= fontSize + 6;
    if (y < 50) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = page.getHeight() - 50;
    }
  });

  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'kaigo_shinsei.pdf');
}

// DOM 串刺し後に初期化＆ボタン登録
window.addEventListener('DOMContentLoaded', () => {
  // 生年月日（西暦年／月／日）のプルダウン初期化
  initDropdown('eraYear', 'eraYear', 'month', 'day');

  // その他フィールドの年／月／日プルダウン初期化
  initDropdown('validYearStart', 'validYearStart', 'validMonthStart', 'validDayStart');
  initDropdown('validYearEnd',   'validYearEnd',   'validMonthEnd',   'validDayEnd');
  initDropdown('facilityYearStart', 'facilityYearStart', 'facilityMonthStart', 'facilityDayStart');
  initDropdown('facilityYearEnd',   'facilityYearEnd',   'facilityMonthEnd',   'facilityDayEnd');
  initDropdown('medicalYearStart',  'medicalYearStart',  'medicalMonthStart',  'medicalDayStart');
  initDropdown('medicalYearEnd',    'medicalYearEnd',    'medicalMonthEnd',    'medicalDayEnd');

  // PDF生成ボタンにハンドラをセット
  document.querySelector('button[type="button"]').addEventListener('click', generatePDF);
});

