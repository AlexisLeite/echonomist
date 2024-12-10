import { getCategories } from "@/actions/getCategories";
import { getUserGroups } from "@/actions/getUserGroups";
import { NewExpenseForm } from "@/components/NewExpenseForm";

export default async function Home() {
  const groups = await getUserGroups();
  const categories = await getCategories([], groups[0].id);

  return <NewExpenseForm categories={categories} groups={groups} />;
}
