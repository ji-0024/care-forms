// form.js

// Map Japanese era names to base years for conversion
const eraMap = {
  '令和': 2018,
  '平成': 1988,
  '昭和': 1925,
  // '大正': 1911, // add if needed
};

// Initialize dropdowns when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const eraSelect  = document.getElementById('era');
  const eraYearSel = document.getElementById('eraYear');
  const monthSel   = document.getElementById('month');
  const daySel     = document.getElementById('day');

  // Populate months (1-12)
  for (let m = 1; m <= 12; m++) {
    monthSel.add(new Option(`${m}月`, m));
  }
  // Populate days (1-31)
  for (let d = 1; d <= 31; d++) {
    daySel.add(new Option(`${d}日`, d));
  }

  // When era changes, regenerate year options with era label
  eraSelect.addEventListener('change', () => {
    const era = eraSelect.value;
    eraYearSel.innerHTML = '<option value="">--年--</option>';
    if (!eraMap[era]) return;
    for (let y = 1; y <= 31; y++) {
      const label = `${era}${y}年`;
      eraYearSel.add(new Option(label, y));
    }
  });
});

// Convert Japanese era selection to ISO date string
function getBirthDateISO() {
  const era  = document.getElementById('era').value;
  const y    = parseInt(document.getElementById('eraYear').value);
  const m    = String(document.getElementById('month').value).padStart(2, '0');
  const d    = String(document.getElementById('day').value).padStart(2, '0');

  if (!eraMap[era] || isNaN(y)) return '';
  const year = eraMap[era] + y;
  return `${year}-${m}-${d}`;
}

// Main function to generate and download PDF
async function generatePDF() {
  // Collect all form inputs
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

  // Load the blank PDF template
  const existingPdfBytes = await fetch('blank_form.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  // Draw text onto the first page
  const page = pdfDoc.getPages()[0];
  // TODO: Adjust x, y coordinates to align with your PDF layout
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

  // Save and trigger download
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), '申請フォーム.pdf');
}
