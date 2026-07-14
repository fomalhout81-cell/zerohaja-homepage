const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const DATA_FILE = path.join(__dirname, 'visits.json');
const PASSWORD = '1111';
const MAX_VISITS = 2000;
const EXCLUDE_IPS = ['211.112.200.120', '58.78.118.95'];
// Googlebot Rendering (66.249.x.x), PageSpeed Insights (34.64.x.x)
const EXCLUDE_PREFIXES = ['66.249.', '34.64.'];
function isExcludedRange(ip) {
  return EXCLUDE_PREFIXES.some(p => ip.startsWith(p));
}
const BOT_PATTERN = /bot|crawl|spider|slurp|yeti|facebookexternalhit|Twitterbot|LinkedInBot/i;

function loadVisits() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
}

function saveVisits(visits) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(visits.slice(-MAX_VISITS)));
}

app.post('/track', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.connection.remoteAddress || '-';
  const ua = req.headers['user-agent'] || '-';
  const { sessionId, resolution, referrer } = req.body || {};

  if (EXCLUDE_IPS.includes(ip)) return res.json({ ok: true });

  const visits = loadVisits();
  visits.push({
    sessionId: sessionId || '-',
    ip,
    ua,
    resolution: resolution || '-',
    referrer: referrer || '-',
    time: new Date().toISOString(),
    duration: null,
    pages: [],
    converted: false,
  });
  saveVisits(visits);
  res.json({ ok: true });
});

app.post('/track-end', (req, res) => {
  const { sessionId, duration, pages } = req.body || {};
  if (!sessionId) return res.json({ ok: false });

  const visits = loadVisits();
  for (let i = visits.length - 1; i >= Math.max(0, visits.length - 100); i--) {
    if (visits[i].sessionId === sessionId) {
      visits[i].duration = typeof duration === 'number' ? duration : null;
      visits[i].pages = Array.isArray(pages) ? pages : [];
      break;
    }
  }
  saveVisits(visits);
  res.json({ ok: true });
});

app.post('/track-convert', (req, res) => {
  const { sessionId } = req.body || {};
  if (!sessionId) return res.json({ ok: false });

  const visits = loadVisits();
  for (let i = visits.length - 1; i >= Math.max(0, visits.length - 100); i--) {
    if (visits[i].sessionId === sessionId) {
      visits[i].converted = true;
      break;
    }
  }
  saveVisits(visits);
  res.json({ ok: true });
});

