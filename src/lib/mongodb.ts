import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linktree";

// 개발 모드에서 HMR 때마다 커넥션이 새로 생기지 않도록 전역에 캐싱한다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

/**
 * MONGODB_URI가 없으면 null을 돌려준다.
 * (로컬에서 DB 없이도 페이지가 동작하도록 하기 위함)
 */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    }).connect();
  }

  try {
    const client = await globalForMongo._mongoClientPromise;
    return client.db(dbName);
  } catch (error) {
    // 접속 실패 시 실패한 promise를 캐싱해두면 영영 복구되지 않으므로 비운다.
    globalForMongo._mongoClientPromise = undefined;
    console.error("[mongodb] 연결 실패:", error);
    return null;
  }
}

export const CLICKS_COLLECTION = "link_clicks";
