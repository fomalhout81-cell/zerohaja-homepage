import type { Metadata } from 'next'
import Link from 'next/link'
import ResultsSection from '@/components/ResultsSection'
import PartnerCard from '@/components/PartnerCard'

const homeTitle = '제로하자 - 대전·세종·충청 사전점검 전문업체'
const homeDescription = '제로하자는 대전·세종·충청 지역 건축 전문가가 직접 하자 점검하는 신뢰할 수 있는 사전점검 전문업체입니다. 15만건의 하자데이터 보유, 10,000+ 세대 점검 실적, 99.9% 중대하자 적출률.'

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: 'https://zerohaza.co.kr/' },
  openGraph: {
    type: 'website',
    siteName: '제로하자',
    title: homeTitle,
    description: homeDescription,
    url: 'https://zerohaza.co.kr/',
    images: [{ url: 'https://zerohaza.co.kr/logo.png', width: 800, height: 400 }],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: homeTitle,
    description: homeDescription,
    images: ['https://zerohaza.co.kr/logo.png'],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: '제로하자',
  legalName: '주식회사 알컴퍼니',
  url: 'https://zerohaza.co.kr',
  logo: 'https://zerohaza.co.kr/logo.png',
  image: 'https://zerohaza.co.kr/logo.png',
  description: '건축 전문가가 직접 점검하는 신뢰할 수 있는 사전점검 서비스. 마감 불량, 누수, 결로, 단열 불량 등 500가지 이상 항목을 체계적으로 확인합니다.',
  telephone: '1533-7033',
  email: 'info@zerohaza.co.kr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '한밭대로 1297, 202호',
    addressLocality: '대전광역시 동구',
    addressCountry: 'KR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  sameAs: ['https://www.instagram.com/zerohaza/'],
  priceRange: '$$',
  areaServed: { '@type': 'Country', name: '대한민국' },
  serviceType: '아파트 사전점검 서비스',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '제로하자',
  url: 'https://zerohaza.co.kr',
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      {/* 히어로 섹션 */}
      <section className="hero" id="hero">
        <div className="hero-bg" role="presentation">
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/hero-bg-mobile.webp" type="image/webp" />
            <source srcSet="/images/hero-bg.webp" type="image/webp" />
            <img src="/images/hero-bg.jpg" alt="제로하자 신축아파트 사전점검 전문 서비스" fetchPriority="high" width={1600} height={2133} decoding="sync" />
          </picture>
        </div>
        <div className="hero-content">
          <p className="hero-label">Professional Inspection Service</p>
          <h1 className="hero-heading">하자 없는 새 집,<br />제로하자가 보장합니다</h1>
          <p className="hero-desc">건축 전문가가 직접 점검하는 신뢰할 수 있는 사전점검 서비스<br />500가지 이상의 체크리스트로 꼼꼼하게 확인합니다</p>
          <div className="hero-buttons">
            <Link className="btn-hero-primary" href="/inquiry">
              <i className="fas fa-clipboard-check"></i> 사전점검 신청하기
            </Link>
            <Link className="btn-hero-secondary" href="/inspection">
              <i className="fas fa-arrow-right"></i> 서비스 알아보기
            </Link>
          </div>
        </div>
        <div className="scroll-indicator" id="scrollIndicator">
          <span>Scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* 핵심 수치 섹션 */}
      <section className="stats-section" id="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card fade-in">
              <div className="stat-icon"><i className="fas fa-building"></i></div>
              <div className="stat-number" data-target="10000" data-suffix="+">10,000+</div>
              <div className="stat-label">누적 점검 세대</div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon"><i className="fas fa-check-double"></i></div>
              <div className="stat-number" data-target="99.9" data-suffix="%" data-decimal="1">99.9%</div>
              <div className="stat-label">중대하자 적출률</div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon"><i className="fas fa-star"></i></div>
              <div className="stat-number" data-target="9.8" data-suffix=" / 10" data-decimal="1">9.8 / 10</div>
              <div className="stat-label">고객 만족도</div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon"><i className="fas fa-search"></i></div>
              <div className="stat-number" data-target="500" data-suffix="+">500+</div>
              <div className="stat-label">점검 체크리스트 항목</div>
            </div>
          </div>
        </div>
      </section>

      {/* 제로하자 소개 섹션 */}
      <section className="about-section section-padding" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text fade-in-left">
              <p className="section-subtitle">About ZEROHAJA</p>
              <h2 className="section-title">건축 전문가가 직접 점검하는<br />국내 최고의 사전점검 서비스</h2>
              <p className="section-desc">제로하자는 2022년 설립 이후, 법적 근거와 판정기준에 의거한 정확한 하자 확인을 원칙으로 대전·세종·충청을 중심으로 전국 사전점검 서비스를 제공해온 전문 업체입니다.</p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">🎓</div>
                  <div>
                    <h3>건축기사 자격증 보유 전문 점검가</h3>
                    <p>모든 점검가가 건축기사 자격증을 보유하고 있어 전문적인 하자 판정이 가능합니다</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">📋</div>
                  <div>
                    <h3>LH 시방서 기준 표준 점검 항목 적용</h3>
                    <p>국토교통부 고시 기준에 따른 체계적인 점검 프로세스를 운영합니다</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🛡️</div>
                  <div>
                    <h3>중대하자 미발견 시 100% 환불 보증</h3>
                    <p>점검 품질에 대한 자신감으로 완전한 환불 보증 제도를 운영합니다</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image fade-in-right">
              <video autoPlay muted loop playsInline preload="none"
                style={{width:'100%', height:'500px', objectFit:'cover', borderRadius:'8px', boxShadow:'20px 20px 60px rgba(0,0,0,0.1)', display:'block'}}>
                <source src="/images/menu/ins_item.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* 장비 현황 섹션 */}
      <section className="equipment-section section-padding" id="equipment">
        <div className="container">
          <div className="equipment-header fade-in">
            <p className="section-subtitle">Equipment</p>
            <h2 className="section-title">최첨단 점검 장비 보유</h2>
            <p className="section-desc">제로하자는 저가 중국산이 아닌, 널리 검증된 계측장비만 사용하고 있습니다.</p>
          </div>
          <div className="equipment-grid">
            <a href="https://www.flir.com/" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
              <div className="equipment-card fade-in">
                <picture>
                  <source srcSet="/images/equipment-thermal.webp" type="image/webp" />
                  <img src="/images/equipment-thermal.jpg.png" alt="열화상 카메라 FLIR E5" className="equipment-card-img" width={294} height={294} />
                </picture>
                <div className="equipment-card-body">
                  <h3>열화상 카메라</h3>
                  <p className="equipment-model">FLIR E5</p>
                  <p>FLIR 社의 휴대용 IR카메라로 온도의 변화로 감지할 수 있는 모든 종류(단열,난방)의 검사를 수행할 수 있습니다.</p>
                </div>
              </div>
            </a>
            <div className="equipment-card fade-in">
              <picture>
                <source srcSet="/images/equipment-laser.webp" type="image/webp" />
                <img src="/images/equipment-laser.jpg.png" alt="레이저 수평기 4D Level Pro" className="equipment-card-img" width={294} height={294} />
              </picture>
              <div className="equipment-card-body">
                <h3>레이저 수평기</h3>
                <p className="equipment-model">4D Level Pro</p>
                <p>바닥·벽면 기울기를 정밀하게 측정합니다</p>
              </div>
            </div>
            <a href="https://radonftlab.com/kr/" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
              <div className="equipment-card fade-in">
                <picture>
                  <source srcSet="/images/equipment-radon.webp" type="image/webp" />
                  <img src="/images/equipment-radon.jpg.png" alt="라돈 측정기 Radon Eye RD200" className="equipment-card-img" width={294} height={294} />
                </picture>
                <div className="equipment-card-body">
                  <h3>라돈 측정기</h3>
                  <p className="equipment-model">Radon Eye RD200</p>
                  <p>(주)에프티랩社 간이 라돈측정기 기존 라돈측정기의 20배 정확도 실내의 라돈 농도를 측정합니다</p>
                </div>
              </div>
            </a>
            <a href="https://www.temtop.co.uk/" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
              <div className="equipment-card fade-in">
                <picture>
                  <source srcSet="/images/equipment-voc.webp" type="image/webp" />
                  <img src="/images/equipment-voc.png" alt="공기질 측정기 Air Quality Monitor" className="equipment-card-img" width={294} height={294} />
                </picture>
                <div className="equipment-card-body">
                  <h3>공기질 측정기</h3>
                  <p className="equipment-model">VOC Detector Pro</p>
                  <p>영국 Temtop 社의 2세대 공기질 측정기로 미세먼지, 포름알데하이드, Tvoc를 정확히 측정합니다</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 점검 실적 - 클라이언트 컴포넌트 */}
      <ResultsSection />

      {/* 파트너사 섹션 */}
      <section className="partners-section section-padding" id="partners">
        <div className="container">
          <div className="partners-header fade-in">
            <p className="section-subtitle">Partners</p>
            <h2 className="section-title">함께하는 파트너사</h2>
            <p className="section-desc">신뢰를 바탕으로 다양한 파트너사와 업무협력 관계를 맺고 있습니다.</p>
          </div>
          <div className="partners-grid fade-in">
            <PartnerCard
              frontImg={<picture><source srcSet="/images/Partners/p_cesco.webp" type="image/webp" /><img src="/images/Partners/p_cesco.jpg" alt="세스코" style={{maxHeight:'80px', maxWidth:'75%', objectFit:'contain'}} /></picture>}
              backImg="/images/brand/mou_cesco.png"
              backAlt="세스코 MOU 협약"
              backText="국내 최대의 환경위생기업 세스코와 공동주택 해충진단 및 사전점검 업무 협력관계를 맺고 있습니다."
            />
            <PartnerCard
              frontImg={<img src="/images/Partners/logo-bestshop.svg" alt="LG 베스트샵" style={{maxHeight:'60px', maxWidth:'75%', objectFit:'contain'}} />}
              backImg="/images/brand/mou_lg.JPG"
              backAlt="LG 베스트샵 MOU 협약"
              backText="LG전자 베스트샵에서 운영하는 신축 아파트 입주민 대상 하자설명회에 파트너로써 참여하고 있습니다."
            />
          </div>
          <p className="partners-footer fade-in">더 많은 파트너사와 함께 성장하고 있습니다</p>
        </div>
      </section>
    </>
  )
}
