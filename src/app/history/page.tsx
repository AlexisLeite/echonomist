'use server';

import ExpensesHistory from "@/components/ExpensesHistory";
import { getLastExpenses } from "@/actions/getLastExpenses";

export default async function History() {
  const expenses = await getLastExpenses();
  return <ExpensesHistory expenses={expenses} />;
}