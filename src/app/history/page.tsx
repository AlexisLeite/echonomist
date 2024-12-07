"use server";

import ExpensesHistory from "@/components/ExpensesHistory";
import { verifySession } from "@/session/session";

export default async function History() {
  const session = await verifySession();
  return <ExpensesHistory userId={session.userId as any} />;
}
