import { NextResponse } from "next/server";
import { CLICKS_COLLECTION, getDb } from "@/lib/mongodb";
import { links } from "@/data/profile";

export const dynamic = "force-dynamic";

type ClickDoc = {
  _id: string;
  count: number;
  updatedAt: Date;
};

/** 링크별 클릭 수 전체 조회 */
export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ counts: {}, connected: false });

  const docs = await db.collection<ClickDoc>(CLICKS_COLLECTION).find().toArray();
  const counts: Record<string, number> = {};
  for (const doc of docs) counts[doc._id] = doc.count;

  return NextResponse.json({ counts, connected: true });
}

/** 링크 클릭 1회 기록 */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 임의의 id로 문서가 늘어나지 않도록 화이트리스트 검증
  if (typeof id !== "string" || !links.some((link) => link.id === id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) return NextResponse.json({ count: null, connected: false });

  const result = await db.collection<ClickDoc>(CLICKS_COLLECTION).findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true, returnDocument: "after" }
  );

  return NextResponse.json({ count: result?.count ?? 1, connected: true });
}
