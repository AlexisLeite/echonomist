import { getCategories } from "@/actions/getCategories";
import { NewExpenseForm } from "@/components/NewExpenseForm";

export default async function Home() {
  const categories = await getCategories();

  return <NewExpenseForm categories={categories} />;
}
