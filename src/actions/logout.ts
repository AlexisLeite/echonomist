'use server';

import { deleteSession } from "@/session/session";
import { redirect } from "next/navigation";

export async function logout() {
  await deleteSession();
  redirect('/');
}

