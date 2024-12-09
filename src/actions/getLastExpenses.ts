"use server";

import { pool } from "@/db";

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
  const result = await pool.query(
    `SELECT expenses.*, categories.label as category_name, users.name as author_name FROM expenses 
      JOIN users ON expenses.user_id = users.id 
      JOIN categories ON expenses.category = categories.id
      WHERE date >= NOW() - INTERVAL '7 days' 
      ORDER BY date DESC`,
  );
  console.log(result.rows);
  return result.rows as Expense[];
}

export async function getAllExpenses() {
  const result = await pool.query(
    `SELECT  expenses.*, categories.label as category_name, users.name as author_name FROM expenses 
      JOIN users ON expenses.user_id = users.id 
      JOIN categories ON expenses.category = categories.id
      ORDER BY date DESC`,
  );
  console.log(result.rows);
  return result.rows as Expense[];
}
