import type { Metadata } from 'next'
import Link from 'next/link'
import InquiryClient from '@/components/InquiryClient'

export const metadata: Metadata = {
  title: '상담 현황',
  description: '제로하자 상담 진행현황입니다. 전국단위의 사전점검 서비스 상담 및 예약 현황을 확인하세요.',
  alternates: { canonical: 'https://zerohaza.co.kr/inquiry/' },
  openGraph: {
    type: 'website',
    siteName: '제로하자',
    title: '상담 현황 | 제로하자',
    description: '제로하자 상담 진행현황입니다. 전국단위의 사전점검 서비스 상담 및 예약 현황을 확인하세요.',
    url: 'https://zerohaza.co.kr/inquiry/',
    images: [{ url: 'https://zerohaza.co.kr/logo.png', width: 800, height: 400 }],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '상담 현황 | 제로하자',
    description: '제로하자 상담 진행현황입니다. 전국단위의 사전점검 서비스 상담 및 예약 현황을 확인하세요.',
    images: ['https://zerohaza.co.kr/logo.png'],
  },
}

export default function InquiryPage() {
  return (
    <>
      <InquiryClient />

      <section className="inquiry-hero">
        <div className="container">
          <h1 className="inquiry-hero-title">상담 현황</h1>
          <p className="inquiry-hero-desc">제로하자는 풍부한 현장경험을 바탕으로 전국단위의 커버리지를 제공하고 있습니다.</p>
        </div>
      </section>

      {/* 통계 카운터 */}
      <section className="inquiry-stats">
        <div className="container">
          <div className="inquiry-stats-grid">
            <div className="inquiry-stat-card">
              <div className="inquiry-stat-icon"><i className="fas fa-comment-dots"></i></div>
              <div>
                <div className="inquiry-stat-label">상담신청</div>
                <div className="inquiry-stat-num" id="stat-applied">0<span className="unit">건</span></div>
              </div>
            </div>
            <div className="inquiry-stat-card">
              <div className="inquiry-stat-icon"><i className="fas fa-check-circle"></i></div>
              <div>
                <div className="inquiry-stat-label">상담완료</div>
                <div className="inquiry-stat-num" id="stat-consulted">0<span className="unit">건</span></div>
              </div>
            </div>
            <div className="inquiry-stat-card">
              <div className="inquiry-stat-icon"><i className="fas fa-calendar-check"></i></div>
              <div>
                <div className="inquiry-stat-label">예약완료</div>
                <div className="inquiry-stat-num" id="stat-reserved">0<span className="unit">건</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 문의 목록 */}
      <section className="inquiry-list-section">
        <div className="container">
          <div className="inquiry-list-header">
            <div className="inquiry-list-title">상담 진행현황</div>
            <Link href="/support" className="btn-inquiry-primary">상담신청</Link>
          </div>
          <table className="inquiry-table">
            <thead>
              <tr>
                <th style={{width:'60px'}}>번호</th>
                <th style={{width:'90px'}}>서비스</th>
                <th className="col-apt">아파트명</th>
                <th style={{width:'80px'}}>이름</th>
                <th style={{width:'110px'}}>날짜</th>
                <th style={{width:'90px'}}>상태</th>
              </tr>
            </thead>
            <tbody id="inquiry-tbody"></tbody>
          </table>
          <div id="inquiry-pagination" className="inq-pagination"></div>
        </div>
      </section>
    </>
  )
}
