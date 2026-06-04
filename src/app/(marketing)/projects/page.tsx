import { ProjectsFilter } from '@/components/content/projects-filter'
import { getProjects } from '@/lib/notion-fetch'

export const metadata = {
  title: '프로젝트 | Notion Portfolio',
  description: '진행했던 프로젝트들을 소개합니다.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">프로젝트</h1>
        <p className="text-lg text-muted-foreground">
          진행했던 프로젝트들을 소개합니다.
        </p>
      </div>

      {/* 검색 및 필터링 */}
      <ProjectsFilter projects={projects} />
    </div>
  )
}
