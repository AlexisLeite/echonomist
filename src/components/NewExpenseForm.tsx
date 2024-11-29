'use client';

import { Card,CardContent,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createExpense } from '@/actions/createExpense';
import { Alert } from "./ui/alert";
import { useActionState } from "react";

const categories = [
  "Autodetectar",
  "Comida",
  "Transporte",
  "Vivienda",
  "Servicios Públicos",
  "Entretenimiento",
  "Salud",
  "Personal",
  "Otro"
];

export function NewExpenseForm() {
  const [state,formAction] = useActionState(createExpense,{ message: '',success: false });

  return (
    <Card className="w-full max-w-md mx-auto">
      {state.message && <Alert variant={state.success ? 'default' : 'destructive'}>{state.message}</Alert>}
      <CardHeader>
        <CardTitle>New Expense</CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              name="description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Precio</Label>
            <Input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder="Elije la categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Add Expense</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

