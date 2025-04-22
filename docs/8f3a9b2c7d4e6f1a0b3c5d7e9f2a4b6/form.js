async function generatePDF() {
  // 1. フォームの入力値を取得
  const name = document.getElementById('name').value;
  const dob  = document.getElementById('dob').value;

  // 2. 空白PDFを読み込む
  const existingPdfBytes = await fetch('blank_form.pdf').then(res => res.arrayBuffer());

  // 3. PDF-LIB でドキュメントを読み込み
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

  // 4. フォントを埋め込む（標準フォント）
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  // 5. 1ページ目を取得してテキストを描画
  const page = pdfDoc.getPages()[0];
  // ※ x, y は適宜調整してください
  page.drawText(name, { x: 100, y: 700, size: 12, font });
  page.drawText(dob,  { x: 100, y: 680, size: 12, font });

  // 6. 新しいPDFを生成し、ダウンロード
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), '申請フォーム.pdf');
}
