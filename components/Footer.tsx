import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" href="/">
              <img className="logo-img" src="/logo_w.png" alt="제로하자" width={180} height={65} />
            </Link>
            <p>건축물 하자 사전점검 전문업체<br />법적 근거에 기반한 정확한 하자 확인</p>
            <div className="footer-social">
              <a href="#" aria-label="카카오톡"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 3C6.477 3 2 6.582 2 11c0 2.731 1.561 5.138 3.926 6.618L4.9 21.5l4.264-2.303A11.8 11.8 0 0012 19.5c5.523 0 10-3.806 10-8.5S17.523 3 12 3zm-1.25 10.75l-2.5-2.75 6.5-3.75-4 6.5z"/></svg></a>
              <a href="https://www.instagram.com/zerohaza/" target="_blank" rel="noopener" aria-label="인스타그램"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="유튜브"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>사이트맵</h4>
            <Link href="/">홈</Link>
            <Link href="/#about">제로하자 소개</Link>
            <Link href="/#results">주요 실적</Link>
            <Link href="/#partners">파트너사</Link>
          </div>
          <div className="footer-col">
            <h4>사전점검</h4>
            <Link href="/inspection/#guide">사전점검이란</Link>
            <Link href="/inspection/#defects">주요 하자유형</Link>
            <Link href="/inspection/#insp-results">점검 실적</Link>
            <Link href="/inspection/#faq">FAQ</Link>
          </div>
          <div className="footer-col">
            <h4>고객지원</h4>
            <Link href="/inquiry">무료상담 신청</Link>
            <Link href="/support">오시는 길</Link>
          </div>
          <div className="footer-col">
            <h4>고객후기</h4>
            <Link href="/reviews">고객후기</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <p className="footer-contact-info">주식회사 알컴퍼니 &nbsp;|&nbsp; 대표이사 이승민 &nbsp;|&nbsp; 사업자등록번호 834-87-02421 &nbsp;|&nbsp; 대전광역시 동구 한밭대로 1297, 202호</p>
            <p className="footer-contact-info" style={{marginTop:'6px'}}>Tel: 1533-7033 &nbsp;|&nbsp; E-mail: info@zerohaza.co.kr &nbsp;|&nbsp; 평일 10:00 ~ 18:00 (토·일·공휴일 휴무)</p>
            <p style={{marginTop:'6px'}}>©Alcompany ltd. All Rights Reserved.</p>
          </div>
          <div className="footer-bottom-links">
            <a id="openPrivacy" style={{cursor:'pointer'}}>개인정보처리방침</a>
            <a id="openTerms" style={{cursor:'pointer'}}>이용약관</a>
            <a id="openCookie" style={{cursor:'pointer'}}>쿠키 정책</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
