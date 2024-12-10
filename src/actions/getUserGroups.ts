import { pool } from "@/db";
import { verifySession } from "@/session/session";

export type Group = {
  id: number;
  founder_id: number;
  name: string;
  description: string;
  public: boolean;
};

export async function getUserGroups(userId?: number) {
  const actualId = userId || (await verifySession())?.userId;
  if (actualId === undefined) {
    return [];
  }

  return (
    (
      await pool.query(
        `select g.* from users_groups ug join groups g on ug.group_id = g.id and ug.user_id = $1`,
        [actualId],
      )
    ).rows as Group[]
  ).sort((a, b) => (a.name < b.name ? -1 : 1));
}
