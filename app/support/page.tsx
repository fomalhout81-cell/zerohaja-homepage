import type { Metadata } from 'next'
import Link from 'next/link'
import SupportClient from '@/components/SupportClient'

export const metadata: Metadata = {
  title: '고객지원',
  description: '제로하자 무료 상담 신청 및 고객지원. 전화 1533-7033, 이메일 info@zerohaza.co.kr. 사전점검 관련 모든 궁금증을 해결해 드립니다.',
  alternates: { canonical: 'https://zerohaza.co.kr/support/' },
  openGraph: {
    type: 'website',
    siteName: '제로하자',
    title: '고객지원 | 제로하자',
    description: '제로하자 무료 상담 신청 및 고객지원. 전화 1533-7033. 사전점검 관련 모든 궁금증을 해결해 드립니다.',
    url: 'https://zerohaza.co.kr/support/',
    images: [{ url: 'https://zerohaza.co.kr/logo.png', width: 800, height: 400 }],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '고객지원 | 제로하자',
    description: '제로하자 무료 상담 신청 및 고객지원. 전화 1533-7033. 사전점검 관련 모든 궁금증을 해결해 드립니다.',
    images: ['https://zerohaza.co.kr/logo.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '사전점검은 언제 신청해야 하나요?', acceptedAnswer: { '@type': 'Answer', text: '사전점검일 1~2주 전에 예약하시는 것을 권장합니다. 사전점검대행 서비스는 인력기반의 서비스이기 때문에, 사전점검일 직전에는 예약이 불가능 할 수도 있습니다.' } },
    { '@type': 'Question', name: '점검에 얼마나 시간이 걸리나요?', acceptedAnswer: { '@type': 'Answer', text: '전용면적에 따라 다르지만, 일반적으로 1시간 30분~2시간이 소요됩니다. 이 시간에는 사전미팅, 점검진행, 사후미팅까지 포함된 시간입니다.' } },
    { '@type': 'Question', name: '점검 결과는 어떻게 받나요?', acceptedAnswer: { '@type': 'Answer', text: '점검 당일 상세 보고서를 전송해 드립니다. 평균 42페이지 분량의 보고서에 하자 사진, 법령 근거, 장비 점검에 대한 수치 데이터가 포함됩니다.' } },
    { '@type': 'Question', name: '건설사와의 하자 접수도 도와주나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 하자 접수 대행 서비스를 신청하시는 경우 건설사의 하자접수앱(혹은 웹)으로 진행되는 하자접수를 대행해드립니다.' } },
    { '@type': 'Question', name: '점검가가 자격증을 보유하고 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 제로하자의 모든 점검가는 건축, 실내건축, 주택관리 등의 자격증을 보유하고 있습니다.' } },
    { '@type': 'Question', name: '사전점검, 저 혼자 가도 되나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 입주자 본인 또는 대리인 동반 모두 가능합니다. 다만, 입주자 확인을 위한 신분증을 지참해 주시기 바랍니다.' } },
    { '@type': 'Question', name: '점검 취소/환불은 어떻게 하나요?', acceptedAnswer: { '@type': 'Answer', text: '점검일 48시간 전까지 취소 요청 시 전액 환불됩니다. 48시간 이내 취소 시에는 환불 규정에 따라 처리됩니다.' } },
    { '@type': 'Question', name: '기존 아파트(구축)도 점검 가능한가요?', acceptedAnswer: { '@type': 'Answer', text: '네, 기존 주택에 대해서는 \'주택 종합 점검\' 별도 서비스로 가능합니다. 상담을 통해 자세한 안내를 받으실 수 있습니다.' } },
    { '@type': 'Question', name: '점검 후 하자가 추가 발견되면요?', acceptedAnswer: { '@type': 'Answer', text: '사전점검 서비스는 인력 기반의 서비스이다보니 작은 흠집이나 오염 등은 누락될 수 있습니다. 하지만 중대하자의 경우 100% 적출을 목표로 하고 있으므로 점검 시 발견하지 못한 중대하자의 경우, 환불 보증 제도에 따라 처리해 드립니다.' } },
    { '@type': 'Question', name: '전국 서비스가 가능한가요?', acceptedAnswer: { '@type': 'Answer', text: '네, 전국 17개 시도에서 출장 서비스가 가능합니다. 다만, 지역에 따라 출장비가 별도로 발생할 수 있으며, 상담 시 안내해 드립니다.' } },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://zerohaza.co.kr/' },
    { '@type': 'ListItem', position: 2, name: '고객지원', item: 'https://zerohaza.co.kr/support/' },
  ],
}

