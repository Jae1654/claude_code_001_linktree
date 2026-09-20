import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-12 sm:py-16">
      <ThemeToggle />
      <ProfileHeader profile={profile} />

      <LinkList links={links} />

      <footer className="mt-auto pt-12 text-center text-xs text-neutral-400 dark:text-neutral-600">
        🌳 링크나무로 만들었습니다
      </footer>
    </main>
  );
}
