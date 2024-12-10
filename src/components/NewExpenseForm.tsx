"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createExpense } from "@/actions/createExpense";
import { Alert } from "./ui/alert";
import { useActionState, useState } from "react";
import { Category } from "@/actions/getCategories";
import { LoaderCircle } from "lucide-react";

export function NewExpenseForm({ categories }: { categories: Category[] }) {
  const [state, formAction, loadingA] = useActionState(createExpense, {
    message: "",
    success: false,
  });
  const [selectedCategory, setSelectedCategory] = useState(
    String(categories[0]?.id ?? ""),
  );

  const isLoading = loadingA;

  return (
    <Card className="w-full max-w-md mx-auto">
      {state.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          {state.message}
        </Alert>
      )}
      <CardHeader className="relative flex flex-row items-center justify-between">
        <CardTitle>New Expense</CardTitle>
        {isLoading && (
          <LoaderCircle style={{ position: "absolute", right: "24px" }} />
        )}
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input name="description" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Precio</Label>
            <Input name="amount" type="number" min="0" step="0.01" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              name="category"
              value={selectedCategory || String(categories[0]?.id || "")}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Elije la categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Add Expense
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
