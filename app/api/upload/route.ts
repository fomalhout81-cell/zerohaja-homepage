import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 })
    }

    // 이미지 파일만 허용
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '이미지 파일만 업로드 가능합니다' }, { status: 400 })
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 10MB 이하여야 합니다' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 타임스탐프 + 원본 파일명으로 저장
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const uploadDir = join(process.cwd(), 'public', 'uploads')

    // uploads 폴더 생성 (없으면)
    await mkdir(uploadDir, { recursive: true })

    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // 업로드된 파일의 URL 반환
    const url = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url: url,
      filename: filename,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: '업로드 실패' }, { status: 500 })
  }
}
