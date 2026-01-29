# 📚 BookRipple

**한 권의 울림을 주는 곳, 북리플**  
북리플은 독서가 그저 읽는 행위로만 끝나지 않도록,  
기록과 소통을 통해 독서 경험을 확장하는 **소통형 독서 기록 서비스**입니다.

---

## Tech Stack

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-18181B?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"/>
</p>

---

## Collaboration Guide

본 프로젝트는 협업 효율과 유지보수성을 고려하여  
Git Flow 기반의 브랜치 전략과 명확한 컨벤션을 사용합니다.

---

## 브랜치 전략

### Git Flow 전략

- `main` : 배포 가능한 버전
- `develop` : 기능 통합 및 테스트 브랜치
- 모든 작업은 이슈 기반 브랜치에서 진행


### 브랜치 네이밍 규칙

- `#번호`는 이슈 번호를 의미합니다.

| Type | 설명 | 예시 |
| --- | --- | --- |
| feat | 새 기능 개발 | `feat/#번호-기능명` |
| fix | 버그 수정 | `fix/#번호-버그명` |
| design | UI/UX 작업 | `design/#번호-작업명` |
| refactor | 코드 리팩토링 | `refactor/#번호-작업명` |
| hotfix | 긴급 수정 | `hotfix/#번호-긴급수정명` |

---

## 이슈 / PR 협업 흐름

1. 이슈 생성  
   - 형식: `[유형] where / what`
2. 이슈 번호 기준 브랜치 생성  
   - `유형/#번호-what`
3. 해당 브랜치에서 작업 후 push
4. Pull Request 생성 및 리뷰 요청
5. 2명 이상 승인 후 `develop` 브랜치로 merge

---

## 커밋 컨벤션

| Type | 설명 | 예시 |
| --- | --- | --- |
| feat | 새로운 기능 추가 | `feat: 회원가입 페이지 구현` |
| fix | 버그 수정 | `fix: 버튼 오류 수정` |
| design | UI/UX 변경 | `design: 메뉴 반응형 수정` |
| style | 코드 포맷팅 | `style: Prettier 적용` |
| refactor | 코드 리팩토링 | `refactor: 인증 로직 수정` |
| chore | 환경 설정 | `chore: 프로젝트 세팅` |
| docs | 문서 수정 | `docs: README 업데이트` |
| test | 테스트 코드 | `test: 도서 조회 API 테스트` |
| rename | 파일/폴더명 변경 | `rename: components 구조 변경` |
| remove | 파일 삭제 | `remove: 미사용 아이콘 삭제` |

---

## 네이밍 컨벤션

### 파일 / 폴더명

| 타입 | 규칙 | 예시 |
| --- | --- | --- |
| 컴포넌트 | PascalCase | `Button.tsx` |
| 페이지 | kebab-case | `login.tsx` |
| 훅 / 유틸 | camelCase | `useAuth.ts` |
| 타입 | PascalCase | `api.types.ts` |
| 상수 | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |
