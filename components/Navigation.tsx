'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const normPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  const headerRef = useRef<HTMLElement>(null)
  const hamburgerRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const isActive = (href: string) => normPath === href

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // 메인 페이지가 아니면 항상 scrolled 상태
    if (pathname !== '/') {
      header.classList.add('scrolled')
    }

    const handleScroll = () => {
      if (pathname !== '/') return
      if (window.scrollY > 50) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  function toggleMobileMenu() {
    hamburgerRef.current?.classList.toggle('active')
    mobileMenuRef.current?.classList.toggle('active')
    document.body.style.overflow = mobileMenuRef.current?.classList.contains('active') ? 'hidden' : ''
  }

  function closeMobileMenu() {
    hamburgerRef.current?.classList.remove('active')
    mobileMenuRef.current?.classList.remove('active')
    document.body.style.overflow = ''
  }

  const tabMap: Record<string, string> = {
    '/': 'main',
    '/inspection': 'inspection',
    '/support': 'support',
    '/reviews': 'reviews',
    '/inquiry': 'inquiry',
  }
  const activeTab = tabMap[normPath] || 'main'

  return (
    <>
      <header className="header" id="header" ref={headerRef}>
        <div className="container">
          <Link className="logo" href="/">
            <img className="logo-img logo-default" src="/logo_w.png" alt="제로하자" fetchPriority="high" width={180} height={65} />
            <img className="logo-img logo-scrolled" src="/logo.png" alt="제로하자" width={180} height={65} />
          </Link>
          <nav className="nav">
            <div className="nav-links">
              <Link className={`nav-link${isActive('/') ? ' active' : ''}`} href="/">제로하자</Link>
              <Link className={`nav-link${isActive('/inspection') ? ' active' : ''}`} href="/inspection">사전점검</Link>
              <Link className={`nav-link${isActive('/support') ? ' active' : ''}`} href="/support">고객지원</Link>
            </div>
            <Link className={`btn-cta btn-cta-ghost${isActive('/reviews') ? ' active' : ''}`} href="/reviews">고객후기</Link>
            <Link className="btn-cta btn-cta-gold" href="/inquiry">무료상담 신청</Link>
          </nav>
          <div className="hamburger" id="hamburger" ref={hamburgerRef} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      <div className="mobile-menu" id="mobileMenu" ref={mobileMenuRef}>
        <Link className="nav-link" href="/" onClick={closeMobileMenu}>제로하자</Link>
        <Link className="nav-link" href="/inspection" onClick={closeMobileMenu}>사전점검</Link>
        <Link className="nav-link" href="/support" onClick={closeMobileMenu}>고객지원</Link>
        <Link className="nav-link" href="/reviews" onClick={closeMobileMenu}>고객후기</Link>
        <Link className="btn-cta btn-cta-gold" href="/inquiry" onClick={closeMobileMenu}>무료상담 신청</Link>
      </div>

      {/* 모바일 텍스트 탭바 */}
      <nav className="mobile-tab-bar" id="mobileTabBar">
        <Link className={`mob-tab${activeTab === 'main' ? ' active' : ''}`} id="tab-main" href="/">홈</Link>
        <Link className={`mob-tab${activeTab === 'inspection' ? ' active' : ''}`} id="tab-inspection" href="/inspection">사전점검</Link>
        <Link className={`mob-tab${activeTab === 'support' ? ' active' : ''}`} id="tab-support" href="/support">고객지원</Link>
        <Link className={`mob-tab${activeTab === 'reviews' ? ' active' : ''}`} id="tab-reviews" href="/reviews">고객후기</Link>
        <Link className={`mob-tab mob-tab-cta${activeTab === 'inquiry' ? ' active' : ''}`} href="/inquiry">무료상담</Link>
      </nav>
    </>
  )
}
