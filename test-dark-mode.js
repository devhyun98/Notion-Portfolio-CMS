// 다크모드 테스트 스크립트
// 이 스크립트는 브라우저 콘솔에서 실행하여 다크모드 설정을 테스트합니다.

console.log('=== 다크모드 테스트 스크립트 ===')

// 1. 현재 테마 확인
const currentTheme = localStorage.getItem('theme')
console.log('저장된 테마:', currentTheme)

// 2. HTML 엘리먼트의 dark 클래스 확인
const htmlElement = document.documentElement
console.log('HTML 클래스 목록:', htmlElement.className)
console.log('dark 클래스 포함 여부:', htmlElement.classList.contains('dark'))

// 3. CSS 변수 값 확인 (라이트모드)
const styles = getComputedStyle(document.documentElement)
console.log('\n=== CSS 변수 값 ===')
console.log('--color-background:', styles.getPropertyValue('--color-background'))
console.log('--color-foreground:', styles.getPropertyValue('--color-foreground'))
console.log('--color-primary:', styles.getPropertyValue('--color-primary'))

// 4. 다크모드로 전환 테스트
function setDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    console.log('\n✓ 다크모드 활성화')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    console.log('\n✓ 라이트모드 활성화')
  }

  // 변경 후 CSS 변수 확인
  const newStyles = getComputedStyle(document.documentElement)
  console.log('변경 후 --color-background:', newStyles.getPropertyValue('--color-background'))
}

// 5. next-themes 상태 확인
window.addEventListener('load', () => {
  console.log('\n=== next-themes 상태 ===')
  if (window.__NEXT_DATA__) {
    console.log('Next.js 페이지 로드됨')
  }

  // 테마 토글 버튼 찾기
  const themeToggleBtn = document.querySelector('button[aria-label*="테마"]')
  if (themeToggleBtn) {
    console.log('✓ 테마 토글 버튼 발견')
    console.log('테마 토글 버튼:', themeToggleBtn)
  } else {
    console.log('✗ 테마 토글 버튼을 찾을 수 없음')
  }
})

console.log('\n사용 방법:')
console.log('- setDarkMode(true): 다크모드 활성화')
console.log('- setDarkMode(false): 라이트모드 활성화')
console.log('- localStorage.getItem("theme"): 저장된 테마 확인')
