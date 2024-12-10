"use client";

import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Expense,
  getAllExpenses,
  getLastExpenses,
} from "@/actions/getLastExpenses";
import { Button } from "./ui/button";
import { Hearts } from "react-loader-spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { HistoryMobile } from "./expenses/HistoryMobile";
import { HistoryTable } from "./expenses/HistoryTable";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export class HistoryStore {
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
    makeAutoObservable(this);
  }

  private token: number = 0;
  initialLoad(token: number, userId: number) {
    if (token !== this.token) {
      this.token = token;
      this.state.userId = userId;
      this.loadSevenDays();
    }
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
        (expense.user_id == this.state.userId
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

const Render = observer(() => {
  const mobile = useIsMobile();

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
          {mobile ? (
            <HistoryMobile store={store} />
          ) : (
            <HistoryTable store={store} />
          )}
        </CardContent>
      </Card>
    </div>
  );
});

const ExpensesHistory = ({
  token,
  userId,
}: {
  token: number;
  userId: number;
}) => {
  useEffect(() => {
    store.initialLoad(token, userId);
  });
  return <Render />;
};
export default ExpensesHistory;
