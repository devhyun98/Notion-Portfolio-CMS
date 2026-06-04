/**
 * 환경 변수 검증 유틸리티
 * 필수 환경 변수를 확인하고 누락된 경우 명확한 에러 메시지를 제시합니다.
 */

const REQUIRED_ENV_VARS = {
    NOTION_API_KEY: "Notion API 키 (https://www.notion.so/my-integrations)",
    NOTION_DATABASE_ID: "Notion 데이터베이스 ID",
} as const;

type EnvVar = keyof typeof REQUIRED_ENV_VARS;

/**
 * 필수 환경 변수를 검증합니다.
 * @throws Error 필수 환경 변수가 누락된 경우
 */
export function validateEnv(): Record<EnvVar, string> {
    const missingVars: { name: string; description: string }[] = [];

    // 필수 환경 변수 확인
    for (const [key, description] of Object.entries(REQUIRED_ENV_VARS)) {
        const value = process.env[key];
        if (!value || value.trim() === "") {
            missingVars.push({ name: key, description });
        }
    }

    // 누락된 환경 변수가 있으면 에러 발생
    if (missingVars.length > 0) {
        const errorMessage = [
            "\n❌ 필수 환경 변수가 누락되었습니다:\n",
            ...missingVars.map(({ name, description }) => `  - ${name}: ${description}`),
            "\n설정 방법:",
            "  1. .env.local 파일을 프로젝트 루트에 생성",
            "  2. 다음 환경 변수를 추가:",
            ...missingVars.map(({ name }) => `     ${name}=your_value`),
            "\n자세한 내용은 .env.example 파일을 참조하세요.\n",
        ].join("\n");

        throw new Error(errorMessage);
    }

    // 검증 성공 시 환경 변수 반환
    return {
        NOTION_API_KEY: process.env.NOTION_API_KEY!,
        NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID!,
    };
}

/**
 * 특정 환경 변수를 안전하게 가져옵니다.
 * @param key 환경 변수 이름
 * @param fallback 기본값 (선택사항)
 * @returns 환경 변수 값
 */
export function getEnvVar(key: EnvVar, fallback?: string): string {
    const value = process.env[key];

    if (!value) {
        if (fallback) {
            return fallback;
        }
        const description = REQUIRED_ENV_VARS[key];
        throw new Error(
            `필수 환경 변수 '${key}'이(가) 설정되지 않았습니다. (${description})`
        );
    }

    return value;
}

/**
 * 개발 환경에서만 작동하는 경고 메시지
 */
export function warnIfMissingEnv(): void {
    if (process.env.NODE_ENV !== "development") {
        return;
    }

    const warnings: string[] = [];

    for (const [key, description] of Object.entries(REQUIRED_ENV_VARS)) {
        if (!process.env[key]) {
            warnings.push(`  ⚠️  ${key}: ${description}`);
        }
    }

    if (warnings.length > 0) {
        console.warn("\n⚠️  다음 환경 변수를 확인하세요:");
        warnings.forEach((w) => console.warn(w));
    }
}
