"use client";

import { useActionState, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handleLogin } from "@/actions/handleLogin";
import { Alert } from "./ui/alert";

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: typeof handleLogin;
}) {
  const [state, formAction] = useActionState(onSubmit, { error: "" });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-[350px]">
      {state?.error && <Alert variant="destructive">{state.error}</Alert>}
      <CardHeader>
        <CardTitle>Inicio de sesión</CardTitle>
      </CardHeader>
      <form method="post" action={formAction}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo</Label>
              <Input
                name="email"
                placeholder="correo@dominio.com"
                type="email"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                name="password"
                type="password"
                placeholder="Introduce la contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Continuar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
