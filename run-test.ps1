# Next.js 개발 서버 테스트 스크립트

Write-Host "=== Notion Portfolio CMS 테스트 시작 ===" -ForegroundColor Green
Write-Host ""

# 1. 빌드 확인
Write-Host "1. 빌드 상태 확인..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Write-Host "✓ 빌드 파일 존재" -ForegroundColor Green
} else {
    Write-Host "✗ 빌드 필요" -ForegroundColor Red
    exit 1
}

# 2. 테스트 가능한 기능 목록
Write-Host ""
Write-Host "2. 테스트 가능한 기능:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  📱 다크모드 전환:"
Write-Host "     - 우측 상단 테마 토글 버튼(☀️/🌙) 클릭"
Write-Host "     - 배경, 텍스트, 버튼 등 모든 색상 변경 확인"
Write-Host ""
Write-Host "  📄 PDF 다운로드:"
Write-Host "     - /resume 페이지 접속"
Write-Host "     - 'PDF 다운로드' 버튼 클릭"
Write-Host "     - 인쇄 대화상자에서 'PDF로 저장' 선택"
Write-Host ""
Write-Host "  🎨 색상 검증 (개발자 도구):"
Write-Host "     - F12 키로 개발자 도구 열기"
Write-Host "     - 콘솔에서 다음 명령 실행:"
Write-Host "       document.documentElement.classList"
Write-Host "       getComputedStyle(document.documentElement).getPropertyValue('--color-background')"
Write-Host ""

# 3. 서버 시작 지시
Write-Host "3. 서버 시작 방법:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  개발 모드 (권장):"
Write-Host "    npm run dev"
Write-Host ""
Write-Host "  프로덕션 모드:"
Write-Host "    npm run build"
Write-Host "    npm start"
Write-Host ""

# 4. 테스트 체크리스트
Write-Host "4. 테스트 체크리스트:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ☐ 다크모드 토글 클릭 후 배경색 변경 확인"
Write-Host "  ☐ 라이트모드로 다시 전환 확인"
Write-Host "  ☐ 모든 페이지에서 다크모드 전환 작동 확인"
Write-Host "  ☐ localStorage에 'theme' 키 저장 확인"
Write-Host "  ☐ /resume 페이지에서 PDF 다운로드 버튼 작동"
Write-Host "  ☐ 다운로드된 PDF 파일이 올바른지 확인"
Write-Host ""

Write-Host "=== 테스트 준비 완료 ===" -ForegroundColor Green
Write-Host ""
Write-Host "이제 'npm run dev'를 실행하고 localhost:3000에 접속하세요." -ForegroundColor Yellow