app.get('/zerohaza-admin', (req, res) => {
  if (req.query.pw !== PASSWORD) {
    return res.send(`<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><title>관리자</title>
<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f4f7fb;}
.box{background:white;padding:40px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);text-align:center;}
h2{margin:0 0 24px;color:#1a2a3a;}input{padding:10px 16px;border:1px solid #ddd;border-radius:6px;font-size:15px;margin-right:8px;}
button{padding:10px 20px;background:#2A7172;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;}
</style></head><body>
<div class="box"><h2>제로하자 관리자</h2>
<form action="/zerohaza-admin" method="get">
<input type="password" name="pw" placeholder="비밀번호">
<button type="submit">확인</button>
</form></div></body></html>`);
  }

  const allVisits = loadVisits().filter(v => !EXCLUDE_IPS.includes(v.ip)).slice().reverse();
  const total = allVisits.length;
  function isBot(v) { return BOT_PATTERN.test(v.ua) || isExcludedRange(v.ip); }
  const bots = allVisits.filter(isBot).length;
  const mobile = allVisits.filter(v => !isBot(v) && /Mobile|Android|iPhone|iPad/i.test(v.ua)).length;
  const pc = total - mobile - bots;
  const uniqueIPs = new Set(allVisits.filter(v => !isBot(v)).map(v => v.ip)).size;
  const converted = allVisits.filter(v => v.converted).length;

  function fmtDuration(sec) {
    if (sec === null || sec === undefined) return '-';
    if (sec < 60) return sec + '초';
    return Math.floor(sec / 60) + '분 ' + (sec % 60) + '초';
  }

  function getBotName(ua, ip) {
    if (ip && ip.startsWith('34.64.')) return 'PageSpeed';
    if (ip && ip.startsWith('66.249.')) return 'Googlebot Render';
    if (/Googlebot/i.test(ua)) return 'Googlebot';
    if (/bingbot/i.test(ua)) return 'Bingbot';
    if (/Yeti/i.test(ua)) return 'Naver Yeti';
    if (/Twitterbot/i.test(ua)) return 'Twitterbot';
    if (/LinkedInBot/i.test(ua)) return 'LinkedInBot';
    if (/facebookexternalhit/i.test(ua)) return 'Facebook';
    if (/slurp/i.test(ua)) return 'Yahoo Slurp';
    if (/crawl/i.test(ua)) return 'Crawler';
    if (/spider/i.test(ua)) return 'Spider';
    if (/bot/i.test(ua)) return 'Bot';
    return '봇';
  }

  function getDeviceModel(ua) {
    var sm = ua.match(/SM-([A-Z0-9]+)/);
    if (sm) return 'Galaxy ' + sm[1];
    var iphone = ua.match(/iPhone OS ([\d_]+)/);
    if (iphone) return 'iPhone (iOS ' + iphone[1].replace(/_/g, '.') + ')';
    var ipad = ua.match(/iPad.*OS ([\d_]+)/);
    if (ipad) return 'iPad (iOS ' + ipad[1].replace(/_/g, '.') + ')';
    var lg = ua.match(/LG-([A-Z0-9]+)|LM-([A-Z0-9]+)/);
    if (lg) return 'LG ' + (lg[1] || lg[2]);
    var xiaomi = ua.match(/(?:Redmi|POCO|Mi) ([A-Z0-9 ]+) Build/);
    if (xiaomi) return xiaomi[0].replace(' Build', '').trim();
    var android = ua.match(/Android [\d.]+; ([^;)]+?) Build/);
    if (android) {
      var model = android[1].trim();
      if (model === 'K') return 'Android (미공개)';
      if (model.length > 24) model = model.slice(0, 24) + '…';
      return model;
    }
    if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
    if (/Windows NT 6/.test(ua)) return 'Windows 7/8';
    var mac = ua.match(/Mac OS X ([\d_]+)/);
    if (mac) return 'Mac OS ' + mac[1].replace(/_/g, '.');
    return '';
  }

  const rows = allVisits.map(v => {
    const isBotV = isBot(v);
    const isMobile = !isBotV && /Mobile|Android|iPhone|iPad/i.test(v.ua);
    const deviceType = isBotV ? 'bot' : (isMobile ? 'mobile' : 'pc');
    const isConverted = !!v.converted;
    const browser = v.ua.match(/(Chrome|Firefox|Safari|Edg|Opera)\/[\d.]+/)?.[0]
      || v.ua.slice(0, 40);
    const dateStr = v.time.slice(0, 10);
    const time = new Date(v.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const dur = fmtDuration(v.duration);
    const pageStr = Array.isArray(v.pages) && v.pages.length
      ? v.pages.join(' → ')
      : '-';
    const deviceLabel = isBotV ? '🤖 봇' : (isMobile ? '📱 모바일' : '💻 PC');
    const model = isBotV ? getBotName(v.ua, v.ip) : getDeviceModel(v.ua);
    const convertBadge = isConverted ? '<br><span style="font-size:10px;font-weight:700;color:#fff;background:#e53e3e;padding:1px 6px;border-radius:4px;margin-top:2px;display:inline-block">🎯 상담신청</span>' : '';
    const deviceCell = model
      ? deviceLabel + '<br><span style="font-size:10px;color:#888">' + model + '</span>' + convertBadge
      : deviceLabel + convertBadge;
    const referrerCell = isBotV ? getBotName(v.ua, v.ip) : v.referrer;
    const rowStyle = isConverted ? ' style="background:#fff8f8"' : (isBotV ? ' style="opacity:0.5"' : '');
    return '<tr data-type="' + deviceType + '" data-date="' + dateStr + '" data-ip="' + v.ip + '" data-converted="' + isConverted + '"' + rowStyle + '>'
      + '<td>' + time + '</td>'
      + '<td>' + v.ip + '</td>'
      + '<td>' + deviceCell + '</td>'
      + '<td>' + v.resolution + '</td>'
      + '<td style="font-size:11px">' + browser + '</td>'
      + '<td style="font-size:11px">' + referrerCell + '</td>'
      + '<td>' + dur + '</td>'
      + '<td style="font-size:11px;white-space:nowrap">' + pageStr + '</td>'
      + '</tr>';
  }).join('');

  res.send('<!DOCTYPE html>\n'
    + '<html lang="ko"><head><meta charset="UTF-8"><title>방문자 현황 — 제로하자</title>\n'
    + '<style>\n'
    + 'body{font-family:sans-serif;padding:32px;background:#f4f7fb;margin:0;}\n'
    + 'h1{font-size:22px;color:#1a2a3a;margin:0 0 20px;}\n'
    + '.stats{display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap;}\n'
    + '.stat{background:white;padding:18px 24px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.07);}\n'
    + '.stat-num{font-size:30px;font-weight:700;color:#2A7172;}\n'
    + '.stat-label{font-size:12px;color:#888;margin-top:4px;}\n'
    + '.stat.conv .stat-num{color:#e53e3e;}\n'
    + '.toolbar{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;}\n'
    + '.date-range{display:flex;align-items:center;gap:8px;background:white;padding:8px 14px;border-radius:10px;box-shadow:0 1px 6px rgba(0,0,0,0.07);}\n'
    + '.date-range label{font-size:12px;color:#888;}\n'
    + '.date-range input[type=date]{border:1px solid #e0e0e0;border-radius:6px;padding:5px 8px;font-size:13px;outline:none;}\n'
    + '.date-range input[type=date]:focus{border-color:#2A7172;}\n'
    + '.btn-apply{padding:6px 14px;background:#2A7172;color:white;border:none;border-radius:6px;font-size:13px;cursor:pointer;font-weight:600;}\n'
    + '.btn-apply:hover{background:#1a4a4a;}\n'
    + '.btn-clear{padding:6px 12px;background:#f0f0f0;color:#555;border:none;border-radius:6px;font-size:13px;cursor:pointer;}\n'
    + '.filters{display:flex;gap:8px;}\n'
    + '.filter-btn{padding:7px 18px;border:1.5px solid #ddd;border-radius:20px;font-size:13px;cursor:pointer;background:white;color:#555;font-weight:500;transition:all 0.15s;}\n'
    + '.filter-btn:hover{border-color:#2A7172;color:#2A7172;}\n'
    + '.filter-btn.active{background:#2A7172;color:white;border-color:#2A7172;}\n'
    + 'table{width:100%;border-collapse:collapse;background:white;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.07);}\n'
    + 'th{background:#2A7172;color:white;padding:11px 14px;font-size:13px;text-align:left;}\n'
    + 'td{padding:11px 14px;font-size:13px;border-bottom:1px solid #f0f0f0;color:#333;vertical-align:middle;}\n'
    + 'tr:hover td{background:#fdf5f5;}\n'
    + '</style></head><body>\n'
    + '<h1>방문자 현황</h1>\n'
    + '<div class="stats">\n'
    + '  <div class="stat"><div class="stat-num" id="s-total">' + total + '</div><div class="stat-label">총 방문</div></div>\n'
    + '  <div class="stat"><div class="stat-num" id="s-unique">' + uniqueIPs + '</div><div class="stat-label">순방문자</div></div>\n'
    + '  <div class="stat"><div class="stat-num" id="s-mobile">' + mobile + '</div><div class="stat-label">모바일</div></div>\n'
    + '  <div class="stat"><div class="stat-num" id="s-pc">' + pc + '</div><div class="stat-label">PC</div></div>\n'
    + '  <div class="stat"><div class="stat-num" id="s-bot">' + bots + '</div><div class="stat-label">봇</div></div>\n'
    + '  <div class="stat conv"><div class="stat-num" id="s-conv">' + converted + '</div><div class="stat-label">상담신청</div></div>\n'
    + '</div>\n'
    + '<div class="toolbar">\n'
    + '  <div class="date-range">\n'
    + '    <label>기간</label>\n'
    + '    <input type="date" id="dateFrom">\n'
    + '    <span style="color:#aaa">—</span>\n'
    + '    <input type="date" id="dateTo">\n'
    + '    <button class="btn-apply" onclick="applyFilter()">적용</button>\n'
    + '    <button class="btn-clear" onclick="clearDate()">전체</button>\n'
    + '  </div>\n'
    + '  <div class="filters">\n'
    + '    <button class="filter-btn active" onclick="setType(\'all\', this)">전체</button>\n'
    + '    <button class="filter-btn" onclick="setType(\'mobile\', this)">모바일만</button>\n'
    + '    <button class="filter-btn" onclick="setType(\'pc\', this)">PC만</button>\n'
    + '    <button class="filter-btn" onclick="setType(\'no-bot\', this)">봇 제외</button>\n'
    + '    <button class="filter-btn" onclick="setType(\'bot\', this)">봇만</button>\n'
    + '    <button class="filter-btn" onclick="setType(\'converted\', this)">상담신청만</button>\n'
    + '  </div>\n'
    + '</div>\n'
    + '<table>\n'
    + '  <thead><tr><th>시간</th><th>IP</th><th>기기</th><th>해상도</th><th>브라우저</th><th>유입경로</th><th>체류시간</th><th>페이지 경로</th></tr></thead>\n'
    + '  <tbody id="tbody">' + (rows || '<tr><td colspan="8" style="text-align:center;padding:24px;color:#aaa;">데이터 없음</td></tr>') + '</tbody>\n'
    + '</table>\n'
    + '<script>\n'
    + 'var _activeType = "all";\n'
    + 'var _dateFrom = "";\n'
    + 'var _dateTo = "";\n'
    + '\n'
    + 'function applyFilter() {\n'
    + '  _dateFrom = document.getElementById("dateFrom").value;\n'
    + '  _dateTo = document.getElementById("dateTo").value;\n'
    + '  renderFilter();\n'
    + '}\n'
    + 'function clearDate() {\n'
    + '  _dateFrom = ""; _dateTo = "";\n'
    + '  document.getElementById("dateFrom").value = "";\n'
    + '  document.getElementById("dateTo").value = "";\n'
    + '  renderFilter();\n'
    + '}\n'
    + 'function setType(type, btn) {\n'
    + '  document.querySelectorAll(".filter-btn").forEach(function(b) { b.classList.remove("active"); });\n'
    + '  btn.classList.add("active");\n'
    + '  _activeType = type;\n'
    + '  renderFilter();\n'
    + '}\n'
    + 'function renderFilter() {\n'
    + '  var rows = document.querySelectorAll("#tbody tr[data-type]");\n'
    + '  var cntTotal = 0, cntMobile = 0, cntPc = 0, cntBot = 0, cntConv = 0;\n'
    + '  var uniqueSet = new Set();\n'
    + '  rows.forEach(function(tr) {\n'
    + '    var t = tr.dataset.type;\n'
    + '    var d = tr.dataset.date;\n'
    + '    var ip = tr.dataset.ip;\n'
    + '    var isConv = tr.dataset.converted === "true";\n'
    + '    var typeOk = (_activeType === "all") ? true\n'
    + '      : (_activeType === "no-bot") ? (t !== "bot")\n'
    + '      : (_activeType === "converted") ? isConv\n'
    + '      : (t === _activeType);\n'
    + '    var dateOk = (!_dateFrom || d >= _dateFrom) && (!_dateTo || d <= _dateTo);\n'
    + '    var show = typeOk && dateOk;\n'
    + '    tr.style.display = show ? "" : "none";\n'
    + '    if (show) {\n'
    + '      cntTotal++;\n'
    + '      if (t === "mobile") cntMobile++;\n'
    + '      else if (t === "pc") cntPc++;\n'
    + '      else if (t === "bot") cntBot++;\n'
    + '      if (isConv) cntConv++;\n'
    + '      if (t !== "bot") uniqueSet.add(ip);\n'
    + '    }\n'
    + '  });\n'
    + '  document.getElementById("s-total").textContent = cntTotal;\n'
    + '  document.getElementById("s-unique").textContent = uniqueSet.size;\n'
    + '  document.getElementById("s-mobile").textContent = cntMobile;\n'
    + '  document.getElementById("s-pc").textContent = cntPc;\n'
    + '  document.getElementById("s-bot").textContent = cntBot;\n'
    + '  document.getElementById("s-conv").textContent = cntConv;\n'
    + '}\n'
    + 'renderFilter();\n'
    + '<\/script>\n'
    + '</body></html>');
});

app.listen(3007, () => console.log('Tracker running on :3007'));
