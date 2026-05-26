---
description: '새로운 React 컴포넌트를 TypeScript와 Tailwind CSS로 생성합니다'
argument-hint: '<컴포넌트명>'
allowed-tools:
  [
    'Bash(test:*)',
    'Write(*)',
    'Read(*)',
  ]
---

# Claude 명령어: add-component

새로운 React 함수형 컴포넌트를 TypeScript와 Tailwind CSS를 사용하여 생성합니다.

## 사용법

```
/add-component MyComponent
```

## 프로세스

1. 컴포넌트 이름이 PascalCase인지 검증
2. `src/components/` 폴더에 컴포넌트 파일 생성
3. React 함수형 컴포넌트 기본 템플릿 추가
4. TypeScript 타입 정의 포함
5. Tailwind CSS 클래스명 예시 포함

## 생성되는 템플릿

```tsx
import { cn } from '@/lib/utils'

interface <ComponentName>Props {
  className?: string
}

export function <ComponentName>({ className }: <ComponentName>Props) {
  return (
    <div className={cn('', className)}>
      {/* 컴포넌트 내용 */}
    </div>
  )
}
```

## 규칙

- 컴포넌트명은 PascalCase 필수 (예: MyButton, UserCard)
- 자동 생성 경로: `src/components/<ComponentName>.tsx`
- Props 인터페이스는 `<ComponentName>Props` 패턴 사용
- `cn()` 유틸리티로 Tailwind 클래스명 관리
- TypeScript 타입 안정성 필수
