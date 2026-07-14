import type { Metadata } from 'next'
import Link from 'next/link'
import InspectionClient from '@/components/InspectionClient'

export const metadata: Metadata = {
  title: '대전·세종·충청 사전점검 서비스',
  description: '대전·세종·충청 건축 전문가가 직접 방문하여 500가지 이상의 항목을 하자 점검합니다. 마감 불량, 누수, 결로, 단열 불량, 창호 오류 등을 체계적으로 확인하는 사전점검 전문업체입니다.',
  alternates: { canonical: 'https://zerohaza.co.kr/inspection/' },
  openGraph: {
    type: 'website',
    siteName: '제로하자',
    title: '대전·세종·충청 사전점검 서비스 | 제로하자',
    description: '대전·세종·충청 건축 전문가가 직접 방문하여 500가지 이상의 항목을 하자 점검합니다. 마감 불량, 누수, 결로, 단열 불량, 창호 오류 등을 체계적으로 확인하는 사전점검 전문업체입니다.',
    url: 'https://zerohaza.co.kr/inspection/',
    images: [{ url: 'https://zerohaza.co.kr/logo.png', width: 800, height: 400 }],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '대전·세종·충청 사전점검 서비스 | 제로하자',
    description: '대전·세종·충청 건축 전문가가 직접 방문하여 500가지 이상의 항목을 하자 점검합니다. 마감 불량, 누수, 결로, 단열 불량, 창호 오류 등을 체계적으로 확인하는 사전점검 전문업체입니다.',
    images: ['https://zerohaza.co.kr/logo.png'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '아파트 사전점검 서비스',
  provider: { '@type': 'HomeAndConstructionBusiness', name: '제로하자' },
  areaServed: { '@type': 'Country', name: '대한민국' },
  description: '대전·세종·충청 건축 전문가가 직접 방문하여 500가지 이상의 항목을 하자 점검합니다. 마감 불량, 누수, 결로, 단열 불량, 창호 오류 등을 체계적으로 확인하는 사전점검 전문업체입니다.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://zerohaza.co.kr/' },
    { '@type': 'ListItem', position: 2, name: '사전점검', item: 'https://zerohaza.co.kr/inspection/' },
  ],
}

