"use client";

import { observer } from "mobx-react-lite";
import { makeObservable, observable } from "mobx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Expense,
  getAllExpenses,
  getLastExpenses,
} from "@/actions/getLastExpenses";
import { Button } from "./ui/button";
import { Hearts } from "react-loader-spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

class HistoryStore {
  state: {
    balance?: number;
    firstLoaded: boolean;
    fullMode: boolean;
    loadedExpenses: Expense[];
    loading: boolean;
    title: string;
    userId: number;
  } = {
    firstLoaded: false,
    fullMode: false,
    loadedExpenses: [],
    loading: false,
    title: "Gastos últimos 7 días",
    userId: -1,
  };
  constructor() {
    makeObservable(this, {
      state: observable,
    });
  }

  initialLoad(userId: number) {
    if (this.state.firstLoaded) {
      return;
    }
    this.state.firstLoaded = true;
    this.state.userId = userId;
    this.loadSevenDays();
  }

  async loadSevenDays() {
    delete this.state.balance;
    this.state.loading = true;
    this.state.loadedExpenses = await getLastExpenses();
    this.state.title = "Últimos 7 días";
    this.state.loading = false;
  }

  private makeBalance() {
    const total = this.state.loadedExpenses.reduce(
      (sum, expense) => sum + Number.parseInt(String(expense.amount), 10),
      0,
    );
    const user = this.state.loadedExpenses.reduce(
      (sum, expense) =>
        sum +
        (expense.author == this.state.userId
          ? Number.parseInt(String(expense.amount), 10)
          : 0),
      0,
    );
    this.state.balance = user - total / 2;
  }
  async loadAll() {
    this.state.loading = true;
    this.state.loadedExpenses = await getAllExpenses();
    this.state.title = "Todos los gastos";
    this.makeBalance();
    this.state.loading = false;
  }
}

const store = new HistoryStore();

const ExpensesHistory = observer(({ userId }: { userId: number }) => {
  store.initialLoad(userId);

  const totalAmount = store.state.loadedExpenses.reduce(
    (sum, expense) => sum + Number.parseFloat(expense.amount as any),
    0,
  );

  return (
    <div className="flex-grow pt-16 px-4 sm:px-6 lg:px-8 h-full">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{store.state.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-5">
            <Button
              disabled={store.state.loading}
              onClick={() => store.loadAll()}
            >
              Mostrar todos
            </Button>
            {store.state.balance !== undefined && (
              <Alert className="w-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Balance</AlertTitle>
                <AlertDescription>{store.state.balance}</AlertDescription>
              </Alert>
            )}
          </div>
          {store.state.loading && (
            <Hearts
              height="80"
              width="80"
              color="red"
              ariaLabel="hearts-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
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
                    (Number.parseFloat(expense.amount as any) / totalAmount) *
                    100;
                  const backgroundColor = `rgba(80 80 183 / ${percentage / 100})`; // Red color with varying opacity

                  return (
                    <TableRow key={expense.concept}>
                      <TableCell>{expense.concept} </TableCell>
                      <TableCell style={{ backgroundColor }}>
                        ${expense.amount}
                      </TableCell>
                      <TableCell>
                        {expense.category || "Sin categoría"}
                      </TableCell>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>{expense.date.toLocaleDateString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
export default ExpensesHistory;
