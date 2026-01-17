# manuals-profile

포트폴리오(사이트의 기술/목적/프로젝트 소개)용 정적 웹사이트입니다.

## 실행

- 의존성 설치 후 개발 서버 실행: `npm install` → `npm run dev`
- 빌드: `npm run build`
- 미리보기: `npm run preview`

## 콘텐츠 수정 위치

- `src/data/profile.ts`: 이름/한줄소개/기술스택/프로젝트/연락처

## 프로젝트 상세 페이지

- 홈: `/#/`
- 프로젝트 상세: `/#/project/<slug>`

`slug`와 `images`(경로/alt/캡션)는 `src/data/profile.ts`의 프로젝트 항목에서 수정합니다.

이미지는 기본적으로 `public/images/`에 두고,
데이터에는 `images/foo.svg`처럼 **앞에 `/` 없이** 적는 것을 권장합니다(GitHub Pages 서브 경로 대응).

## GitHub Pages 배포

이 레포에는 GitHub Actions 기반 Pages 배포 워크플로가 포함되어 있습니다: `.github/workflows/deploy.yml`

1) GitHub 레포 생성 후 `main` 브랜치에 push
2) GitHub에서 **Settings → Pages → Build and deployment**
3) Source를 **GitHub Actions**로 설정
4) 이후 `main`에 push하면 자동으로 빌드/배포됩니다.

