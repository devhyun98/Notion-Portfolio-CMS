'use client'

import { Download, Mail, Phone, MapPin, Globe } from 'lucide-react'
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
import { siteConfig } from '@/lib/config'

// 이력서 데이터
const resumeData = {
  personal: {
    name: '개발자명',
    title: 'Full-Stack Web Developer',
    email: 'devhyun98@gmail.com',
    phone: '+82 10-XXXX-XXXX',
    location: 'Seoul, South Korea',
    website: 'https://yourportfolio.com',
    summary: '사용자 중심의 웹 애플리케이션을 설계하고 구현하는 Full-Stack 개발자입니다. Next.js, React, TypeScript를 활용한 현대적인 웹 개발에 강점이 있으며, 성능 최적화와 사용자 경험 개선에 관심이 있습니다.',
  },
  experience: [
    {
      title: 'Senior Full-Stack Developer',
      company: '기술 회사명',
      location: 'Seoul, South Korea',
      period: '2024 - 현재',
      description: '리더십과 아키텍처 설계 역할 수행',
      achievements: [
        'Next.js 기반 포트폴리오 CMS 시스템 구축 (Notion API 통합)',
        '성능 최적화를 통한 Lighthouse 점수 95+ 달성',
        '타입 안정성을 위한 TypeScript 마이그레이션 주도',
        '팀 5명과의 협업을 통한 프로젝트 관리 및 코드 리뷰',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: '이전 회사명',
      location: 'Seoul, South Korea',
      period: '2023 - 2024',
      description: '웹 애플리케이션 개발 및 유지보수',
      achievements: [
        'React 기반 대시보드 애플리케이션 개발',
        'Node.js/Express 백엔드 API 설계 및 구현',
        'PostgreSQL 데이터베이스 스키마 설계',
        'Docker를 활용한 배포 자동화',
      ],
    },
    {
      title: 'Junior Web Developer',
      company: '스타트업',
      location: 'Seoul, South Korea',
      period: '2022 - 2023',
      description: '프론트엔드 개발 및 기초 학습',
      achievements: [
        'React를 활용한 UI 컴포넌트 개발',
        'HTML/CSS/JavaScript 기초 학습 및 적용',
        'Git 버전 관리 및 협업 프로세스 습득',
      ],
    },
  ],
  education: [
    {
      school: '컴퓨터과학 관련 학위',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      period: '2018 - 2022',
      details: 'GPA: 3.8/4.0',
    },
    {
      school: '부트캠프',
      degree: 'Full-Stack Web Development',
      field: 'Coding Bootcamp',
      period: '2022',
      details: '12주 집중 과정 수료',
    },
  ],
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'HTML/CSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    tools: ['Git', 'Docker', 'AWS', 'Vercel', 'GitHub', 'VS Code'],
    other: ['REST API', 'GraphQL', 'Agile', 'Testing (Jest, Cypress)'],
  },
  certifications: [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
    },
    {
      name: 'Google Cloud Associate Cloud Engineer',
      issuer: 'Google Cloud',
      date: '2023',
    },
  ],
}

export default function ResumePage() {
  // Schema.org JSON-LD 마크업 - Person 및 이력서 정보
  const personWithResumeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resumeData.personal.name,
    url: siteConfig.url,
    jobTitle: resumeData.personal.title,
    email: resumeData.personal.email,
    telephone: resumeData.personal.phone,
    location: {
      '@type': 'Place',
      name: resumeData.personal.location,
    },
    knowsAbout: Object.values(resumeData.skills).flat(),
    hasCredential: resumeData.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'Professional Certification',
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personWithResumeSchema) }}
      />
      <div className="space-y-8">
      {/* 브레드크럼 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>이력서</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* PDF 다운로드 버튼 */}
      <div className="flex justify-end">
        <Button
          size="sm"
          className="gap-2"
          onClick={() => {
            // PDF 다운로드 로직 (나중에 구현 예정)
            alert('PDF 다운로드 기능은 준비 중입니다.')
          }}
        >
          <Download className="w-4 h-4" />
          PDF 다운로드
        </Button>
      </div>

      {/* 개인 정보 섹션 */}
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold">
            {resumeData.personal.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            {resumeData.personal.title}
          </p>
          <p className="text-base text-foreground/80">
            {resumeData.personal.summary}
          </p>
        </div>

        {/* 연락처 정보 */}
        <div className="flex flex-wrap gap-6 text-sm">
          <a
            href={`mailto:${resumeData.personal.email}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            {resumeData.personal.email}
          </a>
          <a
            href={`tel:${resumeData.personal.phone}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            {resumeData.personal.phone}
          </a>
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {resumeData.personal.location}
          </div>
          <a
            href={resumeData.personal.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-4 h-4" />
            포트폴리오
          </a>
        </div>
      </section>

      {/* 경력 섹션 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">경력사항</h2>
        <div className="space-y-8">
          {resumeData.experience.map((job, index) => (
            <div
              key={index}
              className="border-l-2 border-foreground/20 pl-6 pb-6 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              <p className="text-foreground/80 mb-3">{job.description}</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                {job.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">기술 스택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="font-semibold mb-3 capitalize">
                {category === 'languages'
                  ? '언어'
                  : category === 'frontend'
                    ? '프론트엔드'
                    : category === 'backend'
                      ? '백엔드'
                      : category === 'tools'
                        ? '도구'
                        : '기타'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(skills as string[]).map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 교육 섹션 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">교육</h2>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border-b border-foreground/10 pb-6 last:border-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-foreground/80">{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 자격증 섹션 */}
      {resumeData.certifications.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">자격증</h2>
          <div className="space-y-4">
            {resumeData.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-lg border border-foreground/10"
              >
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
    </>
  )
}
