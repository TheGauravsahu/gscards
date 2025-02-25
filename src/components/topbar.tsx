import Link from "next/link";
import { LogIn, LayoutDashboard } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Topbar() {
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-[90%] md:w-[80vw] border  bg-white/80 backdrop-blur-lg p-3 px-5 rounded-xl shadow-sm dark:border-gray-700 dark:bg-black/50">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <LayoutDashboard className="w-6 h-6 text-primary" />
        <span>GS Cards</span>
      </Link>

      <nav className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href="/"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Link>
      </nav>
    </header>
  );
}
