const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const FILE = '260227_입주예정물량_공개용.xlsx';
const OUTPUT = 'data/complexes.js';

const wb = XLSX.readFile(path.join(__dirname, FILE));
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws);

const complexes = rows
  .filter(r => r['아파트명'])
  .map(r => ({
    name:      String(r['아파트명'] || '').trim(),
    region:    String(r['지역']     || '').trim(),
    address:   String(r['주소']     || '').trim(),
    moveIn:    String(r['입주예정월'] || '').trim(),
    units:     r['세대수'] ? Number(r['세대수']) : null,
  }));

const output = `// 입주예정 단지 목록 — convert-complexes.js 로 자동 생성
// 수정하지 말고 엑셀 수정 후 스크립트 재실행하세요

const COMPLEXES = ${JSON.stringify(complexes, null, 2)};
`;

fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, OUTPUT), output, 'utf8');
console.log(`✅ ${complexes.length}개 단지 → ${OUTPUT} 생성 완료`);
