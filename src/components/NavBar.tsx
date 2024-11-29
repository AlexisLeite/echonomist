'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SessionPayload } from '@/session/session';
import { logout } from '@/actions/logout';

export default function Navbar({ session }: { session: SessionPayload; }) {
  const [userName] = useState(session.userName); // Replace with actual user state management

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Echonomy</span>
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700">
                Ingresar gasto
              </Link>
              <Link href="/history" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700">
                Historial
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={userName} />
                    <AvatarFallback>{userName.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userName.toLowerCase().replace(' ','.')}@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

