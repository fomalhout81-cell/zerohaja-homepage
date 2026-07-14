'use client'

import { useEffect } from 'react'

export default function InspectionClient() {
  useEffect(() => {
    const timers: ReturnType<typeof setInterval>[] = []
    const timeouts: ReturnType<typeof setTimeout>[] = []

    // Guide slideshow
    const guideEl = document.getElementById('guideSlideshow')
    if (guideEl) {
      const slides = Array.from(guideEl.querySelectorAll('.slide')) as HTMLElement[]
      if (slides.length) {
        let cur = 0
        timers.push(setInterval(() => {
          slides[cur].classList.remove('active')
          cur = (cur + 1) % slides.length
          slides[cur].classList.add('active')
        }, 3500))
      }
    }

    // Report book slideshow
    const cover = document.getElementById('reportBookCover')
    if (cover) {
      const bookSlides = Array.from(cover.querySelectorAll('.book-slide')) as HTMLElement[]
      if (bookSlides.length >= 2) {
        let bookIdx = 0
        timers.push(setInterval(() => {
          const cur = bookSlides[bookIdx]
          const nxt = bookSlides[(bookIdx + 1) % bookSlides.length]
          cur.style.transition = 'transform 0.35s ease-in, opacity 0.25s ease-in'
          cur.style.transform = 'rotateY(-90deg)'
          cur.style.opacity = '0'
          const t1 = setTimeout(() => {
            cur.style.display = 'none'
            cur.style.transform = ''
            cur.style.opacity = ''
            cur.style.transition = ''
            cur.classList.remove('active')
            nxt.style.transform = 'rotateY(90deg)'
            nxt.style.opacity = '0'
            nxt.style.transition = 'none'
            nxt.style.display = 'block'
            nxt.classList.add('active')
            nxt.getBoundingClientRect()
            nxt.style.transition = 'transform 0.35s ease-out, opacity 0.25s ease-out'
            nxt.style.transform = 'rotateY(0deg)'
            nxt.style.opacity = '1'
            const t2 = setTimeout(() => {
              nxt.style.transform = ''
              nxt.style.opacity = ''
              nxt.style.transition = ''
              bookIdx = (bookIdx + 1) % bookSlides.length
            }, 360)
            timeouts.push(t2)
          }, 350)
          timeouts.push(t1)
        }, 3000))
      }
    }

    // Tab switching
    document.querySelectorAll('.tab-btn[data-tab]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement
        const nav = target.closest('.tab-nav')!
        nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
        target.classList.add('active')
        const tabId = target.getAttribute('data-tab')!
        const section = nav.parentElement!
        section.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'))
        document.getElementById(tabId)?.classList.add('active')
      })
    })

    // 하자 갤러리 스왑
    document.querySelectorAll('.defect-group').forEach((group) => {
      group.addEventListener('click', (e) => {
        const photo = (e.target as HTMLElement).closest('.defect-photo')
        if (!photo || photo.classList.contains('featured')) return

        const featured = group.querySelector('.defect-photo.featured')
        if (!featured) return
        const featuredImg = featured.querySelector('img') as HTMLImageElement
        const clickedImg = photo.querySelector('img') as HTMLImageElement
        const featuredLabel = featured.querySelector('.defect-photo-label')
        const clickedLabel = photo.querySelector('.defect-photo-label')
        if (!featuredImg || !clickedImg) return

        featuredImg.style.opacity = '0'
        clickedImg.style.opacity = '0'

        setTimeout(() => {
          const tmpSrc = featuredImg.src; const tmpAlt = featuredImg.alt
          featuredImg.src = clickedImg.src; featuredImg.alt = clickedImg.alt
          clickedImg.src = tmpSrc; clickedImg.alt = tmpAlt

          if (featuredLabel && clickedLabel) {
            const tmpLabel = featuredLabel.textContent
            featuredLabel.textContent = clickedLabel.textContent
            clickedLabel.textContent = tmpLabel
          }

          featuredImg.style.opacity = '1'
          clickedImg.style.opacity = '1'
        }, 180)
      })
    })

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach((q) => {
      q.addEventListener('click', () => {
        const item = q.parentElement!
        const wasActive = item.classList.contains('active')
        document.querySelectorAll('.faq-item').forEach(fi => fi.classList.remove('active'))
        if (!wasActive) item.classList.add('active')
      })
    })

    // InspResults mini grid
    const inspTimer = setInterval(() => {
      if (!(window as any).APARTMENTS) return
      clearInterval(inspTimer)
      const grid = document.getElementById('inspResultsGrid')
      if (grid) {
        grid.innerHTML = ((window as any).APARTMENTS as any[]).slice(0, 6).map((a) => `
          <div class="result-card" data-region="${a.region}">
            <div class="result-card-img">
              <img src="/images/${a.image}" alt="${a.name}" loading="lazy">
              <div class="result-card-overlay"></div>
              <span class="result-region-badge">${a.regionLabel}</span>
            </div>
            <div class="result-card-body">
              <p class="result-card-name">${a.name}</p>
              <div class="result-card-meta">
                <span class="result-card-date">${a.date}</span>
                <span class="result-units-badge">점검세대 ${a.units}세대</span>
              </div>
            </div>
          </div>`).join('')
      }
    }, 100)
    timers.push(inspTimer)

    return () => {
      timers.forEach(clearInterval)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return null
}
