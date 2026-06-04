import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/content/project-card'
import { BlogCard } from '@/components/content/blog-card'
import { getRecentItems } from '@/lib/notion-fetch'
import { siteConfig } from '@/lib/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    type: 'website',
    images: siteConfig.ogImage ? [siteConfig.ogImage] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: siteConfig.ogImage ? [siteConfig.ogImage] : [],
  },
  robots: 'index, follow',
  alternates: {
    canonical: siteConfig.url,
  },
}

export default async function HomePage() {
  // 최근 항목 가져오기 (프로젝트 + 블로그)
  const recentItems = await getRecentItems(10)
  const recentProjects = recentItems
    .filter((item) => item.type === 'project')
    .slice(0, 4)
  const recentBlogs = recentItems
    .filter((item) => item.type === 'blog')
    .slice(0, 3)

  // Schema.org JSON-LD 마크업
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Developer',
    url: siteConfig.url,
    sameAs: Object.values(siteConfig.links).filter(
      (link): link is string => typeof link === 'string' && link.startsWith('http')
    ),
    jobTitle: 'Full Stack Developer',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="space-y-16">
      {/* Hero 섹션 */}
      <section className="py-12 md:py-20">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold">
              Notion API를 활용한 개발자 포트폴리오 CMS 사이트
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Notion 데이터베이스를 CMS로 활용하여 포트폴리오, 프로젝트, 블로그 콘텐츠를 쉽게 관리하고 웹에 자동으로 반영되는 개인 포트폴리오 사이트입니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              <Link href="/projects">프로젝트 보기</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/blog">블로그 읽기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 최신 프로젝트 섹션 */}
      {recentProjects.length > 0 && (
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">최신 프로젝트</h2>
            <p className="text-muted-foreground">
              최근에 진행한 프로젝트들을 소개합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                date={project.date}
                slug={project.slug}
                featuredImage={project.featuredImage}
              />
            ))}
          </div>
          <div className="text-center pt-4">
            <Button variant="ghost" size="lg">
              <Link href="/projects">모든 프로젝트 보기 →</Link>
            </Button>
          </div>
        </section>
      )}

      {/* 최신 블로그 섹션 */}
      {recentBlogs.length > 0 && (
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">최신 글</h2>
            <p className="text-muted-foreground">
              최근에 작성한 블로그 글들입니다.
            </p>
          </div>
          <div className="space-y-4">
            {recentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                tags={blog.tags}
                date={blog.date}
                slug={blog.slug}
                category={blog.category}
              />
            ))}
          </div>
          <div className="text-center pt-4">
            <Button variant="ghost" size="lg">
              <Link href="/blog">모든 글 보기 →</Link>
            </Button>
          </div>
        </section>
      )}

      {/* CTA 섹션 */}
      <section className="py-12 md:py-20 bg-muted rounded-lg">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">더 알아보세요</h2>
            <p className="text-lg text-muted-foreground">
              제 경력, 기술 스택, 그리고 경험에 대해 더 알아보세요.
            </p>
          </div>
          <Button size="lg">
            <Link href="/about">자기소개 페이지</Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  )
}
