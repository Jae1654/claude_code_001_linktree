export type Profile = {
  name: string;
  bio: string;
  avatar: string;
};

export type Link = {
  id: string;
  title: string;
  description?: string;
  url: string;
  emoji: string;
};

export const profile: Profile = {
  name: "조윤재",
  bio: "데이터 사이언티스트 | 최강의 AI 접목자",
  // public/ 아래에 이미지를 넣고 경로를 바꿔주세요.
  avatar: "/avatar-tanjiro.svg",
};

export const links: Link[] = [
  {
    id: "github",
    title: "GitHub",
    description: "만들고 있는 것들",
    url: "https://github.com",
    emoji: "🐙",
  },
  {
    id: "blog",
    title: "블로그",
    description: "개발 기록과 회고",
    url: "https://velog.io",
    emoji: "✍️",
  },
  {
    id: "x",
    title: "X (Twitter)",
    description: "짧은 생각들",
    url: "https://x.com",
    emoji: "🐦",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "일상 기록",
    url: "https://instagram.com",
    emoji: "📷",
  },
  {
    id: "email",
    title: "이메일 보내기",
    description: "협업 · 제안 환영합니다",
    url: "mailto:hello@example.com",
    emoji: "✉️",
  },
];
