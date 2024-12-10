"use server";

import { pool } from "@/db";
import { verifySession } from "@/session/session";
import { updateActiveGroup } from "./updateActiveGroup";

export type Category = {
  id: number;
  description: string;
  label: string;
};

export async function getCategories(state: any, groupId: number) {
  const session = await verifySession();

  if (session.isAuth) {
    updateActiveGroup(groupId);
    return (
      (
        await pool.query(
          `SELECT id, description, label FROM categories WHERE group_id=$1 order by label asc`,
          [groupId],
        )
      ).rows as Category[]
    ).sort((a, b) => (a.label === "Otro" ? 1 : b.label === "Otro" ? -1 : 0));
  }

  return [];
}
