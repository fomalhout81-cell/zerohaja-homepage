'use client'

import { useState } from 'react'

interface Props {
  frontImg: React.ReactNode
  backImg: string
  backAlt: string
  backText: string
}

export default function PartnerCard({ frontImg, backImg, backAlt, backText }: Props) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className={`partner-card${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
      <div className="partner-card-inner">
        <div className="partner-card-front">
          {frontImg}
          <span className="partner-card-hint">클릭하여 자세히 보기</span>
        </div>
        <div className="partner-card-back">
          <img src={backImg} alt={backAlt} className="partner-card-back-photo" />
          <div className="partner-card-back-body">
            <p>{backText}</p>
            <span className="partner-card-close">▲ 닫기</span>
          </div>
        </div>
      </div>
    </div>
  )
}
