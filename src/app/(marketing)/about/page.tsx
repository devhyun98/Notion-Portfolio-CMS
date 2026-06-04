import { Mail, Code, Heart, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: '소개 | Notion Portfolio',
  description: '개발자 소개 및 기술 스택',
}

const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui'],
  backend: ['Node.js', 'Express', 'PostgreSQL'],
  tools: ['Git', 'Docker', 'AWS', 'Vercel'],
}

const experience = [
  {
    title: '소프트웨어 엔지니어',
    company: '현직',
    duration: '2024 - 현재',
    description: 'Full-stack 개발 및 프로젝트 관리',
  },
  {
    title: '주니어 개발자',
    company: '이전 회사',
    duration: '2023 - 2024',
    description: 'React 및 Node.js를 활용한 웹 개발',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* 프로필 섹션 */}
      <section className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">안녕하세요</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            저는 풀스택 웹 개발자로, 사용자 중심의 솔루션을 만드는 것을 좋아합니다.
            Next.js, React, TypeScript를 주로 사용하며, 현대적이고 효율적인
            웹 애플리케이션 개발에 집중하고 있습니다.
          </p>
        </div>

        {/* 연락처 */}
        <div className="flex gap-4 flex-wrap">
          <a
            href="mailto:devhyun98@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
          >
            <Mail className="w-4 h-4" />
            이메일
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
          >
            <Code className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
          >
            <Heart className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Twitter
          </a>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">기술 스택</h2>
          <p className="text-muted-foreground">
            다양한 프로젝트에서 사용한 기술들입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">언어</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Frontend */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">프론트엔드</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">백엔드</h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">도구</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 경력사항 섹션 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">경력사항</h2>
          <p className="text-muted-foreground">
            다양한 프로젝트와 회사에서 경험을 쌓았습니다.
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((job, index) => (
            <div
              key={index}
              className="border-l-2 border-foreground/20 pl-6 pb-6 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {job.duration}
                </span>
              </div>
              <p className="text-muted-foreground mb-2">{job.company}</p>
              <p className="text-foreground/80">{job.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
