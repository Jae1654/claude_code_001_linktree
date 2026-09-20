import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";
import { CLICKS_COLLECTION, getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getClickCounts(): Promise<Record<string, number>> {
  const db = await getDb();
  if (!db) return {};

  try {
    const docs = await db
      .collection<{ _id: string; count: number }>(CLICKS_COLLECTION)
      .find()
      .toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch {
    // DB가 잠시 죽어도 페이지는 떠야 한다.
    return {};
  }
}

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-12 sm:py-16">
      <ThemeToggle />
      <ProfileHeader profile={profile} />

      <nav className="mt-10 flex flex-col gap-3">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} initialCount={counts[link.id]} />
        ))}
      </nav>

      <footer className="mt-auto pt-12 text-center text-xs text-neutral-400 dark:text-neutral-600">
        🌳 링크나무로 만들었습니다
      </footer>
    </main>
  );
}
