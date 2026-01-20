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
  status?: 'completed' | 'in-progress'
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
    '코더로 시작하여 이제는 프로그램 설계자로서, 다양한 도구와 기술을 활용해 복잡한 문제를 해결하고 효율적인 시스템을 설계하는 데에 열정을 가지고 있습니다.<br />또한 프로젝트를 함께 수행한 동료들과는 종료 이후에도 계속 연락을 주고받고 모임을 가질 정도로, 함께 어울리고 협력하는 문화를 중요하게 생각합니다. 팀원들과의 신뢰와 유대감을 바탕으로 더 좋은 결과를 만들어내는 과정에서 큰 보람을 느낍니다.',
  ],
  goals: [
    '<b>코딩이 취미인 17년차 프로그래머</b>',
    '즐겁게 일하는 것이 중요하다고 생각함',
    '기획을 구체화 하는 과정과 문제를 해결하는 과정을 즐김',
    '경험을 통해 얻은 지식을 동료들과 공유하는 것을 좋아함',
    '어떤 일이든 시작하면 제대로 해야한다는 신념이 있음',
  ],
  tech: [
    { name: 'Java', level: 'main', category: 'backend', note: '엔터프라이즈 백엔드 서비스 개발시 사용' },
    { name: 'Kotlin', level: 'learning', category: 'backend', note: '엔터프라이즈 백엔드 서비스 개발시 사용' },
    { name: 'React', level: 'main', category: 'frontend', note: '리액트를 활용하여 프론트엔드 개발' },
    { name: 'JavaScript', level: 'main', category: 'frontend', note: '웹 개발 전반에 걸쳐 사용' },
    { name: 'RDBMS', level: 'main', category: 'backend', note: '데이터베이스 설계 및 효율적인 쿼리 작성을 위해 사용' },
    { name: 'Spring', level: 'used', category: 'backend', note: '엔터프라이즈 백엔드 서비스 개발시 스프링 프레임워크를 주로 사용' },
    { name: 'PostgreSQL', level: 'used', category: 'backend', note: 'RDMS사용 시 주로 적용' },
    { name: 'OracleDB', level: 'used', category: 'backend', note: '엔터프라이즈 백엔드 서비스 개발시 사용함' },
    { name: 'DB2', level: 'used', category: 'backend', note: '엔터프라이즈 백엔드 서비스 개발시 사용함' },
    { name: 'React', level: 'used', category: 'frontend', note: '프론트엔드 서비스 개발시 리액트를 주로 사용' },
    { name: 'Vite', level: 'used', category: 'frontend', note: '빠른 개발을 위한 Vite를 사용' },
    { name: 'Mybatis', level: 'used', category: 'backend', note: '범용적인 개발시 Mybatis를 주로 사용' },
    { name: 'JPA', level: 'used', category: 'backend', note: '빠른 개발을 위한 JPA를 사용' },
    { name: 'QueryDSL', level: 'used', category: 'backend', note: '소규모 프로젝트에 적용' },
    { name: 'jOOQ', level: 'used', category: 'backend', note: '빠른 성능과 타입 안전성을 위한 jOOQ를 주로 사용' },
    { name: 'jQuery', level: 'used', category: 'frontend', note: '레거시 프로젝트 유지보수 및 DOM 조작에 사용' },
    { name: 'Docker', level: 'used', category: 'devops', note: '컨테이너 기반의 애플리케이션 배포 및 환경 구성에 사용' },
    { name: 'GitHub Actions', level: 'used', category: 'devops', note: 'CI/CD 파이프라인 자동화를 위해 사용' },
    { name: 'Jenkins', level: 'used', category: 'devops', note: '지속적 통합 및 배포 환경 구축에 사용' },
    { name: 'Nginx', level: 'used', category: 'devops', note: '리버스 프록시 및 웹 서버 운영에 사용' },
    { name: 'Caddy', level: 'used', category: 'devops', note: '간편한 HTTPS 설정 및 웹 서버 운영에 사용' },
    { name: 'Vibe Coding', level: 'learning', category: 'etc', note: '효율적인 코딩 습관과 방법론 학습중' },
    { name: 'Vector Database', level: 'learning', category: 'backend', note: 'LLM 및 검색 엔진 고도화를 위한 벡터 DB 활용법 학습중' },
    { name: 'Artificial Intelligence', level: 'learning', category: 'etc', note: 'AI 모델의 기본 원리와 서비스 적용 방안 공부중' },
    { name: 'Thymeleaf', level: 'used', category: 'frontend', note: '서버 사이드 렌더링을 위한 템플릿 엔진으로 사용' },
    { name: 'M365 Graph API', level: 'used', category: 'backend', note: 'Microsoft 365 데이터 및 서비스 연동을 위해 사용' },
    { name: 'Kakao API', level: 'used', category: 'backend', note: '카카오 소셜 로그인 및 서비스 연동에 사용' },
    { name: 'Open API', level: 'used', category: 'backend', note: '공공데이터 및 외부 서비스 연동을 위한 API 활용 경험' },
    { name: 'OAuth 2.0', level: 'used', category: 'backend', note: '표준 인증 프로토콜을 통한 보안 인증 체계 구축에 사용' },
    { name: 'Keycloak', level: 'used', category: 'backend', note: '오픈소스 인증 및 액세스 제어 솔루션을 통한 통합 인증 환경 구축에 사용' },
    { name: 'Kafka', level: 'used', category: 'backend', note: '대용량 메시지 스트리밍 및 이벤트 기반 아키텍처 구현에 사용' },
    { name: 'Git', level: 'main', category: 'devops', note: '분산 버전 관리 시스템으로 소스 코드 이력 관리' },
    { name: 'PL/SQL', level: 'main', category: 'backend', note: '데이터베이스 저장 프로시저 및 함수 작성' },
    { name: 'Subversion', level: 'used', category: 'devops', note: '중앙 집중식 버전 관리 시스템 사용 경험' },
    { name: 'HTML', level: 'main', category: 'frontend', note: '웹 표준 마크업 및 구조 설계' },
    { name: 'MariaDB', level: 'used', category: 'backend', note: '오픈소스 관계형 데이터베이스 관리 시스템 활용' },
    { name: 'MySQL', level: 'used', category: 'backend', note: '웹 서비스 백엔드 데이터베이스로 활용' },
    { name: 'Vue.js', level: 'used', category: 'frontend', note: '반응형 웹 사용자 인터페이스 개발' },
    { name: 'Nexacro', level: 'used', category: 'frontend', note: '엔터프라이즈 UI/UX 플랫폼 개발' },
    { name: 'JSP', level: 'used', category: 'frontend', note: '서버 사이드 렌더링 및 레거시 시스템 화면 개발' },


  ],
  projects: [
    {
      slug: 'manuals-profile',
      title: '포트폴리오 / 프로필 사이트 (이 프로젝트)',
      oneLiner: '경력·프로젝트·자기소개를 구조화해 보여주는 정적 배포형 포트폴리오 사이트',
      purpose:
        '제가 만든 서비스들의 “목적/기술”과 경력 프로젝트를 한 곳에 정리하고, GitHub Pages 같은 정적 호스팅 환경에서도 안정적으로 탐색할 수 있는 포트폴리오를 만들었습니다.',
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
        '도메인 주도 개발(Domain-Driven Development), 레이어드 아키텍처 설계(SB3.5 + Clean Architecture), 백엔드(OAuth2 AS/도메인 모델링/REST API), 프론트엔드(권한 게이트/그리드/Excel UX), 품질(테스트/문서/CI)까지 End-to-End로 개발',
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
        '사용자에게는 빠르고 쉬운 복지 탐색 경험을, 운영자에게는 동기화/통계/관리 기능을 제공하는 서비스(웹+모바일)를 구축',
      role:
        'React 19 + TS + Vite 기반 사용자 앱/관리자 콘솔 UI 개발, 디자인 시스템 구축, Capacitor 기반 앱 패키징, 백엔드 연계 및 배포 자동화 파이프라인 구성',
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
      images: [
        {
          src: 'images/welfare/main.png',
          alt: '복지의 숲 메인 화면',
          caption: '사용자 메인 — 맞춤형 복지 추천 및 공공서비스 탐색/조회',
        },
        {
          src: 'images/welfare/onboarding.png',
          alt: '온보딩 프로세스',
          caption: '온보딩 — 개인화 추천 정확도 향상을 위한 프로필 및 관심사 설정',
        },
        {
          src: 'images/welfare/admin-mapping.png',
          alt: '관리자 서비스 매핑',
          caption: '관리자 — 표준 카테고리 매핑 및 외부 공공데이터 동기화 설정',
        },
        {
          src: 'images/welfare/admin-llmdata.png',
          alt: 'LLM 학습 데이터 관리',
          caption: [
            '관리자(LLM) — 벡터 DB 연동을 위한 학습 데이터셋 관리',
            '복지 서비스 데이터의 임베딩 처리 현황 모니터링',
          ],
        },
        {
          src: 'images/welfare/admin-llmdata2.png',
          alt: 'LLM 데이터 상세',
          caption: '관리자(LLM) — RAG 기반 검색 품질 향상을 위한 메타데이터 및 청크 관리',
        },
      ],
      links: [
        { label: 'Live', href: 'https://welfare.manuals.co.kr' },
      ],
    },
    {
      slug: 'groupware-msa',
      title: '매뉴얼 - 멀티테넌트 SaaS 그룹웨어',
      oneLiner: 'Event-driven MSA 기반의 멀티테넌트 SaaS 그룹웨어 플랫폼',
      purpose: '다양한 조직이 하나의 플랫폼에서 독립적인 데이터와 서비스를 이용할 수 있도록 설계된 분산 시스템. MSA 아키텍처를 도입하여 서비스 간 결합도를 낮춤, Kafka를 활용한 이벤트 기반 통신으로 확장성과 실시간성 확보',
      role: 'MSA 아키텍처(API Gateway, Discovery, Config) 및 이벤트 기반 시스템 설계, Spring Boot 3.4 + Java 21 기반 핵심 마이크로서비스(User, Approval, Board) 구현, Vue 3 프론트엔드 개발 및 Kafka 데이터 파이프라인 구축',
      tech: [
        'Java 21', 'Spring Boot 3.4', 'Kafka (KRaft)', 'PostgreSQL', 'Redis',
        'JPA', 'jOOQ', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Docker', 'Nginx'
      ],
      highlights: [
        'Multi-tenancy: 스키마 분리 전략을 통한 완벽한 데이터 격리 및 테넌트별 독립성 보장',
        'Event-Driven Architecture: Kafka를 활용한 서비스 간 비동기 통신으로 결합도 감소 및 탄력성 확보',
        'Microservices: User(조직/권한), Approval(전자결재), Board(커뮤니티) 등 도메인별 서비스 분리 구축',
        'API Gateway: Spring Cloud Gateway를 통한 라우팅 중앙화 및 JWT 기반 인증/인가 처리',
        'Hybrid ORM: 복잡한 동적 쿼리는 jOOQ(Type-safe), 단순 CRUD는 JPA로 구현하여 생산성/성능 최적화',
        'Infrastructure: Docker Compose를 이용한 전체 인프라(DB, Broker, Cache, Apps) 원클릭 구성환경 제공'
      ],
      images: [
        {
          src: 'images/groupware/dashboard.png',
          alt: '메인 대시보드',
          caption: '사용자별 맞춤 정보를 제공하는 메인 대시보드 및 포틀릿',
        },
        {
          src: 'images/groupware/user.png',
          alt: '조직도 및 사용자',
          caption: 'Tree 구조의 조직도 관리 및 사용자 정보 조회',
        },
        {
          src: 'images/groupware/approval.png',
          alt: '전자결재',
          caption: '기안-결재-승인-반려 프로세스를 처리하는 전자결재 UI',
        },
        {
          src: 'images/groupware/board.png',
          alt: '게시판',
          caption: '공지사항 및 전사 커뮤니케이션을 위한 게시판',
        },
      ],
      links: [],
      status: 'in-progress',
    },
    {
      slug: 'keycloak-user-manager',
      title: 'Manuals Keycloak User Manager',
      oneLiner: 'Keycloak 기반의 사용자 및 권한 관리(IAM) 거버넌스 플랫폼',
      purpose: 'Keycloak의 복잡한 관리 기능을 비즈니스 요구사항에 맞춰 단순화하고, 사용자/그룹/역할(RBAC) 관리 및 리소스 기반 권한 제어(Authorization)를 효율적으로 수행하기 위한 레퍼런스 구현체',
      role: 'Keycloak Admin Client 연동 설계, Spring Boot 기반 Admin API 및 보안 아키텍처 수립, Vue 3 관리자 UI 개발 및 Docker 통합 배포 환경 구축',
      tech: [
        'Java 21', 'Spring Boot 3.4', 'Keycloak 26', 'PostgreSQL',
        'Vue 3', 'TypeScript', 'PrimeVue', 'Vite', 'Docker', 'Nginx'
      ],
      highlights: [
        'Centralized IAM: Keycloak을 Identity Provider로 사용하여 표준화된 인증/인가 체계 및 SSO 구축',
        'Admin Console: Keycloak API를 추상화하여 비즈니스 로직에 최적화된 Vue 3 기반 커스텀 관리자 웹 제공',
        'Resource Server: Spring Security 6 + OAuth2 Resource Server 구성을 통한 API 보안 및 RBAC/ABAC 적용',
        'Security Architecture: Frontend(Public Client) - Backend(Confidential Client) - Keycloak 간의 안전한 토큰 흐름 설계',
        'Reverse Proxy: Nginx를 활용하여 Frontend/Backend/Auth Server 간의 라우팅 최적화 및 CORS/Cookie 문제 해결'
      ],
      images: [
        {
          src: 'images/keycloak/auth.png',
          alt: '로그인 화면',
          caption: 'Keycloak 통합 인증(SSO) 및 로그인 화면',
        },
        {
          src: 'images/keycloak/role.png',
          alt: '권한 관리',
          caption: 'RBAC 역할(Role) 정의 및 계층 구조 관리',
        },
        {
          src: 'images/keycloak/client.png',
          alt: '클라이언트 설정',
          caption: '서비스(Client) 연동 설정 및 보안 정책 적용',
        },
      ],
      links: [],
      status: 'in-progress',
    },
  ],
  contact: {
    email: 'refreshin@naver.com',
    github: 'https://github.com/shinkiki',
    linkedin: 'https://www.linkedin.com/in/기범-신-2a8353132/',
  },
  sitePurpose:
    '단순히 “무엇을 만들었다”가 아니라, <b>왜 만들었는지</b>(문제/목표), <b>어떻게 만들었는지</b>(기술/구조)를 한눈에 보여주는 것이 목표입니다.',
  techStandards: [
    '• 확장에 유연하고 유지보수가 용이한 아키텍처를 선호합니다.',
    '• 프로젝트의 특성에 따라 적절한 아키텍처를 선택하는 것이 중요하다고 생각합니다.',
    '• 도메인 주도 설계를 지향합니다.',
    '• 테스트 코드 작성을 중요하게 생각합니다.',
    '• 애자일 방법론을 통해 효율적인 개발을 추구합니다.',
    '• 정리되지 않은 지식은 지식이 될 수 없다고 생각합니다.',
  ],
}
