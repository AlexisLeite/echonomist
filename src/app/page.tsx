import { NewExpenseForm } from "@/components/NewExpenseForm";

export default async function Home() {
  /*const fetchUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
  };*/

  return (
    <NewExpenseForm />
  );
}
