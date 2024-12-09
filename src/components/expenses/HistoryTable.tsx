import { HistoryStore } from "../ExpensesHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const HistoryTable = ({ store }: { store: HistoryStore }) => {
  const totalAmount = store.state.loadedExpenses.reduce(
    (sum, expense) => sum + Number.parseFloat(expense.amount as any),
    0,
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description </TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.state.loadedExpenses.map((expense) => {
            const percentage =
              (Number.parseFloat(expense.amount as any) / totalAmount) * 100;
            const backgroundColor = `rgba(80 80 183 / ${percentage / 100})`; // Red color with varying opacity

            return (
              <TableRow key={expense.concept}>
                <TableCell>{expense.concept} </TableCell>
                <TableCell style={{ backgroundColor }}>
                  ${expense.amount}
                </TableCell>
                <TableCell>
                  {expense.category_name || "Sin categoría"}
                </TableCell>
                <TableCell>{expense.author_name}</TableCell>
                <TableCell>{expense.date.toLocaleDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
