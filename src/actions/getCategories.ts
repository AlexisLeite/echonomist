import { pool } from "@/db";

export type Category = {
  id: number;
  description: string;
  label: string;
};

export async function getCategories() {
  return ((
    await pool.query(
      `SELECT id, description, label FROM categories WHERE group_id=1 order by label asc`,
    )
  ).rows as Category[]).sort((a,b) => a.label === 'Otro' ? 1 : b.label === 'Otro'? -1 : 0);
}
