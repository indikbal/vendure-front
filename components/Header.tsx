import { Package } from "lucide-react";
import Link from "next/link";
import { CartIcon } from "./CartIcon";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Vendurefront</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
