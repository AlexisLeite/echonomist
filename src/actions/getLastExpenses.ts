"use server";

import { pool } from "@/db";

export type Expense = {
  author: number;
  concept: string;
  amount: number;
  category: string;
  name: string;
  date: Date;
};

export async function getLastExpenses() {
  console.log("DATABASE_URL:", process.env.DBHOST);
  const result = await pool.query(
    `SELECT * FROM expenses JOIN users ON expenses.user_id = users.id WHERE date >= NOW() - INTERVAL '7 days' ORDER BY date DESC`,
  );
  return result.rows as Expense[];
}

export async function getAllExpenses() {
  console.log("DATABASE_URL:", process.env.DBHOST);
  const result = await pool.query(
    `SELECT * FROM expenses JOIN users ON expenses.user_id = users.id ORDER BY date DESC`,
  );
  return result.rows as Expense[];
}
