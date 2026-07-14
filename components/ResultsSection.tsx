'use client'

import { useEffect, useState } from 'react'

const REGIONS = ['전체', '대전', '충청', '세종', '수도권', '기타']

export default function ResultsSection() {
  const [filter, setFilter] = useState('전체')
  const [items, setItems] = useState<any[]>([])
  const [showCount, setShowCount] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if ((window as any).APARTMENTS?.length > 0) {
        clearInterval(timer)
        setIsReady(true)
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
        const cnt = isMobile ? 6 : 12
        setShowCount(cnt)
        refreshResults('전체', cnt)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  function refreshResults(region: string, cnt: number) {
    const APARTMENTS: any[] = (window as any).APARTMENTS || []
    if (!APARTMENTS.length) return
    const filtered = region === '전체' ? APARTMENTS : APARTMENTS.filter((a: any) => a.region === region)
    setItems(filtered.slice(0, cnt))
    setHasMore(filtered.length > cnt)
  }

  function handleFilter(region: string) {
    setFilter(region)
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const cnt = isMobile ? 6 : 12
    setShowCount(cnt)
    refreshResults(region, cnt)
  }

  function handleMore() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const nextCount = showCount + (isMobile ? 6 : 12)
    setShowCount(nextCount)
    refreshResults(filter, nextCount)
  }

  return (
    <section className="results-section section-padding" id="results">
      <div className="container">
        <div className="fade-in" style={{textAlign:'center', marginBottom:'48px'}}>
          <p className="section-subtitle">Results</p>
          <h2 className="section-title">점검 실적</h2>
          <p className="section-desc">제로하자가 직접 점검한 아파트 단지 실적입니다</p>
        </div>
        <div className="results-filter fade-in" id="resultsFilter">
          {REGIONS.map(r => (
            <button key={r} className={`filter-btn${filter === r ? ' active' : ''}`} onClick={() => handleFilter(r)}>{r}</button>
          ))}
        </div>
        <div className="results-grid fade-in" id="resultsGrid">
          {items.map((a, i) => (
            <div key={i} className="result-card" data-region={a.region}>
              <div className="result-card-img">
                <img src={`/images/${a.image}`} alt={a.name} loading="lazy" />
                <div className="result-card-overlay"></div>
                <span className="result-region-badge">{a.regionLabel}</span>
              </div>
              <div className="result-card-body">
                <p className="result-card-name">{a.name}</p>
                <div className="result-card-meta">
                  <span className="result-card-date">{a.date}</span>
                  {a.units && <span className="result-units-badge">점검세대 {a.units}세대</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="results-more-wrap fade-in">
            <button className="results-more-btn" id="moreBtn" onClick={handleMore}>
              더보기 <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
