import { pool } from "@/db";
import { verifySession } from "@/session/session";

export async function updateActiveGroup(groupId: number) {
  const session = await verifySession();
  if (session.isAuth) {
    pool.query("update users set active_group=$1 where id=$2", [
      groupId,
      session.userId,
    ]);
  }
}
