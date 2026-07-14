import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import GlobalUI from '@/components/GlobalUI'

export const metadata: Metadata = {
  title: { default: '제로하자 - 대전·세종·충청 사전점검 전문업체', template: '%s | 제로하자' },
  description: '제로하자 - 신축아파트 사전점검 전문. 15만건의 하자데이터 보유, 500+ 항목을 건축전문가가 정밀 검사. 완벽한 하자 진단. 대전·세종·충청 무료 상담 신청.',
  verification: {
    google: 'flEaNMNX6yoySM917PXif-n1u468de7SQIeL6zNZ2RY',
    other: { 'naver-site-verification': ['0c83b67190f8132a147d0c3a0db3169e28a6ba69'] },
  },
  openGraph: {
    type: 'website',
    siteName: '제로하자',
    title: '제로하자 - 대전·세종·충청 사전점검 전문업체',
    description: '신축아파트 사전점검 전문. 15만건의 하자데이터 보유, 500+ 항목을 건축전문가가 정밀 검사. 완벽한 하자 진단. 대전·세종·충청 무료 상담 신청.',
    url: 'https://zerohaza.co.kr/',
    images: [{ url: 'https://zerohaza.co.kr/logo.png', width: 800, height: 400 }],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '제로하자 - 대전·세종·충청 사전점검 전문업체',
    description: '신축아파트 사전점검 전문. 15만건의 하자데이터 보유. 건축전문가가 정밀 검사. 완벽한 하자 진단. 무료 상담 신청.',
    images: ['https://zerohaza.co.kr/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" as="image" href="/images/hero-bg-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/hero-bg.webp" type="image/webp" media="(min-width: 769px)" fetchPriority="high" />
        <link rel="preload" href="/font/GmarketSansTTFBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/font/GmarketSansTTFMedium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/font/GmarketSansTTFLight.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/fa/css/all.min.css" />

        {/* 네이버 애널리틱스 */}
        <script type="text/javascript" src="//wcs.pstatic.net/wcslog.js"></script>
        <script type="text/javascript">
          {`if(!wcs_add) var wcs_add = {};
wcs_add["wa"] = "1a8dab7045ea370";
if(window.wcs) {
  wcs_do();
}`}
        </script>

        {/* Microsoft Clarity */}
        <script type="text/javascript">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "x24ay0ljw7");`}
        </script>
      </head>
      <body>
        <Navigation />
        {children}
        <Footer />
        <GlobalUI />
        <script src="/data/apartments.js" />
        <script src="/data/complexes.js" />
      </body>
    </html>
  )
}
