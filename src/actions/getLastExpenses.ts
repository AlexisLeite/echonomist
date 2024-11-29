'use server';

import { pool } from "@/db";

export type Expense = {
  concept: string;
  amount: number;
  category: string;
  name: string;
  date: Date;
};

export async function getLastExpenses() {
  const result = await pool.query(`SELECT * FROM home_expenses JOIN users ON home_expenses.author = users.id WHERE date >= NOW() - INTERVAL '7 days' ORDER BY date DESC`);
  return result.rows as Expense[];
}