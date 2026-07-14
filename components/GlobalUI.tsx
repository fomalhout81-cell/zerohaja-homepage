'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function GlobalUI() {
  const pathname = usePathname()

  // 전역 JS (fade-in 애니메이션, 카운트업, 트래커, 모달 등)
  useEffect(() => {
    /* ─── 스크롤 인디케이터 ─── */
    document.getElementById('scrollIndicator')?.addEventListener('click', () => {
      document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })
    })

    /* ─── 스크롤 fade-in 애니메이션 ───
       비동기 청크(예: 점검실적 섹션의 더보기 버튼)는 최초 스캔 이후에 DOM에
       추가되는 경우가 있어, MutationObserver로 이후 추가되는 요소도 계속 감지한다. */
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          fadeObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })

    function observeFadeEls(root: ParentNode) {
      root.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        if (!el.classList.contains('visible')) fadeObserver.observe(el)
      })
    }
    observeFadeEls(document)

    const fadeMutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return
          if (node.matches('.fade-in, .fade-in-left, .fade-in-right') && !node.classList.contains('visible')) {
            fadeObserver.observe(node)
          }
          observeFadeEls(node)
        })
      }
    })
    fadeMutationObserver.observe(document.body, { childList: true, subtree: true })

    /* ─── 숫자 카운트업 ─── */
    const counters = document.querySelectorAll<HTMLElement>('.stat-number[data-target]')
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting && !el.dataset.animated) {
          el.dataset.animated = 'true'
          const target = parseFloat(el.dataset.target || '0')
          const suffix = el.dataset.suffix || ''
          const decimal = parseInt(el.dataset.decimal || '0')
          const duration = 2000
          const startTime = performance.now()
          function update(now: number) {
            const p = Math.min((now - startTime) / duration, 1)
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
            const cur = target * eased
            el.textContent = decimal > 0 ? cur.toFixed(decimal) + suffix : Math.floor(cur).toLocaleString('ko-KR') + suffix
            if (p < 1) requestAnimationFrame(update)
          }
          requestAnimationFrame(update)
          counterObserver.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    counters.forEach(c => counterObserver.observe(c))

    /* ─── 모달 핸들러 ─── */
    function openModal(id: string) {
      document.getElementById(id)?.classList.add('open')
      document.body.style.overflow = 'hidden'
    }
    function closeModal(id: string) {
      document.getElementById(id)?.classList.remove('open')
      document.body.style.overflow = ''
    }

    document.getElementById('openPrivacy')?.addEventListener('click', () => openModal('privacyModal'))
    document.getElementById('openTerms')?.addEventListener('click', () => openModal('termsModal'))
    document.getElementById('openCookie')?.addEventListener('click', () => openModal('cookieModal'))

    document.getElementById('privacyModal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('privacyModal') })
    document.getElementById('termsModal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('termsModal') })
    document.getElementById('cookieModal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cookieModal') })
    document.getElementById('closePrivacy')?.addEventListener('click', () => closeModal('privacyModal'))
    document.getElementById('closeTerms')?.addEventListener('click', () => closeModal('termsModal'))
    document.getElementById('closeCookie')?.addEventListener('click', () => closeModal('cookieModal'))

    /* ─── submitModal ─── */
    ;(window as any).openSubmitModal = () => {
      document.getElementById('submitModal')?.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
    ;(window as any).closeSubmitModal = () => {
      document.getElementById('submitModal')?.classList.remove('active')
      document.body.style.overflow = ''
    }

    /* ─── 토스트 ─── */
    ;(window as any).showToast = (msg: string) => {
      const toast = document.getElementById('toast')
      if (!toast) return
      toast.textContent = msg
      toast.classList.add('show')
      setTimeout(() => toast.classList.remove('show'), 3500)
    }

    /* ─── 플로팅 상담 모달 ─── */
    function openFloatConsult() {
      document.getElementById('floatConsultModal')?.classList.add('open')
      document.body.style.overflowY = 'hidden'
    }
    function closeFloatConsult() {
      document.getElementById('floatConsultModal')?.classList.remove('open')
      document.body.style.overflowY = ''
    }
    ;(window as any).openFloatConsult = openFloatConsult
    ;(window as any).closeFloatConsult = closeFloatConsult

    document.getElementById('floatConsultBtn')?.addEventListener('click', openFloatConsult)
    document.getElementById('floatConsultModal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeFloatConsult() })
    document.getElementById('floatConsultCloseBtn')?.addEventListener('click', closeFloatConsult)

    /* ─── 2-Step 상담 폼 ─── */
    const fcPhone = document.getElementById('fcPhone') as HTMLInputElement | null
    fcPhone?.addEventListener('input', () => {
      const v = fcPhone.value.replace(/\D/g, '').slice(0, 11)
      if (v.length <= 3) fcPhone.value = v
      else if (v.length <= 7) fcPhone.value = v.slice(0,3) + '-' + v.slice(3)
      else fcPhone.value = v.slice(0,3) + '-' + v.slice(3,7) + '-' + v.slice(7)
    })

    ;(window as any).fcGoStep2 = () => {
      const name = (document.getElementById('fcName') as HTMLInputElement)?.value.trim()
      const phone = (document.getElementById('fcPhone') as HTMLInputElement)?.value.replace(/\s/g,'')
      const agree = (document.getElementById('fcAgree') as HTMLInputElement)?.checked
      if (!name) { (window as any).showToast('이름을 입력해주세요.'); return }
      if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(phone)) { (window as any).showToast('올바른 연락처를 입력해주세요.'); return }
      if (!agree) { (window as any).showToast('개인정보 수집 및 이용에 동의해주세요.'); return }
      document.getElementById('fc-section-1')?.classList.remove('active')
      document.getElementById('fc-section-2')?.classList.add('active')
      document.getElementById('fc-step-1')?.classList.remove('active')
      document.getElementById('fc-step-1')?.classList.add('done')
      document.getElementById('fc-step-line')?.classList.add('done')
      document.getElementById('fc-step-2')?.classList.add('active')
    }

    ;(window as any).fcGoStep1 = () => {
      document.getElementById('fc-section-2')?.classList.remove('active')
      document.getElementById('fc-section-1')?.classList.add('active')
      document.getElementById('fc-step-1')?.classList.remove('done')
      document.getElementById('fc-step-1')?.classList.add('active')
      document.getElementById('fc-step-line')?.classList.remove('done')
      document.getElementById('fc-step-2')?.classList.remove('active')
    }

    ;(window as any).fcToggleDate = (cb: HTMLInputElement) => {
      const d = document.getElementById('fcDate') as HTMLInputElement
      if (cb.checked) { d.disabled = true; d.value = '' } else { d.disabled = false }
    }

    ;(window as any).fcSubmit = () => {
      const btn = document.getElementById('fcSubmitBtn') as HTMLButtonElement
      btn.disabled = true; btn.textContent = '전송 중...'
      const name = (document.getElementById('fcName') as HTMLInputElement).value.trim()
      const phone = (document.getElementById('fcPhone') as HTMLInputElement).value.trim()
      const areaEl = document.querySelector<HTMLInputElement>('input[name="fcArea"]:checked')
      const area = areaEl ? areaEl.value : '미선택'
      const dateUnknown = (document.getElementById('fcDateUnknown') as HTMLInputElement).checked
      const date = dateUnknown ? '미정' : ((document.getElementById('fcDate') as HTMLInputElement).value || '미입력')
      const apart = (document.getElementById('fcApart') as HTMLInputElement).value.trim() || '미입력'
      const unit = (document.getElementById('fcUnit') as HTMLInputElement).value.trim() || '미입력'
      const fd = new FormData()
      fd.append('_subject', '[제로하자] 무료상담 신청')
      fd.append('_captcha', 'false')
      fd.append('_template', 'table')
      fd.append('이름', name); fd.append('연락처', phone); fd.append('전용면적', area)
      fd.append('점검희망일', date); fd.append('단지명', apart); fd.append('동호수', unit)
      fetch('https://formsubmit.co/ajax/geman22@naver.com', { method:'POST', headers:{'Accept':'application/json'}, body:fd })
        .then(r => r.json())
        .then(() => {
          btn.disabled = false; btn.textContent = '상담 신청 완료'
          ;(window as any).fcGoStep1()
          closeFloatConsult()
          ;(window as any).openSubmitModal()
          fetch('/track-convert', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ sessionId: (window as any)._trackSid || '' }), keepalive:true }).catch(()=>{})
        })
        .catch(() => { btn.disabled = false; btn.textContent = '상담 신청 완료'; (window as any).showToast('전송 오류가 발생했습니다. 잠시 후 다시 시도해주세요.') })
    }

    /* ─── fcApart 자동완성 ─── */
    const fcApart = document.getElementById('fcApart') as HTMLInputElement | null
    const fcSuggest = document.getElementById('fcApartSuggest')
    if (fcApart && fcSuggest && (window as any).COMPLEXES) {
      const COMPLEXES: any[] = (window as any).COMPLEXES
      const _fcApart = fcApart
      const _fcSuggest = fcSuggest
      function positionSuggest() {
        const rect = _fcApart.getBoundingClientRect()
        _fcSuggest.style.left = rect.left + 'px'
        _fcSuggest.style.top = rect.bottom + 'px'
        _fcSuggest.style.width = rect.width + 'px'
      }
      function showSuggestions(q: string) {
        q = q.trim()
        if (!q) { _fcSuggest.style.display = 'none'; return }
        const matches = COMPLEXES.filter(a => a.name.includes(q)).slice(0, 8)
        if (!matches.length) { _fcSuggest.style.display = 'none'; return }
        _fcSuggest.innerHTML = matches.map(a =>
          `<div class="fc-apart-item" data-name="${a.name}" style="padding:12px 14px;cursor:pointer;font-size:14px;color:#1A1A1A;border-bottom:1px solid #f0ede8;display:flex;justify-content:space-between;align-items:center;">
            <span>${a.name}</span><span style="font-size:12px;color:#888;">${a.region} · ${a.moveIn}</span>
          </div>`).join('')
        positionSuggest(); _fcSuggest.style.display = 'block'
        _fcSuggest.querySelectorAll('.fc-apart-item').forEach(el => {
          el.addEventListener('pointerdown', (e) => { e.preventDefault(); _fcApart.value = (el as HTMLElement).dataset.name || ''; _fcSuggest.style.display = 'none' })
        })
      }
      _fcApart.addEventListener('input', () => showSuggestions(_fcApart.value))
      _fcApart.addEventListener('focus', () => showSuggestions(_fcApart.value))
      _fcApart.addEventListener('blur', () => setTimeout(() => { _fcSuggest.style.display = 'none' }, 150))
      window.addEventListener('scroll', positionSuggest, true)
      window.addEventListener('resize', () => { if (_fcSuggest.style.display !== 'none') positionSuggest() })
    }

    /* ─── 방문자 수집 트래커 ─── */
    const PAGE_NAMES: Record<string, string> = { '/':'홈', '/inspection':'사전점검', '/support':'고객지원', '/reviews':'고객후기', '/inquiry':'상담신청' }
    const sessionId = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    ;(window as any)._trackSid = sessionId
    const startTime = Date.now()
    let ended = false
    ;(window.requestIdleCallback || ((cb: any) => setTimeout(cb, 200)))(async () => {
      let deviceModel = ''
      try {
        const uaData = (navigator as any).userAgentData
        if (uaData?.getHighEntropyValues) {
          const info = await uaData.getHighEntropyValues(['model'])
          deviceModel = info.model || ''
        }
      } catch (e) {}
      try { fetch('/track', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ sessionId, page: PAGE_NAMES[pathname] || pathname, resolution: screen.width + 'x' + screen.height, referrer: document.referrer || '-', deviceModel }), keepalive:true }) } catch(e) {}
    }, { timeout: 2000 })
    function sendEnd() {
      if (ended) return; ended = true
      const duration = Math.round((Date.now() - startTime) / 1000)
      const payload = JSON.stringify({ sessionId, duration, pages: [PAGE_NAMES[pathname] || pathname] })
      try { navigator.sendBeacon('/track-end', new Blob([payload], { type:'application/json' })) }
      catch(e) { try { fetch('/track-end', { method:'POST', headers:{'Content-Type':'application/json'}, body: payload, keepalive:true }) } catch(e2) {} }
    }
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sendEnd() })
    window.addEventListener('pagehide', sendEnd)

    return () => {
      document.removeEventListener('visibilitychange', sendEnd)
      window.removeEventListener('pagehide', sendEnd)
      fadeMutationObserver.disconnect()
      fadeObserver.disconnect()
    }
  }, [pathname])

  return (
    <>
      {/* 토스트 */}
      <div className="toast" id="toast"></div>

      {/* 상담신청 완료 모달 */}
      <div className="submit-modal-overlay" id="submitModal" onClick={(e) => { if (e.target === e.currentTarget) (window as any).closeSubmitModal?.() }}>
        <div className="submit-modal-box" onClick={e => e.stopPropagation()}>
          <div className="submit-modal-icon">✓</div>
          <h3 className="submit-modal-title">신청이 완료되었습니다!</h3>
          <p className="submit-modal-desc">빠른 시일 내에 전화 드리겠습니다.<br />운영시간: 평일 09:00 ~ 18:00</p>
          <button className="submit-modal-btn" onClick={() => (window as any).closeSubmitModal?.()}>확인</button>
        </div>
      </div>

      {/* 모바일 플로팅 상담 버튼 */}
      <button className="float-consult-btn" id="floatConsultBtn">
        <i className="fas fa-clipboard-check"></i>
        <span>무료상담</span>
      </button>

      {/* 플로팅 상담 모달 */}
      <div className="float-consult-overlay" id="floatConsultModal">
        <div className="float-consult-panel">
          <div className="float-consult-header">
            <h3>무료 상담 신청</h3>
            <button className="cookie-modal-close" id="floatConsultCloseBtn">&times;</button>
          </div>
          <div className="float-consult-body">
            <div className="fc-step-indicator">
              <div className="fc-step active" id="fc-step-1"><div className="fc-step-circle">1</div><div className="fc-step-label">기본정보</div></div>
              <div className="fc-step-line" id="fc-step-line"></div>
              <div className="fc-step" id="fc-step-2"><div className="fc-step-circle">2</div><div className="fc-step-label">상세정보</div></div>
            </div>
            <div className="fc-section active" id="fc-section-1">
              <div className="form-group">
                <label>이름 <span className="required">*</span></label>
                <input type="text" className="form-input" id="fcName" placeholder="이름을 입력해주세요" autoComplete="name" />
              </div>
              <div className="form-group">
                <label>연락처 <span className="required">*</span></label>
                <input type="tel" className="form-input" id="fcPhone" placeholder="010-0000-0000" inputMode="numeric" maxLength={13} autoComplete="tel" />
              </div>
              <div className="fc-agree">
                <input type="checkbox" id="fcAgree" />
                <label htmlFor="fcAgree">개인정보 수집 및 이용에 동의합니다.<br /><small style={{color:'#9ca3af'}}>수집항목: 이름, 연락처 / 목적: 상담 안내</small></label>
              </div>
              <button type="button" className="btn-submit" id="fcNextBtn" onClick={() => (window as any).fcGoStep2?.()} style={{marginTop:'16px'}}>다음 <span style={{fontSize:'13px'}}>›</span></button>
            </div>
            <div className="fc-section" id="fc-section-2">
              <div className="form-group">
                <label>전용면적 <small style={{color:'#9ca3af',fontWeight:400}}>(선택)</small></label>
                <div className="chip-group">
                  {['49㎡ 이하','59㎡','74㎡','84㎡','99㎡','110㎡','140㎡ 이상'].map((v, i) => {
                    const id = `area${['49','59','74','84','99','110','140'][i]}`
                    return <span key={id}><input type="radio" name="fcArea" id={id} value={v} /><label htmlFor={id}>{v.replace(' 이상','+')}</label></span>
                  })}
                </div>
              </div>
              <div className="form-group">
                <label>사전점검 희망일 <small style={{color:'#9ca3af',fontWeight:400}}>(선택)</small></label>
                <div className="fc-date-wrap">
                  <input type="date" className="form-input" id="fcDate" />
                  <label className="fc-unknown-check"><input type="checkbox" id="fcDateUnknown" onChange={(e) => (window as any).fcToggleDate?.(e.target)} /> 아직 미정입니다</label>
                </div>
              </div>
              <div className="form-group" style={{position:'relative'}}>
                <label>단지명 <small style={{color:'#9ca3af',fontWeight:400}}>(선택)</small></label>
                <input type="text" className="form-input" id="fcApart" placeholder="단지명 검색 (선택)" autoComplete="off" />
                <div id="fcApartSuggest" style={{display:'none',position:'fixed',background:'#fff',border:'1.5px solid var(--gold)',borderTop:'none',borderRadius:'0 0 10px 10px',maxHeight:'200px',overflowY:'auto',zIndex:99999,boxShadow:'0 8px 24px rgba(0,0,0,0.15)'}}></div>
              </div>
              <div className="form-group">
                <label>동 / 호수 <small style={{color:'#9ca3af',fontWeight:400}}>(선택)</small></label>
                <input type="text" className="form-input" id="fcUnit" placeholder="예: 101동 1504호" />
              </div>
              <button type="button" className="btn-fc-back" onClick={() => (window as any).fcGoStep1?.()}>← 이전</button>
              <button type="button" className="btn-submit" id="fcSubmitBtn" onClick={() => (window as any).fcSubmit?.()}>상담 신청 완료</button>
            </div>
          </div>
        </div>
      </div>

      {/* 개인정보처리방침 모달 */}
      <div className="cookie-modal-overlay" id="privacyModal">
        <div className="cookie-modal" style={{maxWidth:'640px'}}>
          <div className="cookie-modal-header">
            <h3>개인정보처리방침</h3>
            <button className="cookie-modal-close" id="closePrivacy">&times;</button>
          </div>
          <div className="cookie-modal-body">
            <p className="cookie-updated">시행일: 2025년 1월 1일</p>
            <p>제로하자(이하 "회사")는 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차와 기준을 안내하고, 이와 관련된 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
            <h4>제1조 개인정보의 처리목적</h4>
            <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <table className="cookie-table"><thead><tr><th>카테고리</th><th>처리목적</th></tr></thead><tbody><tr><td>상담 신청</td><td>아파트 사전점검 서비스에 대한 문의사항 접수 및 고객 관리</td></tr></tbody></table>
            <h4>제2조 수집하는 개인정보 항목</h4>
            <table className="cookie-table"><thead><tr><th>카테고리</th><th>수집 항목</th></tr></thead><tbody><tr><td>사전점검 상담 신청</td><td>이름, 연락처, 입주예정 아파트명, 서비스 유형, 문의내용</td></tr></tbody></table>
            <h4>제3조 개인정보의 처리 및 보유 기간</h4>
            <table className="cookie-table"><thead><tr><th>카테고리</th><th>보유 기간</th></tr></thead><tbody><tr><td>사전점검 상담 신청</td><td>문의일로부터 3년</td></tr></tbody></table>
            <h4>제4조 개인정보의 파기</h4>
            <p>회사는 개인정보 보유기간 경과, 처리목적 달성 시 지체 없이 파기합니다.</p>
            <h4>제5조 개인정보의 제3자 제공</h4>
            <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
            <h4>제6조 개인정보 보호책임자</h4>
            <ul><li><strong>이메일</strong>: info@zerohaza.co.kr</li><li><strong>전화</strong>: 1533-7033</li></ul>
          </div>
        </div>
      </div>

      {/* 이용약관 모달 */}
      <div className="cookie-modal-overlay" id="termsModal">
        <div className="cookie-modal">
          <div className="cookie-modal-header">
            <h3>이용약관</h3>
            <button className="cookie-modal-close" id="closeTerms">&times;</button>
          </div>
          <div className="cookie-modal-body">
            <p className="cookie-updated">최종 업데이트: 2025년 1월</p>
            <h4>제1조 (목적)</h4>
            <p>본 약관은 제로하자가 운영하는 웹사이트(zerohaja.co.kr)에서 제공하는 서비스 이용에 관한 조건 및 절차를 규정합니다.</p>
            <h4>제2조 (서비스 내용)</h4>
            <ul><li>아파트 사전점검 서비스 안내 및 상담 신청</li><li>점검 실적 및 고객후기 정보 제공</li></ul>
            <h4>제3조 (지식재산권)</h4>
            <p>웹사이트 내 모든 콘텐츠의 저작권은 회사에 귀속됩니다.</p>
            <h4>제4조 (준거법 및 관할)</h4>
            <p>본 약관은 대한민국 법령에 따라 해석되며, 분쟁 발생 시 회사 소재지 관할 법원을 전속 관할로 합니다.</p>
          </div>
        </div>
      </div>

      {/* 쿠키 정책 모달 */}
      <div className="cookie-modal-overlay" id="cookieModal">
        <div className="cookie-modal">
          <div className="cookie-modal-header">
            <h3>쿠키 정책</h3>
            <button className="cookie-modal-close" id="closeCookie">&times;</button>
          </div>
          <div className="cookie-modal-body">
            <p className="cookie-updated">최종 업데이트: 2025년 1월</p>
            <h4>사용하는 쿠키</h4>
            <table className="cookie-table"><thead><tr><th>종류</th><th>제공자</th><th>목적</th></tr></thead>
            <tbody>
              <tr><td>필수 쿠키</td><td>zerohaja.co.kr</td><td>세션 유지</td></tr>
              <tr><td>지도 쿠키</td><td>Google Maps</td><td>오시는 길 지도 표시</td></tr>
              <tr><td>폼 쿠키</td><td>FormSubmit</td><td>상담 신청 폼 처리</td></tr>
            </tbody></table>
          </div>
        </div>
      </div>
    </>
  )
}
