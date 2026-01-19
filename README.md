# Portfolio / Profile Website

React + TypeScript + Vite 기반으로 제작된 개인 포트폴리오 및 프로필 웹사이트입니다.
이력서(Career), 포트폴리오(Projects), 그리고 자기소개(Profile)를 구조화된 데이터로 관리하고 정적 웹사이트로 배포할 수 있습니다.

## ✨ 주요 기능

- **Career Timeline**: 경력 기술서를 타임라인 형태로 시각화하여 근무 기간과 회사별 프로젝트를 한눈에 파악
- **Project Gallery**: 프로젝트별 상세 정보(목적/역할/기술스택/성과)와 스크린샷 갤러리(모달 뷰어) 제공
- **Structured Data**: `src/data` 폴더 내 TypeScript 파일로 이력 및 프로젝트 데이터 관리
- **Responsive & Dark Mode**: 모바일 반응형 레이아웃 및 다크 모드 지원
- **SEO Optimized**: 시맨틱 마크업과 메타 태그 최적화

## 🛠️ 기술 스택

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router (HashRouter for GitHub Pages support)
- **Deployment**: GitHub Pages (`gh-pages`)

## 🚀 실행 방법

### 1. 개발 서버 실행
```bash
npm install
npm run dev
```

### 2. 빌드 및 미리보기
```bash
npm run build
npm run preview
```

## 📝 데이터 관리

콘텐츠는 컴포넌트 수정 없이 아래 데이터 파일만 수정하면 반영됩니다.

- **`src/data/profile.ts`**:
    - 프로필 정보 (이름, 한줄소개, 목표, 기술 스택)
    - 포트폴리오 프로젝트 목록 (썸네일, 설명, 기술 스택, 갤러리 이미지)
    - 연락처 링크
- **`src/data/career.ts`**:
    - 경력 상세 (회사명, 기간, 직책, 주요 업무, 성과)

## 🌐 GitHub Pages 배포

이 프로젝트는 `gh-pages` 패키지를 사용하여 GitHub Pages에 손쉽게 배포할 수 있도록 설정되어 있습니다.

### 1. 설정 (최초 1회)
`package.json` 파일에서 `homepage` 필드를 본인의 저장소 주소로 수정하세요.
```json
"homepage": "https://<USERNAME>.github.io/<REPO>"
```

### 2. 배포하기
아래 명령어를 실행하면 `dist` 폴더를 빌드하고 `gh-pages` 브랜치로 배포합니다.
```bash
npm run deploy
```

배포 후 `https://<USERNAME>.github.io/<REPO>`에서 사이트를 확인할 수 있습니다.
