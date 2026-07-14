import type { Metadata } from 'next'
import Link from 'next/link'

const reviewsTitle = '고객후기 - 실제 사전점검 후기'
const reviewsDescription = '제로하자와 함께한 실제 고객님들의 생생한 사전점검 후기. 네이버 블로그 인플루언서들의 솔직한 내돈내산 후기를 직접 확인하세요.'

export const metadata: Metadata = {
  title: reviewsTitle,
  description: reviewsDescription,
  alternates: { canonical: 'https://zerohaza.co.kr/reviews/' },
  openGraph: {
    type: 'website',
    siteName: '제로하자',
    title: `${reviewsTitle} | 제로하자`,
    description: reviewsDescription,
    url: 'https://zerohaza.co.kr/reviews/',
    images: [{ url: 'https://zerohaza.co.kr/logo.png', width: 800, height: 400 }],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: `${reviewsTitle} | 제로하자`,
    description: reviewsDescription,
    images: ['https://zerohaza.co.kr/logo.png'],
  },
}

const REVIEWS = [
  { href: 'https://blog.naver.com/ahyun35/223493572413', img: '/images/hoogi/1.JPG', alt: '선화동 하늘채 퐁퐁님의 후기', title: '선화동 하늘채 퐁퐁님의 후기', comment: '"상위1% 인플루언서의 선택"' },
  { href: 'https://blog.naver.com/saytostay/224152914786', img: '/images/hoogi/2.JPG', alt: '제로하자 내돈내산 후기', title: '제로하자 내돈내산 후기', comment: '"전문가의 시각, 제로하"' },
  { href: 'https://blog.naver.com/ddberry/223653675451', img: '/images/hoogi/3.JPG', alt: '안경언니 하늘채리버뷰 후기', title: '안경언니 하늘채리버뷰 후기', comment: '"대전업체라 더욱 신뢰가 가"' },
  { href: 'https://blog.naver.com/re-re-re/223809468549', img: '/images/hoogi/4.JPG', alt: '찹찹님 후기', title: '찹찹님 후기', comment: '"실무경험이 풍부한 업체"' },
  { href: 'https://blog.naver.com/kdkdud04/223653794704', img: '/images/hoogi/5.JPG', alt: '솜뭉치맘 후기', title: '솜뭉치맘 후기', comment: '"상담부터 친절 그 잡채였어요!"' },
  { href: 'https://blog.naver.com/ohjinhaa/223302251401', img: '/images/hoogi/6.JPG', alt: '제로하자 내돈내산 후기', title: '제로하자 내돈내산 후기', comment: '"전문가의 시선!!"' },
  { href: 'https://blog.naver.com/wpffkdks1017/223704675425', img: '/images/hoogi/7.JPG', alt: '내돈내산 제로하자 후기', title: '내돈내산 제로하자 후기', comment: '"깐깐한 내가 만족한 업체"' },
  { href: 'https://blog.naver.com/nsy3445/223738090915', img: '/images/hoogi/8.JPG', alt: '신축아파트 제로하자 사전점검 및 셀프 하자접수', title: '신축아파트 제로하자 사전점검 및 셀프 하자접수', comment: '"상세한 설명, 체계적이에요"' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://zerohaza.co.kr/' },
    { '@type': 'ListItem', position: 2, name: '고객후기', item: 'https://zerohaza.co.kr/reviews/' },
  ],
}

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="page-hero" style={{height:'36vh', minHeight:'240px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('/images/menu/ins_header.jpg')"}}></div>
        <div className="page-hero-content">
          <h1>고객후기</h1>
          <div className="breadcrumb">
            <Link href="/">홈</Link> &nbsp;/&nbsp; <span>고객후기</span>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{background:'var(--off-white)'}}>
        <div className="container">
          <div className="fade-in" style={{textAlign:'center', marginBottom:'48px'}}>
            <p className="section-subtitle">Reviews</p>
            <h2 className="section-title">고객후기</h2>
            <p className="section-desc">실제 고객님들의 생생한 점검 후기입니다</p>
          </div>
          <div className="review-grid fade-in">
            {REVIEWS.map((r, i) => (
              <a key={i} className="review-card" href={r.href} target="_blank" rel="noopener">
                <div className="review-card-thumb">
                  <img src={r.img} alt={r.alt} loading="lazy" />
                </div>
                <div className="review-card-body">
                  <span className="review-tag">#네이버 블로그</span>
                  <p className="review-title">{r.title}</p>
                  <p className="review-comment">{r.comment}</p>
                </div>
                <div className="review-card-footer">
                  <span className="review-source"><i className="fas fa-check-circle"></i> 네이버 블로그</span>
                  <span className="review-more">후기 보기 <i className="fas fa-arrow-right"></i></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
