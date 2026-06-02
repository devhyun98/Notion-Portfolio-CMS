export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          Notion Portfolio CMS
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Notion API를 활용한 개발자 포트폴리오 사이트
        </p>

        {/* Phase 2 구현 진행 중 */}
        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Phase 2: 공통 모듈 및 컴포넌트 개발</h2>
          <ul className="space-y-2 text-sm">
            <li>✅ Step 1: 기본 앱 구조 생성</li>
            <li>⏳ Step 2: 타입 정의 (types/index.ts)</li>
            <li>⏳ Step 3: Notion API 클라이언트</li>
            <li>⏳ Step 4: 유틸리티 함수</li>
            <li>⏳ Step 5: 마크다운 렌더러 설정</li>
            <li>⏳ Step 6: 커스텀 컴포넌트</li>
            <li>⏳ Step 7: 공통 훅</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
