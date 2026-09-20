# 🌳 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 서비스입니다.

## 기술 스택

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (모바일 우선 반응형)
- MongoDB Atlas (링크별 클릭 수 집계)
- Vercel 배포

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # MongoDB를 쓸 경우에만
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.
`MONGODB_URI`가 없으면 클릭 수 집계만 꺼진 채로 정상 동작합니다.

## 내 정보로 바꾸기

- 프로필과 링크 목록: `src/data/profile.ts`
- 프로필 사진: `public/` 에 이미지를 넣고 `profile.avatar` 경로 수정

## 구조

```
src/
├─ app/
│  ├─ layout.tsx            # 테마 초기화 스크립트, 메타데이터
│  ├─ page.tsx              # 프로필 + 링크 목록 (서버에서 클릭 수 조회)
│  └─ api/clicks/route.ts   # GET 집계 조회 / POST 클릭 기록
├─ components/
│  ├─ ProfileHeader.tsx
│  ├─ LinkCard.tsx          # 클릭 시 낙관적 업데이트 후 집계 전송
│  └─ ThemeToggle.tsx       # 다크모드 토글 (localStorage 저장)
├─ data/profile.ts
└─ lib/mongodb.ts           # 커넥션 캐싱
```

## 클릭 수 집계

`link_clicks` 컬렉션에 링크 id를 `_id`로 하는 문서를 upsert 하며 `count`를 1씩 올립니다.
존재하지 않는 링크 id는 서버에서 거부합니다.

## 배포

Vercel에 프로젝트를 연결하고 환경 변수 `MONGODB_URI`, `MONGODB_DB`를 등록하면 됩니다.
MongoDB Atlas의 Network Access에서 접근 IP 허용(0.0.0.0/0 등)을 잊지 마세요.
