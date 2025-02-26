"use client";

import Link from "next/link";
import { LogIn, LayoutDashboard } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { authClient } from "@/lib/auth-client";
import SignoutButton from "./signout-button";

export default function Topbar() {
  const { data: session } = authClient.useSession();

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 flex items-center justify-between h-12 md:w-[50%] w-[90%] border  bg-white/80 backdrop-blur-lg p-3 px-5 rounded-full shadow-sm dark:border-gray-700 dark:bg-black/50">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <LayoutDashboard className="w-6 h-6 text-primary" />
        <span>GS Cards</span>
      </Link>

      <nav className="flex items-center gap-2">
        <ThemeToggle />
        {session ? (
          <SignoutButton />
        ) : (
          <Link
            className={buttonVariants({
              variant: "default",
            })}
            href="/sign-in"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
