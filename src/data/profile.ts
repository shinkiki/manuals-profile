export type TechItem = {
  name: string
  level?: 'main' | 'used' | 'learning'
  category?: 'frontend' | 'backend' | 'devops' | 'mobile' | 'etc'
  note?: string
}

export type ProjectLink = {
  label: string
  href: string
  details?: string
}

export type ProjectItem = {
  slug: string
  title: string
  oneLiner: string
  purpose: string | string[]
  role: string
  tech: string[]
  highlights: string[]
  images?: Array<{
    src: string
    alt: string
    caption?: string | string[]
    descriptions?: string[]
  }>
  links?: ProjectLink[]
}


export type ProfileData = {
  name: string
  jobTitle?: string
  headline: string
  intro: string
  avatar?: {
    src: string
    alt: string
  }
  selfIntroduction?: string[]
  goals: string[]
  tech: TechItem[]
  projects: ProjectItem[]
  contact: {
    email?: string
    github?: string
    blog?: string
    linkedin?: string
  }
  sitePurpose?: string
  techStandards?: string[]
}

export const profile: ProfileData = {
  name: '신기범',
  jobTitle: '프로그램 설계/개발자',
  headline: '유연한 아이디어 뱅커',
  intro:
    '문서로 이력서를 작성하다 문득 나를 표현하기 위한 가장 좋은 방법은 직접 보여주는 것이라고 생각하고 제작한 프로필 웹사이트입니다.',
  avatar: {
    src: 'images/me.jpeg',
    alt: '프로필 사진',
  },
  selfIntroduction: [
    '처음 뵙겠습니다! 신기범입니다.',
    '코더로 시작하여 이제는 프로그램 설계자로서, 다양한 도구와 기술을 활용해 복잡한 문제를 해결하고 효율적인 시스템을 설계하는 데에 열정을 가지고 있습니다.',
    '또한 프로젝트를 함께 수행한 동료들과는 종료 이후에도 계속 연락을 주고받고 모임을 가질 정도로, 함께 어울리고 협력하는 문화를 중요하게 생각합니다. 팀원들과의 신뢰와 유대감을 바탕으로 더 좋은 결과를 만들어내는 과정에서 큰 보람을 느낍니다.',
  ],
  goals: [
    '<b>바이브코딩을 즐겨하는 17년차 프로그래머</b>',
    '기획을 구체화 하는 과정과 문제를 해결하는 과정을 즐김',
    '경험을 통해 얻은 지식을 동료들과 공유하는 것을 좋아함',
    '어떤 일이든 시작하면 제대로 해야한다는 신념이 있음',
    '즐겁게 일하는 것이 중요하다고 생각함',
  ],
  tech: [
    { name: 'Java', level: 'main', category: 'backend', note: '엔터프라이즈 백엔드 서비스 개발시 자바를 주로 사용합니다.' },
    { name: 'Kotlin', level: 'learning', category: 'backend', note: '빠른 개발을 위한 코틀린을 주로 사용합니다.' },
    { name: 'React', level: 'main', category: 'frontend', note: '리액트를 활용한 프론트엔드 개발에 능숙합니다.' },
    { name: 'JavaScript', level: 'main', category: 'frontend', note: '웹 개발 전반에 걸쳐 사용합니다.' },
    { name: 'RDBMS', level: 'main', category: 'backend', note: '데이터베이스 설계 및 효율적인 쿼리 작성을 중요하게 생각합니다.' },
    { name: 'Spring', level: 'used', category: 'backend', note: '엔터프라이즈 백엔드 서비스 개발시 스프링 프레임워크를 주로 사용합니다.' },
    { name: 'PostgreSQL', level: 'used', category: 'backend', note: 'RDMS로 주로 사용합니다.' },
    { name: 'React', level: 'used', category: 'frontend', note: '프론트엔드 서비스 개발시 리액트를 주로 사용합니다.' },
    { name: 'Vite', level: 'used', category: 'frontend', note: '빠른 개발을 위한 Vite를 주로 사용합니다.' },
    { name: 'Mybatis', level: 'used', category: 'backend', note: '범용적인 개발시 Mybatis를 주로 사용합니다.' },
    { name: 'JPA', level: 'used', category: 'backend', note: '빠른 개발을 위한 JPA를 주로 사용합니다.' },
    { name: 'QueryDSL', level: 'used', category: 'backend', note: '소규모 프로젝트에 적용합니다.' },
    { name: 'jOOQ', level: 'used', category: 'backend', note: '빠른 성능과 타입 안전성을 위한 jOOQ를 주로 사용합니다.' },
    { name: 'jQuery', level: 'used', category: 'frontend', note: '레거시 프로젝트 유지보수 및 DOM 조작에 사용합니다.' },
    { name: 'Docker', level: 'used', category: 'devops', note: '컨테이너 기반의 애플리케이션 배포 및 환경 구성에 사용합니다.' },
    { name: 'GitHub Actions', level: 'used', category: 'devops', note: 'CI/CD 파이프라인 자동화를 위해 사용합니다.' },
    { name: 'Jenkins', level: 'used', category: 'devops', note: '지속적 통합 및 배포 환경 구축에 사용합니다.' },
    { name: 'Nginx', level: 'used', category: 'devops', note: '리버스 프록시 및 웹 서버 운영에 사용합니다.' },
    { name: 'Caddy', level: 'used', category: 'devops', note: '간편한 HTTPS 설정 및 웹 서버 운영에 사용합니다.' },
    { name: 'Vibe Coding', level: 'learning', category: 'etc', note: '효율적인 코딩 습관과 방법론을 학습 중입니다.' },
    { name: 'Vector Database', level: 'learning', category: 'backend', note: 'LLM 및 검색 엔진 고도화를 위한 벡터 DB 활용법을 학습 중입니다.' },
    { name: 'Artificial Intelligence', level: 'learning', category: 'etc', note: 'AI 모델의 기본 원리와 서비스 적용 방안을 공부하고 있습니다.' },
    { name: 'Thymeleaf', level: 'used', category: 'frontend', note: '서버 사이드 렌더링을 위한 템플릿 엔진으로 사용합니다.' },
    { name: 'M365 Graph API', level: 'used', category: 'backend', note: 'Microsoft 365 데이터 및 서비스 연동을 위해 사용합니다.' },
    { name: 'Kakao API', level: 'used', category: 'backend', note: '카카오 소셜 로그인 및 서비스 연동에 사용합니다.' },
    { name: 'Open API', level: 'used', category: 'backend', note: '공공데이터 및 외부 서비스 연동을 위한 API 활용 경험이 있습니다.' },
    { name: 'OAuth 2.0', level: 'used', category: 'backend', note: '표준 인증 프로토콜을 통한 보안 인증 체계 구축에 사용합니다.' },
    { name: 'Keycloak', level: 'used', category: 'backend', note: '오픈소스 인증 및 액세스 제어 솔루션을 통한 통합 인증 환경 구축에 사용합니다.' },
    { name: 'Kafka', level: 'used', category: 'backend', note: '대용량 메시지 스트리밍 및 이벤트 기반 아키텍처 구현에 사용합니다.' },


  ],
  projects: [
    {
      slug: 'manuals-profile',
      title: '포트폴리오 / 프로필 사이트 (이 프로젝트)',
      oneLiner: '경력·프로젝트·자기소개를 구조화해 보여주는 정적 배포형 포트폴리오 사이트',
      purpose:
        '제가 만든 서비스들의 “목적/기술/개선점”과 경력 프로젝트를 한 곳에 정리하고, GitHub Pages 같은 정적 호스팅 환경에서도 안정적으로 탐색할 수 있는 포트폴리오를 만들었습니다.',
      role:
        '정보 구조 설계, UI/UX(타임라인/목차/모달), 데이터 모델링(profile/career 분리), 라우팅/배포 설정까지 전반을 구현했습니다.',
      tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router (HashRouter)', 'GitHub Pages'],
      highlights: [
        '홈/프로젝트 상세/경력기술서 라우팅 구성 및 GitHub Pages 호환을 위한 HashRouter 적용',
        '경력기술서 상단 타임라인 + 재직회사별 프로젝트 요약 카드 + 클릭 스크롤 내비게이션',
        '프로젝트 이미지: 클릭 시 원본 모달(ESC/백드롭/닫기) + 이미지별 설명(descriptions) 지원',
        '다크모드 토글 및 반응형 레이아웃, 데이터(profile/career) 분리로 유지보수성 강화',
      ],
      images: [
        {
          src: 'images/site-hero.png',
          alt: '포트폴리오 사이트 메인 화면',
          caption: '메인(Hero) + 요약 카드 중심의 정보 전달',
        },
        {
          src: 'images/site-projects.png',
          alt: '포트폴리오 사이트 프로젝트 섹션',
          caption: '프로젝트를 목적/역할/기술/하이라이트로 구조화',
        },
      ],
    },
    {
      slug: 'meta',
      title: '메타데이터 관리 시스템',
      oneLiner: '브로젝트별 용어·단어·도메인 메타데이터를 관리하는 운영 도구',
      purpose: [
        '신규 프로젝트를 진행할때 메타데이터를 관리하면 생각보다 많은 장점이 있습니다.',
        '정합성 향상이라는 기본적인 장점도 있겠지만 제가 생각한 장점은 개발을 진행 할수록 도메인의 메타정보가 쌓이게 되면 변수명, 타입등을 생각하느라 시간을 낭비하지 않아 개발기간이 단축되고 코드의 퀄리티도 향상됩니다.',
      ],
      role:
        '도메인 주도 개발(Domain-Driven Development), 레이어드 아키텍처 설계(SB3.5 + Clean Architecture), 백엔드(OAuth2 AS/도메인 모델링/REST API), 프론트엔드(권한 게이트/그리드/Excel UX), 품질(테스트/문서/CI)까지 End-to-End로 수행했습니다.',
      tech: [
        'Java 21',
        'Spring Boot 3.5',
        'Spring Security/OAuth2',
        'JPA',
        'QueryDSL',
        'MyBatis',
        'MapStruct',
        'PostgreSQL',
        'React 18',
        'Ant Design 5',
        'Axios',
        'React Query',
        'Jest/RTL',
        'GitHub Actions',
      ],
      highlights: [
        '프로젝트별로 도메인, 단어, 용어 관리기능 제공',
        '대량 엑셀 업/다운로드 지원',
        '표준단어 관리: 표준어/동의어/약어 관리 및 AI 추천 기능을 통한 영문명/유의어 자동 제안',
        '도메인 관리: 데이터 타입(VARCHAR, NUMBER 등) 및 길이 표준화 정의',
        '시스템 설정: 메뉴 관리(트리 구조), 권한 관리(Role 기반), 사용자 관리, API/이벤트 관리 등 운영자 기능 완비',
        '메인 대시보드를 통한 데이터 분포(단어/용어/도메인) 시각화 및 현황 모니터링',
        'Active Session 관리, OAuth2 인증, JWT 토큰 발급/갱신 흐름 구축',
        'QueryDSL & MyBatis 혼합 질의 전략으로 복잡 조회/리포팅 대응',
      ],
      images: [
        {
          src: 'images/meta/project-domain.png',
          alt: '도메인 관리 상세',
          caption: '도메인 관리 — 데이터 타입/길이 및 담당자 지정',
        },
        {
          src: 'images/meta/project-word.png',
          alt: '표준단어 관리 상세',
          caption: [
            '표준단어 등록 — AI를 활용한 영문명/유의어 자동 추천 기능',
            '입력된 한글명을 분석하여 표준화된 영문 약어 및 동의어를 실시간 제안',
          ],
        },
        {
          src: 'images/meta/project-perm.png',
          alt: '권한 관리',
          caption: '권한 관리 — 사용자 그룹별 메뉴 및 기능 접근 제어',
        },
        {
          src: 'images/meta/setting-api.png',
          alt: 'API 관리',
          caption: ['API 관리 — 시스템 연동을 위한 API 목록 및 명세 관리',
            'API 명세를 통한 API 문서 자동 생성',
            '런타임 API 정보와 저장된 API 정보를 비교하여 차이점을 감지하여 변경 추적관리',
          ]
        },
        {
          src: 'images/meta/setting-event.png',
          alt: '이벤트 관리',
          caption: ['이벤트 관리 — 시스템 주요 이벤트 설정 및 핸들러 매핑',
            '런타임 이벤트 추가 시 추적 및 핸들링 관리화면 제공'
          ]
        },
        {
          src: 'images/meta/setting-listener.png',
          alt: '리스너 관리',
          caption: ['리스너 관리 — 이벤트 발생 시 실행될 리스너 설정',
            '리스너 ON/OFF 설정으로 리스너 실행 제어'
          ]
        },
      ],
      links: [
        { label: 'Live', href: 'https://meta.manuals.co.kr', details: '체험계정: demo1 / demo1' },
      ],
    },
    {
      slug: 'welfare-forest',
      title: '복지의 숲 (Welfare Forest)',
      oneLiner: '맞춤형 복지 추천과 관리자 운영을 위한 사용자 앱 + 관리자 콘솔 + 모바일 앱 패키징',
      purpose:
        '사용자에게는 빠르고 쉬운 복지 탐색 경험을, 운영자에게는 동기화/통계/관리 기능을 제공하는 서비스(웹+모바일)를 구축했습니다.',
      role:
        'React 19 + TS + Vite 기반 사용자 앱/관리자 콘솔 UI 개발, 디자인 시스템 구축, Capacitor 기반 앱 패키징, 백엔드 연계 및 배포 자동화 파이프라인 구성에 참여했습니다.',
      tech: [
        'React 19',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Radix UI',
        'React Admin',
        'Recharts',
        'Capacitor 7',
        'Node.js 20',
        'Express.js',
        'SQLite3',
        'Docker',
        'GitHub Actions',
      ],
      highlights: [
        '맞춤형 온보딩 & 가족 프로필(지역/소득/관계/동거 여부 등) 기반 개인화 추천 정확도 향상',
        '31개 시군구 필터 + 카테고리/키워드 검색 + 공공서비스 실시간 조회 UI/UX 최적화',
        '관리자 백오피스: React Admin 기반 CRUD, 통계 대시보드, 외부 API 동기화 이력 조회',
        '운영 자동화: node-cron 새벽 정기 동기화, Docker 기반 멀티플랫폼 빌드, GHCR 이미지 관리',
        '배포 자동화: Docker Compose 표준 개발환경 + GitHub Actions → Synology NAS 무중단 배포 지원',
      ],
      links: [
        { label: 'Live', href: 'https://welfare.manuals.co.kr' },
      ],
    },
  ],
  contact: {
    email: 'refreshin@naver.com',
    github: 'https://github.com/shinkiki',
    linkedin: 'https://www.linkedin.com/in/기범-신-2a8353132/',
  },
  sitePurpose:
    '단순히 “무엇을 만들었다”가 아니라, <b>왜 만들었는지</b>(문제/목표), <b>어떻게 만들었는지</b>(기술/구조), <b>무엇이 좋아졌는지</b>(결과)를 한눈에 보여주는 것이 목표입니다.',
  techStandards: [
    '• 확장에 유연하고 유지보수가 용이한 아키텍처를 선호합니다.',
    '• 프로젝트의 특성에 따라 적절한 아키텍처를 선택하는 것이 중요하다고 생각합니다.',
    '• 도메인 주도 설계를 지향합니다.',
    '• 테스트 코드 작성을 중요하게 생각합니다.',
    '• 애자일 방법론을 통해 효율적인 개발을 추구합니다.',
    '• 정리되지 않은 지식은 지식이 될 수 없다고 생각합니다.',
  ],
}
