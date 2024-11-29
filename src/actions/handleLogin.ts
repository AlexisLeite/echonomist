'use server';

import { redirect } from "next/navigation";
import { createSession } from "@/session/session";
import { cookies } from "next/headers";
import { pool } from "@/db";

export async function handleLogin(state: any,formData: FormData) {
  if (!formData.get('name') || !formData.get('password')) {
    return { error: 'Debes ingresar un nombre y una contraseña' };
  }

  const result = await pool.query(`SELECT id, name FROM users WHERE name = $1 AND pass = $2`,[formData.get('name'),formData.get('password')]);

  const name = result.rows[0]?.name;

  if (!name) {
    return { error: 'Los datos ingresados no son correctos' };
  }

  createSession(result.rows[0].id,name.toString());
  redirect((await cookies()).get('redirect')?.value || '/');
}