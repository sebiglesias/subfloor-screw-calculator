
const state = { len: 24, wid: 16, spacing: 16, thick: 0.75 };

function init() {
  const l = document.getElementById('floorLen');
  const w = document.getElementById('floorWid');
  const js = document.getElementById('joistSpacing');
  const pt = document.getElementById('panelThickness');

  l.addEventListener('input', e => { state.len = parseFloat(e.target.value)||0; calc(); });
  w.addEventListener('input', e => { state.wid = parseFloat(e.target.value)||0; calc(); });
  js.addEventListener('change', e => { state.spacing = parseFloat(e.target.value)||16; calc(); });
  pt.addEventListener('change', e => { state.thick = parseFloat(e.target.value)||0.75; calc(); });
  calc();
}

function calc() {
  const area = state.len * state.wid;
  // 4x8 sheet = 32 sq ft. Add 8% cut waste
  const sheets = Math.ceil((area / 32) * 1.08);

  // Screws per sheet:
  // For 16" OC: 5 joist lines per 8-ft span. 9 screws per joist line (6" edge, 12" field) = 45-55 screws per sheet
  let screwsPerSheet = 55;
  if (state.spacing === 19.2) screwsPerSheet = 44;
  else if (state.spacing === 24) screwsPerSheet = 36;

  const totalScrews = sheets * screwsPerSheet;
  const boxes = Math.max(1, Math.ceil(totalScrews / 1000));

  // Glue: 1 tube (28 oz) covers roughly 2.5 sheets (80 linear feet of 1/4" bead)
  const glueTubes = Math.max(1, Math.ceil(sheets / 2.5));

  // Screw length
  const screwLen = state.thick >= 1.0 ? "2-1/2 Inch #9" : "2-Inch or 1-3/4" #8";

  document.getElementById('totalScrews').textContent = totalScrews.toLocaleString();
  document.getElementById('screwBoxes').textContent = `≈ ${boxes} Box${boxes>1?'es':''} of 1,000 Collated Screws`;
  document.getElementById('sheetCount').textContent = `${sheets} Sheets (4x8)`;
  document.getElementById('glueTubes').textContent = `${glueTubes} Tubes (28 oz)`;
  document.getElementById('floorArea').textContent = `${Math.round(area)} sq ft`;
  document.getElementById('screwsPerSheet').textContent = `≈ ${screwsPerSheet} Screws (${state.spacing}" OC)`;
  document.getElementById('screwLength').textContent = screwLen;
}
window.addEventListener('DOMContentLoaded', init);