export default function InspectionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <InspectionClient />

      {/* 페이지 히어로 */}
      <section className="page-hero">
        <div className="page-hero-bg" style={{backgroundImage: "url('/images/menu/ins_header.jpg')"}}></div>
        <div className="page-hero-content">
          <h1>사전점검 서비스</h1>
          <div className="breadcrumb">
            <Link href="/">홈</Link> &nbsp;/&nbsp; <span>사전점검</span>
          </div>
        </div>
      </section>

      {/* 사전점검 안내 */}
      <section className="inspection-guide section-padding" id="guide">
        <div className="container">
          <div className="guide-grid">
            <div className="guide-image fade-in-left">
              <div className="guide-slideshow" id="guideSlideshow">
                <img src="/images/menu/pre_1.jpg" alt="사전점검" className="slide active" />
                <img src="/images/menu/pre_2.jpg" alt="사전점검" className="slide" />
                <img src="/images/menu/pre_3.jpg" alt="사전점검" className="slide" />
                <div className="slide-overlay"></div>
              </div>
            </div>
            <div className="fade-in-right">
              <p className="section-subtitle">Inspection Guide</p>
              <h2 className="section-title">사전점검이란<br />무엇인가요?</h2>
              <p className="section-desc">사전점검은 신축 아파트 입주 전, 건축 전문가가 세대 내부를 직접 방문하여 하자 여부를 꼼꼼히 점검하는 서비스입니다. 마감 불량, 누수, 결로, 단열 불량, 창호 오류 등 500가지 이상의 항목을 체계적으로 확인합니다.</p>
              <div className="guide-features">
                <div className="guide-feature-card">
                  <i className="fas fa-user-check"></i>
                  <div><h3>전문가 직접 방문 점검</h3></div>
                </div>
                <div className="guide-feature-card">
                  <i className="fas fa-list-check"></i>
                  <div><h3>500+ 체크리스트 항목</h3></div>
                </div>
                <div className="guide-feature-card">
                  <i className="fas fa-file-pdf"></i>
                  <div><h3>당일 점검 보고서 제공</h3></div>
                </div>
                <div className="guide-feature-card">
                  <i className="fas fa-shield-halved"></i>
                  <div><h3>중대하자 100% 환불 보증</h3></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 점검 항목 카테고리 */}
      <section className="categories-section section-padding">
        <video className="section-video-bg" autoPlay muted loop playsInline preload="none">
          <source src="/images/menu/ins_item.mp4" type="video/mp4" />
        </video>
        <div className="container">
          <div className="categories-header fade-in">
            <p className="section-subtitle">Inspection Items</p>
            <h2 className="section-title">점검 항목 카테고리</h2>
            <p className="section-desc">500가지 이상의 체계적인 점검 항목으로 빈틈없이 확인합니다</p>
          </div>
          <div className="tab-nav fade-in">
            <button className="tab-btn active" data-tab="tab-all">전체</button>
            <button className="tab-btn" data-tab="tab-finish">마감재</button>
            <button className="tab-btn" data-tab="tab-window">창호·문</button>
            <button className="tab-btn" data-tab="tab-furniture">가구·수납</button>
            <button className="tab-btn" data-tab="tab-plumbing">설비·배관</button>
            <button className="tab-btn" data-tab="tab-electric">전기·통신</button>
            <button className="tab-btn" data-tab="tab-env">환경</button>
          </div>
          <div className="tab-content active" id="tab-all">
            <div className="checklist">
              <div className="checklist-item"><i className="fas fa-check-circle"></i>도배 이음새 및 기포 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>마루·타일 들뜸 및 단차</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>창호 개폐 불량 및 기밀성</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>배관 누수 및 배수 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>콘센트·스위치·조명 작동</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>가구·수납장 마감 및 작동</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>실내 공기질(VOC·라돈) 측정</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>단열·환기 시스템 상태</div>
            </div>
          </div>
          <div className="tab-content" id="tab-finish">
            <div className="checklist">
              <div className="checklist-item"><i className="fas fa-check-circle"></i>도배 이음새·기포·오염 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>마루 들뜸·스크래치·단차</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>타일 부착 불량·균열·줄눈</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>도장·미장 얼룩 및 흘러내림</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>코킹·실리콘 마감 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>아트월·천장마감재·석재 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>내장판넬 들뜸 및 마감 불량</div>
            </div>
          </div>
          <div className="tab-content" id="tab-window">
            <div className="checklist">
              <div className="checklist-item"><i className="fas fa-check-circle"></i>PL창호 개폐 불량 및 기밀성</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>PL창틀 실리콘·결로 흔적</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>목창호·방화문 닫힘 불량</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>중문 레일·잠금 작동 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>분합창·터닝도어 작동 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>실외기루버창 고정 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>창호틀 스크래치·도장 불량</div>
            </div>
          </div>
          <div className="tab-content" id="tab-furniture">
            <div className="checklist">
              <div className="checklist-item"><i className="fas fa-check-circle"></i>신발장 경첩·도어 작동</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>붙박이장 마감 및 서랍 작동</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>주방 상·하부장 도어 처짐</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>냉장고장·상부장 마감 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>욕실장·화장대 작동 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>옵션가구 설치 및 마감 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>주방상판·아일랜드 상판 스크래치</div>
            </div>
          </div>
          <div className="tab-content" id="tab-plumbing">
            <div className="checklist">
              <div className="checklist-item"><i className="fas fa-check-circle"></i>배관 연결부 누수 흔적 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>배수구·씽크볼 배수 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>보일러·난방분배기 작동</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>수전 작동 및 누수 여부</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>세면기·양변기·욕조 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>샤워부스 실리콘·방수 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>하수 역류 및 악취 여부</div>
            </div>
          </div>
          <div className="tab-content" id="tab-electric">
            <div className="checklist">
              <div className="checklist-item"><i className="fas fa-check-circle"></i>콘센트·스위치 작동 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>조명·주방 메인조명 점등</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>인터폰·월패드(홈IOT) 작동</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>화재감지기·스프링클러 설치</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>전열교환기·일괄소등스위치</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>가스감지기 설치 상태 확인</div>
            </div>
          </div>
          <div className="tab-content" id="tab-env">
            <div className="checklist">
              <div className="checklist-item"><i className="fas fa-check-circle"></i>단열재 시공 상태 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>환기팬·디퓨저 작동 확인</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>실외기 설치 및 고정 상태</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>에어컨 배관 및 작동 여부</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>VOC·포름알데히드 측정</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>라돈 가스 농도 측정</div>
              <div className="checklist-item"><i className="fas fa-check-circle"></i>열화상 단열 성능 점검</div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 하자 유형 */}
      <section className="defect-gallery-section section-padding" id="defects">
        <div className="container">
          <div className="defect-gallery-header fade-in">
            <p className="section-subtitle">Defect Cases</p>
            <h2 className="section-title">주요 하자 유형</h2>
            <p className="section-desc">실제 점검 현장에서 촬영된 하자 사례입니다</p>
          </div>

          {/* 마감 하자 */}
          <div className="defect-group fade-in">
            <div className="defect-group-meta">
              <span className="defect-group-badge minor">마감 하자</span>
            </div>
            <div className="defect-group-title">마감재 · 설비 하자</div>
            <div className="defect-group-desc">도배, 타일, 마루, 창호 등 육안으로 확인 가능한 시공 불량</div>
            <br />
            <div className="defect-hero">
              <div className="defect-photo featured">
                <img src="/images/defect-samples/단순 하자/도배_이음불량.jpg" alt="도배 이음불량" loading="lazy" />
                <div className="defect-photo-overlay"><span className="defect-photo-label">도배 이음불량</span></div>
              </div>
              <div className="defect-sub-grid">
                <div className="defect-photo">
                  <img src="/images/defect-samples/단순 하자/타일_들뜸.jpg" alt="타일 들뜸" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">타일 들뜸</span></div>
                </div>
                <div className="defect-photo">
                  <img src="/images/defect-samples/단순 하자/창틀_파손.jpg" alt="창틀 파손" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">창틀 파손</span></div>
                </div>
                <div className="defect-photo">
                  <img src="/images/defect-samples/단순 하자/신발장_파손.jpg" alt="신발장 파손" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">신발장 파손</span></div>
                </div>
                <div className="defect-photo">
                  <img src="/images/defect-samples/단순 하자/마루_찍힘.jpg" alt="마루 찍힘" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">마루 찍힘</span></div>
                </div>
              </div>
            </div>
            <div className="defect-rest-grid">
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/거실간접등_점등불량.jpg" alt="거실 간접등 점등불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">간접등 점등불량</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/도배_주름.jpg" alt="도배 주름" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">도배 주름</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/도장_이색과 면불량.jpg" alt="도장 면불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">도장 면불량</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/배관_마감캡 누락.jpg" alt="배관 마감캡 누락" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">배관 마감캡 누락</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/상판_파손.jpg" alt="상판 파손" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">상판 파손</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/수전_수평불량.jpg" alt="수전 수평불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">수전 수평불량</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/스프링클러_차폐판누락.jpg" alt="스프링클러 차폐판 누락" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">스프링클러 차폐판 누락</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/신발장_개폐불량.jpg" alt="신발장 개폐불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">신발장 개폐불량</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/타일_구배불량.jpg" alt="타일 구배불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">타일 구배불량</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/타일_줄눈간격불량.jpg" alt="타일 줄눈간격 불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">타일 줄눈간격 불량</span></div></div>
            </div>
          </div>

          {/* 중대 하자 */}
          <div className="defect-group fade-in">
            <div className="defect-group-meta">
              <span className="defect-group-badge major">중대 하자</span>
            </div>
            <div className="defect-group-title">구조 · 설비 중대 하자</div>
            <div className="defect-group-desc">바닥 평탄도 불량, 배관 시공 오류 등 생활에 직접적 영향을 주는 하자</div>
            <br />
            <div className="defect-hero">
              <div className="defect-photo featured">
                <img src="/images/defect-samples/중대하자/난방 엑셀파이프_상이시공.jpg" alt="난방배관 상이시공" loading="lazy" />
                <div className="defect-photo-overlay"><span className="defect-photo-label">난방배관 상이시공</span></div>
              </div>
              <div className="defect-sub-grid">
                <div className="defect-photo">
                  <img src="/images/defect-samples/중대하자/마루_마루간 수직단차.JPG" alt="마루 수직단차" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">마루 수직단차</span></div>
                </div>
                <div className="defect-photo">
                  <img src="/images/defect-samples/중대하자/마루_방통미장 꺼짐.JPG" alt="방통미장 꺼짐" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">방통미장 꺼짐</span></div>
                </div>
                <div className="defect-photo">
                  <img src="/images/defect-samples/중대하자/단열재시공불량_실사.jpg" alt="단열재 시공불량" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">단열재 시공불량</span></div>
                </div>
                <div className="defect-photo">
                  <img src="/images/defect-samples/중대하자/PL창호_개폐불량.jpg" alt="창호 개폐불량" loading="lazy" />
                  <div className="defect-photo-overlay"><span className="defect-photo-label">창호 개폐불량</span></div>
                </div>
              </div>
            </div>
            <div className="defect-rest-grid">
              <div className="defect-photo"><img src="/images/defect-samples/중대하자/난방 엑셀파이프_정상시공.jpg" alt="난방배관 정상시공 비교" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">정상시공 비교</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/중대하자/단열재시공불량_IR.jpg" alt="단열불량 열화상" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">단열불량 열화상</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/중대하자/마루_마루 끝 솟음.JPG" alt="마루 끝 솟음" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">마루 끝 솟음</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/중대하자/창틀_수직불량.jpg" alt="창틀 수직불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">창틀 수직불량</span></div></div>
              <div className="defect-photo"><img src="/images/defect-samples/단순 하자/마루_수평불량.jpg" alt="마루 수평불량" loading="lazy" /><div className="defect-photo-overlay"><span className="defect-photo-label">마루 수평불량</span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* 샘플 보고서 */}
      <section className="sample-report-section section-padding">
        <div className="container">
          <div className="sample-report-grid">
            <div className="sample-report-cover fade-in-left">
              <div className="report-book">
                <div className="report-book-cover" id="reportBookCover">
                  <div className="book-slide active"><img src="/images/report/1.JPG" alt="보고서 표지" /></div>
                  <div className="book-slide"><img src="/images/report/2.JPG" alt="보고서 2" /></div>
                  <div className="book-slide"><img src="/images/report/3.JPG" alt="보고서 3" /></div>
                  <div className="book-slide"><img src="/images/report/4.JPG" alt="보고서 4" /></div>
                  <div className="book-slide"><img src="/images/report/5.JPG" alt="보고서 5" /></div>
                  <div className="book-slide"><img src="/images/report/6.JPG" alt="보고서 6" /></div>
                </div>
                <div className="report-book-pages"></div>
              </div>
              <span className="report-page-count">최대 87페이지의 육안·장비점검 보고서</span>
            </div>
            <div className="fade-in-right">
              <p className="section-subtitle">Sample Report</p>
              <h2 className="section-title">점검 보고서를<br />미리 확인하세요</h2>
              <p className="section-desc">사전점검 완료 당일 제공되는 종합보고서입니다. 하자의 정확한 위치·공종·법적 근거와 각종 장비점검 데이터를 체계적으로 제공합니다.</p>
              <div className="report-contents">
                <div className="report-content-item">
                  <span className="report-content-num">Part 1</span>
                  <span>공동주택 사전점검이란? — 법적 근거, 하자 정의, 이후 조치 기한</span>
                </div>
                <div className="report-content-item">
                  <span className="report-content-num">Part 2</span>
                  <span>하자의 이해 — 담보책임기간, 중대하자 정의, 실제 하자 사례</span>
                </div>
                <div className="report-content-item">
                  <span className="report-content-num">Part 3</span>
                  <span>점검 내용 — 육안점검, 공기질 측정, 바닥수평, 열화상 단열</span>
                </div>
              </div>
              <a href="/files/sample-report.pdf" target="_blank" rel="noopener" className="btn-report-download">
                <i className="fas fa-file-pdf"></i> 샘플 보고서 보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 점검 실적 (간략본) */}
      <section className="results-section section-padding" id="insp-results">
        <div className="container">
          <div className="fade-in" style={{textAlign:'center', marginBottom:'48px'}}>
            <p className="section-subtitle">Results</p>
            <h2 className="section-title">점검 실적</h2>
            <p className="section-desc">제로하자가 직접 점검한 아파트 단지 실적입니다</p>
          </div>
          <div className="results-grid fade-in" id="inspResultsGrid"></div>
          <div className="results-more-wrap fade-in" style={{marginTop:'40px'}}>
            <Link href="/" className="results-more-btn">
              전체 실적 보기 <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section section-padding" id="faq">
        <div className="container">
          <div className="faq-header fade-in">
            <p className="section-subtitle">FAQ</p>
            <h2 className="section-title">자주 묻는 질문</h2>
            <p className="section-desc">사전점검에 대해 궁금한 점을 확인해보세요</p>
          </div>
          <div className="faq-list fade-in">
            <div className="faq-item">
              <div className="faq-question"><span>사전점검은 언제 신청해야 하나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">사전점검일 1~2주 전에 예약하시는 것을 권장합니다. 사전점검대행 서비스는 인력기반의 서비스이기 때문에, 사전점검일 직전에는 예약이 불가능 할 수도 있습니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>점검에 얼마나 시간이 걸리나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">전용면적에 따라 다르지만, 일반적으로 1시간 30분~2시간이 소요됩니다. 이 시간에는 사전미팅, 점검진행, 사후미팅까지 포함된 시간입니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>점검 결과는 어떻게 받나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">점검 당일 상세 보고서를 전송해 드립니다. 평균 42페이지 분량의 보고서에 하자 사진, 법령 근거, 장비 점검에 대한 수치 데이터가 포함됩니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>건설사와의 하자 접수도 도와주나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">네, 하자 접수 대행 서비스를 신청하시는 경우 건설사의 하자접수앱(혹은 웹)으로 진행되는 하자접수를 대행해드립니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>점검가가 자격증을 보유하고 있나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">네, 제로하자의 모든 점검가는 건축, 실내건축, 주택관리 등의 자격증을 보유하고 있습니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>점검 취소/환불은 어떻게 하나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">점검일 48시간 전까지 취소 요청 시 전액 환불됩니다. 48시간 이내 취소 시에는 환불 규정에 따라 처리됩니다.</div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
