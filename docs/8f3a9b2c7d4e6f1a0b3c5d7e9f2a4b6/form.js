// form.js
// Map Japanese era names to base years
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
  // Birthdate dropdown
  initDropdown('era', 'eraYear', 'month', 'day');
  // Validity period
  initDropdown('validEraStart', 'validYearStart', 'validMonthStart', 'validDayStart');
  initDropdown('validEraEnd', 'validYearEnd', 'validMonthEnd', 'validDayEnd');
  // Past six months facility
  initDropdown('facilityEraStart', 'facilityYearStart', 'facilityMonthStart', 'facilityDayStart');
  initDropdown('facilityEraEnd', 'facilityYearEnd', 'facilityMonthEnd', 'facilityDayEnd');
  // Past six months medical
  initDropdown('medicalEraStart', 'medicalYearStart', 'medicalMonthStart', 'medicalDayStart');
  initDropdown('medicalEraEnd', 'medicalYearEnd', 'medicalMonthEnd', 'medicalDayEnd');
});

function getISO(eraId, yearId, monthId, dayId) {
  const era = document.getElementById(eraId)?.value;
  const y   = parseInt(document.getElementById(yearId)?.value, 10);
  const m   = String(document.getElementById(monthId)?.value).padStart(2, '0');
  const d   = String(document.getElementById(dayId)?.value).padStart(2, '0');
  if (!eraMap[era] || isNaN(y)) return '';
  return `${eraMap[era] + y - 1}-${m}-${d}`;
}

async function generatePDF() {
  const data = {
    applicationDate: document.getElementById('applicationDate').value,
    insuredNumber:   document.getElementById('insuredNumber').value,
    myNumber:        document.getElementById('myNumber').value,
    insurerName:     document.getElementById('insurerName').value,
    insurerNumber:   document.getElementById('insurerNumber').value,
    medicalSymbol:   document.getElementById('medicalSymbol').value,
    medicalNumber:   document.getElementById('medicalNumber').value,
    medicalBranch:   document.getElementById('medicalBranch').value,
    furigana:        document.getElementById('furigana').value,
    name:            document.getElementById('name').value,
    dob:             getISO('era', 'eraYear', 'month', 'day'),
    gender:          document.getElementById('gender').value,
    address:         document.getElementById('address').value,
    phoneNumber:     document.getElementById('phoneNumber').value,
    careLevel:       document.getElementById('careLevel').value,
    validStart:      getISO('validEraStart', 'validYearStart', 'validMonthStart', 'validDayStart'),
    validEnd:        getISO('validEraEnd', 'validYearEnd', 'validMonthEnd', 'validDayEnd'),
    facilityName:    document.getElementById('facilityName').value,
    facilityStart:   getISO('facilityEraStart', 'facilityYearStart', 'facilityMonthStart', 'facilityDayStart'),
    facilityEnd:     getISO('facilityEraEnd', 'facilityYearEnd', 'facilityMonthEnd', 'facilityDayEnd'),
    medicalName:     document.getElementById('medicalName').value,
    medicalStart:    getISO('medicalEraStart', 'medicalYearStart', 'medicalMonthStart', 'medicalDayStart'),
    medicalEnd:      getISO('medicalEraEnd', 'medicalYearEnd', 'medicalMonthEnd', 'medicalDayEnd'),
    agentType:       document.getElementById('agentType').value,
    agentName:       document.getElementById('agentName').value,
    agentAddress:    document.getElementById('agentAddress').value,
    agentTel:        document.getElementById('agentTel').value,
    agentOtherName:  document.getElementById('agentOtherName').value,
    relation:        document.getElementById('relation').value,
    agentOtherAddress: document.getElementById('agentOtherAddress').value,
    agentOtherTel:   document.getElementById('agentOtherTel').value,
    doctorName:      document.getElementById('doctorName').value,
    doctorHospital:  document.getElementById('doctorHospital').value,
    doctorAddress:   document.getElementById('doctorAddress').value,
    doctorTel:       document.getElementById('doctorTel').value,
    diseaseName:     document.getElementById('diseaseName').value
  };
  console.log(data);
  // TODO: embed data into PDF
}