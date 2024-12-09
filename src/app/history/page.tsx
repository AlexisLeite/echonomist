"use server";

import ExpensesHistory from "@/components/ExpensesHistory";
import { verifySession } from "@/session/session";

export default async function History() {
  const session = await verifySession();
  const token = Date.now();
  return <ExpensesHistory token={token} userId={session.userId as any} />;
}
