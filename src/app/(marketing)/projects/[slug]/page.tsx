import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { MetaInfo } from '@/components/content/meta-info'
import { TagBadge } from '@/components/content/tag-badge'
import { RelatedProjects } from '@/components/content/related-content'
import { getProjects, getProject } from '@/lib/notion-fetch'
import { markdownToHtml } from '@/lib/markdown'
import type { Metadata } from 'next'

// 동적 파라미터 생성 (정적 생성용)
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// 동적 메타데이터 생성 (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${project.title} | Notion Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.featuredImage
        ? [project.featuredImage]
        : [],
    },
  }
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)
  const allProjects = await getProjects()

  if (!project) {
    notFound()
  }

  // 마크다운을 HTML로 변환
  const htmlContent = await markdownToHtml(project.content)

  return (
    <div className="space-y-8">
      {/* 브레드크럼 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">프로젝트</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 뒤로가기 버튼 */}
      <Link href="/projects">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          프로젝트 목록
        </Button>
      </Link>

      {/* 헤더 */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
        <MetaInfo date={project.date} />
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              href={`/projects?tags=${tag}`}
            />
          ))}
        </div>
      </div>

      {/* 대표 이미지 */}
      {project.featuredImage && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
          {/* TODO: Next.js Image 컴포넌트로 대체 예정 */}
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 기술 스택 배지 */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">기술 스택</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 마크다운 콘텐츠 */}
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* 링크 버튼 */}
      <div className="flex flex-wrap gap-4 pt-8">
        {project.demoUrl && (
          <Button>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              라이브 데모 보기
            </a>
          </Button>
        )}
        {project.sourceUrl && (
          <Button variant="outline">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              소스 코드 보기
            </a>
          </Button>
        )}
      </div>

      {/* 관련 프로젝트 */}
      <RelatedProjects
        currentProject={project}
        allProjects={allProjects}
        maxItems={3}
      />
    </div>
  )
}
