import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white shadow-lg dark:ring-white/10">
        <Image
          src={profile.avatar}
          alt={`${profile.name} 프로필 사진`}
          fill
          sizes="112px"
          className="object-cover"
          priority
        />
      </div>
      <h1 className="mt-5 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">{profile.bio}</p>
    </header>
  );
}
