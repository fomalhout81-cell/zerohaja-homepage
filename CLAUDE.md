# zerohaza 홈페이지

## 서버 접속
```
ssh -i C:\Users\알렉스\Desktop\프로젝트\alcompany.pem ubuntu@13.125.151.226
```

## 경로
- 홈페이지 정적 파일: `/var/www/zerohaza-homepage/`
- 트래커 서버: `/var/www/zerohaza-homepage/tracker/`
- 방문 데이터: `/var/www/zerohaza-homepage/tracker/visits.json`

## PM2
- `zerohaza-tracker` (port 3007) — 방문자 수집 서버
- 홈페이지 본체(index.html)는 nginx 정적 서빙이므로 **수정 후 재시작 불필요**

## 주요 파일
- `index.html` — 메인 홈페이지 (단일 파일, 약 5600줄)
- `tracker/server.js` — 방문자 수집 Express 서버
- `tracker/visits.json` — 세션별 방문 기록
- `sitemap.xml`, `robots.txt`

## 자주 쓰는 명령어
```bash
# 트래커 재시작
pm2 restart zerohaza-tracker

# 방문자 현황 확인 (최근 7일)
node -e "
var v=JSON.parse(require('fs').readFileSync('/var/www/zerohaza-homepage/tracker/visits.json','utf8'));
var bot=/bot|crawler|spider|google|baidu|bing|facebook/i;
var byDate={};
v.forEach(s=>{if(bot.test(s.ua||''))return;var d=(s.time||'').slice(0,10);if(d)byDate[d]=(byDate[d]||0)+1;});
Object.keys(byDate).sort().slice(-7).forEach(d=>console.log(d+': '+byDate[d]+'명'));
"

# 상담신청 전환 확인
node -e "
var v=JSON.parse(require('fs').readFileSync('/var/www/zerohaza-homepage/tracker/visits.json','utf8'));
var conv=v.filter(s=>s.converted);
console.log('총 상담신청:', conv.length);
conv.slice(-5).forEach(s=>console.log(s.time,s.ip));
"
```

## 주의사항
- **수정 전 반드시 백업**: `cp /var/www/zerohaza-homepage/index.html /var/www/zerohaza-homepage/index.html.bak`
- nginx는 건드리지 말 것 (설정: `/etc/nginx/sites-available/zerohaza`)
- visits.json은 트래커 서버가 계속 쓰므로 직접 편집 시 JSON 형식 유지

## 트래커 엔드포인트
- `POST /track` — 페이지 진입 시 세션 등록
- `POST /track-end` — 이탈 시 체류시간/페이지수 기록
- `POST /track-convert` — 상담신청 완료 시 converted=true 기록
- `GET /visits` — 관리자 페이지용 방문 데이터 조회

## 관리자 페이지
https://zerohaza.co.kr/zerohaza-admin?pw=1111