export default function SupportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SupportClient />

      {/* 페이지 히어로 */}
      <section className="page-hero" style={{height:'40vh', minHeight:'280px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600')"}}></div>
        <div className="page-hero-content">
          <h1>고객지원</h1>
          <div className="breadcrumb">
            <Link href="/">홈</Link> &nbsp;/&nbsp; <span>고객지원</span>
          </div>
        </div>
      </section>

      {/* 상담 신청 */}
      <section className="consultation-section section-padding">
        <div className="container">
          <div className="consultation-grid">
            {/* 상담 폼 */}
            <div className="fade-in-left">
              <p className="section-subtitle">Consultation</p>
              <h2 className="section-title">무료 상담 신청</h2>
              <p className="section-desc" style={{marginBottom:'32px'}}>궁금한 점이 있으시면 언제든 문의해 주세요. 전문 상담원이 친절하게 안내해 드립니다.</p>
              <form id="consultForm" action="https://formsubmit.co/geman22@naver.com" method="POST">
                <input type="hidden" name="_subject" value="[제로하자] 무료상담 신청" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://zerohaza.co.kr" />
                <div className="form-group">
                  <label>이름 <span className="required">*</span></label>
                  <input type="text" className="form-input" id="formName" name="이름" placeholder="이름을 입력해주세요" required />
                  <p className="form-error" id="nameError">이름을 입력해주세요</p>
                </div>
                <div className="form-group">
                  <label>연락처 <span className="required">*</span></label>
                  <input type="tel" className="form-input" id="formPhone" name="연락처" placeholder="010-0000-0000" required />
                  <p className="form-error" id="phoneError">올바른 연락처를 입력해주세요</p>
                </div>
                <div className="form-group" style={{position:'relative'}}>
                  <label>입주 예정 단지명 <span className="required">*</span></label>
                  <input type="text" className="form-input" id="formApart" name="단지명" placeholder="단지명을 입력하여 검색하세요" required autoComplete="off" />
                  <div id="apartSuggest" style={{display:'none', position:'absolute', top:'100%', left:0, right:0, background:'#fff', border:'1.5px solid var(--gold)', borderTop:'none', borderRadius:'0 0 8px 8px', maxHeight:'220px', overflowY:'auto', zIndex:999, boxShadow:'0 8px 24px rgba(0,0,0,0.1)'}}></div>
                  <p className="form-error" id="apartError">단지명을 입력해주세요</p>
                </div>
                <div className="form-group">
                  <label>지역 선택 <span style={{fontSize:'12px', fontWeight:400, color:'var(--mid-gray)'}}>(선택사항 — 지역을 먼저 선택하면 검색이 쉬워집니다)</span></label>
                  <select className="form-select" id="formRegion">
                    <option value="">전체 지역</option>
                    <option value="강원">강원</option>
                    <option value="경기">경기</option>
                    <option value="경남">경남</option>
                    <option value="경북">경북</option>
                    <option value="광주">광주</option>
                    <option value="대구">대구</option>
                    <option value="대전">대전</option>
                    <option value="부산">부산</option>
                    <option value="서울">서울</option>
                    <option value="세종">세종</option>
                    <option value="울산">울산</option>
                    <option value="인천">인천</option>
                    <option value="전남">전남</option>
                    <option value="전북">전북</option>
                    <option value="제주">제주</option>
                    <option value="충남">충남</option>
                    <option value="충북">충북</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>전용면적</label>
                  <select className="form-select" id="formArea" name="전용면적">
                    <option value="">선택해주세요</option>
                    <option value="49">49㎡ 이하</option>
                    <option value="59">59㎡</option>
                    <option value="74">74㎡</option>
                    <option value="84">84㎡</option>
                    <option value="99">99㎡</option>
                    <option value="110">110㎡</option>
                    <option value="140">140㎡ 이상</option>
                    <option value="etc">기타</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>점검 희망일</label>
                  <input type="date" className="form-input" id="formDate" name="점검희망일" />
                </div>
                <div className="form-group">
                  <label>문의 내용</label>
                  <textarea className="form-textarea" id="formMessage" name="문의내용" placeholder="궁금한 사항을 자유롭게 작성해주세요"></textarea>
                </div>
                <div className="form-checkbox">
                  <input type="checkbox" id="formAgree" required />
                  <label htmlFor="formAgree">개인정보 수집 및 이용에 동의합니다. 수집된 정보는 상담 목적으로만 사용되며, 상담 완료 후 즉시 파기됩니다.</label>
                </div>
                <button type="submit" className="btn-submit">상담 신청하기</button>
              </form>
            </div>

            {/* 연락처 정보 */}
            <div className="fade-in-right">
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-card-icon"><i className="fas fa-phone"></i></div>
                  <div>
                    <h3>전화 상담</h3>
                    <p><a href="tel:1533-7033" style={{fontSize:'20px', fontWeight:700}}>1533-7033</a></p>
                    <p>평일 10:00 ~ 18:00</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <h3>이메일</h3>
                    <p><a href="mailto:geman22@naver.com">geman22@naver.com</a></p>
                    <p>24시간 접수 가능</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon"><i className="fab fa-instagram"></i></div>
                  <div>
                    <h3>카카오톡 채널</h3>
                    <p><span>@zerohaja</span></p>
                    <p>실시간 채팅 상담</p>
                  </div>
                </div>
                <div className="map-placeholder">
                  <iframe
                    src="https://maps.google.com/maps?q=대전광역시+동구+한밭대로+1297&output=embed&hl=ko&z=16"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="map-buttons">
                    <a className="map-btn map-btn-naver"
                       href="https://naver.me/xAAuX69C"
                       target="_blank" rel="noopener">
                      <i className="fas fa-map-marker-alt"></i> 네이버지도
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section section-padding">
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
              <div className="faq-question"><span>사전점검, 저 혼자 가도 되나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">네, 입주자 본인 또는 대리인 동반 모두 가능합니다. 다만, 입주자 확인을 위한 신분증을 지참해 주시기 바랍니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>점검 취소/환불은 어떻게 하나요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">점검일 48시간 전까지 취소 요청 시 전액 환불됩니다. 48시간 이내 취소 시에는 환불 규정에 따라 처리됩니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>기존 아파트(구축)도 점검 가능한가요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">네, 기존 주택에 대해서는 &apos;주택 종합 점검&apos; 별도 서비스로 가능합니다. 상담을 통해 자세한 안내를 받으실 수 있습니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>점검 후 하자가 추가 발견되면요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">사전점검 서비스는 인력 기반의 서비스이다보니 작은 흠집이나 오염 등은 누락될 수 있습니다. 하지만 중대하자의 경우 100% 적출을 목표로 하고 있으므로 점검 시 발견하지 못한 중대하자의 경우, 환불 보증 제도에 따라 처리해 드립니다.</div></div>
            </div>
            <div className="faq-item">
              <div className="faq-question"><span>전국 서비스가 가능한가요?</span><i className="fas fa-chevron-down"></i></div>
              <div className="faq-answer"><div className="faq-answer-inner">네, 전국 17개 시도에서 출장 서비스가 가능합니다. 다만, 지역에 따라 출장비가 별도로 발생할 수 있으며, 상담 시 안내해 드립니다.</div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
