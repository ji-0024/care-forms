async function generatePDF() {
  // すべての入力値を取得
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
  const dob             = document.getElementById('dob').value;
  const gender          = document.getElementById('gender').value;
  const address         = document.getElementById('address').value;

  // テスト用にコンソールへ出力
  console.log({
    applicationDate,
    insuredNumber,
    myNumber,
    insurerName,
    insurerNumber,
    medicalSymbol,
    medicalNumber,
    medicalBranch,
    furigana,
    name,
    dob,
    gender,
    address
  });

  // 将来的にここでPDF生成処理を呼び出します
}
