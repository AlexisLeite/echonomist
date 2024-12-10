"use server";

import { pool } from "@/db";
import { verifySession } from "@/session/session";

export type Expense = {
  user_id: number;
  author_name: string;
  concept: string;
  amount: number;
  category: number;
  category_name: string;
  name: string;
  date: Date;
};

export async function getLastExpenses() {
  const session = await verifySession();

  if (session.isAuth) {
    const result = await pool.query(
      `SELECT expenses.*, categories.label as category_name, users.name as author_name FROM expenses 
      JOIN users ON expenses.user_id = users.id 
      JOIN categories ON expenses.category = categories.id
      WHERE date >= NOW() - INTERVAL '7 days' 
      AND categories.group_id = $1 
      ORDER BY date DESC`,
      [session.selectedGroup],
    );
    return result.rows as Expense[];
  }
  return [];
}

export async function getAllExpenses() {
  const session = await verifySession();

  if (session.isAuth) {
    const result = await pool.query(
      `SELECT  expenses.*, categories.label as category_name, users.name as author_name FROM expenses 
      JOIN users ON expenses.user_id = users.id 
      JOIN categories ON expenses.category = categories.id
      WHERE categories.group_id = $1 
      ORDER BY date DESC`,
      [session.selectedGroup],
    );
    return result.rows as Expense[];
  }
  return [];
}
