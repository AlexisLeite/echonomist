'use client'

import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense, getAllExpenses } from "@/actions/getLastExpenses";
import { Button } from "./ui/button";
import { useState } from "react";

export default function ExpensesHistory({ expenses }: { expenses: Expense[]; }) {
  const totalAmount = expenses.reduce((sum,expense) => sum + Number.parseFloat(expense.amount as any),0);

  const [inner, setExpenses] = useState(expenses)
  const [title, setTitle] = useState("Gastos en los últimos 7 días")

  console.log(expenses);

  return (
    <div className="flex-grow pt-16 px-4 sm:px-6 lg:px-8 h-full" >
      <Card className="mt-8" >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="mb-6 " onClick={() => getAllExpenses().then(res => {
            setExpenses(res);
            setTitle("Todos los gastos")
          })}>Mostrar todos</Button>
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
                  inner.map((expense) => {
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