import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense } from "@/actions/getLastExpenses";

export default function ExpensesHistory({ expenses }: { expenses: Expense[]; }) {
  const totalAmount = expenses.reduce((sum,expense) => sum + Number.parseFloat(expense.amount as any),0);

  console.log(expenses);

  return (
    <div className="flex-grow pt-16 px-4 sm:px-6 lg:px-8 h-full" >
      <Card className="mt-8" >
        <CardHeader>
          <CardTitle>All Expenses </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border" >
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
                {
                  expenses.map((expense) => {
                    const percentage = (Number.parseFloat(expense.amount as any) / totalAmount) * 100;
                    const backgroundColor = `rgba(80 80 183 / ${percentage / 100})`; // Red color with varying opacity

                    return (
                      <TableRow key={expense.concept} >
                        <TableCell>{expense.concept} </TableCell>
                        <TableCell style={{ backgroundColor }}>${expense.amount}</TableCell>
                        <TableCell>{expense.category || 'Sin categoría'}</TableCell>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.date.toLocaleDateString()}</TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}