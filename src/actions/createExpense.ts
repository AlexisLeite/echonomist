"use server";

import { pool } from "@/db";
import { verifySession } from "@/session/session";
import { revalidatePath } from "next/cache";

export async function createExpense(data: FormData) {
  const description = data.get("description");
  const amount = data.get("amount");
  const category = data.get("category");

  const session = await verifySession();

  const result = await pool.query(
    `INSERT INTO home_expenses (concept, amount, category, author) VALUES ($1, $2, $3, $4)`,
    [description, amount, category, session?.userId],
  );

  if (result.rowCount) {
    revalidatePath("/history");
    return { success: true, message: "Gasto agregado correctamente" };
  }

  return { success: false, message: "Error al agregar el gasto" };
}
