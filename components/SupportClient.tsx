'use client'

import { useEffect } from 'react'

export default function SupportClient() {
  useEffect(() => {
    // COMPLEXES 자동완성
    const input = document.getElementById('formApart') as HTMLInputElement | null
    const suggest = document.getElementById('apartSuggest') as HTMLElement | null
    const regionSelect = document.getElementById('formRegion') as HTMLSelectElement | null

    if (input && suggest) {
      function showSuggestions(query: string) {
        const q = query.trim()
        if (!q) { suggest!.style.display = 'none'; return }
        const region = regionSelect?.value || ''
        const COMPLEXES: any[] = (window as any).COMPLEXES || []
        const matches = COMPLEXES.filter(a => a.name.includes(q) && (!region || a.region === region)).slice(0, 8)
        if (!matches.length) { suggest!.style.display = 'none'; return }
        suggest!.innerHTML = matches.map(a => `
          <div class="apart-suggest-item" style="padding:12px 16px;cursor:pointer;font-size:14px;color:#1A1A1A;border-bottom:1px solid #f0ede8;display:flex;justify-content:space-between;align-items:center;">
            <span>${a.name}</span>
            <span style="font-size:12px;color:#888;">${a.region} · ${a.moveIn}</span>
          </div>`).join('')
        suggest!.style.display = 'block'
        suggest!.querySelectorAll('.apart-suggest-item').forEach((el, i) => {
          el.addEventListener('mousedown', () => {
            input!.value = matches[i].name
            suggest!.style.display = 'none'
          })
          ;(el as HTMLElement).addEventListener('mouseover', () => { (el as HTMLElement).style.background = '#faf8f3' })
          ;(el as HTMLElement).addEventListener('mouseout', () => { (el as HTMLElement).style.background = '' })
        })
      }

      input.addEventListener('input', () => showSuggestions(input.value))
      input.addEventListener('focus', () => showSuggestions(input.value))
      document.addEventListener('click', (e) => {
        if (!input.contains(e.target as Node) && !suggest!.contains(e.target as Node)) {
          suggest!.style.display = 'none'
        }
      })
    }

    // FAQ 아코디언
    document.querySelectorAll('.faq-question').forEach((q) => {
      q.addEventListener('click', () => {
        const item = q.parentElement!
        const wasActive = item.classList.contains('active')
        document.querySelectorAll('.faq-item').forEach(fi => fi.classList.remove('active'))
        if (!wasActive) item.classList.add('active')
      })
    })

    // 상담 폼 제출
    const form = document.getElementById('consultForm') as HTMLFormElement | null
    if (!form) return

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let valid = true

      const nameEl = document.getElementById('formName') as HTMLInputElement
      const phoneEl = document.getElementById('formPhone') as HTMLInputElement
      const apartEl = document.getElementById('formApart') as HTMLInputElement
      const agreeEl = document.getElementById('formAgree') as HTMLInputElement

      document.querySelectorAll('.form-error').forEach(el => (el as HTMLElement).style.display = 'none')
      document.querySelectorAll('.form-input').forEach(el => (el as HTMLElement).style.borderColor = '')

      if (!nameEl.value.trim()) {
        const err = document.getElementById('nameError')
        if (err) err.style.display = 'block'
        nameEl.style.borderColor = 'var(--red)'
        valid = false
      }

      const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/
      if (!phoneRegex.test(phoneEl.value.replace(/\s/g, ''))) {
        const err = document.getElementById('phoneError')
        if (err) err.style.display = 'block'
        phoneEl.style.borderColor = 'var(--red)'
        valid = false
      }

      if (!apartEl.value.trim()) {
        const err = document.getElementById('apartError')
        if (err) err.style.display = 'block'
        apartEl.style.borderColor = 'var(--red)'
        valid = false
      }

      if (!agreeEl.checked) {
        ;(window as any).showToast?.('개인정보 수집 및 이용에 동의해 주세요.')
        valid = false
      }

      if (!valid) return

      const btn = form.querySelector('.btn-submit') as HTMLButtonElement
      btn.disabled = true
      btn.textContent = '전송 중...'

      fetch('https://formsubmit.co/ajax/geman22@naver.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
        .then(res => res.json())
        .then(() => {
          form.reset()
          btn.disabled = false
          btn.textContent = '상담 신청하기'
          ;(window as any).openSubmitModal?.()
          fetch('/track-convert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: (window as any)._trackSid || '' }),
            keepalive: true,
          }).catch(() => {})
        })
        .catch(() => {
          btn.disabled = false
          btn.textContent = '상담 신청하기'
          ;(window as any).showToast?.('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        })
    })
  }, [])

  return null
}
