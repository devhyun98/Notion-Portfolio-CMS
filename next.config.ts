import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 이미지 최적화 설정
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.notion.so",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
                pathname: "/**",
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1년
    },

    // 보안 및 캐싱 헤더 설정
    async headers() {
        return [
            // 보안 헤더
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "geolocation=(), microphone=(), camera=()",
                    },
                ],
            },
            // 프로젝트/블로그 상세 페이지 캐싱 (1시간)
            {
                source: "/projects/:slug",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=3600, stale-while-revalidate=86400",
                    },
                ],
            },
            {
                source: "/blog/:slug",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=3600, stale-while-revalidate=86400",
                    },
                ],
            },
            // 이미지 파일 캐싱 (1년)
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            // 정적 자산 캐싱
            {
                source: "/:path*.(js|css|woff|woff2)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },

    // Turbopack 설정 (Next.js 16에서 기본 번들러)
    turbopack: {
        resolveAlias: {
            "@": "./src",
        },
    },

    // 반응형 폰트 최적화
    experimental: {
        optimizePackageImports: ["@radix-ui/react-dialog", "lucide-react"],
    },

    // 캐싱 최적화
    onDemandEntries: {
        maxInactiveAge: 60 * 1000, // 60초
        pagesBufferLength: 5,
    },
};

export default nextConfig;
