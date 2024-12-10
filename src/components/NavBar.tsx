"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SessionPayload } from "@/session/session";
import { logout } from "@/actions/logout";
import { Group } from "@/actions/getUserGroups";
import { startTransition, useActionState } from "react";
import { setSelectedGroup } from "@/session/setSelectedGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function makeLink(label: string, href: string) {
  return (
    <DropdownMenuItem>
      <Link href={href}>{label}</Link>
    </DropdownMenuItem>
  );
}

const navItems = [
  makeLink("Ingresar gasto", "/"),
  makeLink("Historial", "/history"),
];

export default function Navbar({
  groups,
  session,
}: {
  groups: Group[];
  session: SessionPayload;
}) {
  const [selectedGroup, setSelected] = useActionState(
    setSelectedGroup,
    session.selectedGroup,
  );

  return (
    <nav className="shadow-sm fixed top-0 left-0 right-0 h-16 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold ">Echonomist</span>
            </Link>
          </div>
          <div className="flex items-center shrink-0">
            <div className="mr-3">
              <Select
                name="group"
                value={String(selectedGroup)}
                onValueChange={(value) => {
                  const selectedId = Number.parseInt(value);
                  startTransition(() => {
                    setSelected(selectedId);
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Elije el grupo" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={String(group.id)}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={session.userName}
                    />
                    <AvatarFallback>
                      {session.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {...navItems}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
