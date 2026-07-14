'use client'

import { useEffect } from 'react'

function animateInqCount(id: string, target: number) {
  const elRaw = document.getElementById(id)
  if (!elRaw) return
  const el = elRaw
  const duration = 1400
  const start = Date.now()
  function tick() {
    const elapsed = Date.now() - start
    const p = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    const val = Math.floor(ease * target)
    const child = el.firstChild
    if (child) child.textContent = val.toLocaleString()
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function InquiryClient() {
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof (window as any).COMPLEXES === 'undefined') return
      clearInterval(timer)

      const COMPLEXES: any[] = (window as any).COMPLEXES
      if (!COMPLEXES.length) return

      const SURNAMES = ['김','이','박','최','정','강','조','윤','장','임','한','오','서','신','권','황','안','송','류','전']
      const STATUSES = [
        { label: '예약완료', cls: 'inq-reserved', w: 4 },
        { label: '상담완료', cls: 'inq-consulted', w: 4 },
        { label: '상담신청', cls: 'inq-applied', w: 2 },
      ]

      function pickWeighted(arr: typeof STATUSES) {
        const total = arr.reduce((s, i) => s + i.w, 0)
        let r = Math.random() * total
        for (const item of arr) { r -= item.w; if (r <= 0) return item }
        return arr[arr.length - 1]
      }

      function fmtDate(d: Date) {
        const y = String(d.getFullYear()).slice(2)
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${dd}`
      }

      const EXCLUDE_KW = ['공공','신축','가로주택','행복주택','리츠','임대','청년','사업','사전청약']
      const EXCLUDE_NAMES = ['의왕 센트라인 데시앙','영주자이 시그니처','아산 신창1차 광신프로그레스','우미린 더 시그니처','이천 중리지구 B3블록 금성백조 예미지']
      const FORCE_INCLUDE_NAMES = ['군산 레이크시티 아이파크']
      const today = new Date()
      const startDate = new Date(today.getFullYear(), today.getMonth() + 2, 1)
      const endDate = new Date(today.getFullYear(), today.getMonth() + 5, 0)

      let pool = COMPLEXES.filter((c) => {
        if (!c.units || c.units < 300) return false
        if (EXCLUDE_KW.some(kw => c.name.indexOf(kw) !== -1)) return false
        if (EXCLUDE_NAMES.includes(c.name)) return false
        if (!c.moveIn || c.moveIn.length < 6) return false
        const mi = new Date(parseInt(c.moveIn.slice(0, 4)), parseInt(c.moveIn.slice(4, 6)) - 1, 1)
        return mi >= startDate && mi <= endDate
      })
      if (!pool.length) pool = COMPLEXES

      const forceInclude = COMPLEXES.filter(c => FORCE_INCLUDE_NAMES.includes(c.name) && !pool.some(p => p.name === c.name))
      pool = pool.concat(forceInclude)

      const CC_REGIONS = ['충남','충북','대전']
      const JJ_REGIONS = ['전북','전남']
      let poolCC = pool.filter(c => CC_REGIONS.includes(c.region))
      let poolJJ = pool.filter(c => JJ_REGIONS.includes(c.region))
      let poolEtc = pool.filter(c => !CC_REGIONS.includes(c.region) && !JJ_REGIONS.includes(c.region))
      if (!poolCC.length) poolCC = pool
      if (!poolJJ.length) poolJJ = pool
      if (!poolEtc.length) poolEtc = pool

      const REGION_POOLS = [
        { pool: poolCC, w: 60 },
        { pool: poolJJ, w: 30 },
        { pool: poolEtc, w: 10 },
      ]
      function pickRegionPool() {
        const total = REGION_POOLS.reduce((s, i) => s + i.w, 0)
        let r = Math.random() * total
        for (const item of REGION_POOLS) { r -= item.w; if (r <= 0) return item.pool }
        return REGION_POOLS[REGION_POOLS.length - 1].pool
      }

      const BASE = 3240
      const rows: any[] = []

      for (let day = 0; day < 90; day++) {
        const d = new Date(today)
        d.setDate(d.getDate() - day)
        const cnt = Math.floor(Math.random() * 5) + 2
        for (let j = 0; j < cnt; j++) {
          const regionPool = pickRegionPool()
          const apt = regionPool[Math.floor(Math.random() * regionPool.length)]
          const sur = SURNAMES[Math.floor(Math.random() * SURNAMES.length)]
          const st = pickWeighted(STATUSES)
          rows.push({ apt: apt.name, svc: '사전점검', name: sur + '**', date: fmtDate(d), st })
        }
      }

      const total = BASE + rows.length
      rows.forEach((r, i) => { r.no = total - i })

      const PER_PAGE = 20
      const totalPages = Math.ceil(rows.length / PER_PAGE)

      function pageRange(cur: number, tot: number, show: number): (number | '...')[] {
        if (tot <= show) return Array.from({ length: tot }, (_, i) => i + 1)
        const half = Math.floor(show / 2)
        let s = Math.max(1, cur - half)
        let e = Math.min(tot, s + show - 1)
        if (e - s < show - 1) s = Math.max(1, e - show + 1)
        const res: (number | '...')[] = []
        if (s > 1) { res.push(1); if (s > 2) res.push('...') }
        for (let i = s; i <= e; i++) res.push(i)
        if (e < tot) { if (e < tot - 1) res.push('...'); res.push(tot) }
        return res
      }

      function renderPage(page: number) {
        const tbody = document.getElementById('inquiry-tbody')
        const pg = document.getElementById('inquiry-pagination')
        if (!tbody) return

        const slice = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE)
        tbody.innerHTML = slice.map(r =>
          `<tr><td>${r.no}</td><td>${r.svc}</td><td class="col-apt">${r.apt}</td><td>${r.name}</td><td>${r.date}</td><td><span class="inq-badge ${r.st.cls}">${r.st.label}</span></td></tr>`
        ).join('')

        if (!pg) return
        const range = pageRange(page, totalPages, 7)
        let btns = `<button ${page === 1 ? 'disabled' : ''} onclick="window.inqGoPage(${page - 1})">&#8249;</button>`
        for (const p of range) {
          if (p === '...') btns += '<button disabled>…</button>'
          else btns += `<button class="${p === page ? 'active' : ''}" onclick="window.inqGoPage(${p})">${p}</button>`
        }
        btns += `<button ${page === totalPages ? 'disabled' : ''} onclick="window.inqGoPage(${page + 1})">&#8250;</button>`
        pg.innerHTML = btns
      }

      ;(window as any).inqGoPage = (p: number | string) => {
        const pg = parseInt(String(p))
        if (pg < 1 || pg > totalPages) return
        renderPage(pg)
        document.querySelector('.inquiry-list-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      renderPage(1)

      animateInqCount('stat-applied', total)
      animateInqCount('stat-consulted', Math.floor(total * 0.94))
      animateInqCount('stat-reserved', Math.floor(total * 0.86))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return null
}
